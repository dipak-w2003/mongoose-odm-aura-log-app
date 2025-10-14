import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import type { ITodo } from "@/lib/store/todos/todos-slice-type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  return <div>AllTodosMainPage</div>;
};

export default AllTodosMainPage;
