import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { userRouter } from "./routes/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).send(err.message);
});

app.use("/users", userRouter);

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message, error.stack);
});

const port = configs.APP_PORT;
const host = configs.APP_HOST;
const mongoDb = configs.MONGO_URI;

app.listen(port, async () => {
  await mongoose.connect(mongoDb);
  console.log(`Server started on http://${host}:${port}`);
});
