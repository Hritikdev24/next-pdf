import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { productSchema } from './product-entity/productSchema';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
@Module({
  imports:[
    ClientsModule.register([ {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'product_queue',
        queueOptions: {
          durable: false, 
        },
       },
    },]),
    forwardRef(()=>UserModule),
           MongooseModule.forFeature([{name:"productModel",schema:productSchema}]),
           CacheModule.register()
          ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService,ClientsModule]
})
export class ProductModule {}
