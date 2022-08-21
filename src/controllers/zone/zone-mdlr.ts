import Joi from "joi";
import express, { Router, Request } from "express";
import {
  dataSuccessResponse,
  errDataResponse,
  errMsgResponse,
} from "../../shared/helpers/response.hlpr";
import { HTTP } from "../../constants/app-constants";
import Crud from "../../models/crud-queries";
import { territoryByIdSelect, territoryByZipCodeSelect } from "./zone-ctx";

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
        HTTP.INVALID_INPUT,
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
    errMsgResponse(HTTP.UNKNOWN_ERROR, "unknown error", res);
    // console.log(err);
  }
}

export async function getByTerritoryByInput(req: Request, res: any, next: any) {
  try {
    const { territory_id, zipcode } = req.query;
    if (typeof territory_id === "string") {
      const query = new Crud("Territory", "territory");
      const territoyByIdDb = await query.getByCustomQuery(
        territoryByIdSelect(territory_id)
      );
      if (territoyByIdDb.txn) {
        dataSuccessResponse(HTTP.OK, territoyByIdDb.data[0], res);
        return;
      } else {
        errMsgResponse(HTTP.NOT_FOUND, "no territory found", res);
        return;
      }
    }

    if (typeof zipcode === "string") {
      const query = new Crud("Territory", "territory");
      const territoyByIdDb = await query.getByCustomQuery(
        territoryByZipCodeSelect(zipcode)
      );
      if (territoyByIdDb.txn) {
        dataSuccessResponse(HTTP.OK, territoyByIdDb.data[0], res);
        return;
      } else {
        errMsgResponse(HTTP.NOT_FOUND, "no territory found", res);
        return;
      }
    }
    next();
  } catch (err) {
    errMsgResponse(HTTP.UNKNOWN_ERROR, "unknown error", res);
  }
}
