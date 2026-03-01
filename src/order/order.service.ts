import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class OrderService {
    constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
  ) {}

  async createOrder(userId: string) {
    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Your cart is empty. Please add items to your cart before checking out.');
    }

    let totalAmount = 0;
    const orderItems = cart.items.map((item: any) => {
      const price = item.productId.price; 
      totalAmount += price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: price,
      };
    });

    const order = await this.orderModel.create({
      userId,
      items: orderItems,
      totalAmount,
    });

    await this.cartService.clearCart(userId);

    return order;
  }

  async getUserOrders(userId: string) {
    return this.orderModel.find({ userId }).sort({ createdAt: -1 });
  }
}
