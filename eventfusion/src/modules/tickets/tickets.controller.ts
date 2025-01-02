import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from '../../entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() ticketData: Partial<Ticket>): Promise<Ticket> {
    return await this.ticketsService.create(ticketData);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return await this.ticketsService.findOne(id);
  }

  @Get('event/:eventId')
  async findByEvent(@Param('eventId') eventId: string): Promise<Ticket[]> {
    return await this.ticketsService.findByEvent(eventId);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Ticket[]> {
    return await this.ticketsService.findByUser(userId);
  }

  @Post('purchase')
  async purchase(
    @Body() purchaseData: { eventId: string; userId: string; ticketType: string; price: number },
  ): Promise<Ticket> {
    return await this.ticketsService.purchase(
      purchaseData.eventId,
      purchaseData.userId,
      purchaseData.ticketType,
      purchaseData.price,
    );
  }

  @Put(':id/cancel')
  async cancel(@Param('id') id: string): Promise<Ticket> {
    return await this.ticketsService.cancel(id);
  }

  @Put(':id/validate')
  async validate(@Param('id') id: string): Promise<Ticket> {
    return await this.ticketsService.validate(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.ticketsService.delete(id);
  }
}
