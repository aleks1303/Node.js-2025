import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/users", userController.getList);
router.post("/users", userController.create);

export const userRouter = router;
