import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { BudgetService } from 'src/budget/budget.service';
import { CategorysService } from 'src/categorys/categorys.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly budgetServices: BudgetService,
    private readonly categoryServices: CategorysService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.categoryServices.substractMoney(
      createTransactionDto.categoryID,
      createTransactionDto.cost,
    );

    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      date: new Date()
    })

    return await this.transactionRepository.save(transaction);
  }

  async findById(id: string) {
    const transactionFound = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transactionFound) throw new NotFoundException('Transaction not found');

    return transactionFound;
  }

  async updateTransaction(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transactionFound = await this.findById(id);

    return await this.transactionRepository.save({
      ...transactionFound,
      ...updateTransactionDto,
    });
  }
}
