import { motion } from "framer-motion";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setPortalModalContent,
  setPortalModalOpen,
} from "@/lib/store/additionals/portal-modal/portal-modal-slice";
import TodoModalContentProvider from "./todo-modal-content-provider";
import { useState, type FormEvent } from "react";
import { addTodoSubtask } from "@/lib/store/todos/todo-subtasks-slice";

export const TodoSubtaskAddACard = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <motion.div
        onClick={() => {
          dispatch(setPortalModalContent("todo-a-subtask-update"));
          dispatch(setPortalModalOpen());
        }}
        layout
        className={`cursor-pointer mt-3 rounded-md  p-2  transition-colors text-center  border-dashed  g-[#022A2A] border border-[#0dcaa3] text-[#0dcaa3]`}
      >
        Add +
      </motion.div>
      <TodoModalContentProvider />
    </>
  );
};

//  TodoSubtaskAddACardForm
export interface TodoSubtaskAddACardFormProps {
  todoId: string;
  title: string;
  position?: number;
}

export function TodoSubtaskAddACardForm() {
  const { activeTodoId } = useSelector((state: RootState) => state.todos);
  const { subtasks } = useSelector((state: RootState) => state.todoSubtask);
  const [subtaskForm, setSubtaskForm] = useState<
    Partial<TodoSubtaskAddACardFormProps>
  >({});

  const dispatch: AppDispatch = useDispatch();
  const toggleCompletion = () => {};
  const handleChange = (
    field: keyof TodoSubtaskAddACardFormProps,
    value: any
  ) => {
    setSubtaskForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const certainTodoSubtaskLength = subtasks.filter(
      (_) => _.todoId == activeTodoId
    );

    dispatch(
      addTodoSubtask({
        certainSubtaskLength: certainTodoSubtaskLength.length,
        data: {
          title: subtaskForm?.title ?? "N/A",
          todoId: activeTodoId,
        },
      })
    );
    // console.log("FINAL SUBTASK DATA:", subtaskForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-5"
    >
      <input
        type="text"
        placeholder="Subtask Name ....."
        required
        onChange={(e) => handleChange("title", e.target.value)}
        className="w-full bg-white/20 text-white placeholder:text-white/60 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
        autoComplete="off"
      />

      {/* Status Checking */}
      <div
        className="flex gap-3 cursor-not-allowed bg-red-900 w-fit rounded p-2"
        title="Under Development"
      >
        <motion.button
          disabled
          type="button"
          onClick={toggleCompletion}
          id="check-the-btn"
          className="w-6 h-6 rounded-full flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: false
                ? "drop-shadow(0 4px 6px rgba(254, 128, 44, 0.5))"
                : "none",
              transition: "filter 0.2s ease-in-out",
            }}
          >
            <path
              d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
              stroke={false ? "#FE802C" : "transparent"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>

            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#FE802C"
              strokeWidth="2"
            ></circle>
          </svg>
        </motion.button>

        <label htmlFor="check-the-btn" className="text-white font-bold">
          Completion
        </label>
      </div>

      {/* Completion Message */}
      {false && (
        <textarea
          placeholder="Message..."
          required
          // onChange={(e) => handleChange("completionMessage", e.target.value)}
          className="w-full bg-white/20 text-white placeholder:text-white/60 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
          autoComplete="off"
        />
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 w-1/2 text-white rounded-lg hover:bg-green-600 transition"
      >
        Add
      </button>
    </form>
  );
}
