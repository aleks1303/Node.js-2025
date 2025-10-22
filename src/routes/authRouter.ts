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

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(userValidator.signIn),
  authController.singIn,
);

router.post("/refresh", authController.refresh);

export const authRouter = router;
