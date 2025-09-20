import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user-Dto/create-user-dto';
@Injectable()
export class UserService {

    users=[
        "hritik",
        "rohit",
        "sachin",
        "virat",
        "dhoni",
        "kohli",
        "rohit",
        "sachin",
        "virat",
        "dhoni",
        "kohli",
        "rohit",
        "sachin",
        "virat",
        "dhoni",
        "kohli",
    ]
  
    async getUser(){
        return this.users;
    }

    async createUser(userName:CreateUserDto){
        const{name}=userName;

        this.users.push(name);
        return this.users;
    }

}
