import { Response } from "express";
import { IExtendedRequest } from "../middlware/index.type";
import { ITodoSubtask, TodoSubtaskModel } from "../models/user-todo-subtask.model";
import mongoose from "mongoose";

/**
 *@DROP_THIS_IDEA 
 * Create Subtasks (single or multiple)
 * Uses Promise.all + .create() to ensure mongoose-sequence auto-increments position correctly
 */


export const createSubTasks = async (req: IExtendedRequest, res: Response) => {
  try {
    const createDatas: Partial<ITodoSubtask>[] | Partial<ITodoSubtask> = req.body.ids || req.body;
    const userId = req.user?.id;
    const userTodoSubTaskList: ITodoSubtask[] = await TodoSubtaskModel.find({ user: userId })
    if (Array.isArray(createDatas)) {
      const subTasks = createDatas.map((data) => ({ user: userId, ...data }));
      // Use create() for each to trigger mongoose-sequence plugin
      await Promise.all(subTasks.map((task) => TodoSubtaskModel.create(task)));
    } else {
      await TodoSubtaskModel.create({ user: userId, ...createDatas });
    }
    res.status(201).json({ message: "Subtasks created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create subtasks", error });
  }
};

/**
 *@ReadSubtasks
 * Sorted by position to respect auto-increment order
 */
export const readSubTasks = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "User not authenticated" });
    const subTasks = await TodoSubtaskModel.find({ user: userId }).sort({ position: 1 });
    res.status(200).json({
      message: "Subtasks fetched!",
      data: subTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subtasks", error });
  }
};

/**
 *@DeleteSubtasks
 * Accepts single or multiple IDs
 */

// Multiple Deletion Error
export const deleteSubTasks = async (req: IExtendedRequest, res: Response) => {
  console.log("Delete triggered");
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "User not authenticated" });
  let ids: string | string[] = req.body.ids;
  if (!ids) return res.status(400).json({ message: "No IDs provided" });
  // Convert single string to array
  ids = typeof ids === "string" ? [ids] : ids;
  // Keep only valid ObjectIds
  ids = ids.filter((id: string) => mongoose.Types.ObjectId.isValid(id));
  if (ids.length === 0) return res.status(400).json({ message: "No valid IDs provided" });
  // Delete subtasks belonging to this user
  const result = await TodoSubtaskModel.deleteMany({ _id: { $in: ids }, user: userId });
  res.status(200).json({
    message: `Deleted ${result.deletedCount} subtasks successfully`,
    deletedCount: result.deletedCount,
  });
};


/**
 *@UpdateSubtasks
 * Accepts single or multiple IDs
 */
export const updateEntireSubTasks = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "User not authenticated" });
    const newSubtasks = req.body.subtasks as Partial<ITodoSubtask>[];
    if (!newSubtasks || !Array.isArray(newSubtasks) || newSubtasks.length === 0) {
      return res.status(400).json({ message: "No subtasks provided" });
    }
    // Reset positions starting from 1
    const validSubtasks = newSubtasks.map((task, index) => ({
      ...task,
      user: userId,
      position: index + 1,
    }));

    // Delete old subtasks 
    await TodoSubtaskModel.deleteMany({ user: userId });

    // Insert new subtasks
    const inserted = await TodoSubtaskModel.insertMany(validSubtasks);
    res.status(200).json({
      message: `Replaced ${inserted.length} subtasks successfully`,
      subtasks: inserted,
    });
  } catch (error) {
    console.error("Failed to replace subtasks:", error);
    res.status(500).json({ message: "Failed to replace subtasks", error });
  }
};

