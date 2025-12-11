import { Status } from "@/lib/global";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";
import { setPortalModalClose } from "../additionals/portal-modal/portal-modal-slice";

/**@Interface_Types */
export type ITodoSubtasksStatus = "pending" | "completed";
export interface ITodoSubtasks {
  _id: string,
  todoId: string;
  title: string;
  status: ITodoSubtasksStatus;
  position: number;
  completionMessage?: string;
  completionStatus?: boolean;
  createdAt?: string;
  updatedAt?: string;
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

    // TODO : delete single subtask (btw, not needed for now. but need in the future)
    // deleteSubtaskSingle(state, action: PayloadAction<{}>) { },

    // Deletes all subtask linked to a certain todo._id === substaks[todoId]
    deleteSubtasksLinkedToCertainTodoId(state, action: PayloadAction<{ todoId: string }>) {
      state.subtasks = state.subtasks.filter(subtask => subtask.todoId !== action.payload.todoId)
    },

    addTodoSubtasks(state, action: PayloadAction<ITodoSubtasks>) {
      state.subtasks.push(action.payload)
    },
    // Edit what ? Multiple Values and keys, dynamic editing
    editWhatSubtaskSingleData: (
      state,
      action: PayloadAction<{
        value: string | boolean | number;
        key: "title" | "status" | "position" | "completionMessage" | "completionStatus";
        subtaskId: string;
      }>
    ) => {
      const { value, key, subtaskId } = action.payload;

      const index = state.subtasks.findIndex((s) => s._id === subtaskId);
      if (index === -1) return; // subtask not found

      // Validation for title: no duplicate titles
      if (key === "title" && typeof value === "string") {
        const isDuplicate = state.subtasks.some(
          (s) => s._id !== subtaskId && s.title === value.trim()
        );
        if (isDuplicate) return; // skip update
      }

      // Validation for position: no duplicate positions
      if (key === "position" && typeof value === "number") {
        const isDuplicate = state.subtasks.some(
          (s) => s._id !== subtaskId && s.position === value
        );
        if (isDuplicate) return; // skip update
      }

      // Update the field
      state.subtasks[index] = {
        ...state.subtasks[index],
        [key]: value,
      };
    },


  }
});
export const { setTodoSubtasks, setTodoSubtaskStatus, deleteSubtasksLinkedToCertainTodoId, editWhatSubtaskSingleData, addTodoSubtasks } =
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
    // console.log("SUBTASK LIST : ", _list);

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

// Todo-Subtask-Completion-Status/Message
export function SetTodoSubtasksCompletionStatusAndMessageSingleOne({ id, completionMessage = "completion message !", todoId }: { id: string, completionMessage: string, todoId: string }) {

  return async function SetTodoSubtasksCompletionStatusAndMessageSingleOneThunk(dispatch: AppDispatch) {
    if (!id && id.length > 0) return;
    const response = await APIWITHTOKEN.post("/user/todo/subtask/set-a-completion-status-message/" + id, { completionMessage, todoId })
    if (response.status !== 200) return;

    // Individually updating for now

    dispatch(editWhatSubtaskSingleData({ key: "completionMessage", value: completionMessage, subtaskId: id }))
    dispatch(editWhatSubtaskSingleData({ key: "status", value: "completed", subtaskId: id }))
    dispatch(editWhatSubtaskSingleData({ key: "completionStatus", value: true, subtaskId: id }))
    dispatch(setTodoSubtaskStatus(Status.SUCCESS))
  }
}

// Add Todo Subtask
export interface addTodoSubtaskProps {
  certainSubtaskLength: number,
  data: {
    todoId: string;
    title: string;
  }
}
export function addTodoSubtask({ certainSubtaskLength, data }: addTodoSubtaskProps) {
  return async function addTodoSubtaskThunk(dispatch: AppDispatch) {
    const finalized_data = { ...data, position: Number(certainSubtaskLength + 1) }
    const response = await APIWITHTOKEN.post("/user/todo/subtask", finalized_data)
    if (response.status !== 201) {
      dispatch(setTodoSubtaskStatus("error"))
    }
    const received: ITodoSubtasks = response.data.data
    console.log(received);

    dispatch(setTodoSubtaskStatus("success"))
    dispatch(addTodoSubtasks(received))
    dispatch(setPortalModalClose())
  }
}
