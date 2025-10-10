import { Router } from "express";

import { userService } from "../services/user.service";

const router = Router();

router.get("/users", userService.getAllUsers);

export const userRouter = router;
