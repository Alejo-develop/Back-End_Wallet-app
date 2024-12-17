import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Get(':id/:budgetID')
  async findAll(@Param('id') id: string, @Param('budgetID') budgetID: string) {
    return await this.categorysService.findAll(id, budgetID);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    
    return await this.categorysService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  async addMoney(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categorysService.addMoney(id, updateCategoryDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) { 
    return await this.categorysService.removeCategory(id);
  }
}
