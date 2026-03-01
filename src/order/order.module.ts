import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from 'src/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Order, OrderSchema, } from './schemas/order.schema';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
