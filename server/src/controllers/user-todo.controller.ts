import { Response } from "express";
import { IExtendedRequest } from "../middlware/index.type";
import { ITodo, TodoModel } from "../models/user-todo.model";



// Create User Todo
export const createTodo = async (req: IExtendedRequest, res: Response) => {
  try {
    const _gotTodoDetails: Partial<ITodo> = req.body.ids || req.body;
    const userId = req.user?.id
    const newTodo = await TodoModel.create({
      user: userId,
      ..._gotTodoDetails
    })

    return res.status(201).json({
      message: "Todo creation successful",
      data: newTodo,
      _justCreatedTodoId: newTodo.id
    })
  } catch (error: any) {
    console.log("Todo creation internal error :: ");
    res.status(500).json({
      message: error.message || "server error"
    })
  }
}


// Get User Todos
export const getTodos = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Find all todos that belong to this user
    const userTodos = await TodoModel.find({ user: userId }).sort({ createdAt: -1 });
    /*
    .sort({ field: 1 | -1 })
    1 → ascending order (oldest → newest)
   -1 → descending order (newest → oldest) */

    res.status(200).json({
      message: "User todos fetched!",
      data: userTodos
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong"
    });
  }
};

// Update Todo
export const updateTodo = async (req: IExtendedRequest, res: Response) => {
  try {
    // Logged-in user's ID
    const userId = req.user?.id;
    // ID of the todo to update
    const todoId = req.params.id;

    const updateData: Partial<ITodo> = req.body;
    // Only update the fields provided
    // as passed_obj => {key:[value]}

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Find the todo that belongs to this user and update it
    const updatedTodo = await TodoModel.findOneAndUpdate(
      // ownership check
      { _id: todoId, user: userId },
      updateData,
      { new: true }
      // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or not yours" });
    }
    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};


// Delete User Todo 

export const deleteTodo = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const todoId = req.params.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!todoId) {
      return res.status(400).json({ message: "Invalid todo id!" });
    }
    // Only delete if the todo belongs to this user
    const deletedTodo = await TodoModel.findOneAndDelete({ _id: todoId, user: userId });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo deletion unsuccessful or not yours!" });
    }
    res.status(200).json({
      message: "Todo deleted successfully!",
      data: deletedTodo
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};


// Enable Todo Archived
export const setTodoArchive = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const todoId: string = req.params.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!todoId) {
      return res.status(400).json({ message: "Invalid todo id!" });
    }
    const _todoSetArchiveUpdated = await TodoModel.findOneAndUpdate(
      // ownership check
      { _id: todoId, user: userId },
      { isArchived: true },
      { new: true }
      // return updated document
    );
    if (!_todoSetArchiveUpdated) {
      return res.status(404).json({ message: "Todo not found or not yours" });
    }
    res.status(200).json({
      message: "Todo archiving enable updated successfully",
      data: _todoSetArchiveUpdated
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });

  }
}

// Disbale Todo Archived
export const unsetTodoArchive = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const todoId: string = req.params.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!todoId) {
      return res.status(400).json({ message: "Invalid todo id!" });
    }
    const __todoUnsetArchiveUpdated = await TodoModel.findOneAndUpdate(
      // ownership check
      { _id: todoId, user: userId },
      { isArchived: false },
      { new: true }
      // return updated document
    );
    if (!__todoUnsetArchiveUpdated) {
      return res.status(404).json({ message: "Todo not found or not yours" });
    }
    res.status(200).json({
      message: "Todo updated successfully",
      data: __todoUnsetArchiveUpdated
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
}


// Set Trash Todo
export const setTodoTrashed = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const todoId: string = req.params.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!todoId) {
      return res.status(400).json({ message: "Invalid todo id!" });
    }
    const _todoSetTrashedUpdated = await TodoModel.findOneAndUpdate(
      // ownership check
      { _id: todoId, user: userId },
      { isTrashed: true },
      { new: true }
      // return updated document
    );
    if (!_todoSetTrashedUpdated) {
      return res.status(404).json({ message: "Todo not found or not yours" });
    }
    res.status(200).json({
      message: "Todo Trashed successfully",
      data: _todoSetTrashedUpdated
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message || "internal server error !"
    })
  }
}

// Todo Unset/ Restore Trash like 
export const unsetTodoTrashed = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const todoId: string = req.params.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!todoId) {
      return res.status(400).json({ message: "Invalid todo id!" });
    }
    const _todoUnsetTrashedUpdated = await TodoModel.findOneAndUpdate(
      // ownership check
      { _id: todoId, user: userId },
      { isTrashed: false },
      { new: true }
      // return updated document
    );
    if (!_todoUnsetTrashedUpdated) {
      return res.status(404).json({ message: "Todo not found or not yours" });
    }
    res.status(200).json({
      message: "Todo restored successfully",
      data: _todoUnsetTrashedUpdated
    });
  } catch (error: any) {
    res.status(501).json({
      message: error.message || "internal server error !"
    })
  }
}