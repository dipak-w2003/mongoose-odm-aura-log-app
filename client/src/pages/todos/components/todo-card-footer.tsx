import Modal from "@/components/most-use/modal";
import {
  setEntireDataUpdatingTodo,
  type IUpdateTodoCollector,
} from "@/lib/store/todos/updating-todos-collector-slice";
import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import {
  setPortalModalContent,
  setPortalModalOpen,
} from "@/lib/store/additionals/portal-modal/portal-modal-slice";
import TodoModalContentProvider from "./todo-modal-content-provider";

interface TodoCardFooterProps {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkComplete?: () => void;
  todosData: IUpdateTodoCollector;
}

const TodoCardFooter = ({
  onDelete,
  onMarkComplete,
  todosData,
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
        onClick={() => {
          dispatch(setEntireDataUpdatingTodo(todosData));
          dispatch(setPortalModalOpen());
          dispatch(setPortalModalContent("main-todo-update"));
        }}
        className="bg-[#022A2A] border border-[#0dcaa3] text-[#0dcaa3] text-sm px-3 py-1 rounded-md hover:bg-[#034C38] transition-all
        "
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
      // setClose={() => setOpen(false)}
      >
        <TodoModalContentProvider />
      </Modal>
    </footer>
  );
};

export default TodoCardFooter;
