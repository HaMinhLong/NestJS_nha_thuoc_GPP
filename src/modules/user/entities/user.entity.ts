import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { UserGroup } from './../../user-group/entities/user-group.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
@Index('idx_user_username', ['username'], { unique: true })
@Index('idx_user_email', ['email'], { unique: true })
@Index('idx_user_group_id', ['userGroupId'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ nullable: false })
  userGroupId: number;

  // Mối quan hệ ManyToOne: Mỗi người dùng chỉ có thể thuộc một loại tài khoản
  @ManyToOne(() => UserGroup, (userGroup) => userGroup.users)
  @JoinColumn({ name: 'userGroupId' }) // Cột ngoại khóa
  userGroup: UserGroup;
}
