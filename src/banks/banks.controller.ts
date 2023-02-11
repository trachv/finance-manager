import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BankEntity } from './bank.entity';
import { BankService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';

@ApiTags('Banks')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  @ApiOperation({ summary: 'Get all banks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
    isArray: true,
  })
  async findAll() {
    return await this.bankService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bank with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Bank identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Bank not found' })
  async findById(@Param('id') id: string) {
    const bank = await this.bankService.findById(Number(id));
    if (!bank) {
      throw new HttpException('Bank not found', HttpStatus.NOT_FOUND);
    }

    return bank;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a bank' })
  @ApiBody({ type: CreateBankDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Bank with mfo exist',
  })
  async create(@Body() bankData: CreateBankDto) {
    const bankByMfo = await this.bankService.findByMfo(bankData.mfo);
    if (bankByMfo) {
      throw new HttpException(
        `Bank with mfo ${bankData.mfo} is exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.bankService.create(bankData);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a bank by specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Bank identifier' })
  @ApiBody({ type: CreateBankDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Bank for update not found',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Bank with mfo exist',
  })
  async update(@Param('id') id: string, @Body() bankData: CreateBankDto) {
    const bank = await this.bankService.findById(Number(id));
    if (!bank) {
      throw new HttpException(
        'Bank for update not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const bankByMfo = await this.bankService.findByMfo(bankData.mfo);
    if (bankByMfo) {
      throw new HttpException(
        `Bank with mfo ${bankData.mfo} is exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.bankService.update(Number(id), bankData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bank by specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Bank identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Bank for delete not found',
  })
  async delete(@Param('id') id: string) {
    const bank = await this.bankService.findById(Number(id));
    if (!bank) {
      throw new HttpException(
        'Bank for delete not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.bankService.delete(Number(id));
  }
}
