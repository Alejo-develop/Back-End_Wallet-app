import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  userID: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  totalCash: number;

  @IsString()
  cardName: string;

  @MinLength(10)
  @MaxLength(10)
  @IsString()
  cardNumber: string;

  @MinLength(4)
  @MaxLength(4)
  @IsString()
  expirationDate: string;

  @MinLength(3)
  @MaxLength(3)
  @IsString()
  cvv: string;

  @MaxLength(2)
  @IsOptional()
  @IsString()
  payDay?: string;

  @IsOptional()
  @IsNumber()
  extraCash: number;

  @IsOptional()
  @IsNumber()
  expenditures?: number;
}
