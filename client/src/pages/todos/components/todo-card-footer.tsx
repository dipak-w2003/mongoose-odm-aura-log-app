import Modal from "@/components/most-use/modal";
import AddMainTodoCard from "./add-main-todo-card";
import TodoModalTabs from "./todo-modal-tabs";
import TodoTagsCard from "./todo-tags-card";
import {
  setEntireDataUpdatingTodo,
  type IUpdateTodoCollector,
} from "@/lib/store/todos/updating-todos-collector-slice";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setPortalModalClose,
  setPortalModalOpen,
} from "@/lib/store/additionals/portal-modal/portal-modal-slice";

interface TodoCardFooterProps {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkComplete?: () => void;
  todosData: IUpdateTodoCollector;
}

const TodoCardFooter = ({
  id,
  onDelete,
  onMarkComplete,
  todosData,
}: TodoCardFooterProps) => {
  const { isPortalOpen } = useSelector((state: RootState) => state.portalModal);

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
        }}
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
      // setClose={() => setOpen(false)}
      >
        <TodoModalTabs
          title={"Todo Update : " + id}
          isOpen={isPortalOpen}
          onClose={() => dispatch(setPortalModalClose())}
          tabs={[
            { content: <AddMainTodoCard />, id: "1", label: "Main Todo" },
            { content: <TodoTagsCard />, id: "2", label: "Todo Tags" },
            // { content: <TodoSubTaskCard />, id: "3", label: "Todo Subtask" },
          ]}
        />
        {/* <AddMainTodoCard /> */}
      </Modal>
    </footer>
  );
};

export default TodoCardFooter;
