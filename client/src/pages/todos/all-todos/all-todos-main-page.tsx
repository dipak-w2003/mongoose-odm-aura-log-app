import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import type { ITodo } from "@/lib/store/todos/todos-slice-type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoPagesWrapperWithFilterPanel from "../todo-pages-wrapper";

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
    <TodoPagesWrapperWithFilterPanel>
      <section className="rounded overflow-hidden flex flex-col gap-3 mb-24">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, __) => {
          return (
            <div className="todo-card-wrapper-content h-[40vh] min-h-[40vh] overflow-hidden  rounded border-[#293829] border-3 flex flex-col p-2">
              <article className="upper-contents h-1/3 w-full border-[#293829] border-b-3 ">
                index : {(__ + 1).toString().padStart(2, "0")}{" "}
              </article>
            </div>
          );
        })}
      </section>
    </TodoPagesWrapperWithFilterPanel>
  );
};

export default AllTodosMainPage;
