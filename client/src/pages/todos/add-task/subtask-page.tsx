import type { AppDispatch, RootState } from "@/lib/store/store";
import {
  deleteTodoSubTaskTemp,
  setTodoSubTaskTemp,
} from "@/lib/store/todos/temp-todos-collector-slice";
import { multiplySVG } from "@/other/assets/svg/collectionSVG";
import { useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubTaskPage = () => {
  const { todo } = useSelector((state: RootState) => state.tempTodoCollector);
  const dispatch: AppDispatch = useDispatch();
  const [subtask, setSubtask] = useState<string>("");

  const addSubtasks = () => {
    const SUBTASK_LIST_LIMIT = 6;
    const tempArray = todo?.subtask;
    if (!tempArray) return;
    const SUBTASKLIST_LEN = tempArray.length;
    const conditions =
      tempArray && subtask.length > 4 && SUBTASKLIST_LEN < SUBTASK_LIST_LIMIT;

    if (conditions) {
      dispatch(setTodoSubTaskTemp(subtask));
      setSubtask("");
    }
  };

  // const deleteSubtasks = ( )

  return (
    <section className="flex flex-col  gap-3  items-end w-full mt-6 mr-2">
      <header className="text-xl ml-3 font-extrabold self-start">
        Steps Subs Task,
      </header>
      {/* Sub Task List */}
      <div className="lower-section-subtask-list w-[90%] flex  gap-3  items-start justify-start  max-h-[50vh]  h-fit overflow-y-scroll flex-wrap  ">
        {todo.subtask && todo.subtask.length > 0 ? (
          todo.subtask.map((_, __) => {
            return (
              <span
                key={`subtask:${__}:${_}`}
                className="pr-3  gap-1  w-fit  bg-[#1D271D] min-h-[50px] h-[50px] rounded inline-flex   border-2 items-center  border-[#293829] "
              >
                <p className=" ml-3  h-[30px] w-[30px] rounded-full  flex text-center justify-center items-center border-3  border-[#293829] text-sm">
                  {__ + 1}
                </p>
                <h3 className="text-sm ml-3">{_}</h3>

                <img
                  onClick={() => dispatch(deleteTodoSubTaskTemp({ _idx: __ }))}
                  src={multiplySVG}
                  className="h-4  rounded inline cursor-pointer"
                  alt=""
                />
              </span>
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center ">
            <p>OPTIONAL : Sub Task List !</p>
          </div>
        )}
      </div>
      {todo.subtask?.length !== 6 && (
        <div className="lower-section-subtask-add-list flex gap-3 w-[90%]">
          <input
            id="add-subtask"
            name="add-subtask"
            type="text"
            onChange={(_: ChangeEvent<HTMLInputElement>) =>
              setSubtask(_.target.value)
            }
            className="bg-[#1D271D]   w-[90%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            placeholder="Sub Task"
            autoComplete="off"
            value={subtask}
          />
          <button
            onClick={addSubtasks}
            type="button"
            className="cursor-pointer px-4 py-2 w-[200px] rounded  text-black bg-[rgba(41,224,41,0.59)]"
          >
            Add Subtask
          </button>
        </div>
      )}
    </section>
  );
};

export default SubTaskPage;
