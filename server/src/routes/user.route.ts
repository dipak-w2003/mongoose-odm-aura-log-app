import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getSingleUser, loginUser, updateUser } from "../controllers/global/auth/user.controller"
import { isLoggedIn } from "../middlware/middleware"
import asyncErrorHandler from "../services/async-error-handler.service"
const router: Router = Router()
// get all users
router.route('/register').post(asyncErrorHandler(createUser))
router.route('/login').post(asyncErrorHandler(loginUser))
router.route("/").get(asyncErrorHandler(getAllUsers))
router.route("/update").patch(isLoggedIn, asyncErrorHandler(updateUser))
router.route("/:id").get(asyncErrorHandler(getSingleUser)).delete(asyncErrorHandler(deleteUser))

export default router