import { IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDto{
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    @IsString()
    email: string

    @MinLength(8)
    @IsOptional()
    @IsString()
    password: string
}
