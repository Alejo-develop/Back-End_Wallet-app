import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsString()
    userID: string;
    
    @IsString()
    budgetID: string;

    @IsString()
    walletID: string;

    @IsString()
    categoryID: string;

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    store: string

    @IsOptional()
    @IsString()
    description: string

    @IsNumber()
    cost: number
}
