import express from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/auth", authRouter);
// app.use("/users", userRouter);

// app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
//
// });

const port = config.APP_PORT;
const host = config.APP_HOST;
const mongoDb = config.MONGO_URI;
app.listen(port, async () => {
  await mongoose.connect(mongoDb);
  console.log(`Server started on http://${host}:${port}`);
});
