import { Response } from "express";
import { IExtendedRequest } from "../middlware/index.type";
import { ITodo, TodoModel } from "../models/user-todo.model";



// Create User Todo
export const createTodo = async (req: IExtendedRequest, res: Response) => {
  try {
    const { title, description, status, priority, tags, dueDate, reminders } = req.body as ITodo
    const userId = req.user?.id
    const newTodo = await TodoModel.create({
      user: userId,
      title,
      description,
      status,
      priority,
      tags,
      dueDate,
      reminders,
    })
    res.status(201).json({
      message: "Todo creation successful",
      data: newTodo
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
