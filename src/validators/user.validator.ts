import Joi from "joi";

export class UserValidator {
  private static name = Joi.string().min(3).max(20).trim();
  private static age = Joi.number().min(1).max(120);
  private static email = Joi.string().email();
  private static password = Joi.string().min(7);
  private static phone = Joi.string();

  public static create = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone,
  });

  public static update = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public static signIn = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
