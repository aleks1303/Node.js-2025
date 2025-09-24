import { Router } from "express";

import { userController } from "../controller/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAllUsers);
router.post(
  "/",
  commonMiddleware.isBodyValid(userValidator),
  userController.createUser,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userValidator),
  userController.updateUser,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);

export const userRouter = router;
