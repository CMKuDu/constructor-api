export class JwtPayload {
    sub: {
        id: number;
        type: 'admin' | 'system';
    };
    iat: number;
    exp: number;
}