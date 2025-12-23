import { Request, Response } from "express";
import { IExtendedRequest } from "../middlware/index.type";
import { INote, NoteModel } from "../models/user-note.model";

// Create Note
export const createNote = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const createData: Partial<INote> = req.body;

  const newNote = await NoteModel.create({ ...createData, user: userId });

  res.status(201).json({
    message: "Note created successfully!",
    data: newNote,
  });
};

// Get All Notes for Logged-in User
export const getNotes = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const notes = await NoteModel.find({ user: userId }).sort({ createdAt: -1 });

  res.status(200).json({
    message: "User notes fetched!",
    data: notes,
  });
};

// Get Single Note
export const getNoteById = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;

  const note = await NoteModel.findOne({ _id: noteId, user: userId });
  if (!note) return res.status(404).json({ message: "Note not found!" });

  res.status(200).json({
    message: "Note fetched!",
    data: note,
  });
};

// Update Note
export const updateNote = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;
  const updateData = req.body; // Partial update of provided fields

  const updatedNote = await NoteModel.findOneAndUpdate(
    { _id: noteId, user: userId },
    updateData,
    { new: true, timestamps: true }
  );

  if (!updatedNote) return res.status(404).json({ message: "Note not found or not authorized!" });

  res.status(200).json({
    message: "Note updated successfully!",
    data: updatedNote,
  });
};

// Delete Note
export const deleteNote = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;

  const deletedNote = await NoteModel.findOneAndDelete({ _id: noteId, user: userId });
  if (!deletedNote) return res.status(404).json({ message: "Note not found or not authorized!" });

  res.status(200).json({
    message: "Note deleted successfully!",
    data: deletedNote,
  });
};
