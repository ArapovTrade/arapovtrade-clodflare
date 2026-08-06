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
  selector: 'app-psychologiya-treydinga-en',
  templateUrl: './psychologiya-treydinga-en.component.html',
  styleUrl: './psychologiya-treydinga-en.component.scss',
})
export class PsychologiyaTreydingaEnComponent
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
  currentLang = 'en';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
      this.removeExistingSchema();
    this.meta.updateTag({ name: 'datePublished', content: '2025-12-18' });

    this.titleService.setTitle('Trading Psychology — Free Book by Igor Arapov');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Free book by Igor Arapov: fear, greed, tilt, FOMO — a practical guide to emotional management and the psychology of a successful trader. ISBN 979-8-90243-138-1',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Trading book, trading training, Forex for beginners, technical analysis, volume analysis, Igor Arapov, Smart Money',
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
    link.href = '/assets/documents/Trading_Psychology_Final.epub'; // путь к вашему файлу
    link.download = 'Trading_Psychology_Final.epub'; // имя файла для скачивания
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
      '@id': 'https://arapov.trade/en/books/psihologiya-treydinga#book',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://arapov.trade/en/books/psihologiya-treydinga',
      },
      name: 'Trading psychology. How to Master Your Emotions and Think Like a Professional',
      alternateName: [
        'Психология трейдинга: Как управлять эмоциями и мыслить как профессионал',
        'Психологія трейдингу: Як керувати емоціями та мислити як професіонал',
      ],
      headline:
        'Trading psychology. How to Master Your Emotions and Think Like a Professional',
      description:
        'Download the free book "Trading Psychology" — a practical guide to emotion management by Igor Arapov. Fear, greed, discipline, psychology of a successful trader. ISBN 979-8-90243-138-1',
      isbn: '979-8-90243-138-1',
      numberOfPages: 60,
      bookFormat: 'https://schema.org/EBook',
      bookEdition: '1st edition',
      inLanguage: { '@type': 'Language', name: 'English', alternateName: 'en' },
      datePublished: '2025-12-29T00:00:00Z',
      dateModified: '2025-12-29T00:00:00Z',
      copyrightYear: 2025,
      copyrightHolder: { '@id': 'https://arapov.trade/#person' },
      genre: ['Business', 'Finance', 'Trading', 'Education', 'Investment'],
      about: [
        {
          '@type': 'Thing',
          name: 'Exchange trading',
          sameAs: 'https://ru.wikipedia.org/wiki/Биржевая_торговля',
        },
        {
          '@type': 'Thing',
          name: 'FOREX',
          sameAs: 'https://ru.wikipedia.org/wiki/Форекс',
        },
        {
          '@type': 'Thing',
          name: 'Technical analysis',
          sameAs: 'https://ru.wikipedia.org/wiki/Технический_анализ',
        },
        { '@type': 'Thing', name: 'Fundamental analysis' },
        { '@type': 'Thing', name: 'Volume analysis' },
        { '@type': 'Thing', name: 'Capital management' },
        { '@type': 'Thing', name: 'Smart Money Concepts' },
      ],
      keywords:
        'trading, forex, technical analysis, volume analysis, exchange, investments, smart money, trading education',
      author: { '@id': 'https://arapov.trade/#person' },
      publisher: { '@id': 'https://arapov.trade/#organization' },
      image: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/assets/redesignArapovTrade/img/cover_psychology.jpg',
        width: 600,
        height: 900,
        caption: 'Cover of the book "Trading Psychology" — Igor Arapov',
      },
      url: 'https://arapov.trade/en/books/psihologiya-treydinga',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://arapov.trade/en/books/psihologiya-treydinga',
        priceValidUntil: '2026-12-31',
        seller: { '@id': 'https://arapov.trade/#organization' },
      },
      workExample: {
        '@type': 'Book',
        isbn: '979-8-90243-138-1',
        bookFormat: 'https://schema.org/EBook',
        inLanguage: 'en',
        url: 'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?Z21ID=&I21DBN=VFEIR&P21DBN=VFEIR&S21STN=1&S21REF=10&S21FMT=fullw&C21COM=S&S21CNR=20&S21P01=3&S21P02=0&S21P03=A=&S21COLORTERMS=0&S21STR=Arapov%2C%20Igor',
        provider: {
          '@type': 'Library',
          name: 'V. I. Vernadsky National Library of Ukraine',
          url: 'https://nbuv.gov.ua',
          telephone: '+380 44 525 81 04',
          priceRange: 'Free',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/6/69/Библиотека_им._Вернадского.JPG',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Holosiivskyi Avenue, 3',
            addressLocality: 'Kyiv',
            postalCode: '03039',
            addressCountry: 'UA',
          },
        },
        sameAs: ['https://www.wikidata.org/wiki/Q138216316'],
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            url: 'https://arapov.trade/en/books/psihologiya-treydinga',
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
      '@id': 'https://arapov.trade/en/books/psihologiya-treydinga',
      url: 'https://arapov.trade/en/books/psihologiya-treydinga',
      name: 'Trading psychology. How to Master Your Emotions and Think Like a Professional',
      description: 'Download the free book on trading. ISBN 979-8-90243-138-1',
      inLanguage: 'en',
      isPartOf: { '@id': 'https://arapov.trade/#website' },
      about: { '@id': 'https://arapov.trade/en/books/psihologiya-treydinga#book' },
      author: { '@id': 'https://arapov.trade/#person' },
      datePublished: '2025-12-29T00:00:00Z',
      dateModified: '2025-12-29T00:00:00Z',
      mainEntity: {
        '@id': 'https://arapov.trade/en/books/psihologiya-treydinga#book',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Main',
            item: 'https://arapov.trade',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About the author',
            item: 'https://arapov.trade/en',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'My books',
            item: 'https://arapov.trade/en/books',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Book',
            item: 'https://arapov.trade/en/books/psihologiya-treydinga',
          },
        ],
      },
    };
  }

  private faqSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'Trading Psychology – Free Book by Igor Arapov - FAQ',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the book really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the book "Trading Psychology" is available for download absolutely free of charge in EPUB format. The author provides it as part of a free educational program on the arapov.trade platform.',
          },
        },
        {
          '@type': 'Question',
          name: 'For whom is this book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The book is intended for beginners in trading who want to understand the basics of financial markets, as well as for investors who wish to learn about stock trading. No experience in trading is required.',
          },
        },
        {
          '@type': 'Question',
          name: 'In what format is the book available?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The book is available in EPUB format, which is supported by most e-readers and reading applications.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is the author of the book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The author of the book is Igor Arapov, a practicing trader since 2013. Creator of the educational platform arapov.trade with 151+ articles and a YouTube channel @ArapovTrade with 78+ video tutorials on trading.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the ISBN of the book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The book's ISBN is 979-8-90243-138-1. This is an International Standard Book Number registered with Bowker Books in Print.",
          },
        },
      ],
    };
  }
}
