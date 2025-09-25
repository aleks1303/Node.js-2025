import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

router.get("/:userId", userController.getById);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.deleteById);

export const userRouter = router;
