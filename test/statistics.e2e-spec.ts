import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StatisticService } from '../src/statistics/statistics.service';
import { StatisticModule } from '../src/statistics/statistics.module';

describe('StatisticController (e2e)', () => {
  let app: INestApplication;
  const statisticService = {
    transactionsByCategory: (categoryIds: number[]) => {
      const mockData = [
        { Salary: 100, id: 1 },
        { Petrol: 200, id: 2 },
      ];
      return mockData
        .filter((data) => categoryIds.find((c) => c === data.id))
        .map((data) => {
          delete data.id;
          return data;
        });
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StatisticModule],
    })
      .overrideProvider(StatisticService)
      .useValue(statisticService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/statistics (GET)', () => {
    return request(app.getHttpServer())
      .post('/statistics')
      .send({
        categoryIds: [1],
      })
      .expect(200)
      .expect(statisticService.transactionsByCategory([1]));
  });
});
