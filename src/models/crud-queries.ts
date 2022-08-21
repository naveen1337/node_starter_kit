import dbConnection, { qb } from "../configs/db-config";
import { DB_ERRORS } from "../constants/app-constants";

type Input = string | number;

interface DbTxtnReturn {
  txn: boolean;
  data?: any;
  msg?: any;
}

export default class CrudQuery {
  protected name: string;
  protected table: string;
  constructor(name: string, table?: string) {
    this.name = name;
    this.table = table;
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

  async insertCustomQuery(sqlQuery: string): Promise<DbTxtnReturn> {
    let connection: any;
    try {
      connection = await dbConnection.connect();
      const response: any = await connection.query(sqlQuery);
      if (response) {
        return successResponse(response.rowCount);
      } else {
        failResponse(`failed to insert query`);
      }
      connection.release();
    } catch (err) {
      console.log(err);
      connection?.release();
      return {
        txn: false,
      };
    }
  }

  async getByCustomQuery(sqlQuery: string): Promise<DbTxtnReturn> {
    let connection: any;
    try {
      connection = await dbConnection.connect();
      const response: any = await connection.query(sqlQuery);
      if (response.rowCount > 0) {
        return successResponse(response.rows);
      } else {
        failResponse(`no ${this.name} Found`);
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
}

const successResponse = (data: any) => ({ txn: true, data });
const failResponse = (message: string) => {
  throw message;
};
