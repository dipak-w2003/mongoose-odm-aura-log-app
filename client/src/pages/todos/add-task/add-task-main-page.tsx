import { useState, type ChangeEvent } from "react";

const AddTaskMainPage = () => {
  const [subtaskList, setSubtaskList] = useState<string[]>([]);
  const [subtask, setSubtask] = useState<string>("");
  const addSubtasks = () => {
    if (subtaskList) {
      setSubtaskList((prev) => [...prev, subtask]);
      setSubtask("");
    }
  };
  const handleSubtaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  };
  return (
    <main className="p-3 overflow-hidden">
      <header className="text-3xl font-extrabold">Create Task,</header>
      <form className="w-full overflow-hidden flex flex-col">
        {/* Upper Section */}
        <section className="flex flex-col  gap-3  items-end w-full mt-3 mr-2">
          <input
            required
            id="task-name"
            name="task-name"
            type="text"
            className="bg-[#1D271D]   w-[90%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            placeholder="Task Name"
            autoComplete="off"
          />

          <textarea
            name="task-description"
            id="task-description"
            cols={3}
            rows={4}
            className="bg-[#1D271D] min-h-[20vh] max-h-[20vh]  w-[90%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            maxLength={300}
            placeholder="Task Description"
          />

          {/* upper-section-bottoms */}
          <div className="upper-section-bottoms w-[90%] flex justify-center gap-3">
            {/* Task Priorities */}
            <select
              name="task-priority"
              id="task-priority"
              className="bg-[#1D271D] bg-[#1D271D   w-[33%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            >
              {["low", "medium", "high", "urgent"].map((_) => {
                return (
                  <option
                    className="bg-[#1D271D mt-2"
                    id={"priority" + _}
                    value={_}
                  >
                    {_.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <input
              required
              id="task-date"
              name="task-date"
              type="date"
              className="bg-[#1D271D]   w-[33%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
              placeholder="Task Name"
              autoComplete="off"
            />
            <input
              required
              id="task-time"
              name="task-time"
              type="time"
              className="bg-[#1D271D] w-[33%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
              placeholder="Task Name"
              autoComplete="off"
            />
          </div>
        </section>
        {/* Lower Section */}
        <section className="flex flex-col  gap-3  items-end w-full mt-6 mr-2">
          <header className="text-xl ml-3 font-extrabold self-start">
            Steps Subs Task,
          </header>
          <div className="lower-section-subtask-list w-full flex flex-col  gap-3  items-end   max-h-[50vh] overflow-y-scroll ">
            {subtaskList &&
              subtaskList.map((_, __) => {
                return (
                  <span className=" flex   gap-1  w-[90%] bg-[#1D271D] min-h-[50px] rounded  border-2 items-center  border-[#293829] ">
                    <p className=" ml-3  h-[30px] w-[30px] rounded-full  flex text-center justify-center items-center border-3  border-[#293829] text-sm">
                      {__ + 1}
                    </p>
                    <h3 className="text-sm ml-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Atque voluptatibus aperiam illo blanditiis repellendus,
                      iste
                    </h3>
                  </span>
                );
              })}
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
        {/*Submission Button  */}
        <button
          type="submit"
          className="cursor-pointer self-end mt-3  px-4 py-2 w-[90%] rounded  text-black bg-[rgba(41,224,41,0.59)]"
        >
          Add Task
        </button>
      </form>
    </main>
  );
};

export default AddTaskMainPage;
