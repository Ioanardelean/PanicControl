import { IsEmail, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './UserModel';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  @IsUrl()
  url: string;

  @Column({ nullable: false, length: 255 })
  @IsEmail()
  receiver: string;

  @Column({ nullable: true })
  emailTemplate: boolean;

  @Column({ nullable: false })
  ping: number;

  @Column({ nullable: false, default: false })
  testRunning: boolean;

  @ManyToOne(() => User, (user: User) => user.projects)
  user: User;
}
