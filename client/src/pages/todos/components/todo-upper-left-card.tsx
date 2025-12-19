import { curvedStarSlashedSVG } from "@/other/assets/svg/collectionSVG";
import type {
  todoLifecycle,
  todoPriority,
} from "@/lib/store/todos/todos-slice-type";
import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import { updateTodoLifecycle } from "@/lib/store/todos/todos-slice";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  title: string;
  priority: todoPriority;
  date: string;
  tags?: string[];
  lifecycle: todoLifecycle;
}

const TodoUpperLeftContent = ({
  id,
  title,
  priority,
  date,
  tags,
  lifecycle,
}: Props) => {
  const PRIORITY_LEVELS = { low: 1, medium: 2, high: 3, urgent: 4 };
  return (
    <section className="flex flex-col w-1/2 gap-2 px-1">
      <TodoTitle title={title} lifecycle={lifecycle} id={id} />
      <div className="flex items-center gap-2 ">
        {/* Priority Stars */}
        <span className="flex items-center cursor-pointer">
          {Array.from({ length: PRIORITY_LEVELS[priority] }).map((_, i) => (
            <img
              key={i}
              src={curvedStarSlashedSVG}
              className="h-6 scale-[0.9] hover:scale-[1] transition-all"
            />
          ))}
        </span>

        {/* DATE */}
        <h3 className="text-white border border-[#BCCBCE] px-3 py-1 rounded-md text-sm font-bold">
          {date}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {tags?.length ? (
          tags.map((t, i) => (
            <span key={i} className="text-[#E1B7B8] text-sm font-semibold">
              #{t}
            </span>
          ))
        ) : (
          <span>No Tags</span>
        )}
      </div>
    </section>
  );
};

export default TodoUpperLeftContent;

// Todo Title Component
function TodoTitle({
  title,
  lifecycle,
  id,
}: {
  id: string;
  title: string;
  lifecycle: todoLifecycle;
}) {
  useState<todoLifecycle>(lifecycle);
  const dispatch: AppDispatch = useDispatch();
  const setCycle = () => {
    const next = lifecycle === "active" ? "archived" : "active";
    dispatch(updateTodoLifecycle({ id, lifecycle: next }));
  };

  return (
    <section className="flex items-center gap-4">
      <header className="text-lg font-bold group-hover:underline group-hover:underline-offset-4">
        {title}
      </header>
      {lifecycle !== "trashed" && (
        <button
          onClick={setCycle}
          className="cursor-pointer scale-[0.9] hover:transition-all hover:scale-[1.05]"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#034A37"
            stroke="#034A37"
            stroke-width="0.01024"
            width={20}
            height={20}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M725.333333 42.666667a276.714667 276.714667 0 0 0-213.333333 100.224A276.714667 276.714667 0 0 0 298.666667 42.666667C145.749333 42.666667 21.333333 167.082667 21.333333 320c0 263.082667 457.664 640.576 477.162667 656.512a21.226667 21.226667 0 0 0 27.008 0C545.002667 960.576 1002.666667 583.082667 1002.666667 320c0-152.917333-124.416-277.333333-277.333334-277.333333z"
                fill={lifecycle !== "active" ? "#E86C60" : "#ffff"}
              ></path>
            </g>
          </svg>
        </button>
      )}
    </section>
  );
}
