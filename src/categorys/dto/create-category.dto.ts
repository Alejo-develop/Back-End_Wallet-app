import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  budgetID: string;

  @IsString()
  userID: string;

  @IsString()
  walletID: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url_icon: string;

  @IsNumber()
  budget_for_category: number;
}
