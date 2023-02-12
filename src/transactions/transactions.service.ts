import { Injectable } from '@nestjs/common';
import { Transaction, TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './transaction.entity';
import { IPagination } from './types.transactions';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    take = 20,
    cursor?: number,
  ): Promise<{ transactions: TransactionEntity[]; currentCursor: number }> {
    const query: IPagination = {
      take,
    };

    if (cursor) {
      query['cursor'] = { id: cursor };
      query['skip'] = 1;
    }

    const transactions = await this.prisma.transaction.findMany({
      ...query,
      select: {
        id: true,
        type: true,
        amount: true,
        bank: {
          select: {
            id: true,
            name: true,
            mfo: true,
            balance: true,
          },
        },
        categories: true,
      },
    });

    const lastPostInResults = transactions[take - 1];
    const currentCursor: number = lastPostInResults?.id;

    return {
      transactions,
      currentCursor,
    };
  }

  async findById(id: number): Promise<Transaction> {
    return this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateTransactionDto): Promise<TransactionEntity> {
    const transaction = await this.prisma.transaction.create({
      data: {
        type: data.type as TransactionType,
        amount: data.amount,
        bank: { connect: { id: data.bankId } },
        categories: {
          connect: data.categoryIds.map((catId) => {
            return { id: catId };
          }),
        },
        createdAt: new Date(),
      },
      select: {
        id: true,
        type: true,
        amount: true,
        bank: {
          select: {
            id: true,
            name: true,
            mfo: true,
            balance: true,
          },
        },
        categories: true,
      },
    });

    return transaction;
  }

  async delete(id: number): Promise<TransactionEntity> {
    const deletedTransactions = await this.prisma.transaction.delete({
      where: {
        id,
      },
      select: {
        id: true,
        type: true,
        amount: true,
        bank: {
          select: {
            id: true,
            name: true,
            mfo: true,
            balance: true,
          },
        },
        categories: true,
      },
    });
    return deletedTransactions;
  }
}
