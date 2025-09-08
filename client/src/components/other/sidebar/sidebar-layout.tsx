import { useSelector } from "react-redux";
import SidebarLv1 from "./sidebar-lv1";
import SidebarLv2 from "./sidebar-lv2";
import { type IUseToggle } from "@/hooks/local/toggle.hook";
import type { RootState } from "@/lib/store/store";
import {
  ISidebarParentNamesCollection,
  type ISideBar,
  type ISidebarParentNames,
} from "./sidebar.type";
import { useEffect, type JSX } from "react";
import { useLocation } from "react-router-dom";
export interface ISidebarLayoutProps extends IUseToggle {
  isLoggedIn?: string | null;
  IsidebarParentNames?: ISidebarParentNames;
}
export const SidebarLayout = () => {
  const { user } = useSelector((state: RootState) => state.userLogin);
  const isLoggedIn = user && user?.token && user?.username;

  const SidebarLv2Component = (): JSX.Element | undefined => {
    const { pathname } = useLocation();
    const parts = pathname.split("/").filter(Boolean);
    const parent = parts[1] as ISideBar["parentName"];
    // console.log(parent);
    if (isLoggedIn && ISidebarParentNamesCollection.includes(parent)) {
      return (
        <SidebarLv2 IsidebarParentNames={parent} isLoggedIn={isLoggedIn} />
      );
    }
  };
  useEffect(() => {}, [parent]);
  return (
    <main className="flex h-full px-3 sm:w-[fit] gap-2   *:max-w-[150px]  transition-all  sticky">
      <SidebarLv1 isLoggedIn={isLoggedIn} />
      <SidebarLv2Component />
    </main>
  );
};
