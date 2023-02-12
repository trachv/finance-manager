import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionModule } from '../src/transactions/transactions.module';
import { TransactionService } from '../src/transactions/transactions.service';

describe('TransactionController (e2e)', () => {
  let app: INestApplication;
  const transactionService = {
    findAll: () => {
      return {
        transactions: [
          {
            id: 1,
            type: 'profitable',
            amount: 100,
            bank: {
              id: 1,
              name: 'TestBank',
              mfo: '123321',
              balance: 100,
            },
            categories: [
              {
                id: 1,
                name: 'Salary',
                type: 'profitable',
              },
            ],
          },
        ],
      };
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionModule],
    })
      .overrideProvider(TransactionService)
      .useValue(transactionService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/transactions (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(200)
      .expect(transactionService.findAll());
  });
});
