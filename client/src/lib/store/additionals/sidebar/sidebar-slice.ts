import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ISideBarLv2InitialState } from "./sidebar-slice.type";
import type { ISideBar, ISidebarParentNames } from "@/components/other/sidebar/sidebar.type";

const sidebarLv2Slice = createSlice({
  name: "sidebarLv2",
  initialState: ISideBarLv2InitialState,
  reducers: {
    setSidebar2LinkActive(state, action: PayloadAction<ISideBar | undefined>) {
      if (!action.payload) return;
      const { id, parentName } = action.payload;

      // Deactivate all links under the same parent
      state.sidebarLinks.forEach(item => {
        if (item.parentName === parentName) {
          item.isActive = false;
        }
      });

      // Activate the matching one
      const link = state.sidebarLinks.find(item => item.parentName === parentName && item.id === id);
      if (link) {
        link.isActive = true;
      }

    },


    setSidebarParentName(state, action: PayloadAction<ISidebarParentNames>) {
      state.activeParent = action.payload
    }
  }
});

export const { setSidebar2LinkActive, setSidebarParentName } = sidebarLv2Slice.actions;
export default sidebarLv2Slice.reducer;

