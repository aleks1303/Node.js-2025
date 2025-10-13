import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteById,
);

export const userRouter = router;
