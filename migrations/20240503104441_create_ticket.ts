import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("tickets", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description");
    table.string("contact").notNullable();
    table.enum("status", ["PENDING", "ACCEPTED", "RESOLVED", "REJECTED"]);
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tickets");
}
