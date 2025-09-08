import { Request, Response, Router } from "express";
import { isLoggedIn } from "../middlware/middleware";
import { IExtendedRequest } from "../middlware/index.type";

const router: Router = Router()
router.route("/").post(isLoggedIn, (req: IExtendedRequest, res: Response) => {
  try {
    res.status(200).json({
      message: "you have access middleware test route"
    })
  } catch {
    console.log("test error");

  }
})

export default router