import Joi from "joi";

class UserValidator {
  private name = Joi.string().min(3).max(20).trim();
  private age = Joi.number().min(1).max(120);
  private email = Joi.string().email();
  private password = Joi.string().min(7);
  private phone = Joi.string();

  public create = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone,
  });

  public update = Joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public signIn = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
export const userValidator = new UserValidator();
