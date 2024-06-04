import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Registration } from 'src/registrations/registration.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations: Registration[];
}
