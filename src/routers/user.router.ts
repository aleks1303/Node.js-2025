import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

router.get(
  "/:userId",
  commonMiddleware.isInvalid("userId"),
  userController.getUserById,
);
router.put(
  "/:userId",
  commonMiddleware.isInvalid("userID"),
  userController.updateUser,
);
router.delete(
  "/:userId",
  commonMiddleware.isInvalid("userId"),
  userController.deleteUser,
);

export const userRouter = router;
