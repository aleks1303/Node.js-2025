// import express, { NextFunction, Request, Response } from "express";
//
// import { ApiError } from "./errors/api-error";
// import { userRouter } from "./routers/user.router";
//
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//

// app.use("/users", userRouter);
// // app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     const users = await read();
// //     return res.send(users);
// //   } catch (e) {
// //     next(e);
// //   }
// // });
//

// // app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
// //   try {
// //     const { name, age, email, password } = req.body;
// //     const users = await read();
// //     if (!name || name.length < 3) {
// //       throw new ApiError("Name is wrong", 400);
// //     }
// //     if (age <= 0 || age > 120) {
// //       throw new ApiError("Age is wrong", 400);
// //     }
// //     if (!email || !email.includes("@")) {
// //       throw new ApiError("Email is wrong", 400);
// //     }
// //     if (!password || password.length < 6) {
// //       throw new ApiError("Password is wrong", 400);
// //     }
// //     const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
// //     const newUser = { id, name, age, email, password };
// //     users.push(newUser);
// //     await write(users);
// //     return res.status(201).send(newUser);
// //   } catch (e) {
// //     next(e);
// //   }
// // });

// // app.get(
// //   "/users/:userId",
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //       const userId = Number(req.params.userId);
// //       const users = await read();
// //       const user = users.find((user) => user.id === userId);
// //       if (!user) {
// //         throw new ApiError("User not found", 404);
// //       }
// //       return res.send(user);
// //     } catch (e) {
// //       next(e);
// //     }
// //   },
// // );

// // app.put(
// //   "/users/:userId",
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //       const userId = Number(req.params.userId);
// //       const users = await read();
// //       const user = users.findIndex((user) => user.id === userId);
// //       if (user === -1) {
// //         throw new ApiError("User Not Found", 404);
// //       }
// //       const { name, age, email, password } = req.body;
// //       users[user].name = name;
// //       users[user].age = age;
// //       users[user].email = email;
// //       users[user].password = password;
// //       await write(users);
// //       return res.status(201).send(users[user]);
// //     } catch (e) {
// //       next(e);
// //     }
// //   },
// // );
// //
// // app.delete(
// //   "/users/:userId",
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //       const userId = Number(req.params.userId);
// //       const users = await read();
// //       const user = users.findIndex((user) => user.id === userId);
// //       if (user === -1) {
// //         throw new ApiError("User not found", 404);
// //       }
// //       users.splice(user, 1);
// //       await write(users);
// //       return res.sendStatus(204);
// //     } catch (e) {
// //       next(e);
// //     }
// //   },
// // );
//
// app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
//   res.status(error.status || 500).send(error.message);
// });
//
// // ловить помилки які ми не хендлимо (наприклад в асинхронному коді) і показує що трапилось
// process.on("uncaughtException", (error) => {
//   console.error("uncaughtException", error.message, error.stack);
// });
//
// app.listen(3000, () => {
//   console.log("We are listening on port 3000");
// });

import express from "express";

import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
// app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
//   res.status(error.status || 500).send(error.message);
// });

app.listen(3000, () => {
  console.log("We are listening on port 3000");
});
