import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { ITicket } from "../../abstraction/entities/ITicket";
import { TicketRepository } from "./TicketRepository";
import {
  CreateTicketRequest,
  UpdateTicketRequest,
  UpdateTicketStatusRequest,
} from "./dto/TicketRequest";
import { TicketStatus } from "./model/Definations";

@Service()
export class TicketService {
  @Inject()
  ticketRepo: TicketRepository;

  async getAllTicket(): Promise<ITicket[]> {
    return await this.ticketRepo.getAllTicket();
  }

  async getTicket(id: string): Promise<ITicket> {
    return await this.ticketRepo.getTicket(id);
  }

  async addTicket(body: CreateTicketRequest): Promise<Partial<ITicket>> {
    const newTicket = body.toTicketEntity();
    await this.ticketRepo.addTicket(newTicket);
    return newTicket;
  }

  async updateTicket(
    id: string,
    body: UpdateTicketRequest
  ): Promise<Partial<ITicket>> {
    const newTicket = body.toTicketEntity();
    await this.ticketRepo.updateTicket(id, newTicket);
    return newTicket;
  }

  async updateTicketStatus(
    id: string,
    body: UpdateTicketStatusRequest
  ): Promise<ITicket> {
    const currentTicket = await this.ticketRepo.getTicket(id);
    const currentStatus = currentTicket.status;
    const requestStatus = body.status;

    if (
      currentStatus === TicketStatus.PENDING &&
      requestStatus != TicketStatus.IN_PROGRESS &&
      requestStatus != TicketStatus.CANCELLED
    ) {
      throw new HttpError(
        400,
        `request status is ${requestStatus} but PENDING can only receive IN_PROGRESS`
      );
    }

    if (
      currentStatus === TicketStatus.IN_PROGRESS &&
      requestStatus !== TicketStatus.ACCEPTED &&
      requestStatus !== TicketStatus.CANCELLED
    ) {
      throw new HttpError(
        400,
        `request status is ${requestStatus} but IN_PROGRESS can only received ACCEPTED or CANCELLED`
      );
    }

    if (
      currentStatus === TicketStatus.ACCEPTED ||
      currentStatus === TicketStatus.CANCELLED
    ) {
      throw new HttpError(
        400,
        `${currentStatus} cannot changed to other status`
      );
    }

    const updatedTicket = {
      status: requestStatus,
      updated_at: new Date(),
    };
    this.ticketRepo.updateTicketStatus(id, updatedTicket);
    return { ...currentTicket, ...updatedTicket };
  }

  async deleteTicket(id: string) {
    // return await this.ticketRepo.deleteTicket(id);
  }
}
