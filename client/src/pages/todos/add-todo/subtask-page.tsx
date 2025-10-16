import type { AppDispatch, RootState } from "@/lib/store/store";
import {
  deleteTodoSubTaskTemp,
  setTodoSubTaskTemp,
} from "@/lib/store/todos/temp-todos-collector-slice";
import { multiplySVG, infoSVG } from "@/other/assets/svg/collectionSVG";
import { useState, useRef, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

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
      subtask.length > 4 && SUBTASKLIST_LEN < SUBTASK_LIST_LIMIT;

    if (conditions) {
      dispatch(setTodoSubTaskTemp(subtask));
      setSubtask("");
    }
  };

  // ================== DRAG & SUBTASK FUNCTIONALITY ==================

  /**
   * @comments
   * Ref to store index of item being dragged
   *  - dragItem.current = index of the subtask being dragged
   *  - Initialized as null when nothing is being dragged
   */

  /**
   *  @comments
   * Ref to store index of item currently hovered over during drag
   *  - dragOverItem.current = index of subtask currently under the cursor
   *  - Used to determine where the dragged item should be dropped
   */

  /** @comments Function to handle adding a new subtask to the list
   *  - Validates length of subtask (> 4 characters)
   *  - Ensures total subtasks do not exceed SUBTASK_LIST_LIMIT
   *  - Dispatches action to Redux to add subtask
   *  - Resets input field after addition
   */
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  /**
   * @comments
   * Function to handle the drop of a dragged subtask
   *  - Retrieves the source index (dragItem.current) and target index (dragOverItem.current)
   *  - Exits if indices are null or equal (no move)
   *  - Copies current subtask array to avoid mutating Redux state directly
   *  - Removes the dragged item from its original position using splice
   *  - Inserts it at the target position using splice again
   *  - Clears all subtasks in Redux and re-adds them in the new order
   *  - Resets drag refs
   */
  const handleDrop = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) return;

    /** @comments Create a shallow copy of current subtasks */
    const updated = [...(todo.subtask || [])];

    /** @comments Remove the dragged subtask */
    const [moved] = updated.splice(from, 1);

    /** @comments Insert the dragged subtask at the target index */
    updated.splice(to, 0, moved);

    /** @comments Reset the Redux list by deleting all subtasks first */
    updated.forEach(() => dispatch(deleteTodoSubTaskTemp({ _idx: 0 })));

    /** @comments Re-add subtasks in the new order to Redux */
    updated.forEach((t) => dispatch(setTodoSubTaskTemp(t)));

    /** @comments Reset drag refs for next drag operation */
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <section className="flex flex-col gap-3 items-end w-full mt-6 mr-2 transition-all duration-100">
      <header className="text-xl ml-3 font-extrabold self-start">
        Steps Sub Tasks
      </header>

      {/* Sub Task List */}
      <div className="lower-section-subtask-list w-[90%] flex gap-3 items-start justify-start max-h-[50vh] min-h-fit   flex-wrap transition-all scrollbar-none ">
        {todo.subtask && todo.subtask.length > 0 ? (
          <AnimatePresence>
            {todo.subtask.map((item, idx) => (
              <motion.span
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
                className="pr-3 gap-1 w-fit bg-[#1D271D] min-h-[50px] h-[50px] rounded inline-flex border-2 items-center border-[#293829] cursor-grab select-none transition-transform duration-150 hover:scale-[1.01]"
              >
                <p className="ml-3 h-[30px] w-[30px] rounded-full flex justify-center items-center border-3 border-[#293829] text-sm">
                  {idx + 1}
                </p>
                <h3 className="text-sm ml-3">{item}</h3>

                <img
                  onClick={() => dispatch(deleteTodoSubTaskTemp({ _idx: idx }))}
                  src={multiplySVG}
                  className="h-4 ml-2 rounded cursor-pointer hover:scale-110 transition-transform"
                  alt="delete"
                />
              </motion.span>
            ))}
          </AnimatePresence>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p>OPTIONAL : Sub Task List!</p>
          </div>
        )}
      </div>

      {/* Add Subtask Input */}
      {todo.subtask?.length !== 6 && (
        <div className="lower-section-subtask-add-list flex gap-3 w-[90%]">
          <span className="w-[90%] relative">
            <input
              id="add-subtask"
              name="add-subtask"
              type="text"
              onChange={(_: ChangeEvent<HTMLInputElement>) =>
                setSubtask(_.target.value)
              }
              className="bg-[#1D271D] w-full px-3 py-3 outline-[#293829] focus:outline-3 border-0 rounded placeholder:text-sm text-sm"
              placeholder="Sub Task"
              autoComplete="off"
              value={subtask}
            />
            <button
              type="button"
              className="absolute right-2 h-full cursor-pointer "
              title="info"
            >
              <img src={infoSVG} className="h-5  hover:scale-[1.04]" alt="" />
            </button>
          </span>
          <button
            onClick={addSubtasks}
            type="button"
            className="cursor-pointer px-4 py-2 w-[200px] rounded text-black bg-[rgba(41,224,41,0.59)] hover:bg-[rgba(41,224,41,0.8)] transition-all"
          >
            Add Subtask
          </button>
        </div>
      )}
    </section>
  );
};

export default SubTaskPage;
