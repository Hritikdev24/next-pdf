import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserpdfModule } from './userpdf/userpdf.module';
import { MicroserviceModule } from './microservice/microservice.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/hritikDb'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    EmployeeModule,
    ProductModule,
    AuthModule,
    UserpdfModule,
    MicroserviceModule,
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
