import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: "streams_db",
      user: "postgres",
      password: 'postgres',
    },

    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "streams_db",
      user: "postgres",
      password: "postgres",
    },

    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
