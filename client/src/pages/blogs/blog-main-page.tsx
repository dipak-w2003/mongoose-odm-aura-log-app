import type React from "react";
import { Outlet } from "react-router-dom";

const BlogMainPage: React.FC = () => {
  return (
    <main>
      <Outlet />
      {/* {<SideBarLv2LinkBasisPageProvider parentName="blogs" />} */}
    </main>
  );
};

export default BlogMainPage;
