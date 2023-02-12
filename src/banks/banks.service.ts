import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionEntity } from '../transactions/transaction.entity';
import { BankEntity } from './bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BankEntity[]> {
    return await this.prisma.bank.findMany({});
  }

  async findById(id: number): Promise<BankEntity> {
    return await this.prisma.bank.findUnique({
      where: {
        id,
      },
    });
  }

  async findByMfo(mfo: string): Promise<BankEntity> {
    return await this.prisma.bank.findUnique({
      where: {
        mfo,
      },
    });
  }

  async create(data: CreateBankDto): Promise<BankEntity> {
    return await this.prisma.bank.create({
      data,
    });
  }

  async update(id: number, data: CreateBankDto): Promise<BankEntity> {
    return await this.prisma.bank.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateBalance(
    transaction: TransactionEntity,
    creating = true,
  ): Promise<BankEntity> {
    let balance: number = transaction.bank.balance;
    if (
      (transaction.type === TransactionType.profitable && creating) ||
      (transaction.type === TransactionType.consumable && !creating)
    ) {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }

    return await this.prisma.bank.update({
      where: {
        id: transaction.bank.id,
      },
      data: {
        balance,
      },
    });
  }

  async allowedToDelete(id: number): Promise<boolean> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        bank: {
          id,
        },
      },
    });

    if (transactions.length) {
      return false;
    }

    return true;
  }

  async delete(id: number): Promise<BankEntity> {
    return await this.prisma.bank.delete({
      where: {
        id,
      },
    });
  }
}
