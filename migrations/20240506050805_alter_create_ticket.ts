import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table
      .enum("status", ["PENDING", "IN_PROGRESS", "ACCEPTED", "CANCELLED"])
      .defaultTo("PENDING").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table.enum("status", ["PENDING", "ACCEPTED", "RESOLVED", "REJECTED"]).alter();
  });
}
