import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BankModule } from '../src/banks/banks.module';
import { BankService } from '../src/banks/banks.service';

describe('BankController (e2e)', () => {
  let app: INestApplication;
  const bankService = {
    findAll: () => {
      return [
        {
          id: 1,
          name: 'TestBank',
          balance: 0,
          mfo: '123321',
        },
      ];
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BankModule],
    })
      .overrideProvider(BankService)
      .useValue(bankService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/banks (GET)', () => {
    return request(app.getHttpServer())
      .get('/banks')
      .expect(200)
      .expect(bankService.findAll());
  });
});
