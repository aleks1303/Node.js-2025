import express from "express";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/auth", authRouter);
// app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
