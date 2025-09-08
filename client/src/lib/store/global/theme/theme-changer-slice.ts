import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IThemeCheck } from "./theme-changer-slice.type";
interface IinitialState {
  theme: IThemeCheck;
}
const initialState: IinitialState = {
  theme: "night",
};
const themeChooseSlice = createSlice({
  name: "theme choose",
  initialState: initialState,
  reducers: {
    setTheme(state, action: PayloadAction<IThemeCheck>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      const toggledTheme = state.theme === "day" ? "night" : "day";
      state.theme = toggledTheme;
    },
    resetTheme(state) {
      state.theme = "day";
    },
  },
});

export const { setTheme, resetTheme, toggleTheme } = themeChooseSlice.actions;
export default themeChooseSlice.reducer;


