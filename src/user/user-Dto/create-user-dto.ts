import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
