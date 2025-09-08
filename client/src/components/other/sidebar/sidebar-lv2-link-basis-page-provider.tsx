import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
import { blogsPagesCollectionNode } from "@/pages/blogs/blogs-sub-pages-collection";
import { todoPagesCollectionNode } from "@/pages/todos/todo-sub-pages-collection";
import { notesPagesCollectionNode } from "@/pages/notes/notes-sub-pages-collection";
import { useNavigate } from "react-router-dom";

// Collection hash of sidebar links 2 pages []
const collectionSideBarLv2LinksPagesHash = {
  todos: todoPagesCollectionNode,
  notes: notesPagesCollectionNode,
  blogs: blogsPagesCollectionNode,
} as const;

// 2. Derive a type for the keys ("todos" | "notes" | "blogs")
type ParentKey = keyof typeof collectionSideBarLv2LinksPagesHash;
export interface ISideBarLv2LinkBasisPageProviderProps {
  parentName: ParentKey;
}
const SideBarLv2LinkBasisPageProvider: React.FC<
  ISideBarLv2LinkBasisPageProviderProps
> = ({ parentName }) => {
  const sideBar2LinksArray = useSelector(
    (state: RootState) => state.sidebar2LinkManage
  );
  const navigate = useNavigate();
  // Provide Child
  const provideChild = () => {
    const filterOutSpecificLinks = sideBar2LinksArray.sidebarLinks.find(
      (_) => _.parentName === parentName && _.isActive
    );
    console.log(filterOutSpecificLinks?.url);
    console.log(location.pathname);
    if (filterOutSpecificLinks?.url !== location.pathname) {
      navigate(filterOutSpecificLinks?.url as string);
    }
    const grabChildObj = collectionSideBarLv2LinksPagesHash[parentName].find(
      (_) => _.id === filterOutSpecificLinks?.uniqueName
    );

    if (!grabChildObj) {
      return <p>No side children registered with that</p>;
    }

    const Comp = grabChildObj.childNode;
    return <Comp />;
  };

  return <main>{provideChild()}</main>;
};

export default SideBarLv2LinkBasisPageProvider;

/**
 * @____________________________________________________________
 * @__________________Idea_Architecture_of_this_________________
 * @____________________________________________________________
 * @Concept : Get Sidebar 2 Links Pages
 * @Process_1
 * - Collect all linksArray:sideBar2LinksArray from slice
 * - find/filter out specific {}:IsideBar as;
 * - on the basis of link/parentName ["todos","notes","blogs"] and it
 *   boolean:isActive
 * - const filterOutSpecificLinks = sideBar2LinksArray.sidebarLinks.find(
 *   (_) => _.parentName === parentName && _.isActive);
 *
 *  @process_2
 * - Make hash of parentsName key and value as parentsChildrenPagesCollection
 * - const collectionSideBarLv2LinksPagesHash = {
 * todos: todoPagesCollectionNode,
 * notes: notesPagesCollectionNode,
 * blogs: blogsPagesCollectionNode,
 * } as const;
 * - Derive a type for the keys ("todos" | "notes" | "blogs") : for type safety
 * type ParentKey = keyof typeof collectionSideBarLv2LinksPagesHash;
 *
 * @process_3
 * - Accept parentName as props
 *
 * @process_3
 * - Make a function which will provide links pages on the basis of,
 *   Process sidebarLv2 -> links -> page
 * - Find: collectionSideBarLv2LinksPagesHash[parentName] as ;
 * - * (_)=> _.id === filterOutSpecificLinks?.uniqueName :
 *     compare relation where  collectionSideBarLv2LinksPagesHash.id should be
 *     same as filterOutSpecificLinks.uniqueName
 * - after finding if !exist; throw : JSX: error page
 * - if exists : const Comp = grabChildObj.childNode;  return <Comp />;
 *
 * @process_4
 * - Usage;
 * <ThisComponentName parentName="" />
 * - Note : parentName is typed union so choose as per required
 */
