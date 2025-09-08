import { Status } from "@/lib/global";
import type { initialIRegisterUserState, IUserRegister } from "./user-register-slice.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/lib/store/store";
import axios from "axios";

const initialState: initialIRegisterUserState = {
  user: null,
  status: Status.LOADING
}

const userRegisterSlice = createSlice({
  name: "user register",
  initialState: initialState,
  reducers: {
    setRegisterStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    }
  }
})

export const { setRegisterStatus } = userRegisterSlice.actions
export default userRegisterSlice.reducer

export function registerUser(registerData: IUserRegister) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    const reponse = await axios.post("/auth/user/register", registerData)
    if (reponse.status === 201) {
      dispatch(setRegisterStatus(Status.SUCCESS))
    }
  }
} 