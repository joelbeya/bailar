import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  categories: string[];

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.organizedEvents)
  organizer: User;

  @Column()
  organizerId: string;

  @OneToMany(() => Comment, comment => comment.event)
  comments: Comment[];

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[];

  @ManyToMany(() => User, user => user.savedEvents)
  @JoinTable()
  savedByUsers: User[];
}
