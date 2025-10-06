import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getById);

export const userRouter = router;
