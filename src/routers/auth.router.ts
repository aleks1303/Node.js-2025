import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isValidBody(userValidator),
  authController.signUp,
);

router.post(
  "/sign-in",
  // commonMiddleware.isValidBody(userValidator),
  authController.signIn,
);
export const authRouter = router;
