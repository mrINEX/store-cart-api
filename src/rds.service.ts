import 'reflect-metadata';
import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

import { CartItem } from './entries/cart_item';
import { Cart } from './entries/cart';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'freeaws',
  entities: [Cart, CartItem],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    if ('') {
      const cart = new Cart();
      cart.user_id = 'user_1';
      cart.created_at = new Date();
      cart.updated_at = new Date();
      const cartR = await cart.save();
      console.log({ cartR });

      const cartItem = new CartItem();
      cartItem.count = 55;
      cartItem.cart_id = cart;
      const cartItemR = await cartItem.save();
      console.log({ cartItemR });
    }

    const foundCart = await Cart.find({ relations: { id: true } });
    const foundCartItem = await CartItem.find({ relations: { cart_id: true } });

    console.log(
      JSON.stringify({ cart: foundCart, cart_item: foundCartItem }, null, 2),
    );
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
