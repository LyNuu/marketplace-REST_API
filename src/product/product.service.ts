import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async create(data: any): Promise<Product> {
        return this.productModel.create(data);
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }
}
