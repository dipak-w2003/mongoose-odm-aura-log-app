import {
  filterThreeLinedSVG,
  greenDoubledRoundedTickSVG,
  redExclamationSVG,
  searchSVG,
  yellowTripleRoundedDotsSVG,
} from "@/other/assets/svg/collectionSVG";
import type React from "react";

const TodoFilterPanel = ({ child }: { child: React.ReactNode }) => {
  return (
    <main className="min-h-[100vh]  w-full  pr-5 relative">
      {/* section : filtered-labels, todos-status and search bars */}
      <section className="upper-section w-full  top-6 fixed">
        {/* top div */}
        <div className="top-div   w-full ">
          <ul className="flex justify-between w-full">
            <li>Date : All </li>
            <li>Priority : All</li>
            <li>Tag : All</li>
            <li>Status : All </li>
            <button type="button" className="flex items-center gap-3">
              <img src={filterThreeLinedSVG} alt="" className="h-4" />
              <span>Filter</span>
            </button>
          </ul>
        </div>
        {/* bottom div */}
        <div className="bottom-div w-full flex items-center pr-2 py-1 gap-6">
          <label htmlFor="search-todos" className="relative w-[77%] h-fit">
            <input
              id="search-todos"
              name="search-todos"
              type="text"
              className="bg-[#1D271D] w-[100%] h-[40px] px-5 pl-11 py-2 outline-[#293829] focus:outline-1 border-0 rounded text-md placeholder:text-md"
              placeholder="search: titles, tags, date, descriptions, todoID"
              autoComplete="off"
            />
            <img src={searchSVG} alt="" className="absolute h-6 top-4 left-3" />
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
      <section className="lower-section relative top-28 mt-1">{child}</section>
    </main>
  );
};

export default TodoFilterPanel;
