import type { AppDispatch, RootState } from "@/lib/store/store";
import {
  deleteTodoSubTaskTemp,
  setTodoSubTaskTemp,
} from "@/lib/store/todos/temp-todos-collector-slice";
import { multiplySVG, infoSVG } from "@/other/assets/svg/collectionSVG";
import { useState, useRef, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const TodoSubTaskCard = () => {
  const { todo } = useSelector((state: RootState) => state.tempTodoCollector);
  const dispatch: AppDispatch = useDispatch();
  const [subtask, setSubtask] = useState<string>("");

  const addSubtasks = () => {
    const SUBTASK_LIST_LIMIT = 6;
    const tempArray = todo?.subtask;
    if (!tempArray) return;

    const SUBTASKLIST_LEN = tempArray.length;
    const conditions =
      subtask.length > 4 && SUBTASKLIST_LEN < SUBTASK_LIST_LIMIT;

    if (conditions) {
      dispatch(setTodoSubTaskTemp(subtask));
      setSubtask("");
    }
  };

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDrop = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) return;

    const updated = [...(todo.subtask || [])];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);

    updated.forEach(() => dispatch(deleteTodoSubTaskTemp({ _idx: 0 })));
    updated.forEach((t) => dispatch(setTodoSubTaskTemp(t)));

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <section className="flex flex-col gap-4 w-full mt-6">
      <header className="text-xl font-bold text-white">
        Steps / Sub Tasks
      </header>

      {/* Subtask List */}
      <div className="flex flex-wrap gap-3 max-h-[50vh] overflow-y-auto w-full">
        {todo.subtask && todo.subtask.length > 0 ? (
          <AnimatePresence>
            {todo.subtask.map((item, idx) => (
              <motion.div
                key={`subtask:${idx}:${item}`}
                draggable
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onDragStart={() => (dragItem.current = idx)}
                onDragEnter={() => (dragOverItem.current = idx)}
                onDragEnd={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                whileDrag={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2 cursor-grab select-none hover:scale-[1.02] transition-transform"
              >
                <span className="w-6 h-6 flex items-center justify-center text-white font-bold rounded-full bg-white/20">
                  {idx + 1}
                </span>
                <p className="text-white text-sm">{item}</p>
                <img
                  onClick={() => dispatch(deleteTodoSubTaskTemp({ _idx: idx }))}
                  src={multiplySVG}
                  className="h-4 cursor-pointer hover:scale-110 transition-transform"
                  alt="delete"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="w-full flex justify-center items-center text-white/60 h-16">
            OPTIONAL: Sub Task List!
          </div>
        )}
      </div>

      {/* Add Subtask Input */}
      {todo.subtask?.length !== 6 && (
        <div className="flex gap-3 w-full mt-3">
          <div className="relative w-full">
            <input
              id="add-subtask"
              name="add-subtask"
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubtask(e.target.value)
              }
              value={subtask}
              placeholder="Sub Task"
              className="w-full px-3 py-3 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="button"
              title="info"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex justify-center items-center"
            >
              <img
                src={infoSVG}
                alt=""
                className="h-5 hover:scale-105 transition"
              />
            </button>
          </div>
          <button
            onClick={addSubtasks}
            type="button"
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
          >
            Add Subtask
          </button>
        </div>
      )}
    </section>
  );
};

export default TodoSubTaskCard;
