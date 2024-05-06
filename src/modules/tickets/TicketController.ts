import "reflect-metadata";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Patch,
} from "routing-controllers";
import { ITicket } from "../../entities/ITicket";
import { TicketService } from "./TicketService";
import Container from "typedi";
import { UpdateTicketStatus, updateTicket } from "./dto/TicketRequest";

@JsonController()
export class TicketController {
  ticketService = Container.get(TicketService);

  @Get("/tickets")
  getAll() {
    return this.ticketService.getAllTicket();
  }

  @Get("/tickets/:id")
  getOne(@Param("id") id: string) {
    return this.ticketService.getTicket(id);
  }

  @Post("/tickets")
  post(@Body() ticket: ITicket) {
    return this.ticketService.addTicket(ticket);
  }

  @Put("/tickets/:id")
  put(@Param("id") id: string, @Body() body: updateTicket) {
    return this.ticketService.updateTicket(id, body);
  }

  @Patch("/tickets/:id")
  patch(@Param("id") id: string, @Body() body: UpdateTicketStatus) {
    return this.ticketService.updateTicketStatus(id, body)
  }

  @Delete("/tickets/:id")
  remove(@Param("id") id: string) {
    return this.ticketService.deleteTicket(id);
  }
}
