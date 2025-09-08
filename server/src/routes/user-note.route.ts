import { Router } from 'express'
import { isLoggedIn } from '../middlware/middleware'
import asyncErrorHandler from '../services/async-error-handler.service'
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/user-note.controller'
const router: Router = Router()
router.route("/").post(isLoggedIn, asyncErrorHandler(createNote)).get(isLoggedIn, asyncErrorHandler(getNotes))
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateNote)).delete(isLoggedIn, asyncErrorHandler(deleteNote))
export default router