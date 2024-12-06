import { Budget } from 'src/budget/entities/budget.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  user: User;

  @Column({})
  userID: string;

  @ManyToOne(() => Budget)
  @JoinColumn({ name: 'budgetID', referencedColumnName: 'id' })
  budget: Budget;

  @Column({})
  budgetID: string;

  @ManyToOne(() => Wallet)
  @JoinColumn({ name: 'walletID', referencedColumnName: 'id' })
  wallet: Budget;

  @Column({})
  walletID: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  url_icon: string;

  @Column({type: 'decimal'})
  budget_for_category: number

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transaction: Transaction[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
