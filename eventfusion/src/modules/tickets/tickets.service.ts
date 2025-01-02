import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.ticketsRepository.create(ticketData);
    return await this.ticketsRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketsRepository.find({
      relations: ['event', 'user'],
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async findByEvent(eventId: string): Promise<Ticket[]> {
    return await this.ticketsRepository.find({
      where: { event: { id: eventId } },
      relations: ['event', 'user'],
    });
  }

  async findByUser(userId: string): Promise<Ticket[]> {
    return await this.ticketsRepository.find({
      where: { user: { id: userId } },
      relations: ['event', 'user'],
    });
  }

  async update(id: string, ticketData: Partial<Ticket>): Promise<Ticket> {
    await this.ticketsRepository.update(id, ticketData);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.ticketsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }

  async purchase(
    eventId: string,
    userId: string,
    ticketType: string,
    price: number,
  ): Promise<Ticket> {
    try {
      const ticket = this.ticketsRepository.create({
        event: { id: eventId },
        user: { id: userId },
        ticketType,
        price,
        status: 'sold',
        purchaseDate: new Date(),
      });

      return await this.ticketsRepository.save(ticket);
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      throw new BadRequestException('Failed to purchase ticket');
    }
  }

  async cancel(id: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    
    if (ticket.status !== 'sold') {
      throw new BadRequestException('Ticket cannot be cancelled');
    }

    ticket.status = 'cancelled';
    return await this.ticketsRepository.save(ticket);
  }

  async validate(id: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    
    if (ticket.status !== 'sold') {
      throw new BadRequestException('Invalid ticket status');
    }

    ticket.status = 'used';
    ticket.usedDate = new Date();
    return await this.ticketsRepository.save(ticket);
  }
}
