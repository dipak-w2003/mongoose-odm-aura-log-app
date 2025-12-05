import type React from "react";
// import { lazy } from "react";
import { Outlet } from "react-router-dom";
// const SideBarLv2LinkBasisPageProvider = lazy(
//   () =>
//     import("@/components/other/sidebar/sidebar-lv2-link-basis-page-provider")
// );

const TodoMainPage: React.FC<{}> = ({}) => {
  return (
    <main className="text-white">
      {
        <Outlet />
        // <SideBarLv2LinkBasisPageProvider parentName="todos" />
      }{" "}
    </main>
  );
};

export default TodoMainPage;
