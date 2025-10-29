import React, { type ReactNode } from "react";
import TodoFilterPanel from "./todo-filter-panel";
interface ITodoPagesWrapperWithFilterPanel {
  children: ReactNode;
}
const TodoPagesWrapperWithFilterPanel: React.FC<
  ITodoPagesWrapperWithFilterPanel
> = ({ children }) => {
  return (
    <main className="min-h-[100vh]  w-full flex flex-col  pr-4 relative rounded overflow-hidden">
      {/* Todo Filter Panel Component */}
      <TodoFilterPanel />
      {/* section : filtered-labels, todos-status and search bars */}
      <section className="lower-section relative top-26 mb-6     ">
        {children}
      </section>
    </main>
  );
};

export default TodoPagesWrapperWithFilterPanel;
