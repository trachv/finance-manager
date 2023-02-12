import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private readonly prisma: PrismaService) {}

  async transactionsByCategory(
    categoryIds: number[],
    from_period?: string,
    to_period?: string,
  ) {
    if (!from_period) {
      from_period = new Date(0).toISOString();
    }
    if (!to_period) {
      to_period = new Date().toISOString();
    }

    const result = (await this.prisma.$queryRaw`
		SELECT category.name as category_name, 
    SUM(CASE WHEN category.type = 'consumable' THEN -transaction.amount ELSE transaction.amount END) as sum
		FROM "_CategoryToTransaction" as ct
		LEFT JOIN "Transaction" as transaction
		ON ct."B" = transaction.id
		LEFT JOIN "Category" as category
		ON ct."A" = category.id
		WHERE ct."A" IN (${Prisma.join(
      categoryIds,
    )}) AND transaction."createdAt" BETWEEN ${from_period}::timestamp AND ${to_period}::timestamp
		GROUP BY category.name`) as { category_name: string; sum: number }[];

    return result.map((element) => {
      const category: { [key: string]: number } = {};
      category[element.category_name] = element.sum;
      return category;
    });
  }
}
