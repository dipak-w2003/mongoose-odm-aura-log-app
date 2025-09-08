import mongoose, { Schema, Document } from "mongoose";

// Use require instead of import
const AutoIncrementFactory = require("mongoose-sequence");

// Initialize with the connection
const AutoIncrement = AutoIncrementFactory(mongoose.connection);

export interface ITodoSubtask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  status: "pending" | "in-progress" | "completed" | "archived";
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSubtaskSchema = new Schema<ITodoSubtask>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "archived"],
      default: "pending",
    },
    position: { type: Number, index: true },
  },
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

// Plugin
TodoSubtaskSchema.plugin(AutoIncrement, {
  id: "subtask_counter",
  inc_field: "position",
  reference_fields: ["user"],
});

export const TodoSubtaskModel = mongoose.model<ITodoSubtask>(
  "Todo-Subtask",
  TodoSubtaskSchema
);
