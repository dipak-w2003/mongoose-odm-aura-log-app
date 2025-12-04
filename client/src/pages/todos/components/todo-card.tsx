import { lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ITodo } from "@/lib/store/todos/todos-slice-type";
import { triangleCircledSVG } from "@/other/assets/svg/collectionSVG";
import { deleteAnEntireTodo } from "@/lib/store/todos/todos-slice";
import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";

const PieChart = lazy(
  () => import("@/components/most-use/circular-progress-bar-pie")
);
const TodoUpperLeftContent = lazy(() => import("./todo-upper-left-card"));
const TodoMiddleContent = lazy(() => import("./todo-middle-content"));
const TodoBottomContents = lazy(() => import("./todo-bottom-content"));
const TodoCardFooter = lazy(() => import("./todo-card-footer"));

interface TodoCardProps {
  todo: ITodo;
  isSelected: boolean;
  onToggle: () => void;
  subtasks: any[];
}

const TodoCard = ({ todo, isSelected, onToggle, subtasks }: TodoCardProps) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="group w-full">
      <div
        className={`
          w-full rounded-lg border border-[#022A2A]
          bg-[#034C38] hover:bg-[#104234]
          transition-all duration-200
          p-3 relative shadow-[3px_3px_8px_-2px_#ffffff]
          ${isSelected ? "!shadow-[3px_3px_8px_-2px_#fe802c]" : ""}
        `}
      >
        {/* TOP SECTION */}
        <article className="w-full flex justify-between items-start border-b border-[#022A2A] pb-3">
          <TodoUpperLeftContent
            title={todo.title}
            tags={todo.tags}
            priority={todo.priority}
            date={todo.dueDate.split("T")[0].split("-").join(" / ")}
          />
          {/* pie chart progress in the percent basis of subtask.completionStatus */}
          <PieChart
            progress={Math.floor(
              (subtasks.filter((st) => st.completionStatus && st.status)
                .length /
                subtasks.length) *
                100
            )}
            label=""
          />
        </article>

        {/* TOGGLE BUTTON */}
        <button
          onClick={onToggle}
          className="
            absolute h-[28px] w-[28px] 
            bg-[#111711] rounded-full 
            flex justify-center items-center
            border border-[#022A2A]
            -bottom-4 left-1/2 -translate-x-1/2
          "
        >
          <img
            src={triangleCircledSVG}
            className={`h-full w-full transition-transform ${
              isSelected ? "rotate-0" : "rotate-180"
            } border border-[#FE802C] rounded-full`}
          />
        </button>

        {/* MIDDLE */}
        <TodoMiddleContent desc={todo.description} />

        {/* BOTTOM SUBTASKS + FOOTER WITH ANIMATION */}
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <TodoBottomContents
                bucketSubtasks={subtasks}
                specifiedTodoId={todo._id}
              />
              <TodoCardFooter
                todosData={{ ...todo, subtask: subtasks }}
                id={todo._id}
                onMarkComplete={() =>
                  console.log(`Mark complete: ${todo.title}`)
                }
                onDelete={() => dispatch(deleteAnEntireTodo(todo._id))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoCard;
