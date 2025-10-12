import type { todoPriority } from "@/lib/store/todos/todos-slice-type";
import { clockSVG } from "@/other/assets/svg/collectionSVG";
import { useEffect, type ChangeEvent, type FormEvent } from "react";
import SubTaskPage from "./subtask-page";
import TaskTagsPage from "./task-tags-page";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoTitleTemp,
  setTodoDescriptionTemp,
  setTodoDueDateTemp,
  setTodoPriorityTemp,
  setTodoTimeTemp,
  setValidateTodoTempCollectionNullifification,
  resetTempTodoCollector,
} from "@/lib/store/todos/temp-todos-collector-slice";
import { addTodo, addTodos } from "@/lib/store/todos/todos-slice";

const AddTaskMainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { _isNullificationExists, todo } = useSelector(
    (state: RootState) => state.tempTodoCollector
  );
  const { todo: todos } = useSelector((state: RootState) => state.todos);
  console.log(todo);

  const handleUserFormDataSubmission = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Page ; ", _isNullificationExists);

    if (_isNullificationExists) {
      console.log("Data InComplete");
    } else {
      console.log("Data Complete");
      dispatch(addTodos(todo));
      console.log("todos : ", todos);
      dispatch(resetTempTodoCollector());
      console.log("Reset Form Success !");
    }
  };
  useEffect(() => {
    dispatch(setValidateTodoTempCollectionNullifification());
  }, [_isNullificationExists]);
  return (
    <main className="p-3 overflow-hidden">
      <header className="text-3xl font-extrabold">Create Task,</header>
      <form
        className="w-full overflq<wsaow-hidden flex flex-col"
        onSubmit={handleUserFormDataSubmission}
      >
        {/* Upper Section : Todos Initials */}
        <section className="flex flex-col  gap-3  items-end w-full mt-3 mr-2">
          <input
            onChange={(_: ChangeEvent<HTMLInputElement>) =>
              dispatch(setTodoTitleTemp(_.target.value))
            }
            value={todo?.title}
            required
            id="title"
            name="title"
            type="text"
            className="bg-[#1D271D] w-[90%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            placeholder="Task Name"
            autoComplete="off"
          />

          <textarea
            value={todo?.description}
            name="description"
            id="description"
            cols={3}
            rows={4}
            className="bg-[#1D271D] min-h-[20vh] max-h-[20vh]  w-[90%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            maxLength={300}
            placeholder="Task Description"
            onChange={(_: ChangeEvent<HTMLTextAreaElement>) =>
              dispatch(setTodoDescriptionTemp(_.target.value))
            }
          />

          {/* upper-section-bottoms */}
          <div className="upper-section-bottoms w-[90%] flex justify-center gap-3">
            {/* Task Priorities */}
            <select
              // value={"medium"}
              onChange={(_: ChangeEvent<HTMLSelectElement>) =>
                dispatch(setTodoPriorityTemp(_.target.value as todoPriority))
              }
              value={todo?.priority}
              defaultValue={"medium"}
              name="priority"
              id="priority"
              className="bg-[#1D271D] bg-[#1D271D   w-[33%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
            >
              {["low", "medium", "high", "urgent"].map((_, __) => {
                return (
                  <option
                    key={`priority:${__}:${_}`}
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
              value={todo.dueDate}
              required
              id="dueDate"
              name="dueDate"
              type="date"
              className="bg-[#1D271D]   w-[33%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
              placeholder="Task Name"
              autoComplete="off"
              onChange={(_: ChangeEvent<HTMLInputElement>) =>
                dispatch(setTodoDueDateTemp(_.target.value))
              }
            />
            <label htmlFor="task-time" className="w-[33%] flex  relative">
              <input
                // value={"2025/12/1"}
                onChange={(_: ChangeEvent<HTMLInputElement>) =>
                  dispatch(setTodoTimeTemp(_.target.value))
                }
                required
                id="task-time"
                name="task-time"
                type="time"
                className="bg-[#1D271D] w-[100%] px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
                placeholder="Task Name"
                autoComplete="off"
                defaultValue={"10:00"}
              />
              <img
                id="task-timea"
                src={clockSVG}
                className="absolute h-4 top-1/3 right-3"
              />
            </label>
          </div>
        </section>
        {/* Middle Section : Todos Sub Task */}
        <SubTaskPage />
        {/* Bottom Section : Todos Task Tags */}
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
