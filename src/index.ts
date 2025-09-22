import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("We are listening on port 3000");
});
