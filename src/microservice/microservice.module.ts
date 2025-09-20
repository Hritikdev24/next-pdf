import { Module } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';
import { MicroserviceController } from './microservice.controller';
import { ProductModule } from 'src/product/product.module';
@Module({
  imports:[ProductModule],
  controllers: [MicroserviceController],
  providers: [MicroserviceService],
})
export class MicroserviceModule {
  
}
