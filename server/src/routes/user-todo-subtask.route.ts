import { Router } from "express";
import { isLoggedIn } from "../middlware/middleware";
import asyncErrorHandler from "../services/async-error-handler.service";
import { createSubTasks, deleteSubTasks, readSubTasks, setASubtaskCompletionStatus, setSubtaskCompletionMessage, updateEntireSubTasks } from "../controllers/user-todo-subtask.controller";
const router: Router = Router()
router.route("/")
  .post(isLoggedIn, asyncErrorHandler(createSubTasks))
  .get(isLoggedIn, asyncErrorHandler(readSubTasks))
  .put(isLoggedIn, asyncErrorHandler(updateEntireSubTasks))

router.route("/:id")
  .delete(isLoggedIn, asyncErrorHandler(deleteSubTasks))

router.route("/set-a-completion-status/:id").post(isLoggedIn, asyncErrorHandler(setASubtaskCompletionStatus))


router.route("/set-completion-status-message/:id").post(isLoggedIn, asyncErrorHandler(setSubtaskCompletionMessage))

export default router