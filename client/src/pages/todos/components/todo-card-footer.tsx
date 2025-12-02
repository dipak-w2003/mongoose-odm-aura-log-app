import Modal from "@/components/most-use/modal";
import { useState } from "react";
import AddMainTodoCard from "./add-main-todo-card";
import TodoModalTabs from "./todo-modal-tabs";
import TodoSubTaskCard from "./todo-subtask-card";

interface TodoCardFooterProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkComplete?: () => void;
}

const TodoCardFooter = ({ onDelete, onMarkComplete }: TodoCardFooterProps) => {
  const [open, setOpen] = useState(false);
  return (
    <footer className="flex justify-end gap-3 mt-3">
      {/* Complete */}
      <button
        onClick={onMarkComplete}
        className="bg-[#FE802C] text-black text-sm px-3 py-1 rounded-md hover:bg-[#fd944a] transition-all"
      >
        Complete
      </button>

      {/* Edit */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#022A2A] border border-[#0dcaa3] text-[#0dcaa3] text-sm px-3 py-1 rounded-md hover:bg-[#034C38] transition-all"
      >
        Edit
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="bg-[#bf3b3b] text-white text-sm px-3 py-1 rounded-md hover:bg-[#d1bd56] transition-all"
      >
        Delete
      </button>

      {/* Modal */}
      <Modal
        isOpen={open}
        // setClose={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <TodoModalTabs
          isOpen={open}
          onClose={() => setOpen(false)}
          tabs={[
            { content: <AddMainTodoCard />, id: "1", label: "Main Todo" },
            { content: <TodoSubTaskCard />, id: "2", label: "Sub Task" },
          ]}
        />
        {/* <AddMainTodoCard /> */}
      </Modal>
    </footer>
  );
};

export default TodoCardFooter;
