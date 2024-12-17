import { forwardRef, Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { JwtModule } from '@nestjs/jwt';
import { TransactionsModule } from '../transactions/transactions.module';
import { BudgetModule } from '../budget/budget.module';

@Module({
  imports: [
    forwardRef(() => TransactionsModule),
    forwardRef(() => BudgetModule), 
    JwtModule,
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
  exports: [CategorysService],
})
export class CategorysModule {}
