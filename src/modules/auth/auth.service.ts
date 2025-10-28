import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAutheService } from './interface/authen.interface';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/Enities/user.entity';
import { ReqAuth } from './dto/req-auth.dto';
import bcrypt from 'node_modules/bcryptjs';
import { ApiErrorException } from 'src/exceptions/api-reponse.exception';
import { ReqUser } from '../user/dto/req-user.dto';

@Injectable()
export class AuthService implements IAutheService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService,
        @Inject(forwardRef(() => ConfigService))
        private readonly configService: ConfigService
    ) { }
    async registerAccount(dto: ReqAuth.ResignDTO): Promise<{ message: string; userId: number; userName: string; }> {
         this.validateResignInput(dto)
        const find = await this.isEmailAvailable(dto.email)
        if (find) {
            throw new ApiErrorException('User already exits', HttpStatus.CONFLICT)
        }
        const pwdHash = await this.hashPwd(dto.password)
        const newUser = this.mapDtoToUser(dto, pwdHash)
        const saveUser = await this.userService.createUser(newUser)
        if (!saveUser) {
            throw new ApiErrorException('Failed to create user', HttpStatus.BAD_REQUEST);
        }
        return {
            message: 'Resign Susseccfully',
            userId: saveUser.id,
            userName: saveUser.userName
        }
    }
    async loginAccount(dto: ReqAuth.LoginDTO): Promise<{ token: { accessToken: string; refreshToken: string; }; info: { user: User; userName: string; email: string; }; }> {
        this.validateLoginInput(dto)
        const user = await this.userService.getUserByEmail({ email: dto.email })
        if (!user) {
            throw new ApiErrorException('Wrong Password or Account', HttpStatus.CONFLICT)
        }
        const secretPwd = dto.password + this.configService.get<string>('SECRET');
        const isPasswordValid = await bcrypt.compare(secretPwd, user.password);
        if (!isPasswordValid) {
            throw new ApiErrorException('Wrong Password or Account', HttpStatus.UNAUTHORIZED)
        }
        const [accessToken, refreshToken] = this.tokenService.generateToken({
            payload: {
                sub: {
                    id: user.id,
                },
            },
        });
        return {
            token: { accessToken, refreshToken },
            info: {
                user,
                userName: user.userName,
                email: user.email ? user.email : '',
            }
        }
    }
    private validateResignInput(dto: any): void {
        const errors: string[] = [];

        if (!dto.email?.trim()) {
            errors.push('Email không được để trống');
        }

        if (!dto.password?.trim()) {
            errors.push('Mật khẩu không được để trống');
        }

        if (!dto.userName?.trim()) {
            errors.push('Tên đăng nhập không được để trống');
        }

        if (dto.email && !this.isValidEmail(dto.email)) {
            errors.push('Email không đúng định dạng');
        }

        if (dto.password && !this.isValidPassword(dto.password)) {
            errors.push('Mật khẩu phải có ít nhất 6 ký tự');
        }
        if (dto.password !== dto.rePassword) {
            errors.push('Mật khẩu nhập lại không khớp');
        }

        if (errors.length > 0) {
            throw new ApiErrorException(errors.join(', '), HttpStatus.BAD_REQUEST);
        }
    }
    private validateLoginInput(dto: ReqAuth.LoginDTO): void {
        const errors: string[] = [];

        if (!dto.email?.trim()) {
            errors.push('Email không được để trống');
        }

        if (!dto.password?.trim()) {
            errors.push('Mật khẩu không được để trống');
        }

        if (dto.email && !this.isValidEmail(dto.email)) {
            errors.push('Email không đúng định dạng');
        }

        if (errors.length > 0) {
            throw new ApiErrorException(errors.join(', '), HttpStatus.BAD_REQUEST);
        }
    }
    private async isEmailAvailable(email: string): Promise<boolean> {
        const find = await this.userService.getUserByEmail({ email });
        if (find) return true;
        return false;
    }
    private isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    private isValidPassword(password: string): boolean {
        // At least 6 characters, you can add more rules
        return password.length >= 6;
    }
    private mapDtoToUser(dto: ReqAuth.ResignDTO, hashedPassword: string): ReqUser.createUser {
        const { password, ...rest } = dto;
        return {
            ...rest,
            password: hashedPassword,
        };
    }
    private async hashPwd(pwd: string): Promise<string> {
        const SECRET = this.configService.get<string>('SECRET');
        const SALT_ROUNDS = this.configService.get<string>('SALT_ROUNDS');
        const secretPwd = pwd + SECRET;
        return await bcrypt.hash(secretPwd, Number(SALT_ROUNDS))
    }
}
