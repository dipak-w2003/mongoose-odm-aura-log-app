import { lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ITodo, todoLifecycle } from "@/lib/store/todos/todos-slice-type";
import {
  deleteAnEntireTodo,
  setActiveTodoId,
} from "@/lib/store/todos/todos-slice";
import type { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import { DateStrToDateKTM } from "@/utils/luxon-module";
import { TodoSubtaskAddACard } from "./todo-subtask-add-a-card";
import type { ITodoSubtasks } from "@/lib/store/todos/todo-subtasks-slice";

// ASSETS
import { triangleCircledSVG } from "@/other/assets/svg/collectionSVG";
import { normalPercentageProvider } from "@/utils/percentage-provider";
// COMPONENTS
const PieChart = lazy(
  () => import("@/components/most-use/circular-progress-bar-pie")
);
const TodoUpperLeftContent = lazy(() => import("./todo-upper-left-card"));
const TodoMiddleContent = lazy(() => import("./todo-middle-content"));
const TodoBottomContents = lazy(() => import("./todo-bottom-content"));
const TodoCardFooter = lazy(() => import("./todo-card-footer"));

// INTERFACE
interface TodoCardProps {
  todo: ITodo;
  isSelected: boolean;
  onToggle: () => void;
  subtasks: ITodoSubtasks[];
}

const TodoCard = ({ todo, isSelected, onToggle, subtasks }: TodoCardProps) => {
  const dispatch: AppDispatch = useDispatch();

  const progressPercentage = (): number => {
    const SPECIFIED_SUBTASK_LIST = subtasks.filter((_) => _.todoId == todo._id);
    const COMPLETED = SPECIFIED_SUBTASK_LIST.filter(
      (st) => st.completionStatus
    ).length;
    // only total from same todoId
    const TOTAL = SPECIFIED_SUBTASK_LIST.length;
    return normalPercentageProvider({ total: TOTAL, perOf: COMPLETED });
  };

  return (
    <div className="group w-full" id={`todo-${todo._id}`}>
      <motion.div
        className={`
        w-full rounded-lg border border-[#022A2A]
        bg-[#034C38] hover:bg-[#104234]
        transition-all duration-200
        p-3 relative
      `}
        animate={
          isSelected
            ? {
                boxShadow: [
                  "3px 3px 8px -2px #fe802c",
                  "3px 3px 14px -2px #ff9c45",
                  "3px 3px 8px -2px #fe802c",
                ],
              }
            : {
                boxShadow: "3px 3px 8px -2px #ffffff",
              }
        }
        transition={{
          duration: 1.6,
          repeat: isSelected ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* TOP SECTION */}
        <article className="w-full flex justify-between items-start border-b border-[#022A2A] pb-3">
          <TodoUpperLeftContent
            id={todo._id}
            lifecycle={todo?.lifecycle as todoLifecycle}
            title={todo.title}
            tags={todo.tags}
            priority={todo.priority}
            date={DateStrToDateKTM(todo.dueDate).formatted}
          />
          {/* pie chart progress in the percent basis of subtask.completionStatus */}
          <PieChart progress={progressPercentage()} label="" />
        </article>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => {
            onToggle();
            dispatch(setActiveTodoId(todo._id));
          }}
          className=" absolute h-[28px] w-[28px] bg-[#111711] rounded-full flex justify-center items-center border border-[#022A2A]
          -bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
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

              {/* Subtask Plus Icon Add & Modal Call */}
              <TodoSubtaskAddACard />
              {/* Todo Card Footer */}
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
      </motion.div>
    </div>
  );
};

export default TodoCard;
