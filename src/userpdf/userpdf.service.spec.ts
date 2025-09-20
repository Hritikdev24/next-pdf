import { Test, TestingModule } from '@nestjs/testing';
import { UserpdfService } from './userpdf.service';

describe('UserpdfService', () => {
  let service: UserpdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpdfService],
    }).compile();

    service = module.get<UserpdfService>(UserpdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
