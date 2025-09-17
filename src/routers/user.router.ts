import { Router } from "express";

import { userController } from "../controllers/user.contoller";

const router = Router();

router.get("/users", userController.getAllUsers);
