import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api.error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).send(err.message);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message, error.stack);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
