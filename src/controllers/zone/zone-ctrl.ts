import { Request, Response } from "express";
import { qb } from "../../configs/db-config";
import fs from "fs";
import Crud from "../../models/crud-queries";
import { HTTP } from "../../constants/app-constants";
import {
  dataSuccessResponse,
  errMsgResponse,
  msgSuccessResponse,
} from "../../shared/helpers/response.hlpr";
import { allTerritorySelect, allZoneSelect, byZoneIdSelect, createZone } from "./zone-ctx";
import { stripObjKeys } from "../../shared/utils/app-utils";
import csv from "csv-parser";

export async function getAllAreaBlocks(
  req: Request,
  res: Response,
  next: any
): Promise<void> {
  try {
    const query = new Crud("Area Block", "area_blocks");
    const getZonesDb = await query.getByCustomQuery(allZoneSelect());
    if (getZonesDb.txn) {
      dataSuccessResponse(HTTP.OK, getZonesDb.data, res);
    } else {
      errMsgResponse(HTTP.NOT_FOUND, "no zones found", res);
    }
  } catch (err) {
    errMsgResponse(HTTP.UNKNOWN_ERROR, "unknown error", res);
  }
}

export async function getAllTerritory(
  req: Request,
  res: Response,
  next: any
): Promise<void> {
  try {
    const query = new Crud("Territory", "territory");
    const getZonesDb = await query.getByCustomQuery(allTerritorySelect());
    if (getZonesDb.txn) {
      dataSuccessResponse(HTTP.OK, getZonesDb.data, res);
    } else {
      errMsgResponse(HTTP.NOT_FOUND, "no territories found", res);
    }
  } catch (err) {
    errMsgResponse(HTTP.UNKNOWN_ERROR, "unknown error", res);
  }
}

export async function getAllZones(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const query = new Crud("Territory", "territory");
    const dbTxn = await query.getByCustomQuery(allZoneSelect);
    if (dbTxn.txn) {
      dataSuccessResponse(HTTP_CODES.OK, dbTxn.data, res);
      return;
    }
    throw new Error("Unhanled");
  } catch (err) {
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isInteger(id) === false) {
      errMsgResponse(HTTP_CODES.BAD_REQUEST, "invalid id", res);
      return;
    }

    const query = new Crud("Territory", "territory");
    const dbTxn = await query.getByCustomQuery(byZoneIdSelect(id));
    if (dbTxn.txn) {
      dataSuccessResponse(HTTP_CODES.OK, dbTxn.data, res);
      return;
    } else {
      errMsgResponse(HTTP_CODES.NOT_FOUND, "zone not found", res);

      return;
    }
    throw new Error("Unhanled");
  } catch (err) {
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
  }
}

export async function filterZones(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const query = new Crud("Territory", "territory");
    const dbTxn = await query.getByCustomQuery(allZoneSelect);
    if (dbTxn.txn) {
      dataSuccessResponse(HTTP_CODES.OK, dbTxn.data, res);
      return;
    }
    throw new Error("Unhanled");
  } catch (err) {
    errMsgResponse(HTTP_CODES.UNKNOWN_ERROR, "unknown error", res);
  }
}
