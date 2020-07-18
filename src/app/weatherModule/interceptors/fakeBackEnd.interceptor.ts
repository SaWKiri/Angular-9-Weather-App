import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { autocomplete, forcast, currentCondition, geoPositionSearchKriyatAtidim, currentConditionTelAviv, currentCondition3431644, currentCondition325876 } from './constData';

@Injectable()
export class FakeInterceptor implements HttpInterceptor {
  baseUrl = 'dataservice.accuweather.com';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(this.baseUrl)) {
      return next.handle(req);
    }
    console.warn('FakeInterceptor');
    if (req.url.includes('/cities/geoposition/search')) {
      return of(new HttpResponse({ status: 200, body: geoPositionSearchKriyatAtidim }));
    }

    if (req.url.includes('/cities/autocomplete')) {
      return of(new HttpResponse({ status: 200, body: autocomplete }));
    }

    if (req.url.includes('/daily/5day/')) {
      return of(new HttpResponse({ status: 200, body: forcast }));
    }

    if (req.url.includes('/currentconditions/v1/') && req.url.includes('215805') ) {
      return of(new HttpResponse({ status: 200, body: currentConditionTelAviv }));
    }

    if (req.url.includes('/currentconditions/v1/') && req.url.includes('3431644') ) {
      return of(new HttpResponse({ status: 200, body: currentCondition3431644 }));
    }

    if (req.url.includes('/currentconditions/v1/') && req.url.includes('3431644') ) {
      return of(new HttpResponse({ status: 200, body: currentCondition325876 }));
    }


    if (req.url.includes('/currentconditions/v1/') ) {
      return of(new HttpResponse({ status: 200, body: currentCondition }));
    }

    return next.handle(req);
  }
}
