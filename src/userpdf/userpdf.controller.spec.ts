import { Test, TestingModule } from '@nestjs/testing';
import { UserpdfController } from './userpdf.controller';
import { UserpdfService } from './userpdf.service';

describe('UserpdfController', () => {
  let controller: UserpdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserpdfController],
      providers: [UserpdfService],
    }).compile();

    controller = module.get<UserpdfController>(UserpdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
