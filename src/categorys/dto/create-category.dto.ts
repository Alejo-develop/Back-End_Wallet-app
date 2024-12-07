import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  budgetID: string;

  @IsString()
  userID: string;

  @IsString()
  walletID: string;

  @IsString()
  name: string;

  @IsString()
  url_icon: string;

  @IsNumber()
  budget_for_category: number;
}
