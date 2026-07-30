import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    // finalize in RxJS runs whether the Observable completes or errors — it is the correct place to hide a loading spinner, equivalent to a try/catch/finally block.
    finalize(() => {
      loadingService.hide();
    })
  );
};
