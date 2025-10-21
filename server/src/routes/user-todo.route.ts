import { Router } from "express"
import { isLoggedIn } from "../middlware/middleware"
import { createTodo, deleteTodo, getTodos, setTodoArchive, setTodoTrashed, unsetTodoArchive, updateTodo } from "../controllers/user-todo.controller"
import asyncErrorHandler from "../services/async-error-handler.service"
const router: Router = Router()

router.route("/").post(isLoggedIn, asyncErrorHandler(createTodo)).get(isLoggedIn, asyncErrorHandler(getTodos))
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateTodo)).delete(isLoggedIn, asyncErrorHandler(deleteTodo))

// Extra Routes

router.route("/set-archived/:id").post(isLoggedIn, asyncErrorHandler(setTodoArchive))

router.route("/unset-archived/:id").post(isLoggedIn, asyncErrorHandler(unsetTodoArchive))

router.route("/set-trash/:id").post(isLoggedIn, asyncErrorHandler(setTodoTrashed))

router.route("/unset-trash/:id").post(isLoggedIn, asyncErrorHandler(unsetTodoArchive))

export default router