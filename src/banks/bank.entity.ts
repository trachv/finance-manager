import { ApiProperty } from '@nestjs/swagger';

export class BankEntity {
  @ApiProperty({ description: 'Bank identifier', nullable: true })
  id: number;

  @ApiProperty({ description: 'Bank name', nullable: true })
  name: string;

  @ApiProperty({ description: 'Balance of bank account', nullable: true })
  balance: number;

  @ApiProperty({ description: 'Bank mfo', nullable: true })
  mfo: string;
}
