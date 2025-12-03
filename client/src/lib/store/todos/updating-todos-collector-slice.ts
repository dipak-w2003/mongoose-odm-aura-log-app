import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { todoPriority } from "./todos-slice-type";
import type { ITodoSubtasks } from "./todo-subtasks-slice";
export interface IUpdateTodoCollector {
  _id: string,
  title: string,
  description: string,
  priority: todoPriority,
  dueDate: string,
  time: string,
  subtask?: ITodoSubtasks[],
  tags?: string[]
}
const initialState: { todo: IUpdateTodoCollector, _isNullificationExists: boolean } = {
  todo: {
    _id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    subtask: [],
    tags: [],
    time: "10:00"
  },
  _isNullificationExists: true
}

const updateTodoCollectorSlice = createSlice({
  name: "update-todo-collector",
  initialState: initialState,
  reducers: {
    setTodoTitleUpdate(state, action: PayloadAction<string>) {
      state.todo.title = action.payload;
    },

    setTodoDescriptionUpdate(state, action: PayloadAction<string>) {
      state.todo.description = action.payload;

    },
    setTodoDueDateUpdate(state, action: PayloadAction<string>) {
      state.todo.dueDate = action.payload;
    },

    setTodoPriorityUpdate(state, action: PayloadAction<todoPriority>) {
      state.todo.priority = action.payload
    },
    setTodoSubTaskUpdate(state, action: PayloadAction<ITodoSubtasks>) {
      state.todo.subtask?.push(action.payload)
    },
    deleteTodoSubTaskUpdate(state, action: PayloadAction<{ _idx: number }>) {
      state.todo.subtask?.splice(action.payload._idx, 1)
    },
    setTodoTaskTagsUpdate(state, action: PayloadAction<string>) {
      state.todo.tags?.push(action.payload)
    },
    deleteTodoTaskTagsUpdate(state, action: PayloadAction<{ _idx: number }>) {
      state.todo.tags?.splice(action.payload._idx, 1)
    },
    setTodoTimeUpdate(state, action: PayloadAction<string>) {
      state.todo.time = action.payload
    },

    // setValidateTodoUpdateCollectionNullifification(state) {
    //   let _checkNullificationStatus: boolean
    //   const { description, dueDate, priority, time, title } = state.todo

    //   if ((description && dueDate && priority && time && title).length > 2) {
    //     _checkNullificationStatus = false;
    //   } else {
    //     _checkNullificationStatus = true;
    //   }
    //   state._isNullificationExists = _checkNullificationStatus

    // },
    setEntireDataUpdatingTodo(state, action: PayloadAction<IUpdateTodoCollector>) {
      const data = action.payload
      state.todo = { ...data }
    }
    ,
    resetUpdateTodoCollector(state) {
      state.todo = initialState.todo
    }
  }
})
export const {
  setTodoTitleUpdate,
  setTodoDescriptionUpdate,
  setTodoDueDateUpdate,
  setTodoPriorityUpdate,
  setTodoSubTaskUpdate,
  setTodoTaskTagsUpdate,
  setTodoTimeUpdate,
  resetUpdateTodoCollector,
  // setValidateTodoUpdateCollectionNullifification,
  deleteTodoSubTaskUpdate,
  deleteTodoTaskTagsUpdate,
  setEntireDataUpdatingTodo
} = updateTodoCollectorSlice.actions

export default updateTodoCollectorSlice.reducer
