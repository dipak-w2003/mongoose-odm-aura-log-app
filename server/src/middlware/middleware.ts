import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envConfigs } from "../config/env-configs";
import { IExtendedRequest } from "./index.type";
import { IUser, UserModel } from "../models/user.model";
import asyncErrorHandler from "../services/async-error-handler.service";
export const isLoggedIn = asyncErrorHandler(async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string
    if (!token) {
      res.status(401).json({
        message: "Provide token !"
      })
    }
    // Verify token
    jwt.verify(token, envConfigs._jwt.secretKey as string, async (errorMessage, successMessage: any) => {
      if (errorMessage) {
        res.status(401).json({
          message: "Invalid token intercepted!"
        })
      } else {
        console.log("Middleware accessed");
        console.log(successMessage);
        const userData = await UserModel.findById(successMessage?.id) as IUser
        // As a middleware we can pass a request key&values always
        req.user = {
          id: userData.id,
          name: userData.name
        }
        next()
      }
    })

  } catch (eror) {
    console.log("Internal server issue");
    res.status(501).json({
      message: "Internal server issue"
    })
  }
})