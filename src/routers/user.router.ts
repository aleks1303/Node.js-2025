import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.use("/", userController.getAllUsers);
router.use("/", userController.createUser);

export const userRouter = router;
