// src/entities/user-group.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity'; // Import User entity
import { UserGroupPermission } from 'src/modules/user-group-permission/entities/user-group-permission.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class UserGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Mối quan hệ OneToMany: Một nhóm người dùng có thể có nhiều user
  @OneToMany(() => User, (user) => user.userGroup)
  users: User[];

  // Mối quan hệ OneToMany với UserGroupPermission
  @OneToMany(
    () => UserGroupPermission,
    (userGroupPermission) => userGroupPermission.userGroup,
  )
  userGroupPermissions: UserGroupPermission[];
}
