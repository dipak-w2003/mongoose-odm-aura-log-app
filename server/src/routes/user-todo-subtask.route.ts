import { Router } from "express";
import { isLoggedIn } from "../middlware/middleware";
import asyncErrorHandler from "../services/async-error-handler.service";
import { createSubTasks, deleteSubTasks, readSubTasks, updateEntireSubTasks } from "../controllers/user-todo-subtask.controller";
const router: Router = Router()
router.route("/")
  .post(isLoggedIn, asyncErrorHandler(createSubTasks))
  .get(isLoggedIn, asyncErrorHandler(readSubTasks))
  .put(isLoggedIn, asyncErrorHandler(updateEntireSubTasks))

router.route("/:id")
  .delete(isLoggedIn, asyncErrorHandler(deleteSubTasks))
export default router