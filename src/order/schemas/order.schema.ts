import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class OrderItem {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
    productId: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    price: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: [OrderItem], required: true })
    items: OrderItem[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ default: 'PENDING', enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'] })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);