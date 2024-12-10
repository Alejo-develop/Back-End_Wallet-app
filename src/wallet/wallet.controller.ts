import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':id')
  async findWalletByID(@Param('id') id: string) {
    return await this.walletService.findByUserId(id);
  }

  @Post()
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletService.create(createWalletDto);
  }

  @Patch(':id')
  async updateWallet(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    console.log(id, updateWalletDto);
    
    return await this.walletService.update(id, updateWalletDto);
  }

  @Delete(':id')
  async removeWallet(@Param('id') id: string) {
    return await this.walletService.remove(id);
  }
}
