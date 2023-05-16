import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Cart } from '../entries/cart';
import { CartItem } from '../entries/cart_item';
import { Order } from '../entries/order';
import { User } from '../entries/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Cart, CartItem, Order, User],
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Order, User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
