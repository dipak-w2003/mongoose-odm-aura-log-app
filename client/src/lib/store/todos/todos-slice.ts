import { Status } from "@/lib/global";
import type { ITodo, ITodoInitialState } from "./todos-slice-type";
import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import { APIWITHTOKEN } from "../http/API";

const initialState: ITodoInitialState = {
  todo: [],
  status: Status.LOADING
}
function _defaultIndex(state: ITodo[]) {
  const DEFAULT_LAST_INDEX = state.length - 1
  let DEFAULT_INDEX = 0;
  if (state.length > 0) return DEFAULT_LAST_INDEX
  else return DEFAULT_INDEX;
}
const TodoSlice = createSlice({
  name: "todos-slice",
  initialState: initialState,
  reducers: {
    setTodoStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    addTodo(state, action: PayloadAction<{ todo: ITodo }>) {
      const _index = _defaultIndex(state.todo)
      const { dueDate, priority, title, description } = action.payload.todo
      state.todo[_index] = { dueDate, priority, title, description, tags: state.todo[_index].tags }
    },
    fetchTodo(state, action: PayloadAction<{ todos: ITodo[] }>) {
      // state.todo = []
      state.todo = action.payload.todos
    },



    /**
     * @Handle_Todo_Tags
     * @CRUD
     */
    addTodoTags(state, action: PayloadAction<{ tag: string }>) {
      const { tag: TAG } = action.payload
      const _index = _defaultIndex(state.todo)
      const conditions = TAG && TAG.length !== 0 && TAG.length! >= 6;
      const PREV_TAGS = state.todo[_index].tags
      const duplicateFind = PREV_TAGS?.find(_ => _.toLowerCase().split(" ").join("") === TAG.toLowerCase().split(" ").join(""))

      if (duplicateFind) return;
      if (conditions) {
        state.todo[_index].tags?.push(TAG)
      }
    },

    updateTodoTags(state, action: PayloadAction<{ tag: string, idx: number }>) {
      const { idx, tag, } = action.payload
      const _index = _defaultIndex(state.todo)
      const PREV_TAGS = state.todo[_index].tags
      const payload_conditions = idx && tag && idx! < -1 && tag.length >= 6
      const duplicateFind = PREV_TAGS?.find(_ => _.toLowerCase().split(" ").join("") === tag.toLowerCase().split(" ").join(""))
      const findIdx = PREV_TAGS?.findIndex(_ => _.toLowerCase().split(" ").join("") === tag.toLowerCase().split(" ").join(""))
      if (!payload_conditions) return;
      if (duplicateFind && findIdx == -1) return;
      if (findIdx)
        state.todo[_index].tags?.splice(findIdx, 0, tag)
    },
    deleteTodoTags(state, action: PayloadAction<{ idx: number }>) {
      const { idx: INDEX } = action.payload;
      const _index = _defaultIndex(state.todo)
      if (!INDEX && INDEX == -1) return;
      state.todo[_index].tags?.splice(INDEX, 1)
    }
  }
})
export const { addTodo, setTodoStatus, addTodoTags, deleteTodoTags, updateTodoTags } = TodoSlice.actions
export default TodoSlice.reducer




export async function addTodos(data: ITodo) {
  return async function addTodoThunk(dispatch: Dispatch) {
    const reponse = await APIWITHTOKEN.post("/user/todo", data)
    if (reponse.status !== 201) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }
    dispatch(addTodo({ todo: data }))
    setTodoStatus(Status.SUCCESS)
  }
}

export async function deleteTodos(data: string[]) {
  return async function (dispatch: Dispatch) {
    if (!data) return;
    let is_one = data.length === 0
    if (is_one) {
      const reponse = await APIWITHTOKEN.delete("/user/todo/:id", data[0])
    } else {

    }

  }
}