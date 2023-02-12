import { Module } from '@nestjs/common';
import { BankModule } from '../banks/banks.module';
import { CategoryModule } from '../categories/categories.module';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';

@Module({
  imports: [BankModule, CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
})
export class TransactionModule {}
