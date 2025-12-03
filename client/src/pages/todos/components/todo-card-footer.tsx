import Modal from "@/components/most-use/modal";
import { useState } from "react";
import AddMainTodoCard from "./add-main-todo-card";
import TodoModalTabs from "./todo-modal-tabs";
import TodoSubTaskCard from "./todo-subtask-card";
import TodoTagsCard from "./todo-tags-card";
import {
  setEntireDataUpdatingTodo,
  type IUpdateTodoCollector,
} from "@/lib/store/todos/updating-todos-collector-slice";
import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";

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
  const [open, setOpen] = useState(false);
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
          setOpen(true);
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
        isOpen={open}
        // setClose={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <TodoModalTabs
          title={"Todo Update : " + id}
          isOpen={open}
          onClose={() => setOpen(false)}
          tabs={[
            { content: <AddMainTodoCard />, id: "1", label: "Main Todo" },
            { content: <TodoTagsCard />, id: "2", label: "Todo Tags" },
            { content: <TodoSubTaskCard />, id: "3", label: "Todo Subtask" },
          ]}
        />
        {/* <AddMainTodoCard /> */}
      </Modal>
    </footer>
  );
};

export default TodoCardFooter;
