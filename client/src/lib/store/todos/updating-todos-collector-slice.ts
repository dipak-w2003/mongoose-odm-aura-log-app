import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { todoPriority } from "./todos-slice-type";
import type { ITodoSubtasks } from "./todo-subtasks-slice";
import type { AppDispatch } from "../store";
import { APIWITHTOKEN } from "../http/API";
import { Status } from "@/lib/global";
import { EditMainStateTodo } from "./todos-slice";
import { setPortalModalClose, setPortalModalOpen } from "../additionals/portal-modal/portal-modal-slice";
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
const initialState: { todo: IUpdateTodoCollector, _isNullificationExists: boolean, Status: Status } = {
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
  _isNullificationExists: true,
  Status: "loading"
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
      // action.payload = "2025-12-27"
      if (!state.todo.time) return; // safety check

      const [year, month, day] = action.payload.split("-").map(Number);
      const [hoursStr, minutesStr] = state.todo.time.split(":");

      const hours = Number(hoursStr);
      const minutes = Number(minutesStr);

      // JS months are 0-indexed
      const dueDateObj = new Date(year, month - 1, day, hours, minutes);

      // Store as ISO string for consistency
      state.todo.dueDate = dueDateObj.toISOString();
      console.log(state.todo.dueDate);

    },


    setTodoPriorityUpdate(state, action: PayloadAction<todoPriority>) {
      state.todo.priority = action.payload
    },
    setTodoSubTaskUpdate(state, action: PayloadAction<ITodoSubtasks>) {
      state.todo.subtask?.push({ ...action.payload, todoId: state.todo._id })
    },
    deleteTodoSubTaskUpdate(state, action: PayloadAction<{ _idx: string }>) {
      const Index = state.todo.subtask?.findIndex(_ => _._id === action.payload._idx)
      if (!Index) return;
      state.todo.subtask?.splice(Index, 1)
    },
    setTodoTaskTagsUpdate(state, action: PayloadAction<string>) {
      state.todo.tags?.push(action.payload)
    },
    deleteTodoTaskTagsUpdate(state, action: PayloadAction<{ _idx: number }>) {
      state.todo.tags?.splice(action.payload._idx, 1)
    },
    setTodoTimeUpdate(state, action: PayloadAction<string>) {
      // attaching those two for actual date and reminer time in future or coming days backend-database:todo:dueDate will be this so we can split("||") in future
      state.todo.time = action.payload

      console.log(state.todo.dueDate);

    },

    setValidateTodoUpdateCollectionNullifification(state) {
      let _checkNullificationStatus: boolean
      const { description, dueDate, priority, title } = state.todo

      if ((description && dueDate && priority && title).length > 2) {
        _checkNullificationStatus = false;
      } else {
        _checkNullificationStatus = true;
      }
      state._isNullificationExists = _checkNullificationStatus

    },
    setEntireDataUpdatingTodo(state, action: PayloadAction<IUpdateTodoCollector>) {
      const data = action.payload
      state.todo = { ...data }
    }
    ,
    resetUpdateTodoCollector(state) {
      state.todo = initialState.todo
    },

    setUpdateTodoStatus(state, action: PayloadAction<Status>) {
      state.Status = action.payload
    }
  },
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
  setValidateTodoUpdateCollectionNullifification,
  deleteTodoSubTaskUpdate,
  deleteTodoTaskTagsUpdate,
  setEntireDataUpdatingTodo,
  setUpdateTodoStatus
} = updateTodoCollectorSlice.actions

export default updateTodoCollectorSlice.reducer





// update todos
export interface IOnlyUpdateMainTodos {
  _id: string,
  title: string,
  description: string,
  priority: todoPriority,
  dueDate: string,
  time: string,
  tags?: string[]
}
export function updateTodos(data: IOnlyUpdateMainTodos) {
  return async function updateTodosThunk(dispatch: AppDispatch) {
    if (!data._id && data._id.length > 5) return;
    const _data = { ...data, dueDate: new Date() }
    const response = await APIWITHTOKEN.patch("/user/todo/" + data._id, _data)
    if (response.status !== 200) {
      dispatch(setUpdateTodoStatus(Status.ERROR))
      dispatch(setPortalModalOpen())

      return
    }
    dispatch(setUpdateTodoStatus(Status.SUCCESS))
    dispatch(setPortalModalClose())
    dispatch(EditMainStateTodo({ _id: data._id, todo: data }))
    dispatch(resetUpdateTodoCollector())
  }
}