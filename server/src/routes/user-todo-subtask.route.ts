import { Router } from "express";
import { isLoggedIn } from "../middlware/middleware";
import asyncErrorHandler from "../services/async-error-handler.service";
import { createSubTasks, deleteSubTasks, readSubTasks, setSubtaskCompletionMessage, unsetSubtaskCompletionStatus, updateEntireSubTasks } from "../controllers/user-todo-subtask.controller";
const router: Router = Router()
router.route("/")
  .post(isLoggedIn, asyncErrorHandler(createSubTasks))
  .get(isLoggedIn, asyncErrorHandler(readSubTasks))
  .put(isLoggedIn, asyncErrorHandler(updateEntireSubTasks))

router.route("/:id")
  .delete(isLoggedIn, asyncErrorHandler(deleteSubTasks))

router.route("/unset-completion-status/:id").post(isLoggedIn, asyncErrorHandler(unsetSubtaskCompletionStatus))


router.route("/set-completion-status-message/:id").post(isLoggedIn, asyncErrorHandler(setSubtaskCompletionMessage))

export default router