import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { Permission } from 'src/modules/permission/entities/permission.entity';
import { UserGroup } from 'src/modules/user-group/entities/user-group.entity';

@Entity()
export class UserGroupPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.id)
  userGroupId: number;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permissionId: number;

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
