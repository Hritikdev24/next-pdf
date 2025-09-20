import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmployeeService {
    constructor(private readonly userService:UserService){}

    getAllEmployee(){
        return this.userService.getUser();
    }
}
