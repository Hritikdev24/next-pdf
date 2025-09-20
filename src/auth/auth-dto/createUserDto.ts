import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'userName is required' })
  userName: string;
  @IsNotEmpty({ message: 'password is required' })
  password: string;
  @IsNotEmpty({ message: 'role is required' })
  role: string;
}
