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
    const userId = req.user?.id;

    const payload = req.body.ids || req.body;

    let created;

    if (Array.isArray(payload)) {
      // Add user and create each item individually so mongoose-sequence works
      const docs = payload.map((d) => ({ user: userId, ...d }));
      created = await Promise.all(docs.map((d) => TodoSubtaskModel.create(d)));
    } else {
      created = await TodoSubtaskModel.create({ user: userId, ...payload });
    }

    res.status(201).json({
      message: "Subtasks created successfully!",
      data: created, // ✅ return actual Mongoose docs
    });


  } catch (error) {
    res.status(500).json({
      message: "Failed to create subtasks",
      error,
    });
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
    const inserted = await TodoSubtaskModel.insertMany(validSubtasks,);
    res.status(200).json({
      message: `Replaced ${inserted.length} subtasks successfully`,
      subtasks: inserted,
    });
  } catch (error) {
    console.error("Failed to replace subtasks:", error);
    res.status(500).json({ message: "Failed to replace subtasks", error });
  }
};


// set false subtask completion status
export const setASubtaskCompletionStatus = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const todoId: string = req.params.id
    const statusBoolean: string = req.body.statusBoolean
    // const USER_A_DEFAULT_SUBTASK_COMPLETION_STATUS = false;
    const USER_A_DEFAULT_SUBTASK_COMPLETION_STATUS: boolean = !statusBoolean || statusBoolean.length || [0, '0', 'false'].includes(statusBoolean) ? false : true

    if (!userId) return res.status(401).json({
      message: "Unathourized"
    })
    if (!todoId) return res.status(404).json({
      message: "Todo not found or not yours !"
    })

    const _todoSetSubtaskCompletionStatus = await TodoSubtaskModel.findOneAndUpdate(
      {
        _id: todoId, user: userId
      },
      {
        completionStatus: USER_A_DEFAULT_SUBTASK_COMPLETION_STATUS,
      },
      {
        new: true, timestamps: true
      })

    if (!_todoSetSubtaskCompletionStatus) return res.status(404).json({
      message: "Todo not found or not yours !"
    })

    res.status(200).json({
      message: "subtask completion status updated to " + USER_A_DEFAULT_SUBTASK_COMPLETION_STATUS,
      data: _todoSetSubtaskCompletionStatus
    })
  } catch (error: any) {
    res.status(501).json({
      message: error.message || "internal server error"
    })
  }
}
// set subtask completionMessage
export const setSubtaskCompletionMessage = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const subtaskId = req.params.id;
    const { completionMessage, todoId }: { completionMessage: string, todoId: string } = req.body;

    if (!userId || !todoId) return res.status(401).json({ message: "Unauthorized" });
    if (!subtaskId || !mongoose.Types.ObjectId.isValid(subtaskId)) {
      return res.status(400).json({ message: "Invalid subtask ID" });
    }
    if (!completionMessage || completionMessage.trim().length === 0) {
      return res.status(400).json({ message: "Subtask completion message is required!" });
    }

    const updatedSubtask = await TodoSubtaskModel.findOneAndUpdate(
      { _id: subtaskId, user: userId },
      {
        status: "completed",
        completionStatus: true,
        completionMessage
      },
      { new: true, timestamps: true }
    );

    if (!updatedSubtask)
      return res.status(404).json({ message: "Subtask not found or not yours!" });

    // Add a function where check if all subtask related for todoId subtask.completionStatus true then todo.isCompleted set to true
    const certainTodoSubtaskList: ITodoSubtask[] = await TodoSubtaskModel.find({ user: userId, todoId: todoId }).sort({ position: 1 })
    // const isAllSubtaskCompleted = certainTodoSubtaskList.filter(_ => _.completionStatus && _.completionMessage && _.completionMessage.length > 0)


    res.status(200).json({
      message: "Subtask completion status & message updated successfully",
      data: updatedSubtask
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
