import {
  Entity,
  OneToOne,
  Column,
  Relation,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CartItem } from './cart_item';
import { User } from './user';

enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(
    () => CartItem,
    i => i.cart_id,
  )
  id: Relation<CartItem[]>;

  @ManyToOne(
    () => User,
    user => user.cart_id,
  )
  user_id: Relation<User>;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  @Column({ type: 'enum', enum: Status, default: Status.OPEN })
  status: number;
}
