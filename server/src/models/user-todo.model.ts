import mongoose, { Schema, Document } from "mongoose";

/**
 * ITodo interface
 * ----------------
 * This defines the TypeScript type for a Todo document.
 * - `user` is an ObjectId reference to the User model
 * - rest of the fields describe the todo itself
 */
export interface ITodo extends Document {
  user: mongoose.Types.ObjectId;   // reference to User document
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  tags?: string[];
  dueDate?: Date;
  completedAt?: Date;
  reminders?: Date[];
  subtasks?: {
    title: string;
    status: "pending" | "completed";
  }[];
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
      type: Schema.Types.ObjectId, // store ObjectId value
      ref: "User",                 // reference to "User" collection
      required: true,              // todo must always belong to a user
      index: true                  // improve query speed when filtering by user
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
      enum: ["pending", "in-progress", "completed", "archived"],
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

    // Subtasks for this todo
    subtasks: [
      {
        title: { type: String, required: true },
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending",
        },
      },
    ],
  },

  // Automatically adds createdAt and updatedAt fields
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete (ret as any).user; // never expose password
        return ret;
      }
    }
  }
);

// Create and export model
export const TodoModel = mongoose.model<ITodo>("Todo", TodoSchema);
