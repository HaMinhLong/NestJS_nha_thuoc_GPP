import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserGroup } from '../../user-group/entities/user-group.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
