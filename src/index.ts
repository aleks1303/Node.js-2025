import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message, error.stack);
});

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send(error.message);
});

const port = config.APP_PORT;
const host = config.APP_HOST;
const mongoDb = config.MONGO_URI;
app.listen(port, async () => {
  await mongoose.connect(mongoDb);
  console.log(`Server started on http://${host} :${port}`);
});
