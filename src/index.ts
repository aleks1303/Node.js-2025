import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api.error";
import { userRouter } from "./routers/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send(error.message);
});
process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
});

app.listen(3000, () => {
  console.log("We are listening on port 3000");
});
