import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';


@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) 
  {
      return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => 
          {
              let errorMessage = 'Unknown Error';

              if(error.error.message)
              {
                  errorMessage = error.error.message;
              }
              console.log(error);
              this.dialog.open(ErrorComponent, {data: {message:errorMessage}});
              return throwError(error);
          })
      );
  }
}
