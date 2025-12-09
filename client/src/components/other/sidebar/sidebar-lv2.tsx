import type React from "react";
import type { ISidebarLayoutProps } from "./sidebar-layout";
import { leftArrowSVG } from "@/other/assets/svg/collectionSVG";

import { useToggle } from "@/hooks/local/toggle.hook";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { whichSideBarParentHeaderFindSB2, type ISideBar } from "./sidebar.type";
import {
  setSidebar2LinkActive,
  setSidebarParentName,
} from "@/lib/store/additionals/sidebar/sidebar-slice";
import { NavLink, useLocation } from "react-router-dom";
const SidebarLv2: React.FC<ISidebarLayoutProps> = ({ IsidebarParentNames }) => {
  const sideBar2LinksArray = useSelector(
    (state: RootState) => state.sidebar2LinkManage
  );
  // console.log(sideBar2LinksArray);

  // Hooks
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, toggle } = useToggle();
  // Function : Handle State Dispatch
  const handleSideBar2ActiveLink = (_: ISideBar) => {
    dispatch(setSidebar2LinkActive(_));
    if (IsidebarParentNames) {
      dispatch(setSidebarParentName(IsidebarParentNames));
    }
  };
  // Function : Provide Header
  const providedHeader = () => {
    if (IsidebarParentNames)
      return whichSideBarParentHeaderFindSB2(IsidebarParentNames);
  };

  // Toggle: Add or remove className for custom styling
  const setDefaultClassActiveLink = (_: ISideBar): string => {
    const { pathname } = useLocation();
    const checkPath = pathname == "/user/" + IsidebarParentNames;
    return _.id === 1 && checkPath ? "side-bar2-active-link" : "";
  };
  // FilterFn : Filter out sidebarlinks slice:state on the basis of ISidebarParentNames as "todos" , "notes" , "blogs"
  const filterOutSpecificLinks = sideBar2LinksArray.sidebarLinks.filter(
    (_) => _.parentName === IsidebarParentNames
  );
  return (
    <section
      className={`h-full  ${
        isOpen ? "w-[180px]" : "w-[45px]"
      }  flex justify-between items-center  flex-col ml-1  overflow-hidden transition-all *:transition-all *:*:transition-all duration-300
         `}
    >
      <div className="mt-2 sidebar-lv1  w-full rounded flex-col items-center justify-center flex gap-1 *:w-[98%] ">
        {/* Before Log */}
        <span className="link  cursor-pointer flex h-[40px] *:transition-all *:duration-200 overflow-hidden   w-full items-center justify-center gap-4 rounded">
          {
            <label className="text-md font-[600] underline transition-all duration-150">
              {isOpen ? providedHeader()?.name : providedHeader()?.sname}
            </label>
          }
        </span>
        {filterOutSpecificLinks.length > 0 &&
          filterOutSpecificLinks.map((_) => {
            return (
              <NavLink
                to={_.url}
                title={_.name}
                key={`${_.id}-${_.name}-${_.isActive}`}
                onClick={() => handleSideBar2ActiveLink(_)}
                className={`link cursor-pointer  flex h-[40px]  w-full items-center gap-3 px-3 rounded
                  ${setDefaultClassActiveLink(_)}
                `}
              >
                <img src={_.img ?? ""} alt="" className="h-5 cursor-pointer " />
                {isOpen && (
                  <li className="text-sm transition-all duration-75  line-clamp-5 cursor-pointer font-[400] ">
                    {_.name ?? "LINK"}
                  </li>
                )}
              </NavLink>
            );
          })}
        {/* Default */}
        <button
          onClick={toggle}
          className="link flex h-[40px] asbolute top-[90%] w-full items-center justify-center gap-4 rounded cursor-pointer "
        >
          <img
            src={leftArrowSVG}
            alt=""
            className={`h-5 ml-1  ${isOpen ? "rotate-0" : "-rotate-180"}`}
          />
        </button>
      </div>
    </section>
  );
};

export default SidebarLv2;
