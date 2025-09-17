import { Router } from "express";

import { userController } from "../controllers/user.contoller";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.create);

router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.update);

export const userRouter = router;
