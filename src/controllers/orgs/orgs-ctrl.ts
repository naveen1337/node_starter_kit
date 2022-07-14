import { Request, Response } from "express";
import { qb } from "../../configs/db-config";
import Crud from "../../models/crud-queries";
import { HTTP_CODES } from "../../constants/app-constants";
import {
  errMsgResponse,
  msgSuccessResponse,
} from "../../shared/helpers/response.hlpr";
import { stripObjKeys } from "../../shared/utils/app-utils";

export const createOrg = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  try {
    const query = new Crud("Organizaion", "orgs");
    const dbTxn = await query.create(res.locals.newOrg);
    if (dbTxn.txn) {
      msgSuccessResponse(HTTP_CODES.OK, 1, res);
      return
    } else {
      msgSuccessResponse(HTTP_CODES.OK, 0, res);
      return;
    }
    throw new Error();
  } catch (err: any) {
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
  }
};
