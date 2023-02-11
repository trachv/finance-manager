import { Module } from '@nestjs/common';
import { BankModule } from 'src/banks/banks.module';
import { CategoryModule } from 'src/categories/categories.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';

@Module({
  imports: [BankModule, CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
})
export class TransactionModule {}
