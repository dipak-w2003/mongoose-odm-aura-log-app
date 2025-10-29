import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfigs } from "../config/env-configs";
import { IExtendedRequest } from "./index.type";
import { IUser, UserModel } from "../models/user.model";
import asyncErrorHandler from "../services/async-error-handler.service";

export const isLoggedIn = asyncErrorHandler(
  async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;

      if (!token) {
        return res.status(401).json({ message: "Provide token!" }); // ✅ use return
      }

      jwt.verify(
        token,
        envConfigs._jwt.secretKey as string,
        async (errorMessage, successMessage: any) => {
          if (errorMessage) {
            return res.status(401).json({
              message: "Invalid token intercepted!",
            }); // ✅ return here too
          }

          console.log("Middleware accessed");
          console.log(successMessage);

          const userData = (await UserModel.findById(successMessage?.id)) as IUser;

          if (!userData) {
            return res.status(404).json({ message: "User not found!" }); // ✅ safe guard
          }

          // Attach user info to request
          req.user = {
            id: userData.id,
            name: userData.name,
          };

          return next(); // ✅ always return next() for clarity
        }
      );
    } catch (error) {
      console.log("Internal server issue", error);
      return res.status(501).json({
        message: "Internal server issue",
      });
    }
  }
);
