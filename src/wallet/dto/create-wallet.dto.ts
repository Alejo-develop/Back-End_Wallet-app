import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  userID: string;

  @IsNumber()
  salary: number;

  @IsOptional()
  @IsString()
  cardName: string;

  @IsOptional()
  @MinLength(10)
  @MaxLength(10)
  @IsString()
  cardNumber: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(4)
  @IsString()
  expirationDate: string;

  @IsOptional()
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
}
