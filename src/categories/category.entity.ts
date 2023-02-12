import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({ description: 'Category identifier', nullable: true })
  id: number;

  @ApiProperty({ description: 'Category name', nullable: true })
  name: string;

  @ApiProperty({ description: 'Category type', nullable: true })
  type: string;
}
