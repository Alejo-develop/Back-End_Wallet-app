import { Budget } from 'src/budget/entities/budget.entity';
import { Category } from 'src/categorys/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
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

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryID', referencedColumnName: 'id' })
  category: Category;

  @Column()
  categoryID: string;

  @Column()
  name: string;

  @Column()
  store: string;

  @Column()
  bill: string;

  @Column()
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
