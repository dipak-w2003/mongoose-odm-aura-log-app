import { Status } from "@/lib/global";
import type { ITodo, ITodoInitialState, todoLifecycle } from "./todos-slice-type";
import { APIWITHTOKEN } from "../http/API";
import type { AppDispatch } from "../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITempTodoCollector } from "./temp-todos-collector-slice";
import { deleteSubtasksLinkedToCertainTodoId, setTodoSubtaskStatus } from "./todo-subtasks-slice";
import { formatUTCISO } from "@/utils/luxon-module";

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
  activeTodoId: "",
  justCreatedTodoId: "",
  todo: [],
  status: Status.LOADING
}

const TodoSlice = createSlice({
  name: "todos-slice",
  initialState: initialState,
  reducers: {
    setJustCreatedTodoId(state, action: PayloadAction<{ id: string }>) {
      state.justCreatedTodoId = action.payload.id
    }, resetJustCreatedTodoId(state) {
      state.justCreatedTodoId = null
    },
    // TODO : A error came
    /** While this function called for a bottom-content from triangle-shape toggle. It call re-renders or calls fetchFunctions on the first click. */
    setActiveTodoId(state, action: PayloadAction<string>) {
      state.activeTodoId = action.payload
    },

    setTodoStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    addTodo(state, action: PayloadAction<{ todo: ITodo }>) {
      state.todo.unshift({ ...action.payload.todo })
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
      const idx = state.todo.findIndex(_ => _._id == action.payload.todoId)
      if (idx < 0) return;
      state.todo.splice(idx, 1)
    },


    // Other Reducers
    setTodoLifecyle(state, action: PayloadAction<{ id: string, lifecycle: todoLifecycle }>) {
      const _index = state.todo.findIndex(t => t._id === action.payload.id);
      if (_index < 0) return; // not found
      state.todo[_index].lifecycle = action.payload.lifecycle;
    },
    updateTodoUpdateAt(state, action: PayloadAction<{ id: string }>) {
      const idx = state.todo.findIndex(_ => _._id == action.payload.id)
      if (idx < 0) return;
      const data = state.todo[idx]
      const now = String(formatUTCISO(new Date()))
      console.log(now);

      state.todo.splice(idx, 1, { ...data, updatedAt: now })

    }
  }
})
export const { addTodo, setTodoStatus, fetchTodo, deleteTodo, EditMainStateTodo, setActiveTodoId, setTodoLifecyle, setJustCreatedTodoId, resetJustCreatedTodoId, updateTodoUpdateAt } = TodoSlice.actions
export default TodoSlice.reducer


// Fetch Todos
export function fetchTodos() {
  return async function (dispatch: AppDispatch) {
    dispatch(resetJustCreatedTodoId())
    const todos_response = await APIWITHTOKEN.get("/user/todo")
    if (todos_response.status !== 200) {
      dispatch(setTodoStatus(Status.ERROR))
      return;
    }
    let data: ITodo[] | null = null;
    data = todos_response.data?.data
    if (data && data.length !== 0) {
      dispatch(setTodoStatus(Status.SUCCESS))
      dispatch(fetchTodo({ todos: data }))

    }
  }
}

// Add Todo : Main Todo & Subtasks
// TODO : ONLY todo is being created or hitting api
// May be beacuse of Todo & other state status error
export function addTodos(data: ITempTodoCollector) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setTodoStatus(Status.LOADING));

      const { description, priority, time, title, tags, dueDate } = data;

      /** FIRST: create todo */
      const todoResponse = await APIWITHTOKEN.post("/user/todo", {
        description,
        priority,
        time,
        title,
        tags,
        dueDate,
        lifecycle: "active",
      });

      if (todoResponse.status !== 201) {
        dispatch(setTodoStatus(Status.ERROR));
        return;
      }

      const createdTodo = todoResponse.data.todo;
      const createdTodoId = createdTodo._id;

      if (!createdTodoId) {
        dispatch(setTodoStatus(Status.ERROR));
        return;
      }

      // ✅ store real backend todo
      dispatch(addTodo({ todo: createdTodo }));
      dispatch(setJustCreatedTodoId({ id: createdTodoId }));

      /** SECOND: create subtasks (if any) */
      if (!data.subtask || data.subtask.length === 0) {
        dispatch(setTodoStatus(Status.SUCCESS));
        return;
      }

      const subtaskPayload = data.subtask.map((title, index) => ({
        todoId: createdTodoId,
        title,
        position: index + 1,
      }));

      const subtaskResponse = await APIWITHTOKEN.post(
        "/user/todo/subtask",
        subtaskPayload
      );

      if (subtaskResponse.status !== 201) {
        dispatch(setTodoSubtaskStatus(Status.ERROR));
        dispatch(setTodoStatus(Status.ERROR));
        return;
      }

      dispatch(setTodoStatus(Status.SUCCESS));
      dispatch(setTodoSubtaskStatus(Status.SUCCESS));
    } catch (err) {
      dispatch(setTodoStatus(Status.ERROR));
      dispatch(setTodoSubtaskStatus(Status.ERROR));
    }
  };
}


// Delete Todo
export async function deleteTodos(id: string) {
  return async function (dispatch: AppDispatch) {
    if (!id) return;
    const response = await APIWITHTOKEN.delete("/user/todo/" + id)
    if (response.status !== 200) {
      dispatch(setTodoStatus(Status.ERROR))
      return
    };
    dispatch(setActiveTodoId(""))
    dispatch(deleteTodo({ todoId: id }))
    dispatch(setTodoStatus(Status.SUCCESS))
  }
}

// Delete A Entire Todo
export function deleteAnEntireTodo(id: string) {
  return async function deleteAnEntireTodoThunk(dispatch: AppDispatch) {
    if (!id) {
      dispatch(setTodoStatus(Status.ERROR));
      return;
    }


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
// Set Todo Life Cycle
export function updateTodoLifecycle({ id, lifecycle }: { id: string, lifecycle: todoLifecycle }) {
  return async function updateTodoLifecycleThunk(dispatch: AppDispatch) {
    const response = await APIWITHTOKEN.patch(`/user/todo/${id}/todo-lifecycle`, { todoLifecycle: lifecycle })
    if (response.status !== 200) {
      dispatch(setTodoStatus(Status.ERROR))
      return
    }
    // console.log(lifecycle);

    dispatch(setTodoStatus(Status.SUCCESS))
    dispatch(updateTodoUpdateAt({ id }))
    dispatch(setTodoLifecyle({ id, lifecycle }))
  }
}