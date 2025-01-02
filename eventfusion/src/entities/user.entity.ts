import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Event } from './event.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Event, event => event.organizer)
  organizedEvents: Event[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => Event, event => event.savedByUsers)
  savedEvents: Event[];
}
