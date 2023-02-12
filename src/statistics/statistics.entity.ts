import { ApiProperty } from '@nestjs/swagger';

export class TransactionByCategory {
  @ApiProperty({
    description: 'Category name and sum by category',
    nullable: true,
  })
  categoryName: number;
}
