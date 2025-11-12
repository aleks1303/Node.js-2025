import Joi from "joi";

import { OrderEnum } from "../enums/order.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

class UserValidator {
  private name = Joi.string().min(3).max(20).trim().required();
  private age = Joi.number().min(1).max(120).required();
  private email = Joi.string().email().trim().required();
  private password = Joi.string().min(6).required();
  private phone = Joi.string();

  public create = Joi.object({
    name: this.name,
    age: this.age,
    email: this.email,
    password: this.password,
    phone: this.phone,
  });

  public update = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public signIn = Joi.object({
    email: this.email,
    password: this.password,
  });

  public changePassword = Joi.object({
    password: this.password,
    oldPassword: this.password,
  });

  public listQuery = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(1).default(1),
    search: Joi.string().trim().lowercase(),
    order: Joi.string().valid(...Object.values(OrderEnum)),
    orderBy: Joi.string().valid(...Object.values(UserListOrderByEnum)),
  });
}
export const userValidator = new UserValidator();
