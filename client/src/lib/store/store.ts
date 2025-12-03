import { configureStore } from '@reduxjs/toolkit'
import themeChoose from "./global/theme/theme-changer-slice"
import userLoginSlice from "./global/auth/login/user-login-slice"
import userRegisterlice from "./global/auth/register/user-register-slice"
import sidebarLv2Slice from "./additionals/sidebar/sidebar-slice"
import tempTodoCollectorSlice from "./todos/temp-todos-collector-slice"
import todoSlice from "./todos/todos-slice"
import todoSubtasksSlice from './todos/todo-subtasks-slice'
import updateTodoCollectorSlice from './todos/updating-todos-collector-slice'
export const store = configureStore({
  reducer: {
    sidebar2LinkManage: sidebarLv2Slice,
    themeChoose: themeChoose,
    userLogin: userLoginSlice,
    userRegister: userRegisterlice,
    tempTodoCollector: tempTodoCollectorSlice,
    todos: todoSlice,
    todoSubtask: todoSubtasksSlice,
    updateTodoCollector: updateTodoCollectorSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch