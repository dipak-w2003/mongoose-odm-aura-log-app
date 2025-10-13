import { Status } from "@/lib/global";
import type { AppDispatch, RootState } from "@/lib/store/store";
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
    setAllTodosList(todosListState);
  }
  useEffect(() => {
    fetchings();
    console.log(allTodosList);
  }, [todoStatus]);
  return <div>AllTodosMainPage</div>;
};

export default AllTodosMainPage;
