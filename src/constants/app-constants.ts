/* eslint-disable @typescript-eslint/naming-convention */
export const HTTP = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_DOWN: 500,
  INVALID_INPUT: 700,
  DB_CONSTRAINT: 701,
  ENTRY_FAILED: 703,
  UNKNOWN_ERROR: 799,
  ER_DUP_ENTRY:1062,
};

export const DB_ERRORS = {
  111: "MYSQL_CONNECTION_FAILED",
  1045: "MYSQL_ACCESS_DENIED",
  1046: "MYSQL_DATABASE_NOT_SELECTED",
  1062: "MYSQL_DUPLICATE_ENTRY",
  1146: "MYSQL_TABLE_DID_NOT_EXIST",
  1054: "MYSQL_UNKNOWN_COLUMN",
  1064: "MYSQL_PARSE_ERROR",
  1364: "MYSQL_VALUE_REQURIED",
  1452: "MYSQL_CANT_UPDATE_FORIEGN_KEY",
};
