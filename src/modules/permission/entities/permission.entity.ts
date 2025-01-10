import { Entity, Column, OneToMany } from 'typeorm';
import { UserGroupPermission } from 'src/modules/user-group-permission/entities/user-group-permission.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class Permission extends BaseEntity {
  @Column()
  name: string;

  // Mối quan hệ OneToMany với UserGroupPermission
  @OneToMany(
    () => UserGroupPermission,
    (userGroupPermission) => userGroupPermission.permission,
  )
  userGroupPermissions: UserGroupPermission[];
}
