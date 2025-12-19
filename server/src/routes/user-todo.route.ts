import { Router } from "express"
import { isLoggedIn } from "../middlware/middleware"
import { createTodo, deleteTodo, getTodos, setTodoLifecycle, updateTodo } from "../controllers/user-todo.controller"
import asyncErrorHandler from "../services/async-error-handler.service"
const router: Router = Router()

router.route("/").post(isLoggedIn, asyncErrorHandler(createTodo)).get(isLoggedIn, asyncErrorHandler(getTodos))
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateTodo)).delete(isLoggedIn, asyncErrorHandler(deleteTodo))

// Extra Routes
router.route("/:id/todo-lifecycle").patch(isLoggedIn, asyncErrorHandler(setTodoLifecycle))

export default router