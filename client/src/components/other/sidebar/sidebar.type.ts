import {
  circlePlayButtonSVG,
  conflictSVG,
  doubleRoundedTickSVG,
  favoritesSVG,
  globeSVG,
  iconCarrierSVG,
  positiveDynamic,
  trashSVG,
  tripleRoundedDotsSVG
} from "@/other/assets/svg/collectionSVG"

/**@SidebarParent Name Collection */
export type ISidebarParentNames = "todos" | "notes" | "blogs" | "settings"
export const ISidebarParentNamesCollection = ["todos", "notes", "blogs", "settings"]

/**@ISideBar Interface Model */
export interface ISideBar {
  id: number
  name: string
  img: string
  isActive: boolean
  uniqueName: string,
  parentName: ISidebarParentNames
  url: string
}
/**@Todos Links */
export const sidebarLv2Todos: ISideBar[] = [
  {
    id: 1, name: "All todos", img: circlePlayButtonSVG, isActive: true, parentName: "todos", uniqueName: "1-all-todos",
    url: "/user/todos/all-todos"
  },
  {
    id: 2, name: "Archived", img: favoritesSVG, isActive: false, parentName: "todos",
    uniqueName: "4-archived-todos",
    url: "/user/todos/archived-todos"
  },
  {
    id: 3, name: "Crucials", img: conflictSVG, isActive: false, parentName: "todos",
    uniqueName: "3-crucial-todos",
    url: "/user/todos/crucial-todos"
  },
  {
    id: 4, name: "Completed", img: doubleRoundedTickSVG, isActive: false, parentName: "todos",
    uniqueName: "4-completed-todos",
    url: "/user/todos/completed-todos"
  },
  {
    id: 5, name: "Pending", img: tripleRoundedDotsSVG, isActive: false, parentName: "todos",
    uniqueName: "5-pending-todos",
    url: "/user/todos/pending-todos"
  },
  {
    id: 6, name: "Progress", img: positiveDynamic, isActive: false, parentName: "todos",
    uniqueName: "6-progress-todos",
    url: "/user/todos/progress-todos"
  },
  {
    id: 7, name: "Trash", img: trashSVG, isActive: false, parentName: "todos",
    uniqueName: "7-trash-todo",
    url: "/user/todos/trashed-todos"
  },

  {
    id: 8, name: "Add Todo", img: iconCarrierSVG, isActive: false, parentName: "todos",
    uniqueName: "8-add-todo",
    url: "/user/todos/add-todo"
  }
]

/**@Notes sidebar links */
export const sidebarLv2Notes: ISideBar[] = [
  {
    id: 1, name: "All Notes", img: circlePlayButtonSVG, isActive: true, parentName: "notes",
    uniqueName: "1-all-notes",
    url: "/user/notes/all-notes"
  }
]

/**@Blogs Sidebar links */
export const sidebarLv2Blogs: ISideBar[] = [
  {
    id: 1, name: "All Blogs", img: globeSVG, isActive: true, parentName: "blogs",
    uniqueName: "1-all-blogs",
    url: "/user/blogs/all-blogs"
  }
]



/**@Collection */
export const sidebarLv2: ISideBar[] = [
  ...sidebarLv2Todos,
  ...sidebarLv2Notes,
  ...sidebarLv2Blogs
]

/**
 * @UNION 
 * types of sidebar childrens uniquename for in future showing relation and so on operation can be token
 * Manually add list of side
   */
export const sidebarLv2UniqueNamesArray = [
  "1-all-todos",
  "2-progress-todos",
  "3-crucial-todos",
  "4-archived-todos",
  "5-add-todo",
  "1-all-notes",
  "1-all-blogs"
] as const;

export type ISidebarLv2ChildrenUniqueNamesType = typeof sidebarLv2UniqueNamesArray[number];


/**@Other Functions */

/*@FindOutParent
 * Findout our second level sidebar 2 parent name like sidebar1:todo and sidebar2:Task Master 
 * 
 * This Idea is simply header name findout on the basis of parentnames["todos","notes","blogs"] for sidebar 2
 * 
 * This Idea Can be dropped may with sidebarSlice
 */
const parentCollection: { name: string, sname: string, sparent: ISidebarParentNames }[] = [

  {
    name: "Todo Manager",
    sname: "TM",
    sparent: "todos"
  },
  {
    name: "Notes",
    sname: "Nts",
    sparent: "notes"

  },
  {
    name: "Blogs MDX",
    sname: "MDX",
    sparent: "blogs"
  }

]
export const whichSideBarParentHeaderFindSB2 = (parent: any): { name: string, sname: string, } | null => {
  const index = parentCollection.findIndex(_ => _.sparent === parent)
  if (index !== 1 && !parent) return null
  return parentCollection[index]
}

