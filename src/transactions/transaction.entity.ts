import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { BankEntity } from '../banks/bank.entity';
import { CategoryEntity } from '../categories/category.entity';

export class TransactionEntity {
  @ApiProperty({ description: 'Transaction identifier', nullable: true })
  id: number;

  @ApiProperty({ description: 'Transaction type', nullable: true })
  type: TransactionType;

  @ApiProperty({ description: 'Transaction amount', nullable: true })
  amount: number;

  @ApiProperty({ description: 'Transaction bank', nullable: true })
  bank: BankEntity;

  @ApiProperty({
    description: 'Transaction categories',
    nullable: true,
    type: CategoryEntity,
    isArray: true,
  })
  categories: CategoryEntity[];
}

export class ListTransactionEntity {
  @ApiProperty({
    description: 'List of transactions',
    nullable: true,
    type: TransactionEntity,
    isArray: true,
  })
  transactions: TransactionEntity[];

  @ApiProperty({ description: 'Current cursor', nullable: true })
  currentCursor: number;
}
