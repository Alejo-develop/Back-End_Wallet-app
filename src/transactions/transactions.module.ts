import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { JwtModule } from '@nestjs/jwt';
import { BudgetModule } from 'src/budget/budget.module';
import { CategorysModule } from 'src/categorys/categorys.module';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => BudgetModule),
    forwardRef(() => CategorysModule),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
