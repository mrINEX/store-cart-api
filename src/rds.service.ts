import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { CartItem } from './entries/cart_item';
import { Cart } from './entries/cart';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: '',
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

    const cart = new Cart();
    cart.user_id = 'user_1';
    cart.created_at = new Date();
    cart.updated_at = new Date();
    const cartR = await cart.save();
    console.log({ cartR });

    const cartItem = new CartItem();
    cartItem.count = 5;
    cartItem.cart_id = cart;
    const cartItemR = await cartItem.save();
    console.log({ cartItemR });

    const foundCart = await Cart.find();
    const foundCartItem = await CartItem.find();
    console.log({ foundCart, foundCartItem });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
