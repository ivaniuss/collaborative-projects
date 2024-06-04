import { Event } from 'src/events/event.entity';
import { Registration } from 'src/registrations/registration.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Role } from '../auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => AuthProvider, (authProvider) => authProvider.user)
  authProviders: AuthProvider[];

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations: Registration[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}

@Entity()
export class AuthProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @ManyToOne(() => User, (user) => user.authProviders)
  user: User;
}
