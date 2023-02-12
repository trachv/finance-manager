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
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BankService } from '../banks/banks.service';
import { CategoryService } from '../categories/categories.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListAllTransactions } from './dto/list-all-transactions.dto';
import { ListTransactionEntity, TransactionEntity } from './transaction.entity';
import { TransactionService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly bankService: BankService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Take for pagination, default value 20 items',
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'Cursor for pagination, send it from previous request',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: ListTransactionEntity,
  })
  async findAll(@Query() query: ListAllTransactions) {
    return await this.transactionService.findAll(query.take, query.cursor);
  }

  @Post()
  @ApiOperation({ summary: 'Create new transactions' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: TransactionEntity,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Bank with id not found',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Some of sended categories were not found in database by ids',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description:
      'Some of sended categories type not equal to sended transaction type',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error validation',
  })
  async create(@Body() transactionData: CreateTransactionDto) {
    const bank = await this.bankService.findById(transactionData.bankId);

    if (!bank) {
      throw new HttpException(
        `Bank with id ${transactionData.bankId} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const categories = await this.categoryService.findByIds(
      transactionData.categoryIds,
    );

    //it can be better
    if (categories.length !== transactionData.categoryIds.length) {
      throw new HttpException(
        `Some of sended categories were not found in database by ids`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      categories.filter((c) => c.type === transactionData.type).length !==
      categories.length
    ) {
      throw new HttpException(
        `Some of sended categories type not equal to ${transactionData.type}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdTransaction = await this.transactionService.create(
      transactionData,
    );

    const updateBankBalance = await this.bankService.updateBalance(
      createdTransaction,
    );

    return {
      ...createdTransaction,
      bank: updateBankBalance,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transactions by specified id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Transactions identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TransactionEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transactions for delete not found',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const transactions = await this.transactionService.findById(id);

    if (!transactions) {
      throw new HttpException(
        'Transactions for delete not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedTransaction = await this.transactionService.delete(id);

    const updateBankBalance = await this.bankService.updateBalance(
      deletedTransaction,
      false,
    );

    return {
      ...deletedTransaction,
      bank: updateBankBalance,
    };
  }
}
