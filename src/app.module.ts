import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './banks/banks.module';

@Module({
  imports: [BankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
