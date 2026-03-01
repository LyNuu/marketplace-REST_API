import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/shemas/user.shema';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  @Roles(UserRole.ADMIN) 
  create(@Body() body: any) {
    return this.productService.create(body);
  }
}
