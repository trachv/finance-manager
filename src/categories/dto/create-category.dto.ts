import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionTypes } from '../../transactions/dto/transaction-type.dto';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Category name', nullable: true, required: true })
  name: string;

  @IsNotEmpty()
  @IsEnum(TransactionTypes, { each: true })
  @ApiProperty({
    description: 'Transaction type',
    nullable: true,
    required: true,
  })
  type: string;
}
