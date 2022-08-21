import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return Promise.all([productCategories(knex), products(knex)]);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("product").dropTable("product_category");
}

function productCategories(knex: Knex) {
  return knex.schema.createTable("product_category", (qb) => {
    qb.increments("cat_id"),
      qb.string("cat_name").notNullable(),
      qb.dateTime("deleted_at"),
      qb.boolean("in_service").notNullable().defaultTo(true);
  });
}

function products(knex: Knex) {
  return knex.schema.createTable("product", (qb) => {
    qb.increments("product_id"),
      qb.integer("cat_id").references("cat_id").inTable("product_category"),
      qb.string("name").notNullable(),
      qb.string("desc").notNullable(),
      qb.string("image").notNullable(),
      qb.dateTime("deleted_at");
    qb.boolean("in_service").notNullable().defaultTo(true);
  });
}
