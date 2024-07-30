import * as Joi from "joi";
import { regex } from "../constants/regex";

const validUserTypes = ["user", "admin"];
export const userValidator = {
  createUser: Joi.object({
    salt: Joi.string().optional(),
    userName: Joi.string().required(),
    email: Joi.string()
      .regex(regex.email)
      .required()
      .messages({ "string.pattern.base": "email not valid" })
      .trim(),
    password: Joi.string()
      .regex(regex.password)
      .required()
      .min(8)
      .max(24)
      .messages({ "string.pattern.base": "password not valid" })
      .trim(),
    type: Joi.any().valid(...validUserTypes),
  }),
  login: Joi.object({
    userName: Joi.string()
      .required()
      .messages({ "string.pattern.base": "userName not valid" })
      .trim(),
    password: Joi.string()
      .required()
      .required()
      .min(8)
      .max(24)
      .regex(regex.password)
      .messages({ "string.pattern.base": "password not valid" })
      .trim(),
  }),
};
