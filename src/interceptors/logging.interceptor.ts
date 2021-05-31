import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { MetricsService } from "src/endpoints/metrics/metrics.service";
import { PerformanceProfiler } from "src/helpers/performance.profiler";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly metricsService: MetricsService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let apiFunction = context.getClass().name + '.' + context.getHandler().name;

    let profiler = new PerformanceProfiler(apiFunction);

    return next
      .handle()
      .pipe(
        tap(() => {
          profiler.stop();

          this.metricsService.setApiCall(apiFunction, 200, profiler.duration);
        }),
      );
  }
}