import { Router } from "express"
import { isLoggedIn } from "../middlware/middleware"
import asyncErrorHandler from "../services/async-error-handler.service"
import { createBlog, deleteBlog, getBlogBySlug, getBlogs, updateBlog } from "../controllers/user-blog.controller"
const router: Router = Router()

router.route("/").post(isLoggedIn, asyncErrorHandler(createBlog)).get(isLoggedIn, asyncErrorHandler(getBlogs))

router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateBlog)).delete(isLoggedIn, asyncErrorHandler(deleteBlog))

router.route("/:slug").get(isLoggedIn, asyncErrorHandler(getBlogBySlug))
export default router