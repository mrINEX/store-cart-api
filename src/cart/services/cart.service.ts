import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';

import * as cartE from '../../entries/cart';
import * as userE from '../../entries/user';
import { Cart } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {}; // old

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

    return cart;
  }

  async findOrCreateByUserId(userId: string = v4(v4())): Promise<cartE.Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    cartBody: cartE.Cart,
  ): Promise<cartE.Cart> {
    const { id, ...cartByUser } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      ...cartByUser,
      ...cartBody,
      ...new cartE.Cart(),
    };
    console.log(updatedCart);

    return await this.cartRepo.save(updatedCart);
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
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
