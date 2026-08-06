import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServLangueageService {
  private languageCodeSubject = new BehaviorSubject<number>(3); // Початкове значення
  languageCode$ = this.languageCodeSubject.asObservable();

  constructor(private router: Router) {
    // Підписка на події маршрутизації
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ) // Вказуємо тип через type predicate
      )
      .subscribe((event: NavigationEnd) => {
        const code = this.detectLanguageCode();
        this.languageCodeSubject.next(code);
      });

    // Початкова перевірка
    const initialCode = this.detectLanguageCode();
    this.languageCodeSubject.next(initialCode);
  }

  private detectLanguageCode(): number {
    const path = this.router.url;

    const segments = path.split('/').filter((segment) => segment);

    const langSegment = segments[0];
    switch (langSegment) {
      case 'uk':   // тут надо добавить 2 новые страницы ЕН майн и ру мейн а так же пустую '' которая будет задавать укр
        return 1;
      case 'ru':
        return 2;
      case 'en':
        return 3;
      default:
        return 1;
    }
  }

  getLanguageCode(): number {
    return this.detectLanguageCode();
  }
}
