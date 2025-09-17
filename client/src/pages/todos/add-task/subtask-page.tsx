import { multiplySVG } from "@/other/assets/svg/collectionSVG";
import { useState, type ChangeEvent } from "react";

const SubTaskPage = () => {
  const [subtaskList, setSubtaskList] = useState<string[]>([]);
  const [subtask, setSubtask] = useState<string>("");
  const addSubtasks = () => {
    const SUBTASK_LIST_LIMIT = 6;
    const SUBTASKLIST_LEN = subtaskList.length;
    const conditions =
      subtaskList && subtask.length > 4 && SUBTASKLIST_LEN < SUBTASK_LIST_LIMIT;

    if (conditions) {
      setSubtaskList((prev) => [...prev, subtask]);
      setSubtask("");
    }
  };
  const handleSubtaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  };
  return (
    <section className="flex flex-col  gap-3  items-end w-full mt-6 mr-2">
      <header className="text-xl ml-3 font-extrabold self-start">
        Steps Subs Task,
      </header>
      {/* Sub Task List */}
      <div className="lower-section-subtask-list w-[90%] flex  gap-3  items-start justify-start  max-h-[50vh]  h-fit overflow-y-scroll flex-wrap  ">
        {subtaskList && subtaskList.length > 0 ? (
          subtaskList.map((_, __) => {
            return (
              <span className="pr-3  gap-1  w-fit  bg-[#1D271D] min-h-[50px] h-[50px] rounded inline-flex   border-2 items-center  border-[#293829] ">
                <p className=" ml-3  h-[30px] w-[30px] rounded-full  flex text-center justify-center items-center border-3  border-[#293829] text-sm">
                  {__ + 1}
                </p>
                <h3 className="text-sm ml-3">{_}</h3>

                <img
                  src={multiplySVG}
                  className="h-4  rounded inline "
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
      <div className="lower-section-subtask-add-list flex gap-3 w-[90%]">
        <input
          required
          id="add-subtask"
          name="add-subtask"
          type="text"
          onChange={handleSubtaskInput}
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
    </section>
  );
};

export default SubTaskPage;
