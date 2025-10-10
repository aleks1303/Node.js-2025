import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getById);
router.delete("/:userId", userController.deleteById);

export const userRouter = router;
