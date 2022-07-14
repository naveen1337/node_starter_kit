import mysql from "mysql2/promise";
import knex from "knex";

// knex query Builder
export const qb = knex({
  client: "mysql",
});

export const dbConnection: mysql.Pool = mysql.createPool({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: false,
  connectionLimit: 2,
  queueLimit: 0,
});

export default dbConnection;
