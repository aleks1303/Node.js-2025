import { Router } from "express";

import { userController } from "../controllers/user.contoller";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.create);



export const userRouter = router;
