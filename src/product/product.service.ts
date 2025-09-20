import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDoc } from './product-entity/productSchema';
import { CreateProductDto } from './product-dto/createProductDto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
import { UserService } from 'src/user/user.service';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('productModel')
    private readonly productModel: Model<ProductDoc>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService:UserService,
    @Inject("PRODUCT_SERVICE") private readonly productQueue:ClientProxy
  ) {}

  async addProduct(productData: CreateProductDto) {
    try {
      const newProduct = await this.productModel.create(productData);
      this.productQueue.emit("product-added",newProduct)
      return newProduct;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllProduct() {
    try {
      const cacheProduct = await this.cacheManager.get('cacheProduct');
      if (cacheProduct) {
        return {
          cacheProduct,
          cached: true,
        };
      }
      const allProduct = await this.productModel.find();

      const productCached = await this.cacheManager.set(
        'cacheProduct',
        allProduct,
        10000,
      );

      return {
        allProduct,
        cached: false,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllCustomers(){

    const result = await this.productQueue.send("product-review", {}).toPromise();
  const users=this.userService.getUser()
   return {users,microservice:result}
  }
}
