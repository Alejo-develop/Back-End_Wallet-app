import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  userID: string;

  @IsNumber()
  salary: number;

  @IsString()
  cardName: string;

  @IsString()
  cardNumber: string;

  @IsString()
  expirationDate: string;

  @IsString()
  cvv: string;

  @IsOptional()
  @IsNumber()
  extraCash: number;

  @IsOptional()
  @IsNumber()
  expenditures?: number;
}
