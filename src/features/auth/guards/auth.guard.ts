import { VALUES_CONST } from '@/constants';
import { Token } from '@/features/token/model/token.model';
import { verifyToken } from '@/utils';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    const refreshToken = request.cookies[VALUES_CONST.RT_NAME];

    if (!token) {
      throw new ForbiddenException('Vui lòng bổ sung token để xác thực');
    }

    const keyStore = await this.tokenModel.findOne({
      token_refreshTokenUsing: refreshToken,
    });

    if (!keyStore) {
      throw new ForbiddenException('Vui lòng đăng nhập lại');
    }

    try {
      const payload = verifyToken(token, keyStore.token_publicKey);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Xác thực không thành công');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
