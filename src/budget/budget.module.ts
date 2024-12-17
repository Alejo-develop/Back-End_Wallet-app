import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { JwtModule } from '@nestjs/jwt';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { WalletModule } from '../wallet/wallet.module';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { CategorysModule } from '../categorys/categorys.module';

@Module({
  imports: [
    TransactionsModule,
    forwardRef(() => CategorysModule),
    WalletModule,
    JwtModule,
    TypeOrmModule.forFeature([Budget]),
  ],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
