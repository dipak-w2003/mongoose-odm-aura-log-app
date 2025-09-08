// pagesCollection.tsx
import type { ISidebarLv2ChildrenUniqueNamesType, ISidebarParentNames } from "@/components/other/sidebar/sidebar.type";
import type React from "react";

import AllTaskMainPage from "./all-task/all-task-main-page";
import ProgressTaskMainPage from "./progress-task/progress-task-main-page";
import CrucialsTaskMainPage from "./crucials-task/crucials-task-main-page";
import ArchivedTaskMainPage from "./archived-task/archived-task-main-page";
import AddTaskMainPage from "./add-task/add-task-main-page";

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
    id: "1-all-task",
    childNode: AllTaskMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "2-progress-task",
    childNode: ProgressTaskMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "3-crucial-task",
    childNode: CrucialsTaskMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "4-archived-task",
    childNode: ArchivedTaskMainPage,
    isActive: false,
    parentName: "todos"
  },
  {
    id: "5-add-task",
    childNode: AddTaskMainPage,
    isActive: false,
    parentName: "todos"
  }
];
