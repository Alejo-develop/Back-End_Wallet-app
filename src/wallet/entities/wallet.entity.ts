import { Budget } from 'src/budget/entities/budget.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  user: User;

  @Column({})
  userID: string;

  @Column({ type: 'decimal' })
  salary: number;

  @Column({})
  cardName: string;

  @Column({})
  CardNumber: string;

  @Column({})
  expirationDate: string;

  @Column({})
  cvv: string;

  @Column({ type: 'decimal', nullable: true })
  extraCash: number;

  @Column({ type: 'decimal' })
  expenditures: number;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];

  @OneToMany(() => Category, (category) => category.wallet)
  category: Category[];

  @OneToMany(() => Budget, (budget) => budget.wallet)
  budget: Budget[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
