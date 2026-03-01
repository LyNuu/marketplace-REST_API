import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

@Schema({ _id: false })
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product;

  @Prop({ required: true, min: 1, default: 1 })
  quantity: number;
}
const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: string;

  @Prop({ type: [CartItemSchema], default: [] })
  items: CartItem[];
}
export const CartSchema = SchemaFactory.createForClass(Cart);