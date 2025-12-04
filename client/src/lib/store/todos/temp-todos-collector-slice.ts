import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { todoPriority } from "./todos-slice-type";
import { dateToString } from "@/utils/date-converter";
export interface ITempTodoCollector {
  _id: string,
  title: string,
  description: string,
  priority: todoPriority,
  dueDate: string,
  time: string,
  subtask?: string[],
  tags?: string[]
}
const initialState: { todo: ITempTodoCollector, _isNullificationExists: boolean } = {
  todo: {
    _id: "",
    title: "",
    description: "",
    dueDate: dateToString(new Date(), "INPUT_DATE"),
    priority: "medium",
    subtask: [],
    tags: [],
    time: "10:00"
  },
  _isNullificationExists: true
}

const tempTodoCollectorSlice = createSlice({
  name: "temp-todo-collector",
  initialState: initialState,
  reducers: {
    setTodoTitleTemp(state, action: PayloadAction<string>) {
      state.todo.title = action.payload;
    },

    setTodoDescriptionTemp(state, action: PayloadAction<string>) {
      state.todo.description = action.payload;

    },
    // Collection dueDate payload as string then we transform/dispatch for the designated slice or store 
    setTodoDueDateTemp(state, action: PayloadAction<string>) {
      // accept payload date as : yyyy/mm/dd OR yyyy-mm-dd
      state.todo.dueDate = action.payload;
      // state.todo.dueDate = new Date(2025, 1, 1);
    },

    setTodoPriorityTemp(state, action: PayloadAction<todoPriority>) {
      state.todo.priority = action.payload
    },
    setTodoSubTaskTemp(state, action: PayloadAction<string>) {
      state.todo.subtask?.push(action.payload)
    },
    deleteTodoSubTaskTemp(state, action: PayloadAction<{ _idx: number }>) {
      state.todo.subtask?.splice(action.payload._idx, 1)
    },
    setTodoTaskTagsTemp(state, action: PayloadAction<string>) {
      state.todo.tags?.push(action.payload)
    },
    deleteTodoTaskTagsTemp(state, action: PayloadAction<{ _idx: number }>) {
      state.todo.tags?.splice(action.payload._idx, 1)
    },
    setTodoTimeTemp(state, action: PayloadAction<string>) {
      state.todo.time = action.payload
    },

    setValidateTodoTempCollectionNullifification(state) {
      let _checkNullificationStatus: boolean
      const { description, dueDate, priority, time, title } = state.todo

      if ((description && dueDate && priority && time && title).length > 2) {
        _checkNullificationStatus = false;
      } else {
        _checkNullificationStatus = true;
      }
      state._isNullificationExists = _checkNullificationStatus

    },
    resetTempTodoCollector(state) {
      state.todo = initialState.todo
    }
  }
})
export const {
  setTodoTitleTemp,
  setTodoDescriptionTemp,
  setTodoDueDateTemp,
  setTodoPriorityTemp,
  setTodoSubTaskTemp,
  setTodoTaskTagsTemp,
  setTodoTimeTemp,
  resetTempTodoCollector,
  setValidateTodoTempCollectionNullifification,
  deleteTodoSubTaskTemp,
  deleteTodoTaskTagsTemp
} = tempTodoCollectorSlice.actions

export default tempTodoCollectorSlice.reducer
