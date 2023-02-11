import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankController } from './banks.controller';
import { BankService } from './banks.service';

@Module({
  controllers: [BankController],
  providers: [BankService, PrismaService],
})
export class BankModule {}
