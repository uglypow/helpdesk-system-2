import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { ITicket } from "../../entities/ITicket";
import { TicketRepository } from "./TicketRepository";
import { UpdateTicketStatus, updateTicket } from "./dto/TicketRequest";
import { TicketStatus } from "./model/Definations";

@Service()
export class TicketService {
  @Inject()
  ticketRepo: TicketRepository;

  getAllTicket(): Promise<ITicket[]> {
    return this.ticketRepo.getAllTicket();
  }

  getTicket(id: string): Promise<ITicket> {
    return this.ticketRepo.getTicket(id);
  }

  async addTicket(ticket: ITicket): Promise<ITicket> {
    const newTicketID = await this.ticketRepo.addTicket(ticket);

    const newTicket = {
      ...ticket,
      id: newTicketID,
      status: TicketStatus.PENDING,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return newTicket;
  }

  async updateTicket(id: string, body: updateTicket): Promise<ITicket> {
    const currentTicket = await this.ticketRepo.getTicket(id);
    await this.ticketRepo.updateTicket(id, body);

    const ticket: ITicket = {
      id: id,
      title: body.title,
      description: body.description,
      contact: body.contact,
      status: currentTicket.status,
      created_at: currentTicket.created_at,
      updated_at: new Date(),
    };
    return ticket;
  }

  async updateTicketStatus(
    id: string,
    body: UpdateTicketStatus
  ): Promise<ITicket> {
    const currentTicket = await this.ticketRepo.getTicket(id);
    const currentStatus = currentTicket.status;
    const requestStatus = body.status;

    if (
      currentStatus === TicketStatus.PENDING &&
      requestStatus != TicketStatus.IN_PROGRESS
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

    this.ticketRepo.updateTicketStatus(id, body);
    return { ...currentTicket, status: requestStatus };
  }

  deleteTicket(id: string) {
    return this.ticketRepo.deleteTicket(id);
  }
}
