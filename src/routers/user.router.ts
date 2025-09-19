import { Router } from "express";

const router = Router();

router.use("/", userController.getAllUsers);

export const userRouter = router;
