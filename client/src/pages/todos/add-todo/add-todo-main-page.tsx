import { useEffect, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { todoPriority } from "@/lib/store/todos/todos-slice-type";
import SubTaskPage from "./subtask-page";
import TodoTagsPage from "./todo-tags-page";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoTitleTemp,
  setTodoDescriptionTemp,
  setTodoDueDateTemp,
  setTodoPriorityTemp,
  setValidateTodoTempCollectionNullifification,
  resetTempTodoCollector,
} from "@/lib/store/todos/temp-todos-collector-slice";
import { addTodos } from "@/lib/store/todos/todos-slice";
import DateTimePicker from "../archived-todos/draft-idea";
import { formatKathmanduISO, formatUTCISO } from "@/utils/luxon-module";
import { useNavigate } from "react-router-dom";

const AddTodoMainPage = () => {
  const handleDate = (d: Date) => {
    console.log("Selected:", formatKathmanduISO(d));
    const _date = String(formatUTCISO(d));
    dispatch(setTodoDueDateTemp(_date));
  };

  const dispatch: AppDispatch = useDispatch();
  const { _isNullificationExists, todo: tempTodos } = useSelector(
    (state: RootState) => state.tempTodoCollector
  );
  const { status: todoStatus, justCreatedTodoId } = useSelector(
    (state: RootState) => state.todos
  );

  // Fallback to ensure controlled inputs
  const tempTodosSafe = tempTodos || {
    title: "",
    description: "",
    priority: "medium" as todoPriority,
    dueDate: "",
    time: "10:00",
  };

  // Validate temp collection whenever it changes
  useEffect(() => {
    dispatch(setValidateTodoTempCollectionNullifification());
  }, [dispatch, tempTodos]);

  const navigate = useNavigate();
  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (_isNullificationExists && todoStatus !== "success") {
      console.log("Todo Insertion Failure!");
      return;
    }
    dispatch(addTodos(tempTodosSafe));
    dispatch(resetTempTodoCollector());
    console.log("Todo added successfully");
    // TODO : Make a slice with extra state like justCreatedTodoId so it will be trackable future todos after created
    navigate(`/user/todos/all-todos#`);
  };

  // Motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  useEffect(() => {
    if (!justCreatedTodoId) return;
  }, [justCreatedTodoId, navigate, dispatch]);
  return (
    <motion.main
      className="p-3 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.header
        className="text-3xl font-extrabold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Create Task,
      </motion.header>

      <form className="w-full flex flex-col gap-5 mt-3" onSubmit={handleSubmit}>
        {/* Upper Section */}
        <AnimatePresence>
          <motion.section
            className="flex flex-col gap-3 items-end w-full mr-2"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title */}
            <input
              type="text"
              id="title"
              name="title"
              value={tempTodosSafe.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(setTodoTitleTemp(e.target.value))
              }
              placeholder="Task Name"
              required
              className="bg-[#034A37] w-[90%] px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
              autoComplete="off"
            />

            {/* Description */}
            <textarea
              id="description"
              name="description"
              value={tempTodosSafe.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                dispatch(setTodoDescriptionTemp(e.target.value))
              }
              placeholder="Task Description"
              rows={4}
              maxLength={300}
              className="bg-[#034A37] min-h-[20vh] max-h-[20vh] w-[90%] px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0 rounded placeholder:text-sm text-sm"
            />

            <div className="upper-section-bottoms w-[90%] relative flex justify-start gap-3">
              {/* Priority */}
              <select
                value={tempTodosSafe.priority}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  dispatch(setTodoPriorityTemp(e.target.value as todoPriority))
                }
                name="priority"
                id="priority"
                className="bg-[#034A37] w-[200px] px-3 py-3 outline-[#BCCBCE] focus:outline-2 border-0 rounded text-sm"
              >
                {["low", "medium", "high", "urgent"].map((p) => (
                  <option key={p} value={p} className="bg-[#1D271D] text-white">
                    {p.toUpperCase()}
                  </option>
                ))}
              </select>

              {/* Date Time Picker : component */}
              <div className="w-2/4">
                <DateTimePicker
                  onChange={handleDate}
                  showTime={true}
                  dateFormat="PPpp"
                />
              </div>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Middle Section */}
        <AnimatePresence>
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <TodoTagsPage />
          </motion.section>
        </AnimatePresence>

        {/* Bottom Section */}
        <AnimatePresence>
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <SubTaskPage />
          </motion.section>
        </AnimatePresence>

        {/* Submit Button */}
        {!_isNullificationExists && (
          <motion.button
            type="submit"
            className="cursor-pointer self-end mt-3 px-4 py-2 w-[90%] rounded text-black bg-[#FE802C] hover:bg-[#fd944a] transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add Task
          </motion.button>
        )}
      </form>
    </motion.main>
  );
};

export default AddTodoMainPage;
