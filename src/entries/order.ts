import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Cart } from './cart';

enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(
    () => Cart,
    cart => cart.id,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart_id: Cart;

  @Column()
  payment: string;

  @Column()
  delivery: string;

  @Column()
  comments: string;

  @Column()
  status: string;

  @Column()
  total: number;
}
