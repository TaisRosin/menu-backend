import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Product } from '../products/product.entity';
import { Order } from './entities/order-entity';
import { OrderItem } from './entities/order-item.entity';
import { GuestCheck } from '../guest-checks/guest-check.entity';
import { GuestCheckModule } from '../guest-checks/guest-check.module';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [GuestCheckModule, ProductModule, TypeOrmModule.forFeature([GuestCheck, Product, Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
