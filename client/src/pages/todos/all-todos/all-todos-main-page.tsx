import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import type { ITodo } from "@/lib/store/todos/todos-slice-type";
import {
  filterThreeLinedSVG,
  greenDoubledRoundedTickSVG,
  redExclamationSVG,
  searchSVG,
  yellowTripleRoundedDotsSVG,
} from "@/other/assets/svg/collectionSVG";
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
  return (
    <main className="min-h-[100vh]  w-full  pr-2 py-3">
      {/* section : filtered-labels, todos-status and search bars */}
      <section className="upper-section w-full">
        {/* top div */}
        <div className="top-div   w-full ">
          <ul className="flex justify-between w-full">
            <li>Date : All </li>
            <li>Priority : All</li>
            <li>Tag : All</li>
            <li>Status : All </li>
            <button type="button" className="flex items-center gap-3">
              <img src={filterThreeLinedSVG} alt="" />
              <span>Filter</span>
            </button>
          </ul>
        </div>
        {/* bottom div */}
        <div className="bottom-div w-full flex items-center justify-between  pr-2 py-1">
          <label htmlFor="search-todos" className="relative w-[75%] h-fit">
            <input
              id="search-todos"
              name="search-todos"
              type="text"
              className="bg-[#1D271D] w-[100%] px-5 pl-11 py-2 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
              placeholder="search: titles, tags, date, descriptions, todoID"
              autoComplete="off"
            />
            <img src={searchSVG} alt="" className="absolute h-6 top-1 left-3" />
          </label>

          <div className="data-labels flex items-center justify-between gap-8">
            <button
              disabled
              title="todos-status-completed-todos : status<numbers>"
              className="flex justify-center items-center gap-2"
            >
              <img src={greenDoubledRoundedTickSVG} alt="" className="h-5" />
              <p> : 0</p>
            </button>
            <button
              disabled
              title="todos-status-pending-tods : status<numbers>"
              className="flex justify-center items-center gap-2"
            >
              <img src={yellowTripleRoundedDotsSVG} alt="" className="h-2" />
              <p> : 0</p>
            </button>
            <button
              disabled
              title="todos-status-due-todos : status<numbers>"
              className="flex justify-center items-center gap-2"
            >
              <img src={redExclamationSVG} alt="" className="h-4" />
              <p> : 0</p>
            </button>
          </div>
        </div>
      </section>

      {/* section : filtered-labels, todos-status and search bars */}
      <section className="lower-section mt-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum quisquam
        ullam totam iure quia! Fuga ullam et possimus obcaecati quam
        necessitatibus molestias ducimus quasi, quisquam dolor deserunt porro
        placeat perspiciatis?
      </section>
    </main>
  );
};

export default AllTodosMainPage;
