import { Request, Response } from "express";
import { qb } from "../../configs/db-config";
import Crud from "../../models/crud-queries";
import { HTTP_CODES } from "../../constants/app-constants";
import {
  dataSuccessResponse,
  errMsgResponse,
  msgSuccessResponse,
} from "../../shared/helpers/response.hlpr";
import { orgTypeSelect, roleSelect } from "./user-ctx";
import { stripObjKeys } from "../../shared/utils/app-utils";

export const createUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  try {
    const query = new Crud("controll");
    const roles = await query.getByCustomQuery(roleSelect);
    throw new Error("unhandled");
  } catch (err: any) {
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
  }
};
