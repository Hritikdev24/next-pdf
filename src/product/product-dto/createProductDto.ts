import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'product name is compulsory' })
  productName: string;

  @IsNotEmpty({ message: 'product price is compulsory' })
  productPrice: number;

  @IsNotEmpty({ message: 'productQty is compulsory' })
  productQty: number;
}
