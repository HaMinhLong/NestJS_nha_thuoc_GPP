import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

import { Permission } from 'src/modules/permission/entities/permission.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';

@Entity()
export class UserGroupPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.userGroupPermissions)
  @JoinColumn({ name: 'userGroupId' })
  userGroup: UserGroup;

  @ManyToOne(() => Permission, (permission) => permission.userGroupPermissions)
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;

  @Column({ default: false })
  getList: boolean;

  @Column({ default: false })
  getDetail: boolean;

  @Column({ default: false })
  create: boolean;

  @Column({ default: false })
  update: boolean;

  @Column({ default: false })
  remove: boolean;
}
