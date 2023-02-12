import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
  async findById(@Param('id', ParseIntPipe) id: number) {
    const bank = await this.bankService.findById(id);
    if (!bank) {
      throw new HttpException('Bank not found', HttpStatus.NOT_FOUND);
    }

    return bank;
  }

  @Post()
  @ApiOperation({ summary: 'Create a bank' })
  @ApiBody({ type: CreateBankDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Bank with mfo exist',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error validation',
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error validation',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() bankData: CreateBankDto,
  ) {
    const bank = await this.bankService.findById(id);
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

    return await this.bankService.update(id, bankData);
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Bank used in another objects, cannot be deleted',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const bank = await this.bankService.findById(id);
    if (!bank) {
      throw new HttpException(
        'Bank for delete not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const allowedToDelete = await this.bankService.allowedToDelete(id);

    if (!allowedToDelete) {
      throw new HttpException(
        'Bank used in another objects, cannot be deleted',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.bankService.delete(id);
  }
}
