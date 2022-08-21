import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    territory(knex),
    users(knex),
    organization(knex),
    userInfo(knex),
    areaBlocks(knex),
  ]);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("area_blocks")
    .dropTable("user_info")
    .dropTable("org")
    .dropTable("territory")
    .dropTable("user");
}

function areaBlocks(knex: Knex) {
  return knex.schema.createTable("area_blocks", (qb) => {
    qb.string("block_id").primary(),
      qb.string("block_name").notNullable(),
      qb.string("territory_id").notNullable(),
      qb.string("territory_color").notNullable(),
      qb.string("block_state_id").notNullable(),
      qb.string("block_country_id").notNullable(),
      qb.integer("block_houses"),
      qb.text("coords"),
      qb.boolean("in_service").defaultTo(true).notNullable(),
      qb.dateTime("deleted_at");
  });
}

function territory(knex: Knex) {
  return knex.schema.createTable("territory", (qb) => {
    qb.string("territory_id").primary(),
      qb.string("name"),
      qb.string("address"),
      qb.string("country"),
      qb.string("state"),
      qb.string("zipcode"),
      qb.integer("houses"),
      qb.string("lat"),
      qb.string("lng"),
      qb.boolean("in_service").defaultTo(true).notNullable(),
      qb.dateTime("deleted_at"),
      qb.timestamps(true, true);
  });
}

function users(knex: Knex) {
  return knex.schema.createTable("user", (qb) => {
    qb.integer("user_id").primary(),
      qb.string("f_name", 70).notNullable(),
      qb.string("l_name", 70).notNullable(),
      qb.string("email", 70).unique().notNullable(),
      qb.string("password").notNullable(),
      qb.string("phone", 16),
      qb.string("zipcode", 10).notNullable(),
      qb.integer("rank").references("rank").inTable("rank").notNullable(),
      qb.integer("org_id"),
      qb.string("location", 70).notNullable(),
      qb.string("address").notNullable(),
      qb.boolean("in_service").defaultTo(true).notNullable(),
      qb.dateTime("deleted_at"),
      qb.timestamps(true, false);
  });
}

function userInfo(knex: Knex) {
  return knex.schema.createTable("user_info", (qb) => {
    qb.integer("user_id").primary().references("user_id").inTable("user"),
      qb.enu("gender", ["male", "female"]),
      qb.string("address").notNullable(),
      qb.string("image"),
      qb.timestamps(true, false);
  });
}

function organization(knex: Knex) {
  return knex.schema.createTable("org", (qb) => {
    qb.increments("org_id"),
      qb
        .string("territory_id")
        .references("territory_id")
        .inTable("territory")
        .index()
        .notNullable(),
      qb.string("name").unique(),
      qb.string("location", 70),
      qb
        .integer("created_by")
        .references("user_id")
        .inTable("user")
        .notNullable(),
      qb
        .integer("org_type")
        .references("org_type_id")
        .inTable("org_type")  
        .notNullable(),
      qb.boolean("in_service").defaultTo(true).notNullable(),
      qb.dateTime("deleted_at"),
      qb.timestamps(true, false);
  });
}
