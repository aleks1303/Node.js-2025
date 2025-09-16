import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.create);
router.get("/:userId", userController.getUserByID);

export const userRouter = router;
