import { IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateTransactionDto {
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

    @IsOptional()
    @IsString()
    date: string
}
