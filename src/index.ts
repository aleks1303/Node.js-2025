import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).send(err.message);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message, error.stack);
});

const port = config.APP_PORT;
const host = config.APP_HOST;
const mongoDb = config.MONGO_URI;
app.listen(port, async () => {
  await mongoose.connect(mongoDb);
  console.log(`Server started on http://${host}:${port} `);
});
