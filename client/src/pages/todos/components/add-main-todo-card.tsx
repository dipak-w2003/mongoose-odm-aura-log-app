import { type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { todoPriority } from "@/lib/store/todos/todos-slice-type";

import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";

import {
  setTodoTitleUpdate,
  setTodoDescriptionUpdate,
  setTodoDueDateUpdate,
  setTodoPriorityUpdate,
  setTodoTimeUpdate,
  resetUpdateTodoCollector,
} from "@/lib/store/todos/updating-todos-collector-slice";

interface AddTodoCardProps {
  title?: string;
  children?: ReactNode;
  // onClose?: () => void;
}

const AddMainTodoCard = ({ children }: AddTodoCardProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { _isNullificationExists, todo: updatingTodo } = useSelector(
    (state: RootState) => state.updateTodoCollector
  );
  const { status: todoStatus } = useSelector((state: RootState) => state.todos);

  const udpdatingTodoSafe = updatingTodo || {
    title: "",
    description: "",
    priority: "medium" as todoPriority,
    dueDate: "",
    time: "10:00",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (_isNullificationExists && todoStatus !== "success") {
      console.log("Todo insertion failure");
      return;
    }

    dispatch(resetUpdateTodoCollector());
    console.log("Todo added successfully");
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className=" inset-0 z-50 flex items-center w-full justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // onClick={onClose}
      >
        <motion.div
          className="relative w-[fit]   border p-5 border-white/20 rounded  shadow-xl"
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
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <AnimatePresence>
              <motion.section
                className="flex flex-col gap-3 "
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <input
                  type="text"
                  value={udpdatingTodoSafe.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(setTodoTitleUpdate(e.target.value))
                  }
                  placeholder="Task Name"
                  required
                  className="bg-white/20 text-white placeholder:text-white/60 px-3 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                  autoComplete="off"
                />
                <textarea
                  value={udpdatingTodoSafe.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    dispatch(setTodoDescriptionUpdate(e.target.value))
                  }
                  placeholder="Task Description"
                  rows={4}
                  className="bg-white/20 text-white placeholder:text-white/60 px-3 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                />
                <div className="flex gap-3">
                  <select
                    value={udpdatingTodoSafe.priority}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      dispatch(
                        setTodoPriorityUpdate(e.target.value as todoPriority)
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
                    value={udpdatingTodoSafe.dueDate.slice(0, 10)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch(setTodoDueDateUpdate(e.target.value))
                    }
                    className="bg-white/20 text-white px-3 py-3 rounded-lg outline-none border border-white/20"
                  />
                  <input
                    type="time"
                    value={udpdatingTodoSafe.dueDate.slice(11, 16)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch(setTodoTimeUpdate(e.target.value))
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
            <div className="flex justify-center w-full gap-3 mt-4">
              {!_isNullificationExists && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 w-full text-white rounded-lg hover:bg-green-600 transition"
                >
                  Update
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
