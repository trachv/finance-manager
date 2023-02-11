import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListAllTransactions {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  take: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  cursor: number;
}
