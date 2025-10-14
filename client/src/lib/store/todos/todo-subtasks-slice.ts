import { Status } from "@/lib/global";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";

/**@Interface_Types */
export type ITodoSubtasksStatus = "pending" | "in-progress" | "completed" | "archived";
export interface ITodoSubtasks {
  todoId: string;
  title: string;
  status: ITodoSubtasksStatus;
  position: number;
  createdAt: string;
  updatedAt: string;
}
interface InitialStateTodoSubtask {
  subtasks: ITodoSubtasks[],
  status: Status
}
const initialState: InitialStateTodoSubtask = {
  subtasks: [],
  status: Status.LOADING,
}

/**@Slices */
const todoSubtasksSlice = createSlice({
  name: "todo-subtasks-slice",
  initialState: initialState,
  reducers: {
    setTodoSubtaskStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    setTodoSubtasks(state, action: PayloadAction<ITodoSubtasks[]>) {
      const _list = action.payload
      if (_list.length < 0) return;
      state.subtasks = _list
    }
  }
})
export const { setTodoSubtasks, setTodoSubtaskStatus } = todoSubtasksSlice.actions
export default todoSubtasksSlice.reducer


/**@Custom_Thunks */
// Fetch Todo Subtasks
export function fetchTodoSubtasks() {
  return async function fetchTodoSubtasksThunk(dispatch: AppDispatch) {
    const response = await APIWITHTOKEN.get("/user/todo/subtask");
    if (response.status !== 200) {
      dispatch(setTodoSubtaskStatus(Status.ERROR))
      return;
    }
    const _list: ITodoSubtasks[] = response.data.data
    console.log("SUBTASK LIST : ", _list);

    // if (_list.length < 0 && !_list) return;
    dispatch(setTodoSubtasks(_list))
  }
}


// // Add Todo Subtask
// export function addTodoSubtasks(data:ITodoSubtasks[]){
//   return async function addTodoSubtasksThunk(dispatch:AppDispatch){
//     const response = await APIWITHTOKEN.put()
//   }
// }