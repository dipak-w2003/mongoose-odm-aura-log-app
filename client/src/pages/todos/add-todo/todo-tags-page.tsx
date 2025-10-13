import type { AppDispatch, RootState } from "@/lib/store/store";
import {
  deleteTodoTaskTagsTemp,
  setTodoTaskTagsTemp,
} from "@/lib/store/todos/temp-todos-collector-slice";
import { multiplySVG } from "@/other/assets/svg/collectionSVG";
import type { Action } from "@reduxjs/toolkit";
import { useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const TodoTagsPage = () => {
  const { todo } = useSelector((state: RootState) => state.tempTodoCollector);
  const dispatch: AppDispatch = useDispatch();
  const [tags, setTags] = useState<string>("");
  const addTaskTags = () => {
    const TAGS_LIST_LIMIT = 6;
    const tempArray = todo.tags;

    const conditions = tempArray && tags.length !== 0 && tags.length! >= 6;
    if (conditions && tempArray.length < TAGS_LIST_LIMIT) {
      dispatch(setTodoTaskTagsTemp(tags));
      setTags("");
    }
  };
  const handleTaskTagsInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  return (
    <section className="flex flex-col  gap-3  items-end w-full mt-6 mr-2">
      <header className="text-xl ml-3 font-extrabold self-start">
        Tags Task,
      </header>
      {/* Sub Task List */}
      <div className="lower-section-subtask-list w-[90%] flex  gap-3  items-start min-h-[fit] overflow-y-scroll flex-wrap whitespace-nowrap ">
        {todo.tags &&
          todo.tags.map((_, __) => {
            return (
              <span className="pr-3  gap-1  w-fit  bg-[#1D271D] min-h-[50px] h-[50px] rounded inline-flex   border-2 items-center  border-[#293829] ">
                <p className=" ml-3  h-[30px] w-[30px] rounded-full  flex text-center justify-center items-center border-3  border-[#293829] text-sm">
                  {__ + 1}
                </p>
                <h3 className="text-sm ml-3">{_}</h3>

                <img
                  src={multiplySVG}
                  onClick={(): Action =>
                    dispatch(deleteTodoTaskTagsTemp({ _idx: __ }))
                  }
                  className="h-4  rounded inline cursor-pointer hover:scale-125 transition-all duration-100"
                  alt=""
                  title={`[delete:${__ + 1}]`}
                />
              </span>
            );
          })}
      </div>
      {todo.tags?.length !== 6 && (
        <div className="lower-section-subtask-add-list flex gap-3 w-[90%] transition-all duration-150 ">
          <input
            id="tag"
            name="tag"
            type="text"
            onChange={handleTaskTagsInput}
            className="bg-[#1D271D]   w-[90%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            placeholder="Task Tags"
            autoComplete="off"
            value={tags}
          />
          <button
            onClick={addTaskTags}
            type="button"
            className="cursor-pointer px-4 py-2 w-[200px] rounded  text-black bg-[rgba(41,224,41,0.59)]"
          >
            Add Tag
          </button>
        </div>
      )}
    </section>
  );
};

export default TodoTagsPage;
