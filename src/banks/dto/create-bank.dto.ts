import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Bank name', nullable: true, required: true })
  readonly name: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ description: 'Bank mfo', nullable: true, required: true })
  readonly mfo: string;
}
