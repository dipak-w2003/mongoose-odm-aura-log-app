import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";

import TodoModalTabs from "./todo-modal-tabs";
import {
  setPortalModalClose,
  type ModalContentUnion,
} from "@/lib/store/additionals/portal-modal/portal-modal-slice";

import AddMainTodoCard from "./add-main-todo-card";
import TodoTagsCard from "./todo-tags-card";
import Modal from "@/components/most-use/modal";
import { TodoSubtaskAddACardForm } from "./todo-subtask-add-a-card";

const TodoModalContentProvider = () => {
  const { modalContent, isPortalOpen } = useSelector(
    (state: RootState) => state.portalModal
  );
  const { todo: updatingTodo } = useSelector(
    (state: RootState) => state.updateTodoCollector
  );
  const ACTIVE_TODO_ID = useSelector(
    (state: RootState) => state.todos.activeTodoId
  );

  const dispatch: AppDispatch = useDispatch();

  // If modal is closed → return nothing
  if (!isPortalOpen) return null;

  // The content INSIDE the modal (switch only content, not modal itself)
  const renderContent = () => {
    switch (modalContent as ModalContentUnion) {
      case "main-todo-update":
        return (
          <TodoModalTabs
            title={"Todo Update : " + updatingTodo._id}
            isOpen={isPortalOpen}
            onClose={() => dispatch(setPortalModalClose())}
            tabs={[
              { content: <AddMainTodoCard />, id: "1", label: "Main Todo" },
              { content: <TodoTagsCard />, id: "2", label: "Todo Tags" },
            ]}
          />
        );

      case "todo-a-subtask-update":
        return (
          <TodoModalTabs
            title={"Subtask +"}
            isOpen={isPortalOpen}
            onClose={() => dispatch(setPortalModalClose())}
            tabs={[
              {
                content: <TodoSubtaskAddACardForm />,
                id: "1",
                label: "Linked : " + ACTIVE_TODO_ID,
              },
            ]}
          />
        );

      default:
        return <p>Nothing to show</p>;
    }
  };

  return <Modal>{renderContent()}</Modal>;
};

export default TodoModalContentProvider;
