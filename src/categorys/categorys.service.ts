import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { BudgetService } from 'src/budget/budget.service';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => BudgetService)) private readonly budgetServices: BudgetService,
  ) {}

  async findAll(id: string, budgetID: string) {
    return await this.categoryRepository.find({ where: { userID: id, budgetID: budgetID } });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    await this.budgetServices.substractMoney(
      createCategoryDto.budgetID,
      createCategoryDto.budget_for_category,
    );
    return await this.categoryRepository.save(createCategoryDto);
  }

  async substractMoney(id: string, cost: number) {
    const categoryFound = await this.findOneById(id);

    categoryFound.budget_for_category =
      categoryFound.budget_for_category - cost;

    if(categoryFound.budget_for_category < 0) throw new BadRequestException('Amount exceeds category limit')

    return await this.categoryRepository.save(categoryFound);
  }

  async findOneById(id: string) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    return categoryFound;
  }

  async addMoney(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.findOneById(id)
    
    await this.budgetServices.substractMoney(
      updateCategoryDto.budgetID,
      updateCategoryDto.budget_for_category,
    );
    
    return await this.categoryRepository.save({
      ...categoryFound,
      ...updateCategoryDto,
    });
  }

  async removeCategory(id: string) {
    await this.findOneById(id);

    return await this.categoryRepository.softDelete(id);
  }
}
