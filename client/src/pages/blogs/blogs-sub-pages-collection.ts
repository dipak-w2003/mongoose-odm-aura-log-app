import type { ISubPagesCollection } from "../todos/todo-sub-pages-collection";
import AllBlogsMainPage from "./all-blogs/all-blogs-main-page";

export const blogsPagesCollectionNode: ISubPagesCollection[] = [
  {
    id: "1-all-blogs",
    childNode: AllBlogsMainPage,
    isActive: false,
    parentName: "blogs"
  }
]
