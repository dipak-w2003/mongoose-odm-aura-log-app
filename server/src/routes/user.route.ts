import { Router } from "express"
import { createUser, deleteUser, getAllUsers, getSingleUser, loginUser, updateUser, verificationOTP, verifyUser } from "../controllers/global/auth/user.controller"
import { isLoggedIn } from "../middlware/middleware"
import asyncErrorHandler from "../services/async-error-handler.service"
const router: Router = Router()
// Common Routes
router.route('/register').post(asyncErrorHandler(createUser))
router.route('/login').post(asyncErrorHandler(loginUser))
router.route("/").get(asyncErrorHandler(getAllUsers))
router.route("/update").patch(isLoggedIn, asyncErrorHandler(updateUser))
router.route("/:id").get(asyncErrorHandler(getSingleUser)).delete(asyncErrorHandler(deleteUser))

// OTP Related Routes
router.route("/verification-otp").post(isLoggedIn, asyncErrorHandler(verificationOTP))
router.route("/verify-user").post(isLoggedIn, asyncErrorHandler(verifyUser))
export default router