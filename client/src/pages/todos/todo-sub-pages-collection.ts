// pagesCollection.tsx
import type { ISidebarLv2ChildrenUniqueNamesType, ISidebarParentNames } from "@/components/other/sidebar/sidebar.type";
import type React from "react";

import AllTodosMainPage from "./all-todos/all-todos-main-page";
import ProgressTodosMainPage from "./progress-todos/progress-todos-main-page";
import CrucialsTodosMainPage from "./crucials-todos/crucials-todos-main-page";
import ArchivedTodosMainPage from "./archived-todos/archived-todos-main-page";
import AddTodosMainPage from "./add-todo/add-todo-main-page";

// ---------------- Page Collection Types ----------------
export interface ISubPagesCollection {
  id: ISidebarLv2ChildrenUniqueNamesType; // type-safe link to sidebar uniqueName
  childNode: React.FC; // store the component type, not JSX
  isActive: boolean;
  parentName: ISidebarParentNames
}

// ---------------- Todo Pages ----------------
export const todoPagesCollectionNode: ISubPagesCollection[] = [
  {
    id: "1-all-todos",
    childNode: AllTodosMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "2-progress-todos",
    childNode: ProgressTodosMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "3-crucial-todos",
    childNode: CrucialsTodosMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "4-archived-todos",
    childNode: ArchivedTodosMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "5-add-todo",
    childNode: AddTodosMainPage,
    isActive: false,
    parentName: "todos"
  }
];
