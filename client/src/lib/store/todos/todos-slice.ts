import { Status } from "@/lib/global";
import type { ITodo, ITodoInitialState } from "./todos-slice-type";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITempTodoCollector } from "./temp-todos-collector-slice";
import { deleteSubtasksLinkedToCertainTodoId } from "./todo-subtasks-slice";

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


    // Make Update Todo Reducer

    // :: updateTodo used in other part of the slice
    EditMainStateTodo(state, action: PayloadAction<{ todo: ITodo }>) {
      const _index = state.todo.findIndex(t => t._id === action.payload.todo._id);
      if (_index < 0) return; // not found
      state.todo.splice(_index, 1, action.payload.todo);
    },


    /**
     * @Handle_Todo_Tags
     * @CRUD
     */


    deleteTodo(state, action: PayloadAction<{ todoId: string }>) {
      state.todo = state.todo.filter(todo => todo._id !== action.payload.todoId);
    }
  }
})
export const { addTodo, setTodoStatus, fetchTodo, deleteTodo, EditMainStateTodo } = TodoSlice.actions
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
    // console.log("SUBTASKS : ", subtask_response.data.data);
    console.log(subtask_response.status);

    let data: ITodo[] | null = null;
    data = todos_response.data?.data
    if (data && data.length !== 0) {
      dispatch(setTodoStatus(Status.SUCCESS))
      // const _idTOid = data.map((_) => {
      //   return { ..._, id: _._id }
      // })

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
    const { description, priority, time, title, tags, dueDate } = data
    const todo_reponse = await APIWITHTOKEN.post("/user/todo", { description, priority, time, title, tags, dueDate })
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


    if (data.subtask && data.subtask?.length < 0) {
      dispatch(setTodoStatus(Status.SUCCESS))
      return
    }

    const todosubtask_reponse = await APIWITHTOKEN.post("/user/todo/subtask", tempSubtask)

    if (todosubtask_reponse.status !== 201) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }

  }
}

// Delete Todo
export async function deleteTodos(id: string) {
  return async function (dispatch: AppDispatch) {
    if (!id) return;
    const response = await APIWITHTOKEN.delete("/user/todo/" + id)
    if (response.status !== 200) return;
    dispatch(fetchTodos());

  }
}

// Delete A Entire Todo
export function deleteAnEntireTodo(id: string) {
  return async function deleteAnEntireTodoThunk(dispatch: AppDispatch) {
    if (!id) {
      dispatch(setTodoStatus(Status.ERROR));
      return;
    }

    dispatch(setTodoStatus(Status.LOADING));

    try {
      const response = await APIWITHTOKEN.delete("/user/donot-touch/delete-an-entire-todo/" + id);
      if (response.status !== 200) {
        dispatch(setTodoStatus(Status.ERROR));
        return;
      }


      // Update store immediately
      dispatch(deleteTodo({ todoId: id }));
      dispatch(deleteSubtasksLinkedToCertainTodoId({ todoId: id }));
      dispatch(setTodoStatus(Status.SUCCESS));


      // other fetches
      // dispatch(fetchTodos())
      // dispatch(fetchTodoSubtasks())
    } catch (err) {
      console.error(err);
      dispatch(setTodoStatus(Status.ERROR));
    }
  };
}
