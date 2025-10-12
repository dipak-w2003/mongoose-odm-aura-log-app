import { Status } from "@/lib/global";
import type { ITodo, ITodoInitialState } from "./todos-slice-type";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

//  For Update and Delete Todos and Subtask 
/**
 * @IDEA
 * Make a key value like current activeTodo
 * currentTodoIndex:number
 * other todos
 * 
 * @Remove
 * remove all the other slice updatation  except add
 */
const initialState: ITodoInitialState = {
  activeTodoIndex: -1,
  todo: [],
  status: Status.LOADING
}

const TodoSlice = createSlice({
  name: "todos-slice",
  initialState: initialState,
  reducers: {
    setTodoStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    addTodo(state, action: PayloadAction<{ todo: ITodo }>) {
      state.todo.push({ ...action.payload.todo })
    },

    fetchTodo(state, action: PayloadAction<{ todos: ITodo[] }>) {
      // state.todo = []
      state.todo = action.payload.todos
    },



    /**
     * @Handle_Todo_Tags
     * @CRUD
     */
  }
})
export const { addTodo, setTodoStatus } = TodoSlice.actions
export default TodoSlice.reducer




export function addTodos(data: ITodo) {
  return async function (dispatch: AppDispatch) {
    // const reponse = await APIWITHTOKEN.post("/user/todo", data)
    // if (reponse.status !== 201) {
    //   dispatch(setTodoStatus(Status.ERROR))
    //   return;
    // }
    dispatch(addTodo({ todo: data }))
    console.log("THUNK DATA : ", data);

    dispatch(setTodoStatus(Status.SUCCESS))
  }
}

// export async function deleteTodos(id: string) {
//   return async function (dispatch: Dispatch) {
//     if (!id) return;
//     const response = await APIWITHTOKEN.delete("/user/todo/" + id)
//     if (response.status !== 200) return;



//   }
// }