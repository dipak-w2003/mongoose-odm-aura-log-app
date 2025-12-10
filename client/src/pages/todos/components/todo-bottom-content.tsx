import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SetTodoSubtasksCompletionStatusAndMessageSingleOne,
  SetTodoSubtasksCompletionStatusSingleOne,
  type ITodoSubtasks,
} from "@/lib/store/todos/todo-subtasks-slice";

import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import { DateStrToDateKTM } from "@/utils/luxon-module";

type SubtaskEditState = Record<
  string,
  {
    completionMessage: string;
    completionStatus: boolean;
  }
>;

interface Props {
  bucketSubtasks: ITodoSubtasks[];
  specifiedTodoId: string;
}

const TodoBottomContents = ({ bucketSubtasks, specifiedTodoId }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const finalizedSubtasks = bucketSubtasks.filter(
    (s) => s.todoId === specifiedTodoId
  );

  const [subtaskEditState, setSubtaskEditState] = useState<SubtaskEditState>(
    {}
  );

  const [openCommitBoxes, setOpenCommitBoxes] = useState<Set<string>>(
    new Set()
  );

  // New: track modal state
  const [modalData, setModalData] = useState<{
    subtaskId: string;
    completionMessage: string;
  } | null>(null);

  useEffect(() => {
    const nextState: SubtaskEditState = finalizedSubtasks.reduce((acc, s) => {
      acc[s._id] = {
        completionMessage: s.completionMessage ?? "",
        completionStatus: s.completionStatus ?? false,
      };
      return acc;
    }, {} as SubtaskEditState);

    setSubtaskEditState(nextState);
  }, [bucketSubtasks]);

  const toggleCommitBox = (id: string) => {
    setOpenCommitBoxes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Update Subtask Field
  const updateSubtaskField = (
    id: string,
    field: "completionMessage" | "completionStatus",
    value: string | boolean
  ) => {
    setSubtaskEditState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Trigger modal instead of saving immediately
  const handleSaveClick = (subtask: ITodoSubtasks) => {
    const data = subtaskEditState[subtask._id];
    if (data.completionMessage.length > 0 && data.completionMessage == "N/A") {
      alert("Provide Something Completion Message !");
      return;
    }
    if (!data.completionMessage.trim()) {
      alert("Please enter a commit message.");
      return;
    }

    setModalData({
      subtaskId: subtask._id,
      completionMessage: data.completionMessage,
    });
  };

  // Confirm save in modal
  const confirmSave = () => {
    if (!modalData) return;
    const { subtaskId } = modalData;

    updateSubtaskField(subtaskId, "completionStatus", true);
    const certainConfirmingData = subtaskEditState[subtaskId];

    dispatch(
      SetTodoSubtasksCompletionStatusAndMessageSingleOne({
        completionMessage: certainConfirmingData.completionMessage,
        id: subtaskId,
      })
    );

    // dispatch(fetchTodoSubtasks());

    // Close modal & commit box
    setModalData(null);
    setOpenCommitBoxes((prev) => {
      const next = new Set(prev);
      next.delete(subtaskId);
      return next;
    });
  };

  const cancelSave = () => setModalData(null);

  return (
    <motion.div className="flex flex-col gap-3 border-t border-t-[#022A2A]">
      <header className="mt-2">Sub Task,</header>
      {finalizedSubtasks.map((subtask) => {
        const editState = subtaskEditState[subtask._id];
        const isOpen = openCommitBoxes.has(subtask._id);
        if (!editState) return null;

        return (
          <motion.div
            key={subtask._id}
            layout
            className={`cursor-pointer bg-[#022A2A] rounded-md border border-[#033c2c] p-3 hover:bg-[#034C38] transition-colors`}
            onClick={() => toggleCommitBox(subtask._id)}
          >
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <i className="text-[#FEFEFE]">
                  {subtask.position.toString().padStart(2, "0")})
                </i>
                <span className="text-white font-medium">{subtask.title}</span>
              </div>

              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <motion.button
                  className={`w-6 h-6 rounded-full flex items-center justify-center cursor-not-allowed`}
                  whileTap={{ scale: 0.9 }}
                  // by default, we cannot completion tick:input to be disabled & so on the clickEvent:functions()
                  disabled
                  onClick={() => {
                    const newStatus = !editState.completionStatus;
                    updateSubtaskField(
                      subtask._id,
                      "completionStatus",
                      newStatus
                    );

                    dispatch(
                      SetTodoSubtasksCompletionStatusSingleOne({
                        id: subtask._id,
                        statusBoolean: newStatus,
                      })
                    );

                    // dispatch(fetchTodoSubtasks());
                  }}
                >
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      filter: editState.completionStatus
                        ? "drop-shadow(0 4px 6px rgba(254, 128, 44, 0.5))"
                        : "none",
                      transition: "filter 0.2s ease-in-out",
                    }}
                  >
                    <path
                      d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
                      stroke={
                        editState.completionStatus ? "#FE802C" : "transparent"
                      }
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke={"#FE802C"}
                      strokeWidth="2"
                    ></circle>
                  </svg>
                </motion.button>
              </div>

              {/* completed date */}
              {!isOpen && subtask.completionStatus && (
                <h1 className="absolute right-10 text-xs italic text-gray-400">
                  {DateStrToDateKTM(String(subtask.updatedAt)).formatted}
                </h1>
              )}
            </div>

            {/* Animate Presence */}
            {/* Toggled Commit Box Message */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={`commit-box-${subtask._id}`}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mt-3 bg-[#033C3C] border border-[#034C38] rounded-md p-3 flex flex-col gap-2">
                    <label className="text-xs text-[#E1B7B8]">
                      Commit Message
                    </label>

                    <input
                      disabled={editState.completionStatus}
                      value={editState.completionMessage}
                      onChange={(e) =>
                        updateSubtaskField(
                          subtask._id,
                          "completionMessage",
                          e.target.value
                        )
                      }
                      type="text"
                      placeholder="Write your commit message…"
                      className="w-full bg-[#022A2A] border border-[#034C38] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#FE802C] transition-all"
                    />

                    {/* Button Actions */}
                    <div className="flex gap-4">
                      <button
                        disabled={editState.completionStatus}
                        onClick={() => handleSaveClick(subtask)}
                        className="bg-[#FE802C] text-black text-sm px-3 py-1 rounded-md self-start hover:bg-[#fd944a] transition-all"
                      >
                        {editState.completionStatus ? "Completed" : "Save"}
                      </button>
                      {editState.completionStatus && (
                        <button
                          onClick={() => alert("Single Subtask Update")}
                          className="bg-[#022A2A] border border-[#0dcaa3] text-[#0dcaa3] text-sm px-3 py-1 rounded-md hover:bg-[#034C38] transition-all"
                        >
                          Update !
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            key="confirm-modal"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#022A2A] p-6 rounded-md border border-[#034C38] w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <p className="text-white mb-4 text-center">
                Are you sure you want to save this commit?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelSave}
                  className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSave}
                  className="px-4 py-2 rounded-md bg-[#FE802C] hover:bg-[#fd944a] text-black transition-all"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoBottomContents;
