import { Router } from "express";

import { authController } from "../controllers/auth.controller";
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

router.post("/forgot-password", authController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkActionToken,
  authController.forgotPasswordSet,
);

router.post(
  "/change-password",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(userValidator.changePassword),
  authController.changePassword,
);

router.post("/verify", authController.verify);
router.get(
  "/verify/:token",
  authMiddleware.checkVerifyToken,
  authController.verifyEmail,
);

export const authRouter = router;
