import knex from "knex";
import { Service } from "typedi";
import config from "../../../knexfile";
import { ITicket } from "../../entities/ITicket";
import { UpdateTicketStatus, updateTicket } from "./dto/TicketRequest";

@Service()
export class TicketRepository {
  async getAllTicket(): Promise<ITicket[]> {
    return await knex(config)("tickets").select("*");
  }

  async getTicket(id: string): Promise<ITicket> {
    const response = await knex(config)("tickets")
      .where({ id: id })
      .select("*");
    return response[0];
  }

  async addTicket(ticket: ITicket): Promise<string> {
    const response = await knex(config)("tickets").insert({
      ...ticket,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return response[0].toString();
  }

  async updateTicket(id: string, body: updateTicket): Promise<void> {
    await knex(config)("tickets")
      .where({ id: id })
      .update({
        ...body,
      });
    return;
  }

  async updateTicketStatus(
    id: string,
    body: UpdateTicketStatus
  ): Promise<void> {
    await knex(config)("tickets")
      .where({ id: id })
      .update({ status: body.status, updated_at: new Date()});
    return;
  }

  async deleteTicket(id: string): Promise<void> {
    await knex(config)("tickets").where({ id: id }).del();
    return;
  }
}
