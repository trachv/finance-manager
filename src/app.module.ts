import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './banks/banks.module';
import { CategoryModule } from './categories/categories.module';
import { StatisticModule } from './statistics/statistics.module';
import { TransactionModule } from './transactions/transactions.module';

@Module({
  imports: [BankModule, CategoryModule, TransactionModule, StatisticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
