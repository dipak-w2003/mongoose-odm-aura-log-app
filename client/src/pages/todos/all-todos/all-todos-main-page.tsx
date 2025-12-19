import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";

import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import TodoCardSkeleton from "../components/todo-card-skeleton";
const TodoPagesWrapperWithFilterPanel = lazy(
  () => import("../todo-pages-wrapper")
);
const TodoCard = lazy(() => import("../components/todo-card"));

const AllTodosMainPage = () => {
  const [selectedTodos, setSelectedTodos] = useState<string | null>(null);

  const { todo: todosListState } = useSelector(
    (state: RootState) => state.todos
  );
  const { subtasks: todoSubtasksListState } = useSelector(
    (state: RootState) => state.todoSubtask
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTodoSubtasks());
  }, [dispatch]);

  // const handleMultiSelectedTodos = (id: string) => {
  //   setSelectedTodos((prev) =>
  //     prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  //   );
  // };
  const handleSingleSelect = (id: string) => {
    setSelectedTodos((prev) => (prev === id ? null : id));
  };
  const isSelected = (id: string) => selectedTodos === id;

  return (
    <TodoPagesWrapperWithFilterPanel>
      <section className="flex flex-col w-full gap-8 pb-24 relative">
        {todosListState.length > 0
          ? todosListState
              // .filter((_) => _.lifecycle == "active")
              .map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  isSelected={isSelected(todo._id)}
                  onToggle={() => handleSingleSelect(todo._id)}
                  subtasks={todoSubtasksListState}
                />
              ))
          : Array.from({ length: 1 }).map((_, i) => (
              <TodoCardSkeleton key={i} />
            ))}
      </section>
    </TodoPagesWrapperWithFilterPanel>
  );
};

export default AllTodosMainPage;
