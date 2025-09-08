import type React from "react";
import { lazy } from "react";
import { Outlet } from "react-router-dom";
const SideBarLv2LinkBasisPageProvider = lazy(
  () =>
    import("@/components/other/sidebar/sidebar-lv2-link-basis-page-provider")
);

const BlogMainPage: React.FC = () => {
  return (
    <main>
      <Outlet />
      {/* {<SideBarLv2LinkBasisPageProvider parentName="blogs" />} */}
    </main>
  );
};

export default BlogMainPage;
