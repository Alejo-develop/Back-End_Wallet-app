import { Budget } from 'src/budget/entities/budget.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  user: User;

  @Column()
  userID: string;

  @ManyToOne(() => Budget)
  @JoinColumn({ name: 'budgetID', referencedColumnName: 'id' })
  budget: Budget;

  @Column()
  budgetID: string;

  @ManyToOne(() => Wallet)
  @JoinColumn({ name: 'walletID', referencedColumnName: 'id' })
  wallet: Wallet;

  @Column()
  walletID: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryID', referencedColumnName: 'id' })
  category: Category;

  @Column()
  categoryID: string;

  @Column()
  name: string;

  @Column({nullable: true})
  store: string;

  @Column({nullable: true})
  bill: string;

  @Column({nullable: true})
  description: string;

  @Column({type: 'decimal'})
  cost: number;

  @Column()
  date: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
