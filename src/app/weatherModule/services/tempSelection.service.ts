import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TempSelectionService {

  private isCelsiusSubject = new BehaviorSubject<boolean>(true);
  isCelsius$ = this.isCelsiusSubject.asObservable();

  constructor() {}

  getIsCelsius = (): boolean => {
    return this.isCelsiusSubject.value;
  }

  setIsCelsius = (isCelsius: boolean) => {
    this.isCelsiusSubject.next(isCelsius);
  }
}
