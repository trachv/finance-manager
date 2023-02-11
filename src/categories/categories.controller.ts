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
  async findById(@Param('id') id: string) {
    const category = await this.categoryService.findById(Number(id));
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CategoryEntity,
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
  async update(
    @Param('id') id: string,
    @Body() categoryData: CreateCategoryDto,
  ) {
    const category = await this.categoryService.findById(Number(id));
    if (!category) {
      throw new HttpException(
        'Category for update not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.categoryService.update(Number(id), categoryData);
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
  async delete(@Param('id') id: string) {
    const category = await this.categoryService.findById(Number(id));
    if (!category) {
      throw new HttpException(
        'Category to delete not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.categoryService.delete(Number(id));
  }
}
