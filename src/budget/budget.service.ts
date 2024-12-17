import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
    private readonly walletServices: WalletService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionsServices: TransactionsService,
  ) {}

  async findOne(id: string) {
    const budgetFound = await this.budgetRepository.findOne({ where: { id } });

    if (!budgetFound) throw new NotFoundException('Budget not found');

    return budgetFound;
  }

  async findAllBudgetUser(userID: string) {
    const budgetFound = await this.budgetRepository.find({
      where: { userID: userID },
    });
    console.log(budgetFound);
    

    if (!budgetFound) throw new NotFoundException('Budgets not found');

    return budgetFound;
  }

  async createBudget(createBudgetDto: CreateBudgetDto) {
    await this.walletServices.subtractMoney(
      createBudgetDto.userID,
      createBudgetDto.budget,
    );

    return await this.budgetRepository.save(createBudgetDto);
  }

  async substractMoney(id: string, cost: number) {
    const budgetFound = await this.findOne(id);
    console.log(budgetFound);
    

    const newBudget = budgetFound.budget - cost;

    if (newBudget < 0)
      throw new BadRequestException(
        'You cannot register this transaction due to lack of money in the budget.',
      );

    budgetFound.budget -= cost;
    return await this.budgetRepository.save(budgetFound);
  }

  async addMoney(id: string, userId: string, cost: number) {
    const budgetFound = await this.findOne(id);

    const newBudget = budgetFound.budget + cost
    budgetFound.budget = newBudget

    await this.walletServices.subtractMoney(userId, cost);

    return await this.budgetRepository.save(budgetFound);
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.budgetRepository.softDelete(id);
  }
}
