import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import * as order from '../../entries/order';
import { Order } from '../models';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(order.Order)
    private readonly order: Repository<order.Order>,
  ) {}

  findById(orderId: string): Promise<order.Order> {
    return this.order.findOneBy({ id: orderId });
  }

  async create(data: any) {
    const id = v4(v4());
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    await this.order.create(order);

    return order;
  }

  async update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    await this.order.update(orderId, { ...data, id: orderId });
  }
}
