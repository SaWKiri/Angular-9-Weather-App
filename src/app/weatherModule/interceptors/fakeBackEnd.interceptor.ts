import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { autocomplete, forcast, currentCondition, geoPositionSearch } from './constData';

@Injectable()
export class FakeInterceptor implements HttpInterceptor {
  baseUrl = 'dataservice.accuweather.com';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!req.url.includes(this.baseUrl)) {
    //   return next.handle(req);
    // }
    // console.warn('FakeInterceptor');
    // // if (req.url.includes('/cities/geoposition/search')) {
    // //   return of(new HttpResponse({ status: 200, body: geoPositionSearch }));
    // // }

    // if (req.url.includes('/cities/autocomplete')) {
    //   return of(new HttpResponse({ status: 200, body: autocomplete }));
    // }

    // if (req.url.includes('/daily/5day/')) {
    //   const body = { firstName: 'Mock', lastName: 'Faker' };
    //   return of(new HttpResponse({ status: 200, body: forcast }));
    // }

    // if (req.url.includes('/currentconditions/v1/')) {
    //   const body = { firstName: 'Mock', lastName: 'Faker' };
    //   return of(new HttpResponse({ status: 200, body: currentCondition }));
    // }

    return next.handle(req);
  }
}
