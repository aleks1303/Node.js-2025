import { Router } from "express";

const router = Router();

router.get("/", userController.getAllUsers());

export const userRouter = router;
