import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "src/user/shemas/user.shema";

export class SignUpDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsEmail({}, { message: 'enter correct email' })
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    readonly password: string;

    @IsOptional()
    @IsEnum(UserRole)
    readonly role: UserRole;
}