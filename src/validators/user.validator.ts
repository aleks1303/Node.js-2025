import Joi from "joi";

export const userValidator = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.string().min(1).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  phone: Joi.string(),
});
