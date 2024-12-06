import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get('id')
  async findById(@Param(':id') id: string){
    return await this.transactionsService.findById(id)
  }

  @Patch('id')
  async update(@Param(':id') id: string, @Body() updateTransactionDto: UpdateTransactionDto){
    return await this.transactionsService.updateTransaction(id, updateTransactionDto)
  }
}
