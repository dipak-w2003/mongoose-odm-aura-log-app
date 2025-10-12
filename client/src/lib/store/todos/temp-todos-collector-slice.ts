import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { todoPriority } from "./todos-slice-type";
interface ITempTodoCollector {
  title: string,
  description: string,
  priority: todoPriority,
  dueDate: string,
  time: string,
  subtask?: string[],
  tasktags?: string[]
}
const initialState: { todo: ITempTodoCollector, _isNullificationExists: boolean } = {
  todo: {
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    subtask: [],
    tasktags: [],
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
      state.todo.tasktags?.push(action.payload)
    },
    deleteTodoTaskTagsTemp(state, action: PayloadAction<{ _idx: number }>) {
      state.todo.tasktags?.splice(action.payload._idx, 1)
    },
    setTodoTimeTemp(state, action: PayloadAction<string>) {
      state.todo.time = action.payload
    },

    setValidateTodoTempCollectionNullifification(state) {
      let _checkNullification: boolean = Object.values(state.todo).some((_) => {
        if (typeof (_) === "string") {
          return _.length < 0
        }
      })
      console.log("_checkNullification : ", _checkNullification);

      if (_checkNullification) state._isNullificationExists = true;
      else state._isNullificationExists = false;
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
