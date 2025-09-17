import { clockSVG } from "@/other/assets/svg/collectionSVG";
import SubTaskPage from "./subtask-page";
import TaskTagsPage from "./task-tags-page";

const AddTaskMainPage = () => {
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
              value={"medium"}
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
            <label htmlFor="task-time" className="w-[33%] flex  relative">
              <input
                required
                value={"12-10-am"}
                id="task-time"
                name="task-time"
                type="time"
                className="bg-[#1D271D] w-[100%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
                placeholder="Task Name"
                autoComplete="off"
              />
              <img
                id="task-time"
                src={clockSVG}
                className="absolute h-4 top-1/3 right-3"
              />
            </label>
          </div>
        </section>
        {/* Lower Section */}
        <SubTaskPage />
        <TaskTagsPage />
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
