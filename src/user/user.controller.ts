import { Controller,Get,Post,Body, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './user-Dto/create-user-dto';
import { UserService } from './user.service';
import { ProductService } from 'src/product/product.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly productService:ProductService
  ) {}


  @Get("all")
  getUser(){
    return this.userService.getUser();
  }

  @Post("create")
  addUser(@Body() userName:CreateUserDto){
    return this.userService.createUser(userName);
  }

  @Get("exception-filter")
  getException(){
       throw new UnauthorizedException("Invalide User")
  }

  @Get("products")
  getUserProducts(){
   return this.productService.getAllProduct();
  }


}
