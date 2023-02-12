import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionByCategoryDto } from './dto/transaction-by-category.dto';
import { TransactionByCategory } from './statistics.entity';
import { StatisticService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get statistic transactions by category' })
  @ApiBody({ type: TransactionByCategoryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: TransactionByCategory,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error validation',
  })
  async transactionsByCategory(
    @Body() transactionByCategoryDto: TransactionByCategoryDto,
  ) {
    const { from_period, to_period, categoryIds } = transactionByCategoryDto;
    return this.statisticService.transactionsByCategory(
      categoryIds,
      from_period,
      to_period,
    );
  }
}
