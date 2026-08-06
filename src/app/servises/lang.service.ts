import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor() {}
  private numberSubject = new BehaviorSubject<number>(0);

  getNumber(): Observable<number> {
    return this.numberSubject.asObservable();
  }
  setNumber(newValue: number): void {
    this.numberSubject.next(newValue);
  }
}
