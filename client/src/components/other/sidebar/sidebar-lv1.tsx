import type React from "react";
import type { ISidebarLayoutProps } from "./sidebar-layout";
import {
  editSVG,
  gearSVG,
  globeSVG,
  homeSVG,
  leftArrowSVG,
  taskSVG,
  userSVG,
} from "@/other/assets/svg/collectionSVG";

import { NavLink } from "react-router-dom";
import { useToggle } from "@/hooks/local/toggle.hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
const SidebarLv1: React.FC<ISidebarLayoutProps> = ({ isLoggedIn }) => {
  const { user } = useSelector((state: RootState) => state.userLogin);
  const { isOpen, toggle } = useToggle();
  return (
    <main
      className={`h-full ${
        isOpen ? "w-[140px]" : "w-[45px]"
      }  relative   flex justify-between items-center  flex-col overflow-hidden transition-all *:transition-all *:*:transition-all duration-300
          `}
    >
      {/* Top NavLinks */}
      <section className=" mt-3 w-full rounded flex items-center justify-center  gap-1 *:w-[98%] flex-wrap ">
        {/* Before Log */}
        <div className="rounded-full overflow-hidden flex justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5taINn-ULi-Gw1l5g7VkiDfkzm6btlLN_zpw-RyeFwsuiQBxrU45vQuc8ySnQes48TZ4&usqp=CAU"
            className={`rounded-full object-center ${
              isOpen ? "h-14 w-14" : "h-8 w-8"
            }`}
            alt="_target"
          />
          {isLoggedIn && !isOpen && (
            <div className="active-circle absolute h-1 w-1 rounded-full left-0 top-3 bg-green-400 transition-all duration-300  " />
          )}
        </div>
        {isOpen && (
          <header className="text-center text-xl">
            {user ? "@" + user?.username : "Aura Log"}
          </header>
        )}

        {/* After Login NavLinks */}
        <div className=" sidebar-lv1 mt-1 w-full rounded flex-col items-center justify-center flex gap-1 *:w-[98%] ">
          {isLoggedIn && (
            <>
              <NavLink
                to={"/user/todos"}
                className="link  cursor-pointer flex h-[40px]  w-full items-center justify-center gap-4 rounded"
              >
                <img src={taskSVG} alt="" className="h-6 " />
                {isOpen && <label className="text-sm text-left">Todos</label>}
              </NavLink>{" "}
              <NavLink
                to={"/user/notes"}
                className="link  cursor-pointer flex h-[40px]  w-full items-center justify-center gap-4 rounded"
              >
                <img src={editSVG} alt="" className="h-5 " />
                {isOpen && <label className="text-sm text-left">Notes</label>}
              </NavLink>{" "}
              <NavLink
                to={"/user/blogs"}
                className="link  cursor-pointer flex h-[40px]  w-full items-center justify-center gap-4 rounded"
              >
                <img src={globeSVG} alt="" className="h-5 " />
                {isOpen && <label className="text-sm text-left">Blogs</label>}
              </NavLink>
            </>
          )}
        </div>
      </section>

      {/* Bottom NavLinks */}
      <section className=" sidebar-lv1 mb-1 w-full rounded flex-col items-center justify-center flex gap-1 *:w-[98%] ">
        {/* Before Log */}
        {!isLoggedIn ? (
          <NavLink
            to={"/login"}
            className="link  cursor-pointer flex h-[40px]  w-full items-center justify-center-safe gap-4 rounded"
          >
            <img src={userSVG} alt="" className="h-6" />
            {isOpen && <label className="text-sm">Login</label>}
          </NavLink>
        ) : (
          <NavLink
            to={"/profile"}
            className="link  cursor-pointer flex h-[40px]  w-full items-center justify-center-safe gap-4 rounded"
          >
            <img src={gearSVG} alt="" className="h-6" />
            {isOpen && <label className="text-sm">Profile</label>}
          </NavLink>
        )}

        <NavLink
          to={"/"}
          className="link  cursor-pointer flex h-[40px]  w-full items-center justify-center-safe gap-4 rounded"
        >
          <img src={homeSVG} alt="" className="h-6 " />
          {isOpen && <label className="text-sm text-left">Home</label>}
        </NavLink>

        {/* Default */}
        <button
          title="back"
          onClick={toggle}
          className="link flex h-[40px] w-full items-center justify-center-safe gap-4 rounded cursor-pointer"
        >
          <img
            src={leftArrowSVG}
            alt=""
            className={`h-5 ml-1  ${isOpen ? "rotate-0" : "-rotate-180"}`}
          />
        </button>
      </section>
    </main>
  );
};

export default SidebarLv1;
