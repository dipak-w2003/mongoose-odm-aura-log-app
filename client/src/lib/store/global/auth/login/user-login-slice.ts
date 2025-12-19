import type { IUserLog, IUserLogin, IUserLogInititalState } from "./user-login-slice.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/lib/store/store";
import { API } from "@/lib/store/http/API";
import { Status } from "@/lib/global";


export function userLogs(): IUserLog | null {
  const savedUser = localStorage.getItem("userlogs")
  if (savedUser) {
    return JSON.parse(savedUser) as IUserLog
  }
  return null
}
// console.log(userLogs());

const initialState: IUserLogInititalState = {
  user: userLogs() ?? null,
  status: Status.LOADING
}

const userLoginSlice = createSlice({
  name: "user login",
  initialState: initialState,
  reducers: {
    setLoginUser(state, action: PayloadAction<IUserLog>) {
      state.user = action.payload
    },
    setLoginStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },

    setLogout(state) {
      state.user = null
      localStorage.removeItem("userlogs")
    }
  }
})
export const { setLoginStatus, setLoginUser, setLogout } = userLoginSlice.actions
export default userLoginSlice.reducer


// Thunks 
export function userLogin(data: IUserLogin) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    const response = await API.post("/auth/user/login", data)
    console.log(response.request);

    if (response.status == 200) {
      dispatch(setLoginStatus(Status.SUCCESS))
      const data = response.data
      if (data) {
        dispatch(setLoginUser(data.data))
        localStorage.setItem("userlogs", JSON.stringify(data.data))
        return;
      }
    }
    dispatch(setLoginStatus(Status.ERROR))
  }
}


export function userLogout() {
  return async function userLogoutThunk(dispatch: AppDispatch) {
    dispatch(setLogout())
    dispatch(setLoginStatus(Status.ERROR))
  }
}