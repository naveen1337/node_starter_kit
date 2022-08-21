import knex from "knex";
import { Pool } from "pg";

// knex query Builder
export const qb = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: "migrations",
  },
});

export const dbConnection = new Pool({
  host: "127.0.0.1",
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 2,
});

export default dbConnection;
