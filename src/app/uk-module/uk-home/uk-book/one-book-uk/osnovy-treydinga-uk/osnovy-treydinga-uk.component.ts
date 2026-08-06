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
  selector: 'app-osnovy-treydinga-uk',
  templateUrl: './osnovy-treydinga-uk.component.html',
  styleUrl: './osnovy-treydinga-uk.component.scss',
})
export class OsnovyTreydingaUkComponent
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
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingSchema();

    this.titleService.setTitle(
      'Основи трейдингу — Безкоштовна книга Ігоря Арапова',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Безкоштовна книга Ігоря Арапова для початківців: механіка біржі, технічний аналіз, рівні підтримки та опору, типи ордерів, управління ризиками. ISBN 979-8-90243-730-7',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-12-18' });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'книга трейдинг, навчання трейдингу, форекс для початківців, технічний аналіз, об`ємний аналіз, Ігор Арапов, Smart Money',
    });
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
    link.href = '/assets/documents/osnovy_treidyngu_ua_tom1.epub'; // путь к вашему файлу
    link.download = 'osnovy_treidyngu_ua_tom1.epub'; // имя файла для скачивания
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
          // ігноруємо чужий/битий JSON
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
      '@id': 'https://arapov.trade/uk/books/osnovy-treydinga#book',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/uk/books/osnovy-treydinga',
      },
      name: 'Теорія трейдингу. Основи ринку • Технічний аналіз • Обʼємний аналіз',
      alternateName: [
        'Теория трейдинга. Основы рынка • Технический анализ • Объёмный анализ',
        'Trading fundamentals. Market Basics • Technical Analysis • Volume Analysis',
      ],
      headline:
        'Теорія трейдингу. Основи ринку • Технічний аналіз • Обʼємний аналіз',
      description:
        'Практичне керівництво по фінансовому трейдингу для початківців. Книга охоплює основи біржової торгівлі, ринок FOREX, фундаментальний, технічний та обʼємний аналіз, види ордерів, управління капіталом та типові помилки трейдерів. Автор ділиться 12-річним досвідом торгівлі на фінансових ринках.',
      isbn: '979-8-90243-730-7',
      numberOfPages: 60,
      bookFormat: 'https://schema.org/EBook',
      bookEdition: '1-е видання',
      inLanguage: {
        '@type': 'Language',
        name: 'Ukrainian',
        alternateName: 'uk',
      },
      datePublished: '2025-12-18T00:00:00Z',
      dateModified: '2025-12-19T00:00:00Z',
      copyrightYear: 2025,
      copyrightHolder: { '@id': 'https://arapov.trade/#person' },
      genre: ['Business', 'Finance', 'Trading', 'Education', 'Investment'],
      about: [
        {
          '@type': 'Thing',
          name: 'Біржова торгівля',
          sameAs: 'https://ru.wikipedia.org/wiki/Биржевая_торговля',
        },
        {
          '@type': 'Thing',
          name: 'FOREX',
          sameAs: 'https://ru.wikipedia.org/wiki/Форекс',
        },
        {
          '@type': 'Thing',
          name: 'Технічний аналіз',
          sameAs: 'https://ru.wikipedia.org/wiki/Технический_анализ',
        },
        { '@type': 'Thing', name: 'Фундаментальний аналіз' },
        { '@type': 'Thing', name: 'Обʼємний аналіз' },
        { '@type': 'Thing', name: 'Управління капіталом' },
        { '@type': 'Thing', name: 'Smart Money Concepts' },
      ],
      keywords:
        'трейдинг, форекс, технічний аналіз, обʼємний аналіз, біржа, інвестиції, smart money, навчання трейдингу',
      author: { '@id': 'https://arapov.trade/#person' },
      publisher: { '@id': 'https://arapov.trade/#organization' },
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/cover_osnovy_treidynhu_ua.jpg',
        width: 600,
        height: 900,
        caption: '«Основи трейдингу» — Ігор Арапов',
      },
      url: 'https://arapov.trade/uk/books/osnovy-treydinga',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://arapov.trade/uk/books/osnovy-treydinga',
        priceValidUntil: '2026-12-31',
        seller: { '@id': 'https://arapov.trade/#organization' },
      },
      workExample: {
        '@type': 'Book',
        isbn: '979-8-90243-730-7',
        bookFormat: 'https://schema.org/EBook',
        inLanguage: 'uk',
        url: 'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?Z21ID=&I21DBN=VFEIR&P21DBN=VFEIR&S21STN=1&S21REF=10&S21FMT=fullw&C21COM=S&S21CNR=20&S21P01=3&S21P02=0&S21P03=A=&S21COLORTERMS=0&S21STR=Арапов%2C%20Ігор',
        provider: {
          '@type': 'Library',
          name: 'Національна бібліотека України імені В. І. Вернадського',
          url: 'https://nbuv.gov.ua',
          telephone: '+380 44 525 81 04',
          priceRange: 'Безкоштовно',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/6/69/Библиотека_им._Вернадского.JPG',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Голосіївський проспект, 3',
            addressLocality: 'Київ',
            postalCode: '03039',
            addressCountry: 'UA',
          },
        },
        sameAs: ['https://www.wikidata.org/wiki/Q138151887'],
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            url: 'https://arapov.trade/uk/books/osnovy-treydinga',
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
      '@id': 'https://arapov.trade/uk/books/osnovy-treydinga',
      url: 'https://arapov.trade/uk/books/osnovy-treydinga',
      name: 'Теорія трейдингу. Основи ринку • Технічний аналіз • Обʼємний аналіз',
      description:
        'Скачати безкоштовно книгу з трейдингу. ISBN 979-8-90243-730-7',
      inLanguage: 'uk',
      isPartOf: { '@id': 'https://arapov.trade/#website' },
      about: { '@id': 'https://arapov.trade/uk/books/osnovy-treydinga#book' },
      author: { '@id': 'https://arapov.trade/#person' },
      datePublished: '2025-12-18T00:00:00Z',
      dateModified: '2025-12-19T00:00:00Z',
      mainEntity: {
        '@id': 'https://arapov.trade/uk/books/osnovy-treydinga#book',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Головна',
            item: 'https://arapov.trade',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Про автора',
            item: 'https://arapov.trade/uk',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Мої книги',
            item: 'https://arapov.trade/uk/books',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Книга',
            item: 'https://arapov.trade/uk/books/osnovy-treydinga',
          },
        ],
      },
    };
  }

  private faqSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: "Питання та відповіді щодо книги 'Основи трейдингу'",
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Книжка справді безкоштовна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, книга «Основи трейдингу» доступна для завантаження абсолютно безкоштовно у форматі EPUB. Автор надає її як частину безкоштовної освітньої програми на платформі arapov.trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'Для кого ця книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга призначена для початкових трейдерів, які хочуть зрозуміти основи фінансових ринків, а також для інвесторів, які бажають розібратися в біржовій торгівлі. Досвід у трейдингу не потрібен.',
          },
        },
        {
          '@type': 'Question',
          name: 'В якому форматі доступна книга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Книга доступна в форматі EPUB, який підтримується більшістю електронних книг та програм для читання.',
          },
        },
        {
          '@type': 'Question',
          name: 'Хто автор книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Автор книги – Ігор Арапов, практикуючий трейдер з 2013 року. Творець освітньої платформи arapov.trade із 151+ статтями та YouTube каналу @ArapovTrade із 78+ відеоуроками з трейдингу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ISBN у книги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ISBN книги: 979-8-90243-730-7. Це міжнародний стандартний книжковий номер, зареєстрований у Bowker Books in Print.',
          },
        },
      ],
    };
  }
}
