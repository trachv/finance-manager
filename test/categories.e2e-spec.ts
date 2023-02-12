import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CategoryModule } from '../src/categories/categories.module';
import { CategoryService } from '../src/categories/categories.service';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  const categoryService = {
    findAll: () => {
      return [
        {
          id: 1,
          name: 'TestCategory',
          type: 'profitable',
        },
      ];
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule],
    })
      .overrideProvider(CategoryService)
      .useValue(categoryService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200)
      .expect(categoryService.findAll());
  });
});
