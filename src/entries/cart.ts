import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  Relation,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { CartItem } from './cart_item';

enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(
    () => CartItem,
    i => i.cart_id,
  )
  id: Relation<CartItem>;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  @Column({ type: 'enum', enum: Status, default: Status.OPEN })
  status: number;
}
