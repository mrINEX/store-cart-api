import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as cartE from '../../entries/cart';
import * as userE from '../../entries/user';
import * as cartItemE from '../../entries/cart_item';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(cartE.Cart)
    private readonly cartRepo: Repository<cartE.Cart>,
  ) {}

  findByUserId(userId: string): Promise<cartE.Cart> {
    console.log({ userId });
    return this.cartRepo.findOne({
      where: { user_id: { id: userId } },
      relations: ['user_id', 'id'],
    });
  }

  async createByUserId(userId: string): Promise<cartE.Cart> {
    const user = new userE.User();
    user.id = String(userId);
    user.name = String(userId + '- name');
    await user.save();
    console.log('User created');

    const cart = new cartE.Cart();
    cart.user_id = user;
    cart.created_at = new Date();
    cart.updated_at = new Date();
    await cart.save();
    console.log('Cart created');

    const cartItem = new cartItemE.CartItem();
    cartItem.count = 55;
    cartItem.cart_id = cart;
    await cartItem.save();
    console.log('CartItem created');

    return cart;
  }

  async findOrCreateByUserId(userId: string): Promise<cartE.Cart> {
    const id = String(userId);
    const userCart = await this.findByUserId(id);
    console.log({ userCart });

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(id);
  }

  async updateByUserId(
    userId: string,
    cartBody: cartE.Cart,
  ): Promise<cartE.Cart> {
    const { id, ...cartByUser } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      ...cartBody,
      ...cartByUser,
    };
    console.log(updatedCart);

    return await this.cartRepo.save(updatedCart);
  }

  async removeByUserId(userId): Promise<void> {
    const { id, ...cart } = await this.findOrCreateByUserId(userId);
    await this.cartRepo.softRemove(cart);
  }

  async create(/*createOrderDto: CreateOrderDto*/) {
    try {
      await this.cartRepo.insert(/*createOrderDto*/ {});
    } catch (e) {
      return false;
    }
    return true;
  }
}
