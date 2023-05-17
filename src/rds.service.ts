import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

import { CartItem } from './entries/cart_item';
import { Cart } from './entries/cart';
import { Order } from './entries/order';
import { User } from './entries/user';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'freeaws',
  entities: [Cart, CartItem, Order, User],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    if ('') {
      const user = new User();
      user.id = 'uk';
      user.name = 'Uladzimir';
      await user.save();
      console.log('User created');

      const cart = new Cart();
      cart.user_id = user;
      cart.created_at = new Date();
      cart.updated_at = new Date();
      await cart.save();
      console.log('Cart created');

      const cartItem = new CartItem();
      cartItem.count = 55;
      cartItem.cart_id = cart;
      await cartItem.save();
      console.log('CartItem created');

      const order = new Order();
      order.comments = 'first order';
      order.user_id = '321';
      order.cart_id = cart;
      order.payment = '';
      order.delivery = '';
      order.total = 22;
      order.status = 'my status';
      await order.save();
      console.log('Order created');
    }

    const foundCart = await Cart.find({
      where: { user_id: { id: 'uk' } },
      relations: ['user_id', 'id'],
    });
    const foundCartItem = await CartItem.find({ relations: { cart_id: true } });

    console.log(
      JSON.stringify({ cart: foundCart, cart_item: foundCartItem }, null, 2),
    );
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
