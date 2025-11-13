import Joi from "joi";

import { OrderEnum } from "../enums/order.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export class UserValidator {
  private static name = Joi.string().min(3).max(20).trim().required();
  private static age = Joi.number().min(1).max(120).required();
  private static email = Joi.string().email().trim().required();
  private static password = Joi.string().min(6).required();
  private static phone = Joi.string();

  public static create = Joi.object({
    name: this.name,
    age: this.age,
    email: this.email,
    password: this.password,
    phone: this.phone,
  });

  public static update = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public static signIn = Joi.object({
    email: this.email,
    password: this.password,
  });

  public static changePassword = Joi.object({
    password: this.password,
    oldPassword: this.password,
  });

  public static listQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim().lowercase(),
    order: Joi.string().valid(...Object.values(OrderEnum)),
    orderBy: Joi.string().valid(...Object.values(UserListOrderByEnum)),
  });
}
