import {
  Entity,
  OneToOne,
  Column,
  Relation,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Cart } from './cart';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @ManyToOne(
    () => Cart,
    cart => cart.id,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart_id: Relation<Cart>;

  @Column({ default: 33 })
  count: number;
}
