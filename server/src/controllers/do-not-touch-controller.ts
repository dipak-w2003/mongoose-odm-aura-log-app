/*
A Do not touch code controller

which have the access to delete or remove collections from databases;
 1) An Entire database
 2) An User and Linked Model via userId like subtask, notes, blogs etc
 */


import mongoose from "mongoose";
import { Request, Response } from "express";
import { TodoSubtaskModel } from "../models/user-todo-subtask.model";
import { NoteModel } from "../models/user-note.model";
import { BlogModel } from "../models/user-blog.model";
import { UserModel } from "../models/user.model";
import { IExtendedRequest } from "../middlware/index.type";

export const deleteEntireDatabase = async (): Promise<void> => {
  const db = mongoose.connection.db;
  if (!db) throw new Error("No database connection found");

  await db.dropDatabase();
};



// ⚠️ DANGEROUS: Admin only. Do not expose publicly.

export const DoNotTouchController = {

  // Delete entire databasex
  deleteDatabase: async (_req: Request, res: Response) => {
    try {
      const db = mongoose.connection.db;
      if (!db) {
        return res.status(500).json({ error: "Database connection not ready" });
      }

      await db.dropDatabase();
      return res.status(200).json({ message: "Entire database deleted" });
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  },

  // Delete a user and all linked models
  deleteUserAndLinked: async (req: IExtendedRequest, res: Response) => {
    const userId = req.user?.id as string

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const id = new mongoose.Types.ObjectId(userId);

      // Delete linked models
      await Promise.all([
        TodoSubtaskModel.deleteMany({ userId: id }).session(session),
        NoteModel.deleteMany({ userId: id }).session(session),
        BlogModel.deleteMany({ userId: id }).session(session),
      ]);

      // Delete the user
      await UserModel.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ message: `User ${userId} and linked data deleted` });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ error: (err as Error).message });
    }
  },
};
