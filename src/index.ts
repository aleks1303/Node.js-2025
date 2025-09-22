import express from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users", userRouter);

const port = config.APP_PORT;
const host = config.APP_HOST;
const mongodb = config.MONGO_URI;

app.listen(port, () => {
  mongoose.connect(mongodb);
  console.log(`We are listening on ${host}: ${port}`);
});
