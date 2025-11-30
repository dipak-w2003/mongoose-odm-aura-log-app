import mongoose, { Schema, Document } from "mongoose";

// Use require instead of import
const AutoIncrementFactory = require("mongoose-sequence");

// Initialize with the connection
const AutoIncrement = AutoIncrementFactory(mongoose.connection);

export interface ITodoSubtask extends Document {
  user: mongoose.Types.ObjectId;
  todoId: mongoose.Types.ObjectId;
  title: string;
  status: "pending" | "completed";
  completionMessage?: string;
  completionStatus?: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSubtaskSchema = new Schema<ITodoSubtask>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    todoId: { type: Schema.Types.ObjectId, ref: "Todo", required: true },
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    position: { type: Number, index: true },

    // Just Added
    completionStatus: {
      type: Boolean,
      default: false,
    },
    completionMessage: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform(doc, ret) {
        // delete (ret as any)._id;
        delete (ret as any).user;
        // delete (ret as any).todoId;
        return ret;
      },
    },
  },
);

export const TodoSubtaskModel = mongoose.model<ITodoSubtask>(
  "Todo-Subtask",
  TodoSubtaskSchema,
);
