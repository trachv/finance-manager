import { Injectable } from '@nestjs/common';
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

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.prisma.category.create({ data });
  }

  async update(id: number, data: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<CategoryEntity> {
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
