import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../../entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() eventData: Partial<Event>): Promise<Event> {
    return await this.eventsService.create(eventData);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return await this.eventsService.findAll();
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query() filters: any,
  ): Promise<Event[]> {
    return await this.eventsService.search(query, filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    return await this.eventsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() eventData: Partial<Event>,
  ): Promise<Event> {
    return await this.eventsService.update(id, eventData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.eventsService.delete(id);
  }
}
