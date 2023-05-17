import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Cart } from './cart';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(
    () => Cart,
    cart => cart.user_id,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'user_id' })
  cart_id: Cart[];

  @Column()
  name: string;
}
