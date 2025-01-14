import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class ProductType extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  isMedicine: number;

  @Column({ type: 'int', default: 1 })
  status: number;
}
