import {
  filterThreeLinedSVG,
  greenDoubledRoundedTickSVG,
  redExclamationSVG,
  searchSVG,
  yellowTripleRoundedDotsSVG,
} from "@/other/assets/svg/collectionSVG";

const TodoFilterPanel = () => {
  // bg-[#111711]
  return (
    <section className="upper-section   w-full flex flex-col gap-2    fixed z-50 pb-2 bg-[#022A2A]  ">
      {/* // section : filtered-labels, todos-status and search bars */}
      {/* top div */}

      <div className="top-div w-full h-full mt-[19px] ">
        <ul className="flex justify-between w-full text-[14px]">
          <TodoDataIndicationsIconsAndNumbers />
          {/* Filter Button */}
          <button type="button" className="flex items-center gap-3">
            <img src={filterThreeLinedSVG} alt="" className="h-4" />
            <span>Filter</span>
          </button>
        </ul>
      </div>
      {/* bottom div */}
      <div className="bottom-div  w-[80.5%] flex items-center   justify-start pr-2 py-1  ">
        <label htmlFor="search-todos" className="relative w-full  h-fit">
          <input
            id="search-todos"
            name="search-todos"
            type="text"
            className="bg-[#034A37] w-full h-[40px] px-5 pl-11 py-2 outline-[#BCCBCE] focus:outline-2 border-0 rounded text-md placeholder:text-sm"
            placeholder="search: titles, tags, date, descriptions, todoID"
            autoComplete="off"
          />
          <img
            src={searchSVG}
            alt=""
            className="absolute h-5 top-[8.2px] left-3"
          />
        </label>
      </div>
    </section>
  );
};

export default TodoFilterPanel;

function TodoDataIndicationsIconsAndNumbers() {
  return (
    <div className=" flex w-[500px] data-labels  items-center  justify-start gap-6">
      <button
        disabled
        title="todos-status-completed-todos : status<numbers>"
        className="flex justify-center items-center gap-2"
      >
        <img src={greenDoubledRoundedTickSVG} alt="" className="h-4" />
        <p> : 10</p>
      </button>
      <button
        disabled
        title="todos-status-pending-tods : status<numbers>"
        className="flex justify-center items-center gap-2"
      >
        <img src={yellowTripleRoundedDotsSVG} alt="" className="h-1" />
        <p> : 20</p>
      </button>
      <button
        disabled
        title="todos-status-due-todos : status<numbers>"
        className="flex justify-center items-center gap-2"
      >
        <img src={redExclamationSVG} alt="" className="h-3" />
        <p> : 5</p>
      </button>
    </div>
  );
}
