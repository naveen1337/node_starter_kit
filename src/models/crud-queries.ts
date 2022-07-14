import dbConnection, { qb } from "../configs/db-config";
import { DB_ERRORS } from "../constants/app-constants";

type Input = string | number;

interface DbTxtnReturn {
  txn: boolean;
  data?: any;
}

export default class CrudQuery {
  protected name: string;
  protected table: string;
  constructor(name: string, table: string) {
    this.name = name;
    this.table = table;
  }
  // get the record by columnName and value
  async getARecord(columnName: string, value: Input): Promise<DbTxtnReturn> {
    let connection: any;
    try {
      if (!columnName || !value) {
        throw new Error("invalid input");
      }
      const sqlQuery = qb
        .select("*")
        .where(columnName, value)
        .from(this.table)
        .toString();
      connection = await dbConnection.getConnection();
      const response = await connection.execute(sqlQuery);
      if (response && response[0].length > 0) {
        return successResponse(response[0]);
      }
      throw new Error("no results found");
    } catch (err) {
      // console.log("getRecord -->", err);
      return { txn: false };
    } finally {
      connection?.release();
    }
  }

  async create(payload: any) {
    let connection: any;
    try {
      const sqlQuery = qb(this.table).insert(payload).toString();
      connection = await dbConnection.getConnection();
      const response = await connection.execute(sqlQuery);
      console.log(response);

      if (response) {
        return successResponse(response[0]);
      } else {
        return { txn: false };
      }
    } catch (err) {
      console.log(err);
      return { txn: false };
    } finally {
      connection?.release();
    }
  }

  async getAll(payload: any) {
    let connection: any;
    try {
      const sqlQuery = qb.select("*").from(this.table).toString();
      connection = await dbConnection.getConnection();
      const response: any[] = await dbConnection.execute(sqlQuery);
      if (response && response[0].length > 0) {
        return successResponse(response[0]);
      } else {
        failResponse(`No ${this.name} Found`);
      }
    } catch (err) {
      return {
        status: false,
        message: err || "Unhandled Error Get all Modal",
      };
    } finally {
      connection?.release();
    }
  }
  // need to change by new design
  async getById(id: Input) {
    let connection: any;
    try {
      const sqlQuery = qb
        .select("*")
        .where("id", id)
        .from(this.table)
        .toString();
      connection = await dbConnection.getConnection();
      const response: any[] = await connection.execute(sqlQuery);

      if (response && response[0].length > 0) {
        return successResponse(response[0]);
      } else {
        failResponse(`No ${this.name} Found`);
      }
    } catch (err) {
      // console.log(err);
      return {
        txn: false,
      };
    } finally {
      connection?.release();
    }
  }
  async getByCustomQuery(sqlQuery: string) {
    let connection: any;
    try {
      connection = await dbConnection.getConnection();
      const response: any = await connection.execute(sqlQuery);
      connection?.release();

      if (response && response[0].length === 1) {
        return successResponse(response[0]);
      } else {
        failResponse(`No ${this.name} Found`);
      }
    } catch (err) {
      console.log(err);
      connection?.release();

      return {
        txn: false,
      };
    }
  }

  async update(columnName: string, columnValue: any, payload: any) {
    let connection: any;
    try {
      const sqlQuery = qb(this.table)
        .where(columnName, columnValue)
        .update(payload)
        .toString();

      connection = await dbConnection.getConnection();
      const response: any = await connection.execute(sqlQuery);
      connection?.release();

      if (response) {
        return successResponse(response[0].affectedRows);
      } else {
        failResponse(`Failed to Update`);
      }
    } catch (err) {
      console.log(err);
      connection?.release();

      return {
        txn: false,
      };
    }
  }

  async deleteByColumn(columnname: string, columnValue: any) {
    let connection: any;
    try {
      const sqlQuery = qb
        .from(this.table)
        .where(columnname, columnValue)
        .del()
        .toString();
      connection = await dbConnection.getConnection();
      const response: any = await connection.execute(sqlQuery);
      connection?.release();

      if (response && response[0].affectedRows > 0) {
        return successResponse(response[0].affectedRows);
      } else {
        failResponse(`Failed to Delete ${this.name}`);
      }
    } catch (err) {
      connection?.release();

      console.log(err);
      return {
        txn: false,
      };
    }
  }
}

const successResponse = (data: any) => ({ txn: true, data });
const failResponse = (message: string) => {
  throw message;
};
