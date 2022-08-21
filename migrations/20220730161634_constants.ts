import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  const control = knex.schema.createTable("control", (qb) => {
    qb.increments("id"),
      qb.boolean("in_maintainance").notNullable().defaultTo(false),
      qb.float("ios_version").notNullable().defaultTo(0.1),
      qb.float("android_version").notNullable().defaultTo(0.1);
  });

  const rank = knex.schema.createTable("rank", (qb) => {
    qb.integer("rank").primary(),
      qb.string("name").notNullable().unique(),
      qb.timestamps(true, true);
  });

  const orgType = knex.schema.createTable("org_type", (qb) => {
    qb.integer("org_type_id").primary(),
      qb.string("name").notNullable(),
      qb.string("code").notNullable(),
      qb.dateTime("deleted_at").index();
  });

  return Promise.all([control, rank, orgType]);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("control")
    .dropTable("rank")
    .dropTable("org_type");
}
