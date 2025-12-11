import mongoose, { Schema, Document } from "mongoose";

/**
 * ITodo interface
 * ----------------
 * This defines the TypeScript type for a Todo document.
 * - `user` is an ObjectId reference to the User model
 * - rest of the fields describe the todo itself
 */
export type TodoStatus = "pending" | "in-progress" | "completed";
export type TodoPriority = "low" | "medium" | "high" | "urgent";
export type TodoMode = "archived" | "trashed";
export interface ITodo extends Document {
  user: mongoose.Types.ObjectId;   // reference to User document
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  tags?: string[];
  dueDate?: Date;
  completedAt?: Date;
  reminders?: Date[];
  isArchived?: boolean;
  isTrashed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Todo Schema
 * -----------
 * Defines how the Todo collection will be stored in MongoDB.
 * Includes a reference to User, status, priority, reminders, subtasks, etc.
 */
const TodoSchema = new Schema<ITodo>(
  {
    // User who owns this todo
    user: {
      // store ObjectId value
      type: Schema.Types.ObjectId,
      // reference to "User" collection
      ref: "User",
      // todo must always belong to a user
      required: true,
      // improve query speed when filtering by user
      index: true
    },

    // Main title of the todo
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional description
    description: {
      type: String,
      trim: true,
      default: "N/A"
    },

    // Current state of the todo
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    // Importance level
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    // Labels / categories
    tags: {
      type: [String],
      default: [],
    },

    // Due date for completion
    dueDate: {
      type: Date,
    },

    // When task was marked as completed
    completedAt: {
      type: Date,
    },

    // Reminder notifications
    reminders: {
      type: [Date], // multiple reminder times
    },

    // Recently added
    isArchived: {
      type: Boolean,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    }


  },

  // Automatically adds createdAt and updatedAt fields
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete (ret as any).user;
        return ret;
      }
    }
  }
);

// Create and export model
export const TodoModel = mongoose.model<ITodo>("Todo", TodoSchema);
