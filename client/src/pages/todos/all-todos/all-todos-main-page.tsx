import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import { lazy, useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoCardSkeleton from "../components/todo-card-skeleton";

const TodoPagesWrapperWithFilterPanel = lazy(
  () => import("../todo-pages-wrapper")
);
const TodoCard = lazy(() => import("../components/todo-card"));

const AllTodosMainPage = () => {
  const [selectedTodos, setSelectedTodos] = useState<string | null>(null);

  const { todo: todosListState, status: todoStatus } = useSelector(
    (state: RootState) => state.todos
  );
  const { subtasks: todoSubtasksListState, status: subtaskStatus } =
    useSelector((state: RootState) => state.todoSubtask);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (todoStatus === "error") {
      dispatch(fetchTodos());
    }

    if (subtaskStatus === "error") {
      dispatch(fetchTodoSubtasks());
    }
  }, [todoStatus, subtaskStatus, dispatch]);

  const handleSingleSelect = (id: string) => {
    setSelectedTodos((prev) => (prev === id ? null : id));
  };

  const isSelected = (id: string) => selectedTodos === id;

  return (
    <TodoPagesWrapperWithFilterPanel>
      <section className="flex flex-col w-full gap-8 pb-24 relative">
        {todoStatus === "error" ? (
          <TodoCardSkeleton />
        ) : (
          todosListState
            .filter((todo) => todo.lifecycle === "active")
            .map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                isSelected={isSelected(todo._id)}
                onToggle={() => handleSingleSelect(todo._id)}
                subtasks={todoSubtasksListState}
              />
            ))
        )}
      </section>
    </TodoPagesWrapperWithFilterPanel>
  );
};

export default AllTodosMainPage;
