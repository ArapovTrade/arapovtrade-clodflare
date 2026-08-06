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
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-osnovy-treydinga-tom-two',
  templateUrl: './osnovy-treydinga-tom-two.component.html',
  styleUrl: './osnovy-treydinga-tom-two.component.scss',
})
export class OsnovyTreydingaTomTwoComponent
  implements OnInit, AfterViewInit, OnDestroy
{
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
    this.removeExistingSchema();

    this.titleService.setTitle(
      'Основы трейдинга. Том 2 — Бесплатная книга Игоря Арапова',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Бесплатная книга Игоря Арапова: объёмный анализ, метод Вайкоффа, Smart Money, охота за ликвидностью, торговая система с положительным ожиданием. ISBN 979-8-90243-078-0',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'книга трейдинг, обучение трейдингу, форекс для начинающих, технический анализ, объёмный анализ, Игорь Арапов, Smart Money',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-12-18' });
    this.injectSchema(this.bookSchema());
    this.injectSchema(this.webPageSchema());
    this.injectSchema(this.faqSchema());

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

  downloadFile() {
    const link = document.createElement('a');
    link.href = '/assets/documents/Osnovy_Tradinga_Tom2.epub'; // путь к вашему файлу
    link.download = 'Osnovy_Tradinga_Tom2.epub'; // имя файла для скачивания
    link.click();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  private removeExistingSchema(): void {
    this.document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => {
        try {
          const type = JSON.parse(script.textContent || '{}')['@type'];
          if (['Book', 'WebPage', 'FAQPage'].includes(type)) script.remove();
        } catch {
          // игнорируем чужой/битый JSON
        }
      });
  }

  private injectSchema(data: object): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private bookSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two#book',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
      },
      name: 'Методы анализа. Технический анализ • Объёмный анализ • Практика',
      alternateName: [
        'Методи аналізу. Технічний аналіз • Обʼємний аналіз • Практика',
        'Analysis methods. Technical Analysis • Volume Analysis • Practice',
      ],
      headline:
        'Методы анализа. Технический анализ • Объёмный анализ • Практика',
      description:
        'Практическое руководство по финансовому трейдингу для начинающих. Книга охватывает основы биржевой торговли, рынок FOREX, фундаментальный, технический и объёмный анализ, виды ордеров, управление капиталом и типичные ошибки трейдеров. Автор делится 12-летним опытом торговли на финансовых рынках.',
      isbn: '979-8-90243-078-0',
      numberOfPages: 60,
      bookFormat: 'https://schema.org/EBook',
      bookEdition: '1-е издание',
      inLanguage: { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
      datePublished: '2025-12-18T00:00:00Z',
      dateModified: '2025-12-19T00:00:00Z',
      copyrightYear: 2025,
      copyrightHolder: { '@id': 'https://arapov.trade/#person' },
      genre: ['Business', 'Finance', 'Trading', 'Education', 'Investment'],
      about: [
        {
          '@type': 'Thing',
          name: 'Биржевая торговля',
          sameAs: 'https://ru.wikipedia.org/wiki/Биржевая_торговля',
        },
        {
          '@type': 'Thing',
          name: 'FOREX',
          sameAs: 'https://ru.wikipedia.org/wiki/Форекс',
        },
        {
          '@type': 'Thing',
          name: 'Технический анализ',
          sameAs: 'https://ru.wikipedia.org/wiki/Технический_анализ',
        },
        { '@type': 'Thing', name: 'Фундаментальный анализ' },
        { '@type': 'Thing', name: 'Объёмный анализ' },
        { '@type': 'Thing', name: 'Управление капиталом' },
        { '@type': 'Thing', name: 'Smart Money Concepts' },
      ],
      keywords:
        'трейдинг, форекс, технический анализ, объёмный анализ, биржа, инвестиции, smart money, обучение трейдингу',
      author: { '@id': 'https://arapov.trade/#person' },
      publisher: { '@id': 'https://arapov.trade/#organization' },
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/cover_tom2.jpg',
        width: 600,
        height: 900,
        caption: '«Методы анализа. Практика» — Игорь Арапов',
      },
      url: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
        priceValidUntil: '2026-12-31',
        seller: { '@id': 'https://arapov.trade/#organization' },
      },
      workExample: {
        '@type': 'Book',
        isbn: '979-8-90243-078-0',
        bookFormat: 'https://schema.org/EBook',
        inLanguage: 'ru',
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            url: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          expectsAcceptanceOf: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            eligibleRegion: { '@type': 'Place', name: 'Worldwide' },
          },
        },
      },
       
    };
  }

  private webPageSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
      url: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
      name: 'Методы анализа. Технический анализ • Объёмный анализ • Практика',
      description:
        'Скачать бесплатно книгу по трейдингу. ISBN 979-8-90243-078-0',
      inLanguage: 'ru',
      isPartOf: { '@id': 'https://arapov.trade/#website' },
      about: {
        '@id': 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two#book',
      },
      author: { '@id': 'https://arapov.trade/#person' },
      datePublished: '2025-12-18T00:00:00Z',
      dateModified: '2025-12-19T00:00:00Z',
      mainEntity: {
        '@id': 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two#book',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: 'https://arapov.trade',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Про автора',
            item: 'https://arapov.trade/ru',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Мои книги',
            item: 'https://arapov.trade/ru/books',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Книга',
            item: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
          },
        ],
      },
    };
  }

  private faqSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'Вопросы и ответы по книге "Методы анализа. Практика"',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Книга действительно бесплатная?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, книга «Методы анализа. Практика» доступна для скачивания абсолютно бесплатно в формате EPUB. Автор предоставляет её как часть бесплатной образовательной программы на платформе arapov.trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'Для кого эта книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга предназначена для начинающих трейдеров, которые хотят понять основы финансовых рынков, а также для инвесторов, желающих разобраться в биржевой торговле. Опыт в трейдинге не требуется.',
          },
        },
        {
          '@type': 'Question',
          name: 'В каком формате доступна книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга доступна в формате EPUB, который поддерживается большинством электронных книг и приложений для чтения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кто автор книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Автор книги — Игорь Арапов, практикующий трейдер с 2013 года. Создатель образовательной платформы arapov.trade с 151+ статьями и YouTube канала @ArapovTrade с 78+ видеоуроками по трейдингу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой ISBN у книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ISBN книги: 979-8-90243-078-0. Это международный стандартный книжный номер, зарегистрированный в Bowker Books in Print.',
          },
        },
      ],
    };
  }
}
