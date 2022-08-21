import Joi from "joi";

import {
  errDataResponse,
  errMsgResponse,
} from "../../shared/helpers/response.hlpr";
import { HTTP_CODES } from "../../constants/app-constants";


export function xInputCreateUser(req: any, res: any, next: any) {
  try {
    const schema = Joi.object({
      f_name: Joi.string().lowercase().min(1).max(40).required(),
      l_name: Joi.string().lowercase().min(3).max(40).required(),
      org_id: Joi.number().required(),
      email: Joi.string()
        .lowercase()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().lowercase().min(6).max(40).required(),
      location: Joi.string().lowercase().min(6).max(40).required(),
      role: Joi.number().required(),
      approved_by: Joi.number().required(),
      gender: Joi.number().required(),
      // TODO: validate later
      dob: Joi.string().required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      errDataResponse(
        HTTP_CODES.INVALID_INPUT,
        validation.error.details[0].message,
        res
      );
      return;
    }
    if (validation.value) {
      res.locals.newUser = validation.value;
      next();
      return;
    }
    throw new Error("xInputCreateOrg err");
  } catch (err) {
    console.error(err);
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
  }
}
