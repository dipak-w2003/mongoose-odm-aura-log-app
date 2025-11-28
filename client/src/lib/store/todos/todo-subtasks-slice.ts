import { Status } from "@/lib/global";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";

/**@Interface_Types */
export type ITodoSubtasksStatus = "pending" | "in-progress";
export interface ITodoSubtasks {
  _id: string,
  todoId: string;
  title: string;

  status: ITodoSubtasksStatus;
  position: number;
  createdAt: string;
  updatedAt: string;
  completionMessage?: string;
  completionStatus?: boolean;
}
interface InitialStateTodoSubtask {
  subtasks: ITodoSubtasks[];
  status: Status;
}
const initialState: InitialStateTodoSubtask = {
  subtasks: [],
  status: Status.LOADING,
};

/**@Slices */
const todoSubtasksSlice = createSlice({
  name: "todo-subtasks-slice",
  initialState: initialState,
  reducers: {
    setTodoSubtaskStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setTodoSubtasks(state, action: PayloadAction<ITodoSubtasks[]>) {
      const _list = action.payload;
      if (_list.length < 0) return;
      state.subtasks = _list;
    },
  },
});
export const { setTodoSubtasks, setTodoSubtaskStatus } =
  todoSubtasksSlice.actions;
export default todoSubtasksSlice.reducer;

/**@Custom_Thunks */ // Fetch Todo Subtasks
export function fetchTodoSubtasks() {
  return async function fetchTodoSubtasksThunk(dispatch: AppDispatch) {
    const response = await APIWITHTOKEN.get("/user/todo/subtask");
    if (response.status !== 200) {
      dispatch(setTodoSubtaskStatus(Status.ERROR));
      return;
    }
    const _list: ITodoSubtasks[] = response.data.data;
    console.log("SUBTASK LIST : ", _list);

    // if (_list.length < 0 && !_list) return;
    dispatch(setTodoSubtasks(_list));
  };
}


export function SetTodoSubtasksCompletionStatusSingleOne({ id, statusBoolean = 1 }: { id: string, statusBoolean: boolean | 0 | 1 }) {
  return async function SetTodoSubtasksCompletionStatusSingleOneThunk(dispatch: AppDispatch) {
    if (!id && id.length > 0) {
      dispatch(setTodoSubtaskStatus(Status.ERROR))
      return alert("Provider Proper Token")
    }
    const response = await APIWITHTOKEN.post("/user/todo/subtask/set-a-completion-status/" + id, { statusBoolean })
    if (response.status === 201) {
      dispatch(setTodoSubtaskStatus(Status.SUCCESS))
      console.log("Sub task completion successfully ticked !");
    } else {
      dispatch(setTodoSubtaskStatus(Status.ERROR))
    }
  }

}
// // Add Todo Subtask
// export function addTodoSubtasks(data:ITodoSubtasks[]){
//   return async function addTodoSubtasksThunk(dispatch:AppDispatch){
//     const response = await APIWITHTOKEN.put()
//   }
// }
