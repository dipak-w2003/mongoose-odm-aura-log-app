import type { AppDispatch } from "@/lib/store/store";
import { fetchTodos } from "@/lib/store/todos/todos-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface TodoCardFooterProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkComplete?: () => void;
}

const TodoCardFooter = ({
  onEdit,
  onDelete,
  onMarkComplete,
}: TodoCardFooterProps) => {
  const dispatch: AppDispatch = useDispatch();

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
        onClick={onEdit}
        className="bg-[#022A2A] border border-[#0dcaa3] text-[#0dcaa3] text-sm px-3 py-1 rounded-md hover:bg-[#034C38] transition-all"
      >
        Edit
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="bg-[#bf3b3b] text-white text-sm px-3 py-1 rounded-md hover:bg-[#d15656] transition-all"
      >
        Delete
      </button>
    </footer>
  );
};

export default TodoCardFooter;
