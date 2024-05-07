import knex from "knex";
import { Service } from "typedi";
import config from "../../../knexfile";
import { ITicket } from "../../abstraction/entities/ITicket";

@Service()
export class TicketRepository {
  async getAllTicket(): Promise<ITicket[]> {
    return await knex(config)("tickets").select("*");
  }

  async getTicket(id: string): Promise<ITicket> {
    return await knex(config)("tickets").where({ id: id }).first();
  }

  async addTicket(body: Partial<ITicket>): Promise<void> {
    await knex(config)("tickets").insert(body);
    return;
  }

  async updateTicket(id: string, body: Partial<ITicket>): Promise<void> {
    await knex(config)("tickets").where({ id: id }).update(body);
    return;
  }

  async updateTicketStatus(id: string, body: Partial<ITicket>): Promise<void> {
    await knex(config)("tickets").where({ id: id }).update(body);
    return;
  }

  async deleteTicket(id: string): Promise<void> {
    await knex(config)("tickets").where({ id: id }).del();
    return;
  }
}
