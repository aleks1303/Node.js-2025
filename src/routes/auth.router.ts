import { Router } from "express";

import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth.middleware";
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

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/logout", authMiddleware.checkRefreshToken, authController.logout);
router.post(
  "/logout-all",
  authMiddleware.checkRefreshToken,
  authController.logoutAll,
);

export const authRouter = router;
