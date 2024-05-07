import { ITicket } from "../entities/ITicket";

export interface ITicketRepository {
  getAllTicket(): Promise<ITicket[]>;
  getTicket(id: string): Promise<ITicket>;
  addTicket(body: Partial<ITicket>): Promise<void>;
  updateTicket(id: string, body: Partial<ITicket>): Promise<void>;
  updateTicketStatus(id: string): Promise<void>;
  deleteTickcet(id: string): Promise<void>;
}
