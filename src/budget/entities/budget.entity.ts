import { Category } from 'src/categorys/entities/category.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
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
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  name: string;

  @Column({type: 'decimal'})
  budget: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  user: User;

  @Column({})
  userID: string;

  @ManyToOne(() => Wallet)
  @JoinColumn({ name: 'walletID', referencedColumnName: 'id' })
  wallet: User;

  @Column({})
  walletID: string;
 
  @OneToMany(() => Transaction, (transation) => transation.budget)
  transaction: Transaction[]

  @OneToMany(() => Category, (category) => category.budget)
  category: Category[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn({select: false})
  updateAt: Date;

  @DeleteDateColumn({select: false})
  deleteAt: Date;
}
