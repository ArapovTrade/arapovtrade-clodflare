import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeservService } from '../../../../servises/themeserv.service';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ru-book-page',
  templateUrl: './ru-book-page.component.html',
  styleUrl: './ru-book-page.component.scss',
})
export class RuBookPageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeservService,
  ) {}

  ngAfterViewInit() {}
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();

    this.titleService.setTitle(
      'Книги по трейдингу Игоря Арапова — серия «Основы трейдинга»',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Серия книг «Основы трейдинга» Игоря Арапова — 9 изданий на русском, украинском и английском языках с международными ISBN (Bowker USA) и DOI (Zenodo/CERN). Объёмный анализ, метод Вайкоффа, Smart Money, психология трейдинга. Хранятся в фонде Национальной библиотеки Украины имени Вернадского.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Трейдинг, Обучение трейдингу, Технический анализ, Финансовая биржа, Торговая система, Игорь Арапов',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
    });
    this.addWebSiteSchema();
    this.addPersonSchema();
    this.addBookSchema();
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'WebSite') {
          script.remove();
        }
        if (content['@type'] === 'ItemList') {
          script.remove();
        }
        if (content['@type'] === 'Person') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  private addPersonSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'Person' &&
          json['@id'] === 'https://arapov.trade/#person'
        );
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: 'Игорь Арапов',
      url: 'https://arapov.trade/ru',
      jobTitle: 'Независимый трейдер и исследователь',
      sameAs: [
        'https://orcid.org/0009-0003-0430-778X',
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
      ],
    });

    this.document.head.appendChild(script);
  }

  private addWebSiteSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'WebSite' && json['name'] === 'Arapov.Trade';
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://arapov.trade/#website',
      url: 'https://arapov.trade/ru/main',
      name: 'Arapov.Trade',
      alternateName: 'Обучение трейдингу',
      description:
        'Бесплатное обучение трейдингу от Игоря Арапова. 151+ статей, 78+ видеоуроков.',
      inLanguage: 'ru-RU',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
        name: 'Arapov.Trade',
        url: 'https://arapov.trade',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arapov.trade/favicon.ico',
        },
        founder: {
          '@type': 'Person',
          '@id': 'https://arapov.trade/#person',
        },
      },
    });

    this.document.head.appendChild(script);
  }

  downloadFile() {
    const link = document.createElement('a');
    link.href = '/assets/documents/Trading_Book_ISBN.epub'; // путь к вашему файлу
    link.download = 'Trading_Book_ISBN.epub'; // имя файла для скачивания
    link.click();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  private addBookSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return (
          json['@type'] === 'ItemList' &&
          json['name'] === 'Книги Игоря Арапова о трейдинге'
        );
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Книги Игоря Арапова о трейдинге',
      description:
        'Бесплатные книги по трейдингу от Игоря Арапова. Основы трейдинга, психология трейдинга и практические методы торговли.',
      numberOfItems: 3,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Book',
            '@id': 'https://arapov.trade/ru/books/osnovy-treydinga#book',
            name: 'Теория трейдинга. Основы рынка • Технический анализ • Объёмный анализ',
            isbn: '979-8-90243-075-9',
            inLanguage: 'ru',
            bookFormat: 'https://schema.org/EBook',
            datePublished: '2025-06-07',
            author: {
              '@type': 'Person',
              '@id': 'https://arapov.trade/#person',
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://arapov.trade/#organization',
            },
            url: 'https://arapov.trade/ru/books/osnovy-treydinga',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Book',
            '@id': 'https://arapov.trade/ru/books/psihologiya-treydinga#book',
            name: 'Психология трейдинга: Как управлять эмоциями и мыслить как профессионал',
            isbn: '979-8-90243-081-0',
            inLanguage: 'ru',
            bookFormat: 'https://schema.org/EBook',
            datePublished: '2025-06-07',
            author: {
              '@type': 'Person',
              '@id': 'https://arapov.trade/#person',
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://arapov.trade/#organization',
            },
            url: 'https://arapov.trade/ru/books/psihologiya-treydinga',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Book',
            '@id':
              'https://arapov.trade/ru/books/osnovy-treydinga-tom-two#book',
            name: 'Методы анализа. Технический анализ • Объёмный анализ • Практика',
            isbn: '979-8-90243-078-0',
            inLanguage: 'ru',
            bookFormat: 'https://schema.org/EBook',
            datePublished: '2025-06-07',
            author: {
              '@type': 'Person',
              '@id': 'https://arapov.trade/#person',
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://arapov.trade/#organization',
            },
            url: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
}
