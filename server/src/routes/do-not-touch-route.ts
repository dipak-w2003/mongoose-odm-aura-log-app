import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlware/middleware";
import { DoNotTouchController } from "../controllers/do-not-touch-controller";
import asyncErrorHandler from "../services/async-error-handler.service";

const router = Router();
// ⚠️ Admin-only routes — must be logged in + admin
router.delete(
  "/wipe-database",
  isLoggedIn,
  isAdmin,
  asyncErrorHandler(DoNotTouchController.deleteDatabase)
);

router.delete(
  "/delete-user/",
  isLoggedIn,
  isAdmin,
  asyncErrorHandler(DoNotTouchController.deleteUserAndLinked)
);

export default router;
