import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './auth.constants';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User) private userRepo: typeof User
    ) {}

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext<{ req: Request }>();
        const token = this.extractTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException('Authentication token is not found');
        }
        const user = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
        const validUser = await this.userRepo.findOne({ where: { token }})
        if(!validUser) throw new UnauthorizedException('Session expired');
        req["user"] = user;
        ctx.getContext().user = user;
        if (!user) {
            throw new UnauthorizedException('Expired token');
        }
        return true;
    }
}

