import { ITicket } from "@app/abstraction/entities/ITicket";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TicketStatus } from "../model/Definations";

export class CreateTicketRequest {
  @Expose({ name: "title" })
  @IsOptional()
  @IsString()
  title: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  description: string;

  @Expose({ name: "contact" })
  @IsOptional()
  @IsString()
  contact: string;

  public toTicketEntity(): Partial<ITicket> {
    const ticket = {
      title: this.title,
      description: this.description,
      contact: this.contact,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return ticket;
  }
}

export class UpdateTicketRequest {
  @Expose({ name: "title" })
  @IsOptional()
  @IsString()
  title: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  description: string;

  @Expose({ name: "contact" })
  @IsOptional()
  @IsString()
  contact: string;

  public toTicketEntity(): Partial<ITicket> {
    const ticket: Partial<ITicket> = {
      title: this.title,
      description: this.description,
      contact: this.contact,
      updated_at: new Date(),
    };
    return ticket;
  }
}

export class UpdateTicketStatusRequest {
  @Expose({ name: "status" })
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
