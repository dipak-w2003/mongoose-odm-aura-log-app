import type { AppDispatch, RootState } from "@/lib/store/store";
import {
  fetchTodoSubtasks,
  type ITodoSubtasks,
} from "@/lib/store/todos/todo-subtasks-slice";
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
  const { subtasks: todoSubtasksListState } = useSelector(
    (state: RootState) => state.todoSubtask
  );
  const dispatch: AppDispatch = useDispatch();
  function fetchings() {
    dispatch(fetchTodos());
    dispatch(fetchTodoSubtasks());
    setAllTodosList(todosListState);
  }

  // Functions
  function handleMultiSelectedTodos(_itemid: string) {
    setSelectedTodos((prev) => {
      const _temp = [...prev];
      const idx = _temp.findIndex((id) => id === _itemid);
      if (idx !== -1) {
        _temp.splice(idx, 1);
      } else {
        _temp.push(_itemid);
      }
      return _temp;
    });
  }

  // useEffects
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTodoSubtasks());
  }, [dispatch]);

  useEffect(() => {
    setAllTodosList(todosListState);
  }, [todosListState]);

  useEffect(() => {
    console.log("Selected Todos changed:", selectedTodos);
  }, [selectedTodos]);
  return (
    <TodoPagesWrapperWithFilterPanel>
      <section className="  overflow-hidden flex flex-col w-full  gap-6 mb-24 relative items-start justify-start">
        {todosListState.length > 0 &&
          todosListState.map((_, __) => {
            return (
              <div className="wrapper group  w-full ">
                <div className=" rounded todo-card-wrapper-content w-full h-fit min-h-[30vh]  border-[#293829] border-3 flex flex-col p-2 relative cursor-pointer hover:bg-[#293829]  transition-all duration-150 group ">
                  <article className="upper-contents h-1/3 w-full  flex justify-between relative ">
                    {/* Upper content Left & Right Contents */}
                    <TodoUpperLeftContentVisualization
                      date={new Date()}
                      priority={_?.priority}
                      tags={_.tags}
                      key={__}
                      title={_.title}
                    />
                    <div className="line border-[#293829] h-2 w-[200%] absolute -bottom-1   border-b-3 group-hover:border-b-[#111711] -left-6" />
                    <TodoUpperRightContentVisualization />
                  </article>
                  <button
                    type="button"
                    onClick={() => handleMultiSelectedTodos(_._id)}
                    className="absolute h-[25px] -bottom-3 left-[48.999%] w-[25px]  text-center bg-[#111711] rounded-full flex justify-center items-center  cursor-pointer "
                  >
                    <img
                      src={triangleCircledSVG}
                      className={`${
                        selectedTodos.includes(_._id)
                          ? "rotate-0"
                          : "rotate-180"
                      }`}
                      alt=""
                    />
                  </button>
                  {/* middle content */}
                  <TodoMiddleContentVisualization desc={_.description} />

                  {/* bottom content */}
                  {selectedTodos.includes(_._id) && (
                    <TodoBottomContentsVisualization
                      bucketSubtasks={todoSubtasksListState}
                      specifiedTodoId={_._id}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </section>
    </TodoPagesWrapperWithFilterPanel>
  );
};

export default AllTodosMainPage;

function TodoMiddleContentVisualization({ desc }: { desc: string }) {
  return (
    <article className="py-2 pl-1 text transition-all duration-150 ease-linear group-hover:underline group-hover:underline-offset-4 group-hover:transition-all">
      <h2 className="text-lg underline">Descriptions !</h2>
      <p className="text-sm text-[#f0f8ffb6] p-4 transition-all duration-150 ease-linear">
        {desc ?? "N/A"}
      </p>
    </article>
  );
}
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
    <section className="u-c-left-contents h-[100%] w-2/4 flex flex-col gap-1 *:px-2 ">
      <span className="u-c-l-c-top-contents h-1/2 w-full  flex justify-between items-center">
        <header className="text-lg font-bold group-hover:underline group-hover:underline-offset-4 w-fit ">
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

        <h3 className="todo-date text-[#E4AD08] border-[#E4AD08] bg-[#96740e9e] border-3 px-4 py-1 rounded  font-extrabold">
          {date.toLocaleDateString()}
        </h3>
      </span>
      {/* u-c-l-c-bottom-contents */}
      <span className="u-c-l-c-bottom-contents rounded h-1/2 w-full  flex items-center gap-3 text-[#8A8A8A] text-sm">
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

function TodoBottomContentsVisualization({
  bucketSubtasks,
  specifiedTodoId,
}: {
  bucketSubtasks: ITodoSubtasks[];
  specifiedTodoId: string;
}) {
  const finalizedSubtasks = bucketSubtasks.filter(
    (_) => _.todoId === specifiedTodoId
  );
  console.log(finalizedSubtasks);
  console.log(specifiedTodoId);
  const [__, _a_] = useState<ITodoSubtasks[]>(finalizedSubtasks);
  return (
    <article
      className={`py-2 pl-1 text transition-all duration-150 ease-linear`}
    >
      <h2 className="text-lg group-hover:underline-offset-4 group-hover:underline">
        Subtasks !
      </h2>
      <section className="flex flex-col">
        {__.length > 0 &&
          __.filter((_) => _.todoId === specifiedTodoId).map((_) => {
            return (
              <div className="subtask_wrapper *:m-2 ">
                <i>{_.position.toString().padStart(2, "0")})</i>
                <span>{_.title}</span>
                <input type="radio" name="todo-subtaks" />
              </div>
            );
          })}
      </section>
    </article>
  );
}
