import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store/store";
import TodoPagesWrapperWithFilterPanel from "../todo-pages-wrapper";
import TodoCard from "../components/todo-card";
import TodoCardSkeleton from "../components/todo-card-skeleton";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";

const ArchivedTodosMainPage = () => {
  const [selectedTodos, setSelectedTodos] = useState<string | null>(null);

  const { todo: todosListState, status: todoStatus } = useSelector(
    (state: RootState) => state.todos
  );
  const { subtasks: todoSubtasksListState, status: subtaskStatus } =
    useSelector((state: RootState) => state.todoSubtask);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (["error"].includes(todoStatus)) {
      dispatch(fetchTodos());
    }

    if (["error"].includes(subtaskStatus)) {
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
        {todoStatus === "loading" ? (
          <TodoCardSkeleton />
        ) : (
          todosListState
            .filter((todo) => todo.lifecycle === "archived")
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

export default ArchivedTodosMainPage;
