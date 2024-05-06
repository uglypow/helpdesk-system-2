import { Knex } from "knex";
import { TicketStatus } from "../src/modules/tickets/model/Definations";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tickets").del();

  // Inserts seed entries
  await knex("tickets").insert([
    {
      id: 1,
      title: "Website Bug Fix",
      description: "Fix the issue with the login page not loading properly.",
      contact: "John Doe",
      status: TicketStatus.PENDING,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
