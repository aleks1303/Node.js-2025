import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUser);

export const userRouter = router;
