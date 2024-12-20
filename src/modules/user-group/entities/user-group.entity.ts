// src/entities/user-group.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity'; // Import User entity
import { Permission } from 'src/modules/permission/entities/permission.entity';

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Mối quan hệ OneToMany: Một nhóm người dùng có thể có nhiều user
  @OneToMany(() => User, (user) => user.userGroup)
  users: User[];
}
