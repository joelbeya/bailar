import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: { email: string; username: string }): Promise<User> {
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['organizedEvents', 'comments', 'tickets', 'savedEvents'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['organizedEvents', 'comments', 'tickets', 'savedEvents'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async saveEvent(userId: string, eventId: string): Promise<User> {
    const user = await this.findOne(userId);
    user.savedEvents = [...(user.savedEvents || []), { id: eventId } as any];
    return await this.usersRepository.save(user);
  }

  async unsaveEvent(userId: string, eventId: string): Promise<User> {
    const user = await this.findOne(userId);
    user.savedEvents = (user.savedEvents || []).filter(event => event.id !== eventId);
    return await this.usersRepository.save(user);
  }

  async updatePreferences(
    id: string,
    preferences: Record<string, any>,
  ): Promise<User> {
    const user = await this.findOne(id);
    user.preferences = preferences;
    return await this.usersRepository.save(user);
  }
}
