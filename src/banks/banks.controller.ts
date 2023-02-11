import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
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
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findAll() {
    try {
      return await this.bankService.findAll();
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bank with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Bank identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async findById(@Param('id') id: string) {
    try {
      return await this.bankService.findById(Number(id));
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
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
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async create(@Body('bank') createData: CreateBankDto) {
    try {
      return await this.bankService.create(createData);
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a bank' })
  @ApiBody({ type: CreateBankDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body('bank') updateData: CreateBankDto,
  ) {
    try {
      return await this.bankService.update(Number(id), updateData);
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bank with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Bank identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BankEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async delete(@Param('id') id: string) {
    try {
      return await this.bankService.delete(Number(id));
    } catch (error) {
      throw new InternalServerErrorException({ message: error });
    }
  }
}
