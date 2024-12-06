import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    return await this.walletRepository.save(createWalletDto);
  }

  async findById(id: string) {
    const walletFound = await this.walletRepository.findOne({ where: { id } });

    if (!walletFound) throw new NotFoundException('Wallet not found');

    return walletFound;
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const walletFound = await this.findById(id);

    return await this.walletRepository.save({
      ...walletFound,
      ...updateWalletDto,
    });
  }

  async subtractMoney(id: string, cost: number) {
    const walletFound = await this.findById(id);

    const newSalary = walletFound.salary - cost

    walletFound.salary = newSalary
    return await this.walletRepository.save(walletFound);
  }

  async addMoney(id: string, cost: number) {
    const walletFound = await this.findById(id);

    const newSalary = walletFound.salary + cost

    walletFound.salary = newSalary
    return await this.walletRepository.save(walletFound);
  }

  async remove(id: string) {
    await this.findById(id);
    return await this.walletRepository.softDelete(id);
  }
}
