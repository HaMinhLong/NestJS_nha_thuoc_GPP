import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserGroupPermission } from 'src/modules/user-group-permission/entities/user-group-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Mối quan hệ OneToMany với UserGroupPermission
  @OneToMany(
    () => UserGroupPermission,
    (userGroupPermission) => userGroupPermission.permission,
  )
  userGroupPermissions: UserGroupPermission[];
}
