import {
  Entity,
  Column,
  Relation,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cart } from './cart';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
