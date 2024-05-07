import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Put,
} from "routing-controllers";
import Container from "typedi";
import { TicketService } from "./TicketService";
import {
  CreateTicketRequest,
  UpdateTicketRequest,
  UpdateTicketStatusRequest,
} from "./dto/TicketRequest";

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
  post(@Body() body: CreateTicketRequest) {
    return this.ticketService.addTicket(body);
  }

  @Put("/tickets/:id")
  put(@Param("id") id: string, @Body() body: UpdateTicketRequest) {
    return this.ticketService.updateTicket(id, body);
  }

  @Patch("/tickets/:id")
  patch(@Param("id") id: string, @Body() body: UpdateTicketStatusRequest) {
    return this.ticketService.updateTicketStatus(id, body);
  }

  @Delete("/tickets/:id")
  remove(@Param("id") id: string) {
    return this.ticketService.deleteTicket(id);
  }
}
