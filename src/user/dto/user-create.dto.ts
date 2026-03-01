import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import {UserRole} from "../shemas/user.shema";

export class UserCreateDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    readonly password: string;

    @IsOptional()
    @IsEnum(UserRole)
    readonly role: UserRole;
}