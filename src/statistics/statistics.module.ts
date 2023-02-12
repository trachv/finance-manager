import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticController } from './statistics.controller';
import { StatisticService } from './statistics.service';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, PrismaService],
})
export class StatisticModule {}
