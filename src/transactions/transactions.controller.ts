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
    console.log(createTransactionDto);
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get('findOne/:id')
  async findById(@Param('id') id: string){
    return await this.transactionsService.findById(id)
  }

  @Get(':id')
  async findAll(@Param('id') id: string){
    return await this.transactionsService.findAllTransactions(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto){
    return await this.transactionsService.updateTransaction(id, updateTransactionDto)
  }
}
