import { Router } from "express"
import { isLoggedIn } from "../middlware/middleware"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/user-todo.controller"
import asyncErrorHandler from "../services/async-error-handler.service"
const router: Router = Router()

router.route("/").post(isLoggedIn, asyncErrorHandler(createTodo)).get(isLoggedIn, asyncErrorHandler(getTodos))
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateTodo)).delete(isLoggedIn, asyncErrorHandler(deleteTodo))
export default router