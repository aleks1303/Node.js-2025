import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/me", commonMiddleware.isIdValid("userId"), userController.getById);

router.delete(
  "/me",
  commonMiddleware.isIdValid("userId"),
  userController.deleteById,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
export const userRouter = router;
