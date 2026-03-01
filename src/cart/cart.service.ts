import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) { }

    async getCartRaw(userId: string) {
        let cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            cart = await this.cartModel.create({ userId, items: [] });
        }
        return cart;
    }

    async getCart(userId: string) {
        return this.cartModel.findOne({ userId }).populate('items.productId');
    }

    async addItem(userId: string, productId: string, quantity: number) {
        const cart = await this.getCartRaw(userId);

        const itemIndex = cart.items.findIndex(item =>
            item.productId.toString() === productId.toString()
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId: productId as any, quantity });
        }
        return cart.save();
    }

    async removeItem(userId: string, productId: string) {
        const cart = await this.getCartRaw(userId); 
        cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
        return cart.save();
    }

    async clearCart(userId: string) {
        return this.cartModel.findOneAndUpdate({ userId }, { items: [] }, { new: true });
    }
}
