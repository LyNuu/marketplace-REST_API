import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getCart(@Req() req) {
        return this.cartService.getCart(req.user.id);
    }

    @Post('/add')
    addToCart(@Req() req, @Body() body: { productId: string, quantity: number }) {
        return this.cartService.addItem(req.user.id, body.productId, body.quantity);
    }

    @Delete('/:id')
    removeFromCart(@Req() req, @Param('id') productId: string) {
        return this.cartService.removeItem(req.user.id, productId);
    }
}
