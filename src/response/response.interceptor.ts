import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const path = request.url;

    return next.handle().pipe(
      map((data) => {
        // If response is Buffer or Stream (used for PDF/Excel), return as is
        if (
          Buffer.isBuffer(data) ||
          data instanceof Uint8Array ||
          data?.pipe // stream
        ) {
          return data;
        }

        // Else response is JSON → wrap with metadata
        return {
          success: true,
          path,
          responseTime: `${Date.now() - now}ms`,
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
