import { sidebarLv2, type ISideBar, type ISidebarParentNames } from "@/components/other/sidebar/sidebar.type";
export interface ISideBars {
  activeParent: ISidebarParentNames,
  sidebarLinks: ISideBar[]


}
export const ISideBarLv2InitialState: ISideBars = {
  activeParent: "todos",
  sidebarLinks: sidebarLv2
}

