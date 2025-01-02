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
import { CommentsService } from './comments.service';
import { Comment } from '../../entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() commentData: { content: string; rating: number; eventId: string; userId: string },
  ): Promise<Comment> {
    return await this.commentsService.create(commentData);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.findOne(id);
  }

  @Get('event/:eventId')
  async findByEvent(@Param('eventId') eventId: string): Promise<Comment[]> {
    return await this.commentsService.findByEvent(eventId);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Comment[]> {
    return await this.commentsService.findByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() commentData: Partial<Comment>,
  ): Promise<Comment> {
    return await this.commentsService.update(id, commentData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.commentsService.delete(id);
  }

  @Get('event/:eventId/rating')
  async getEventRating(@Param('eventId') eventId: string): Promise<number> {
    return await this.commentsService.getEventRating(eventId);
  }
}
