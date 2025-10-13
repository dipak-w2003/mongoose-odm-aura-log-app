import mongoose, { Schema, Document } from "mongoose";

// Use require instead of import
const AutoIncrementFactory = require("mongoose-sequence");

// Initialize with the connection
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
/**
 * @FIXES
 * @todoId
 * * This array object {...prev,user,todoId}, as you know showing relation
 * * on different shchema is hard so we gonna add user:user.id ("User") and 
 *  
 * * todoId:todo.id ("Todo") Schemas. 
 * * Just added is `todoId` for showing relation of which todo_schema.data['id']
 * * matches for TodoSubtask_schema.data.['id'], hence we can filterout data on
 * * the given `.id`
 * @todoId_PROCESS_CLIENT_BACKEND_DATABASE
 * 1) Initiate Backend
 * * a. create xyz todo. hold subtask creation
 * * b. todo.controller.create => res ({ message:"", _justCreatedTodoId : 
 * * abcd })
 * 2) Inititate Client
 * * a. Axios<POST> : todo necessities hold form<todo> state.
 * * b. Backend : store(somewhere randomly), todo.controller.create: response =>
 * * response.data._justCreatedTodoId
 * * c. store todo response '_justCreatedTodoId' value somewhere randomly
 * * d. Axios<PUT> : Check if todo. response.status matches  Request
 * * TodoSubtask with data's adding with each data => 
 * * { ['todoId'] : todoId }
 * * e. Wait State Form<Todo> until TodoSubtask.reponse.status matches, then
 * * clear form with beautiful toasts  
 */
export interface ITodoSubtask extends Document {
  user: mongoose.Types.ObjectId;
  todoId: mongoose.Types.ObjectId;
  title: string;
  status: "pending" | "in-progress" | "completed" | "archived";
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSubtaskSchema = new Schema<ITodoSubtask>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    todoId: { type: Schema.Types.ObjectId, ref: "Todo", required: true },
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
