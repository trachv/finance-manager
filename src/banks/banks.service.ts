import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankEntity } from './bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<BankEntity[]> {
    return await this.prisma.bank.findMany({});
  }

  async findById(id: number): Promise<BankEntity> {
    return this.prisma.bank.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateBankDto): Promise<BankEntity> {
    return this.prisma.bank.create({
      data,
    });
  }

  async update(id: number, data: CreateBankDto): Promise<BankEntity> {
    return this.prisma.bank.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<BankEntity> {
    return this.prisma.bank.delete({
      where: {
        id,
      },
    });
  }
}
