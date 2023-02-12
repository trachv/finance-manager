import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.prisma.category.findMany({});
  }

  async findById(id: number): Promise<CategoryEntity> {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: number[]): Promise<CategoryEntity[]> {
    return await this.prisma.category.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.prisma.category.create({
      data: {
        ...data,
        type: data.type as TransactionType,
      },
    });
  }

  async update(id: number, data: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...data,
        type: data.type as TransactionType,
      },
    });
  }

  async allowedToDelete(id: number): Promise<boolean> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        categories: {
          some: {
            id,
          },
        },
      },
    });

    return transactions.length > 0 ? false : true;
  }

  async delete(id: number): Promise<CategoryEntity> {
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
