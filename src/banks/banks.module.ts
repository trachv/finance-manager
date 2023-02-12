import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BankController } from './banks.controller';
import { BankService } from './banks.service';

@Module({
  controllers: [BankController],
  providers: [BankService, PrismaService],
  exports: [BankService],
})
export class BankModule {}
