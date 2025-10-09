import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/me", commonMiddleware.isIdValid("userId"), userController.getById);

router.put("/me", authMiddleware.checkAccessToken, userController.updateMe);

router.delete(
  "/me",
  authMiddleware.checkAccessToken,
  userController.deleteById,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
export const userRouter = router;
