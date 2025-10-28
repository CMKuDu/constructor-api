import { User } from "src/Enities/user.entity";
import { ReqAuth } from "../dto/req-auth.dto";

export interface IAutheService {
    registerAccount(dto: ReqAuth.ResignDTO): Promise<{
        message: string;
        userId: number;
        userName: string;
    }>;

    loginAccount(dto: ReqAuth.LoginDTO): Promise<{
        token: { accessToken: string; refreshToken: string };
        info: { user: User; userName: string; email: string };
    }>;
}