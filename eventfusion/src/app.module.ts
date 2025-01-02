import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CommentsModule } from './modules/comments/comments.module';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { Ticket } from './entities/ticket.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'eventfusion',
      entities: [User, Event, Ticket, Comment],
      synchronize: true, // Ne pas utiliser en production
    }),
    UsersModule,
    EventsModule,
    TicketsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
