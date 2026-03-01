import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './shemas/user.shema';
import { UserCreateDto } from './dto/user-create.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    @Roles(UserRole.ADMIN)
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async createUser(@Body()
    user: UserCreateDto
    ): Promise<User> {
        return this.userService.create(user);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async deleteUserById(@Param('id') id: string): Promise<User> {
        return this.userService.deleteById(id);
    }
}