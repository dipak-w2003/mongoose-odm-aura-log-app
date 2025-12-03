import { useState, useRef, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store/store";

import { multiplySVG, infoSVG } from "@/other/assets/svg/collectionSVG";

import { motion, AnimatePresence } from "framer-motion";
import {
  deleteTodoSubTaskUpdate,
  setTodoSubTaskUpdate,
} from "@/lib/store/todos/updating-todos-collector-slice";
import type { ITodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";

const MAX_SUBTASKS = 6;

export default function TodoSubTaskCard() {
  const { todo } = useSelector((state: RootState) => state.updateTodoCollector);
  const SUBTASK_LIST = todo?.subtask || [];
  const finalizedSubtasks = SUBTASK_LIST.filter((s) => s.todoId === todo._id);

  const dispatch: AppDispatch = useDispatch();

  // Initialize subtask with minimal required fields
  const [subtask, setSubtask] = useState<Partial<ITodoSubtasks>>({
    title: "",
    todoId: todo?._id || "",
  });

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // -------------------------------
  // ⭐ Add Subtask
  // -------------------------------
  const addSubtasks = () => {
    if (!subtask.title || subtask.title.trim().length < 5 || !todo) return;

    const newSubtask: ITodoSubtasks = {
      _id: crypto.randomUUID(),
      todoId: todo._id,
      title: subtask.title.trim(),
      status: "pending",
      position: SUBTASK_LIST.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completionStatus: false,
    };

    dispatch(setTodoSubTaskUpdate(newSubtask));

    // Reset input
    setSubtask({ title: "", todoId: todo._id });
  };

  // -------------------------------
  // ⭐ Drag + Drop Sorting
  // -------------------------------
  const handleDrop = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;

    if (from === null || to === null || from === to) return;

    const arr = [...SUBTASK_LIST];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);

    // Clear all subtasks safely
    arr.forEach((_, index) =>
      dispatch(deleteTodoSubTaskUpdate({ _idx: index }))
    );
    arr.forEach((item) => dispatch(setTodoSubTaskUpdate(item)));

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <section className="flex flex-col gap-5 w-full mt-6">
      {/* TITLE */}
      <header className="text-xl font-bold text-white tracking-wide">
        Steps / Sub Tasks
      </header>

      {/* SUBTASK LIST */}
      <div className="flex flex-wrap gap-3 max-h-[45vh] overflow-y-auto w-full pr-1">
        {finalizedSubtasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {finalizedSubtasks.map((item, idx) => (
              <motion.div
                key={item._id}
                draggable
                layout
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onDragStart={() => (dragItem.current = idx)}
                onDragEnter={() => (dragOverItem.current = idx)}
                onDragEnd={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                whileDrag={{ scale: 1.05 }}
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 cursor-grab select-none transition-transform hover:scale-[1.02]"
              >
                <span className="w-6 h-6 flex items-center justify-center text-white text-xs font-semibold rounded-full bg-white/20">
                  {idx + 1}
                </span>

                <p className="text-white text-sm flex-1">{item.title}</p>

                <img
                  src={multiplySVG}
                  onClick={() =>
                    dispatch(deleteTodoSubTaskUpdate({ _idx: idx }))
                  }
                  className="h-4 opacity-70 group-hover:opacity-100 cursor-pointer hover:scale-110 transition"
                  alt="delete"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="w-full text-center text-white/60 py-5">
            OPTIONAL: Add sub tasks.
          </div>
        )}
      </div>

      {/* ADD SUBTASK INPUT */}
      {SUBTASK_LIST.length < MAX_SUBTASKS && (
        <div className="flex gap-3 w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={subtask.title || ""}
              placeholder="Add Subtask (min 5 chars)"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubtask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30"
            />

            {/* INFO ICON */}
            <button
              type="button"
              title="info"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <img
                src={infoSVG}
                className="h-5 opacity-80 hover:opacity-100 transition"
                alt="info"
              />
            </button>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={addSubtasks}
            type="button"
            className="px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 active:scale-95 transition text-white font-medium"
          >
            Add+
          </button>
        </div>
      )}
    </section>
  );
}
