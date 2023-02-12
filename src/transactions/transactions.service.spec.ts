import { Test, TestingModule } from '@nestjs/testing';
import { BankModule } from '../banks/banks.module';
import { CategoryModule } from '../categories/categories.module';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BankModule, CategoryModule],
      controllers: [TransactionController],
      providers: [TransactionService, PrismaService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
