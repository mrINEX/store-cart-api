import {
  Entity,
  OneToOne,
  Column,
  Relation,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @OneToOne(
    () => Cart,
    cart => cart.id,
  )
  @JoinColumn()
  cart_id: Relation<Cart>;

  @Column({ default: 33 })
  count: number;
}
