import type { AppDispatch, RootState } from "@/lib/store/store";
import { fetchTodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import type { ITodo, todoPriority } from "@/lib/store/todos/todos-slice-type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoPagesWrapperWithFilterPanel from "../todo-pages-wrapper";
import {
  curvedStarSlashedSVG,
  triangleCircledSVG,
} from "@/other/assets/svg/collectionSVG";

const AllTodosMainPage = () => {
  const [allTodosList, setAllTodosList] = useState<ITodo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const { status: todoStatus, todo: todosListState } = useSelector(
    (state: RootState) => state.todos
  );

  const dispatch: AppDispatch = useDispatch();
  function fetchings() {
    dispatch(fetchTodos());
    dispatch(fetchTodoSubtasks());
    setAllTodosList(todosListState);
  }

  function handleMultiSelectedTodos(_item_id: string) {
    const _temp = selectedTodos;
    const _idx = _temp.findIndex((_) => _ == _item_id);
    console.log("clicked");
    console.log(_idx);
    if (_idx == -1) {
      selectedTodos.push(_item_id);
      console.log("added : ", selectedTodos);
    } else {
      selectedTodos.splice(_idx, 1);
      console.log("removed : ", selectedTodos);
    }
    setSelectedTodos(selectedTodos);
  }
  useEffect(() => {
    console.log(allTodosList);
    console.log(selectedTodos);
    fetchings();
  }, [selectedTodos, todoStatus]);
  // Get Idea how to merge and show specific todos
  return (
    <TodoPagesWrapperWithFilterPanel>
      <section className="rounded  overflow-hidden flex flex-col gap-6 mb-24 relative items-start justify-start">
        {["1", "2", "3", "4", "5", "6", "7", "8"].map((_, __) => {
          return (
            <div className="w-full   todo-card-wrapper-content h-fit min-h-[30vh]   rounded border-[#293829] border-3 flex flex-col p-2 relative cursor-pointer hover:bg-[#293829] transition-all duration-150 ">
              <article className="upper-contents h-1/3 w-full border-[#293829] border-b flex justify-between rounded overflow-hidden">
                {/* Upper content Left & Right Contents */}
                <TodoUpperLeftContentVisualization
                  date={new Date()}
                  priority="urgent"
                  // tags={["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"]}
                  title={`User Research & Visualization`}
                  key={__}
                />
                <TodoUpperRightContentVisualization />

                <button
                  type="button"
                  onClick={() => handleMultiSelectedTodos(_)}
                  className="absolute h-[25px] -bottom-3 left-[48.999%] w-[25px]  text-center bg-[#111711] rounded-full flex justify-center items-center  cursor-pointer"
                >
                  <img
                    src={triangleCircledSVG}
                    className={`${
                      selectedTodos.includes(_) ? "rotate-0" : "rotate-180"
                    }`}
                    alt=""
                  />
                </button>
              </article>

              {/* middle content */}
              <article className="py-2 pl-1 text transition-all duration-150 ease-linear">
                <h2 className="text-lg underline">Descriptions !</h2>
                <p className="text-sm text-[#f0f8ffb6] p-4 transition-all duration-150 ease-linear">
                  Cupiditate neque dolorum repellat iure, corporis tempore
                  illum, nisi fugit incidunt ab quibusdam repellendus? illum,
                  nisi fugit incidunt ab quibusdam repellendus? illum, nisi
                  fugit incidunt ab quibusdam repellendus? Cupiditate in modi,
                  fugit incidunt ab quibusdam repellendus? Cupiditate in modi,
                  fugit incidunt ab quibusdam repellendus? Cupiditate in modi,
                  fugit incidunt ab quibusdam repellendus? Cupiditate in modi,
                  fugit incidunt ab quibusdam repellendus? Cupiditate in modi,
                  fugit incidunt ab quibusdam repellendus? Cupiditate in modi,
                  sunt suscipit saepe non odit.
                </p>
              </article>

              {/* bottom content */}
            </div>
          );
        })}
      </section>
    </TodoPagesWrapperWithFilterPanel>
  );
};

export default AllTodosMainPage;

// TodoUpperLeftContentVisualization : Component
function TodoUpperLeftContentVisualization({
  title,
  priority,
  date,
  tags,
}: {
  title: string;
  tags?: string[];
  priority: todoPriority;
  date: Date;
}) {
  const PRIORITIES_STARS_LEN_HASH = { low: 1, medium: 2, high: 3, urgent: 4 };

  return (
    <section className="u-c-left-contents h-[100%] w-2/4 flex flex-col gap-1 *:px-2">
      <span className="u-c-l-c-top-contents h-1/2 w-full  flex justify-between items-center">
        <header className="text-lg font-bold underline w-fit ">
          {title ?? "Titles"}
        </header>

        {/* Priorities start visualizer */}
        <div className="priorities-stars flex items-center gap-3">
          {priority &&
            Array.from({ length: PRIORITIES_STARS_LEN_HASH[priority] }).map(
              () => {
                return (
                  <img
                    src={curvedStarSlashedSVG}
                    className="h-5 rotate-90"
                    key={`${priority}-${title}-len:[${PRIORITIES_STARS_LEN_HASH[priority]}]`}
                    alt={`${priority}-${title}`}
                  />
                );
              }
            )}
        </div>

        {/* date */}

        <h3 className="todo-date text-[#E4AD08] border-[#E4AD08] bg-[#96740e9e] border-3 px-4 py-1 rounded font-extrabold">
          {date.toLocaleDateString()}
        </h3>
      </span>
      {/* u-c-l-c-bottom-contents */}
      <span className="u-c-l-c-bottom-contents h-1/2 w-full  flex items-center gap-3 text-[#8A8A8A] text-sm">
        {tags && tags.length > 0 ? (
          tags.map((_, __) => {
            return <div>#{_}</div>;
          })
        ) : (
          <p>No Tags !</p>
        )}
      </span>
    </section>
  );
}

// TodoUpperRightContentVisualization : Component

function TodoUpperRightContentVisualization() {
  return (
    <section className="u-c-left-contents  h-[100%] w-1/4 flex justify-end items-center">
      <div className="u-c-left-contents-progress-bar rounded-full h-[50px] w-[50px]  border-4 border-[#0dbb0d] flex justify-center items-center">
        <p className="text-sm"> 100%</p>
      </div>
    </section>
  );
}
