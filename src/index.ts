import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users", userRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send(error.message);
});

const port = config.APP_PORT;
const host = config.APP_HOST;
const mongodb = config.MONGO_URI;

app.listen(port, async () => {
  await mongoose.connect(mongodb);
  console.log(`We are listening on https://${host}:${port}`);
});
