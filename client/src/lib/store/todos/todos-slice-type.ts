export type todoStatus = "pending" | "in-progress" | "completed" | "archived"
export type todoPriority = "low" | "medium" | "high" | "urgent";
export interface ITodo {
  title: string;
  description?: string;
  status: todoStatus;
  priority: todoPriority
  tags?: string[];
  dueDate?: Date;
  completedAt?: Date;
}
