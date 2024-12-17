import { Budget } from '../../budget/entities/budget.entity';
import { Category } from '../../categorys/entities/category.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Budget, (budget) => budget.user)
  budget: Budget[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction: Transaction[];

  @OneToMany(() => Category, (category) => category.user)
  category: Category[]

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
