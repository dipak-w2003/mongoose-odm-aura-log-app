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
    const todos_response = await APIWITHTOKEN.get("/user/todo")
    const subtask_response = await APIWITHTOKEN.get("/user/todo/subtask")
    if (todos_response.status !== 200) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }
    console.log("SUBTASKS : ", subtask_response.data.data);

    let data: ITodo[] | null = null;
    data = todos_response.data?.data
    if (data && data.length !== 0) {
      dispatch(setTodoStatus(Status.SUCCESS))
      const _idTOid = data.map((_) => {
        return { ..._, id: _._id }
      })
      console.log(_idTOid);

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
    const { description, priority, time, title, subtask, tags } = data
    const todo_reponse = await APIWITHTOKEN.post("/user/todo", { description, priority, time, title, subtask, tags, dueDate: new Date() })
    if (todo_reponse.status !== 201) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }

    dispatch(addTodo({ todo: data }))
    // console.log("THUNK DATA : ", data);

    /**@SECOND_Response */
    const _justCreatedTodoId = todo_reponse.data._justCreatedTodoId || null
    console.log("Todo.id : ", _justCreatedTodoId);

    //  Map new Subtask =>  { todoId: xyz, title:abc, position: index + 1 }
    const tempSubtask = data.subtask?.map((_, __) => {
      return { todoId: _justCreatedTodoId, title: _, position: __ + 1 }
    })

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