import { Router } from "express";

import { authController } from "../controllers/authController";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(userValidator.create),
  authController.signUp,
);

export const authRouter = router;
