import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
