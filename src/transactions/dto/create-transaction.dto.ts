import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionTypes } from './transaction-type.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Bank id', nullable: true, required: true })
  bankId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: 'Categories of transaction',
    nullable: true,
    required: true,
  })
  categoryIds: number[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Transaction amount',
    nullable: true,
    required: true,
  })
  amount: number;

  @IsNotEmpty()
  @IsEnum(TransactionTypes, { each: true })
  @ApiProperty({
    description: 'Transaction type',
    nullable: true,
    required: true,
  })
  type: string;
}
