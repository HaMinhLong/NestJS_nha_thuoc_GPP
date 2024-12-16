// src/entities/user-group.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Import User entity

@Entity('userGroups') // Đặt tên bảng là 'userGroups'
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Mối quan hệ OneToMany: Một nhóm người dùng có thể có nhiều user
  @OneToMany(() => User, (user) => user.userGroup)
  users: User[];
}
