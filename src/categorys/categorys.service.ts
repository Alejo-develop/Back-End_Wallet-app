import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(id: string) {
    return await this.categoryRepository.find({ where: { userID: id } });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
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

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto){
    const categoryFound = await this.findOneById(id);

    return await this.categoryRepository.save({...categoryFound, ...updateCategoryDto})
  }

  async removeCategory(id: string) {
    await this.findOneById(id);

    return await this.categoryRepository.softDelete(id);
  }
}
