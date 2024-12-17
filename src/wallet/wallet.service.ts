import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const formatWallet = {
      ...createWalletDto,
      totalCash: createWalletDto.salary
    }

    return await this.walletRepository.save(formatWallet);
  }

  async findByUserId(id: string) {
    const walletFound = await this.walletRepository.findOne({
      where: { userID: id },
    });

    if (!walletFound) throw new NotFoundException('Wallet not found');

    return walletFound;
  }

  async findById(id: string) {
    const walletFound = await this.walletRepository.findOne({
      where: { id: id },
    });

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
    const walletFound = await this.findByUserId(id);
    console.log(walletFound);
    

    const newSalary = walletFound.totalCash - cost;

    if (newSalary < 0)
      throw new BadRequestException(
        'You cannot register this budget due to lack of money in the wallet.',
      );

    walletFound.totalCash = newSalary;
    const newExpenditures = parseFloat(walletFound.expenditures.toString()) + cost
    walletFound.expenditures = newExpenditures

    return await this.walletRepository.save(walletFound);
  }

  async addMoney(id: string, cost: number) {
    const walletFound = await this.findByUserId(id);

    const newSalary = walletFound.totalCash + cost;

    walletFound.salary = newSalary;
    return await this.walletRepository.save(walletFound);
  }

  async remove(id: string) {
    await this.findByUserId(id);
    return await this.walletRepository.softDelete(id);
  }
}
