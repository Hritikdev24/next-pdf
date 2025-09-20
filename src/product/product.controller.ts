import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { Get, Post, Body } from '@nestjs/common';
import { CreateProductDto } from './product-dto/createProductDto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  addProduct(@Body() productData: CreateProductDto) {
    return this.productService.addProduct(productData);
  }

  @Get("all")
  getAllProduct(){
    return this.productService.getAllProduct();
  }

  @Get("customers")
  getAllCustomers(){
    return this.productService.getAllCustomers();
  }
}
