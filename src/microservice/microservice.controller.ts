import { Controller, Get } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';

@Controller('microservice')
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  @Get("list")
  getList(){
    return this.microserviceService.getList();
  }
}
