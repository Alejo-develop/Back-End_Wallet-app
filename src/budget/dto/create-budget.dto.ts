import {IsNumber, IsString} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  name: string

  @IsNumber()
  budget: number
  
  @IsString()
  userID: string;
  
  @IsString()
  walletID: string;
}
