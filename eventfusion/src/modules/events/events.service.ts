import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventsRepository.create(eventData);
    return await this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventsRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    return await this.eventsRepository.findOne({ where: { id } });
  }

  async update(id: string, eventData: Partial<Event>): Promise<Event> {
    await this.eventsRepository.update(id, eventData);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.eventsRepository.delete(id);
  }

  async search(query: string, filters: any): Promise<Event[]> {
    const queryBuilder = this.eventsRepository.createQueryBuilder('event');

    if (query) {
      queryBuilder.where(
        'event.title ILIKE :query OR event.description ILIKE :query',
        { query: `%${query}%` },
      );
    }

    if (filters.category) {
      queryBuilder.andWhere('event.category = :category', {
        category: filters.category,
      });
    }

    if (filters.startDate) {
      queryBuilder.andWhere('event.startDate >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters.endDate) {
      queryBuilder.andWhere('event.endDate <= :endDate', {
        endDate: filters.endDate,
      });
    }

    if (filters.location) {
      queryBuilder.andWhere('event.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    return await queryBuilder.getMany();
  }
}
