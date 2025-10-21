import Joi from "joi";

class UserValidator {
  private name = Joi.string().min(3).max(20).trim().required();
  private age = Joi.number().min(1).max(120).required();
  private email = Joi.string().email().trim().required();
  private password = Joi.string().min(6).required();
  private phone = Joi.string();

  public create() {
    name = this.name;
  }
}
export const userValidator = new UserValidator();
