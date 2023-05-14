import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';

import * as carts from '../../entries/cart';
import { Cart } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {}; // old

  constructor(
    @InjectRepository(carts.Cart)
    private readonly cartRepo: Repository<carts.Cart>, // new
  ) {}

  findByUserId(userId: string): Cart {
    return this.userCarts[userId];
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
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

  async findAll() {
    return this.cartRepo.find({});
  }

  // async findOne(id: CartItem) {
  //   return this.cartRepo.findOne({ id, relations: ['id']});
  // }

  // async update(id: string, updateOrderDto: UpdateOrderDto) {
  //   try {
  //     await this.cartRepo.update({ id }, updateOrderDto);
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // }

  // async remove(id: string) {
  //   try {
  //     await this.orderRepo.delete({ id });
  //   } catch (e) {
  //     return false;
  //   }
  //   return true;
  // }
}
