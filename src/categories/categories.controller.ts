import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './categories.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryEntity,
    isArray: true,
  })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Category identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category not found',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findById(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: CategoryEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error validation',
  })
  async create(@Body() category: CreateCategoryDto) {
    return await this.categoryService.create(category);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Category identifier' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category for update not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error validation',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryData: CreateCategoryDto,
  ) {
    const category = await this.categoryService.findById(id);
    if (!category) {
      throw new HttpException(
        'Category for update not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.categoryService.update(id, categoryData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Category identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category to delete not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Category used in another objects, cannot be deleted',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findById(id);
    if (!category) {
      throw new HttpException(
        'Category to delete not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const allowedToDelete = await this.categoryService.allowedToDelete(id);

    if (!allowedToDelete) {
      throw new HttpException(
        'Category used in another objects, cannot be deleted',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.categoryService.delete(id);
  }
}
