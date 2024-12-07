import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get(':id')
  async findBudget(@Param('id') id: string){
    return await this.budgetService.findOne(id)
  }

  @Get('budgetsuser/:id')
  async findAllBudget(@Param('id') id: string){
    return await this.budgetService.findAllBudgetUser(id)
  }

  @Post()
  async createBudget(@Body() createBudgetDto: CreateBudgetDto){
    return await this.budgetService.createBudget(createBudgetDto)
  } 
}
