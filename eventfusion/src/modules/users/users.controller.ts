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
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: { email: string; username: string }): Promise<User> {
    return await this.usersService.create(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return await this.usersService.update(id, userData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }

  @Post(':id/save-event/:eventId')
  async saveEvent(
    @Param('id') userId: string,
    @Param('eventId') eventId: string,
  ): Promise<User> {
    return await this.usersService.saveEvent(userId, eventId);
  }

  @Delete(':id/unsave-event/:eventId')
  async unsaveEvent(
    @Param('id') userId: string,
    @Param('eventId') eventId: string,
  ): Promise<User> {
    return await this.usersService.unsaveEvent(userId, eventId);
  }

  @Put(':id/preferences')
  async updatePreferences(
    @Param('id') id: string,
    @Body() preferences: Record<string, any>,
  ): Promise<User> {
    return await this.usersService.updatePreferences(id, preferences);
  }
}
