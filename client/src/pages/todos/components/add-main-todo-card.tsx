import {
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { todoPriority } from "@/lib/store/todos/todos-slice-type";

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

import { addTodos } from "@/lib/store/todos/todos-slice";

interface AddTodoCardProps {
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
}

const AddMainTodoCard = ({
  title = "Create Task",
  children,
  onClose,
}: AddTodoCardProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { _isNullificationExists, todo: tempTodos } = useSelector(
    (state: RootState) => state.tempTodoCollector
  );
  const { status: todoStatus } = useSelector((state: RootState) => state.todos);

  const tempTodosSafe = tempTodos || {
    title: "",
    description: "",
    priority: "medium" as todoPriority,
    dueDate: "",
    time: "10:00",
  };

  useEffect(() => {
    dispatch(setValidateTodoTempCollectionNullifification());
  }, [dispatch, tempTodos]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (_isNullificationExists && todoStatus !== "success") {
      console.log("Todo insertion failure");
      return;
    }

    dispatch(addTodos(tempTodosSafe));
    dispatch(resetTempTodoCollector());
    console.log("Todo added successfully");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className=" inset-0 z-50 flex items-center justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-[90%]   border border-white/20 rounded p-5 shadow-xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {/* <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-2xl font-semibold">{title}</h2>
          </div> */}

          {/* Form */}
          <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            <AnimatePresence>
              <motion.section
                className="flex flex-col gap-3"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <input
                  type="text"
                  value={tempTodosSafe.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(setTodoTitleTemp(e.target.value))
                  }
                  placeholder="Task Name"
                  required
                  className="bg-white/20 text-white placeholder:text-white/60 px-3 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                  autoComplete="off"
                />
                <textarea
                  value={tempTodosSafe.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    dispatch(setTodoDescriptionTemp(e.target.value))
                  }
                  placeholder="Task Description"
                  rows={4}
                  className="bg-white/20 text-white placeholder:text-white/60 px-3 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                />
                <div className="flex gap-3">
                  <select
                    value={tempTodosSafe.priority}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      dispatch(
                        setTodoPriorityTemp(e.target.value as todoPriority)
                      )
                    }
                    className="bg-white/20 text-white px-3 py-3 rounded-lg outline-none border border-white/20"
                  >
                    {["low", "medium", "high", "urgent"].map((p) => (
                      <option key={p} value={p}>
                        {p.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={tempTodosSafe.dueDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch(setTodoDueDateTemp(e.target.value))
                    }
                    className="bg-white/20 text-white px-3 py-3 rounded-lg outline-none border border-white/20"
                  />
                  <input
                    type="time"
                    value={tempTodosSafe.time}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch(setTodoTimeTemp(e.target.value))
                    }
                    className="bg-white/20 text-white px-3 py-3 rounded-lg outline-none border border-white/20"
                  />
                </div>
              </motion.section>
            </AnimatePresence>

            {/* Children slot */}
            {children && (
              <AnimatePresence>
                <motion.section
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {children}
                </motion.section>
              </AnimatePresence>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              {!_isNullificationExists && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Add Task
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddMainTodoCard;
