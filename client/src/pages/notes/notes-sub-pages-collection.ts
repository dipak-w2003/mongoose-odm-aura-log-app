import type { ISubPagesCollection } from "../todos/todo-sub-pages-collection";
import AllNotesMainPage from "./all-notes/all-notes-main-page";

export const notesPagesCollectionNode: ISubPagesCollection[] = [
  {
    id: "1-all-notes",
    childNode: AllNotesMainPage,
    isActive: false,
    parentName: "blogs"
  }
]
