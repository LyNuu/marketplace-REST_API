import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

  @Post()
  checkout(@Req() req) {
    return this.orderService.createOrder(req.user.id);
  }

  @Get()
  getMyOrders(@Req() req) {
    return this.orderService.getUserOrders(req.user.id);
  }
}
