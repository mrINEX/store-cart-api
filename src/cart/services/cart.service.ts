import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as cart from '../../entries/cart';
import { Cart } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {}; // old

  constructor(
    @InjectRepository(cart.Cart)
    private readonly cartRepo: Repository<cart.Cart>,
  ) {}

  findByUserId(userId: string): Promise<cart.Cart> {
    return this.cartRepo.findOne({
      where: { user_id: { id: userId } },
      relations: ['user_id', 'id'],
    });
  }

  async createByUserId(userId: string): Promise<cart.Cart> {
    const userCart = {
      user_id: { id: userId },
      created_at: new Date(),
      updated_at: new Date(),
    };

    await this.cartRepo.create(userCart);

    return userCart as cart.Cart;
  }

  async findOrCreateByUserId(userId: string): Promise<cart.Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, cart: cart.Cart): Promise<cart.Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...cart,
      ...rest,
    };

    return await this.cartRepo.save({ ...updatedCart });
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

  /**
   * for test getting all. It works.
   */
  async findAll() {
    return this.cartRepo.find({ relations: ['id'] });
  }
}
