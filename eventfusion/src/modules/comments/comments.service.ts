import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(commentData: { content: string; rating: number; eventId: string; userId: string }): Promise<Comment> {
    const comment = this.commentsRepository.create({
      content: commentData.content,
      rating: commentData.rating,
      event: { id: commentData.eventId },
      user: { id: commentData.userId },
    });
    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      relations: ['event', 'user'],
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async findByEvent(eventId: string): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { event: { id: eventId } },
      relations: ['event', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { user: { id: userId } },
      relations: ['event', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, commentData: Partial<Comment>): Promise<Comment> {
    await this.commentsRepository.update(id, commentData);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async getEventRating(eventId: string): Promise<number> {
    const result = await this.commentsRepository
      .createQueryBuilder('comment')
      .where('comment.eventId = :eventId', { eventId })
      .select('AVG(comment.rating)', 'avgRating')
      .getRawOne();

    return result?.avgRating || 0;
  }
}
