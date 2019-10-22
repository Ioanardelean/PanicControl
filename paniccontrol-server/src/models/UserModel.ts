import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from './ProjectModel';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, unique: true, length: 255})
    username: string;

    @Column({nullable: false, unique: true, length: 255})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({nullable: false, length: 255})
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
    @IsNotEmpty()
    role: UserRole;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Project, (project: Project) => project.user)
    projects: Project[];
}
