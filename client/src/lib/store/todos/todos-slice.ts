import { Status } from "@/lib/global";
import type { ITodo, ITodoInitialState } from "./todos-slice-type";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITempTodoCollector } from "./temp-todos-collector-slice";

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
export const { addTodo, setTodoStatus, fetchTodo } = TodoSlice.actions
export default TodoSlice.reducer


// Fetch Todos
export function fetchTodos() {
  return async function (dispatch: AppDispatch) {
    const response = await APIWITHTOKEN.get("/user/todo")
    if (response.status !== 200) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }
    console.log("STATUS : ", response.status);

    let data: ITodo[] | null = null;
    data = response.data?.data
    if (data && data.length !== 0) {
      dispatch(setTodoStatus(Status.SUCCESS))
      dispatch(fetchTodo({ todos: data }))
    }
  }
}

// Add Todo
export function addTodos(data: ITempTodoCollector) {
  return async function (dispatch: AppDispatch) {

    /**@FIRST_Response */
    const [yyyy, mm, dd] = data.dueDate.split("-")
    console.log([yyyy, mm, dd]);

    const todo_reponse = await APIWITHTOKEN.post("/user/todo", { ...data, dueDate: new Date() })
    if (todo_reponse.status !== 201) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }

    dispatch(addTodo({ todo: data }))
    // console.log("THUNK DATA : ", data);

    /**@SECOND_Response */
    const _justCreatedTodoId = todo_reponse.data._justCreatedTodoId || null
    console.log("Todo.id : ", _justCreatedTodoId);

    //  Map new Subtask =>  { todoId: xyz, title:abc }
    const tempSubtask = data.subtask?.map((_) => {
      return { todoId: _justCreatedTodoId, title: _ }
    })
    console.log(tempSubtask);

    const todosubtask_reponse = await APIWITHTOKEN.post("/user/todo/subtask", tempSubtask)

    if (todosubtask_reponse.status !== 201) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }

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