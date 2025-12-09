import type { Status } from "@/lib/global";

export type todoStatus = "pending" | "in-progress" | "completed" | "archived"
export type todoPriority = "low" | "medium" | "high" | "urgent";
export interface ITodo {
  _id: string,
  title: string;
  description: string;
  status?: todoStatus;
  priority: todoPriority
  tags?: string[];
  dueDate: string;
  time: string
}
export interface ITodoInitialState {
  activeTodoId: string;
  todo: ITodo[],
  status: Status
}