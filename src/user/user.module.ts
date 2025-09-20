import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProductModule } from 'src/product/product.module';
import { forwardRef } from '@nestjs/common';
@Module({
  imports:[
    forwardRef(()=>ProductModule)
   ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
