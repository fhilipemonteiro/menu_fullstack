import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadRequestException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IsUUID, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

class uuid {
  @IsUUID()
  readonly id: string;
}

@Injectable()
export class idIsValid implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const idDTO = plainToClass(uuid, { id: request.params.id });
    const errors = await validate(idDTO);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid ID');
    }

    return next.handle();
  }
}
