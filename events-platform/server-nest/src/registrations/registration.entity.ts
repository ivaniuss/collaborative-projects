import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.registrations)
  user: User;

  @ManyToOne(() => Event, (event) => event.registrations)
  event: Event;

  @CreateDateColumn()
  createdAt: Date;
}
