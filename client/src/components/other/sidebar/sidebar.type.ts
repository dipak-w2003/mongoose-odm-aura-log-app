import {
  circlePlayButtonSVG,
  conflictSVG,
  favoritesSVG,
  globeSVG,
  plusSVG,
  positiveDynamic
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
    id: 1, name: "All task", img: circlePlayButtonSVG, isActive: true, parentName: "todos", uniqueName: "1-all-task",
    url: "/user/todos/all-task"
  },
  {
    id: 2, name: "Progress", img: positiveDynamic, isActive: false, parentName: "todos",
    uniqueName: "2-progress-task",
    url: "/user/todos/progress-task"
  },
  {
    id: 3, name: "Crucials", img: conflictSVG, isActive: false, parentName: "todos",
    uniqueName: "3-crucial-task",
    url: "/user/todos/crucial-task"
  },
  {
    id: 4, name: "Archived", img: favoritesSVG, isActive: false, parentName: "todos",
    uniqueName: "4-archived-task",
    url: "/user/todos/archived-task"
  },
  {
    id: 5, name: "Add Task", img: plusSVG, isActive: false, parentName: "todos",
    uniqueName: "5-add-task",
    url: "/user/todos/add-task"
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
  "1-all-task",
  "2-progress-task",
  "3-crucial-task",
  "4-archived-task",
  "5-add-task",
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
    name: "Task Manager",
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

