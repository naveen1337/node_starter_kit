import Joi from "joi";
import {
  errDataResponse,
  errMsgResponse,
} from "../../shared/helpers/response.hlpr";
import { HTTP_CODES } from "../../constants/app-constants";

export function xInputCreateOrg(req: any, res: any, next: any) {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      location: Joi.string().min(3).max(100).required(),
      in_service: Joi.boolean().required(),
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
      res.locals.newOrg = validation.value;
      next();
      return;
    }
    throw new Error("xInputCreateOrg err");
  } catch (err) {
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
    // console.log(err);
  }
}
