import { configureStore } from '@reduxjs/toolkit'
import themeChoose from "./global/theme/theme-changer-slice"
import userLoginSlice from "./global/auth/login/user-login-slice"
import sidebarLv2Slice from "./additionals/sidebar/sidebar-slice"
export const store = configureStore({
  reducer: {
    themeChoose: themeChoose,
    userLogin: userLoginSlice,
    sidebar2LinkManage: sidebarLv2Slice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch