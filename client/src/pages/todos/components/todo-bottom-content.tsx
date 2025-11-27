import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ITodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";

interface Props {
  bucketSubtasks: ITodoSubtasks[];
  specifiedTodoId: string;
}

const TodoBottomContents = ({ bucketSubtasks, specifiedTodoId }: Props) => {
  const finalizedSubtasks = bucketSubtasks.filter(
    (s) => s.todoId === specifiedTodoId
  );

  const [subtaskEditState, setSubtaskEditState] = useState<
    Record<string, { completionMessage: string; completionStatus: boolean }>
  >(() =>
    finalizedSubtasks.reduce((acc, s) => {
      acc[s.title] = {
        completionMessage: s.completionMessage ?? "",
        completionStatus: s.completionStatus ?? false,
      };
      return acc;
    }, {} as Record<string, { completionMessage: string; completionStatus: boolean }>)
  );

  const [openCommitBox, setOpenCommitBox] = useState<string | null>(null);

  const toggleCommitBox = (title: string) =>
    setOpenCommitBox((prev) => (prev === title ? null : title));

  const updateSubtaskField = (
    title: string,
    field: "completionMessage" | "completionStatus",
    value: string | boolean
  ) => {
    setSubtaskEditState((prev) => ({
      ...prev,
      [title]: { ...prev[title], [field]: value },
    }));
  };

  return (
    <motion.div className="flex flex-col gap-2">
      {finalizedSubtasks.map((subtask) => {
        const editState = subtaskEditState[subtask.title];
        const isOpen = openCommitBox === subtask.title;

        return (
          <motion.div
            key={subtask.title}
            layout
            onClick={() => toggleCommitBox(subtask.title)}
            className="cursor-pointer bg-[#022A2A] rounded-md border border-[#033c2c] p-3 hover:bg-[#034C38] transition-colors"
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="text-[#FEFEFE]">
                  {subtask.position.toString().padStart(2, "0")})
                </i>
                <span className="text-white font-medium">{subtask.title}</span>
              </div>

              <input
                type="checkbox"
                checked={editState.completionStatus}
                onChange={(e) =>
                  updateSubtaskField(
                    subtask.title,
                    "completionStatus",
                    e.target.checked
                  )
                }
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4 accent-[#FE802C]"
              />
            </div>

            {/* COMMIT BOX WITH layout animation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 bg-[#033C3C] border border-[#034C38] rounded-md p-3 flex flex-col gap-2 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label className="text-xs text-[#E1B7B8]">
                    Commit Message
                  </label>
                  <input
                    value={editState.completionMessage}
                    type="text"
                    placeholder="Write your commit message…"
                    onChange={(e) =>
                      updateSubtaskField(
                        subtask.title,
                        "completionMessage",
                        e.target.value
                      )
                    }
                    className="w-full bg-[#022A2A] border border-[#034C38] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#FE802C] transition-all"
                  />

                  <button
                    className="bg-[#FE802C] text-black text-sm px-3 py-1 rounded-md self-start hover:bg-[#fd944a] transition-all"
                    onClick={() => {
                      const allUpdated = Object.entries(subtaskEditState).map(
                        ([title, { completionStatus, completionMessage }]) => ({
                          title,
                          completionStatus,
                          completionMessage,
                        })
                      );
                      console.log("All updated subtasks:", allUpdated);
                      setOpenCommitBox(null);
                    }}
                  >
                    Save
                  </button>
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
