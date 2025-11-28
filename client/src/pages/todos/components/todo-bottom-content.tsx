import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchTodoSubtasks,
  SetTodoSubtasksCompletionStatusSingleOne,
  type ITodoSubtasks,
} from "@/lib/store/todos/todo-subtasks-slice";

import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";

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

  const [openCommitBox, setOpenCommitBox] = useState<string | null>(null);

  // Sync data when bucket updates
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

  const toggleCommitBox = (id: string) =>
    setOpenCommitBox((prev) => (prev === id ? null : id));

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

  const handleSave = (subtask: ITodoSubtasks) => {
    const data = subtaskEditState[subtask._id];

    if (!data.completionMessage.trim()) {
      alert("Please enter a commit message.");
      return;
    }

    dispatch(
      SetTodoSubtasksCompletionStatusSingleOne({
        id: subtask._id,
        statusBoolean: true,
      })
    );

    setOpenCommitBox(null);
    dispatch(fetchTodoSubtasks());
  };

  return (
    <motion.div className="flex flex-col gap-3">
      {finalizedSubtasks.map((subtask) => {
        const editState = subtaskEditState[subtask._id];
        const isOpen = openCommitBox === subtask._id;
        if (!editState) return null;

        return (
          <motion.div
            key={subtask._id}
            layout
            className="cursor-pointer bg-[#022A2A] rounded-md border border-[#033c2c] p-3 hover:bg-[#034C38] transition-colors"
            onClick={() => toggleCommitBox(subtask._id)}
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="text-[#FEFEFE]">
                  {subtask.position.toString().padStart(2, "0")})
                </i>
                <span className="text-white font-medium">{subtask.title}</span>
              </div>

              {/* CIRCLE CHECK BUTTON */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <motion.button
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    editState.completionStatus
                      ? "border-[#FE802C] bg-[#FE802C]"
                      : "border-[#888]"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  disabled={editState.completionStatus}
                  onClick={() => {
                    updateSubtaskField(
                      subtask._id,
                      "completionStatus",
                      !editState.completionStatus
                    );

                    dispatch(
                      SetTodoSubtasksCompletionStatusSingleOne({
                        id: subtask._id,
                        statusBoolean: !editState.completionStatus,
                      })
                    );

                    dispatch(fetchTodoSubtasks());
                  }}
                >
                  {editState.completionStatus && (
                    <div className="w-3 h-3 bg-black rounded-full" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* SMOOTH COMMIT BOX */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="commit-box"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
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

                    <button
                      disabled={editState.completionStatus}
                      onClick={() => handleSave(subtask)}
                      className="bg-[#FE802C] text-black text-sm px-3 py-1 rounded-md self-start hover:bg-[#fd944a] transition-all"
                    >
                      {editState.completionStatus ? "Completed" : "Save"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TodoBottomContents;
