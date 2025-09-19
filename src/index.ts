import express, { NextFunction, Request, Response } from "express";

import { config } from "./config/configs";
import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    error.status
  },
);

const port = config.APP_PORT;
const host = config.APP_HOST;
app.listen(port, () => {
  console.log(`Server started on http://${host}:${port}`);
});
