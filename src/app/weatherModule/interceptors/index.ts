import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeInterceptor } from './fakeBackEnd.interceptor';
import { HttpErrorInterceptor } from './httpErrorHandler.interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: FakeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
