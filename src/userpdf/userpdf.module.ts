import { Module } from '@nestjs/common';
import { UserpdfService } from './userpdf.service';
import { UserpdfController } from './userpdf.controller';
import { ProductModule } from 'src/product/product.module';
@Module({
  imports:[ProductModule],
  controllers: [UserpdfController],
  providers: [UserpdfService],
})
export class UserpdfModule {}
