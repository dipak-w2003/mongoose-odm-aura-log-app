import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import type { ITodo } from "@/lib/store/todos/todos-slice-type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoFilterPanel from "../todo-filter-panel";

const AllTodosMainPage = () => {
  const [allTodosList, setAllTodosList] = useState<ITodo[]>([]);
  const { status: todoStatus, todo: todosListState } = useSelector(
    (state: RootState) => state.todos
  );
  const dispatch: AppDispatch = useDispatch();
  function fetchings() {
    dispatch(fetchTodos());
    dispatch(fetchTodoSubtasks());
    setAllTodosList(todosListState);
  }
  useEffect(() => {
    fetchings();
    console.log(allTodosList);
  }, [todoStatus]);
  // Get Idea how to merge and show specific todos
  return (
    <TodoFilterPanel>
      <main>All Todos Hai ta</main>
    </TodoFilterPanel>
  );
};

export default AllTodosMainPage;
