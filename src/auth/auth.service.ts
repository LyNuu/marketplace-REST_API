import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from '../user/shemas/user.shema'
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Exception } from 'sass';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, role } = signUpDto


        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPass = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPass,
            role: role || UserRole.USER
        })

        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPass = await bcrypt.compare(password, user.password)

        if (!isPass) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({ id: user._id })
        return { token }
    }
}
