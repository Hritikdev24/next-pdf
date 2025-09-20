import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class MicroserviceService {

    constructor(@Inject("PRODUCT_SERVICE") private readonly productSerive:ClientProxy){}

     
        async getList(){
                    
          try{
            const list=await firstValueFrom(this.productSerive.send("list",{}).pipe(timeout(5000)));
            return list;
          }catch(err){
            throw new HttpException("services are down",410);
          }
        }


}
