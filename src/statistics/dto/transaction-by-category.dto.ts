import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class TransactionByCategoryDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ description: 'Category ids', nullable: true, required: true })
  categoryIds: number[];

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Filter by period from',
    nullable: true,
    required: false,
    type: Date,
  })
  from_period: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Filter by period to',
    nullable: true,
    required: false,
    type: Date,
  })
  to_period: string;
}
