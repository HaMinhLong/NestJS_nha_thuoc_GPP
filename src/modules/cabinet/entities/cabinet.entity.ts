// src/entities/user-group.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class Cabinet extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
