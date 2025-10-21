import { Router } from "express";

import { authController } from "../controllers/authController";

const router = Router();

router.post("/me", authController.createMe);

export const authRouter = router;
