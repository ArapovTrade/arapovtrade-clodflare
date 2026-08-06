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
  selector: 'app-en-book-page',
  templateUrl: './en-book-page.component.html',
  styleUrl: './en-book-page.component.scss',
})
export class EnBookPageComponent implements OnInit, AfterViewInit, OnDestroy {
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
    this.removeExistingWebPageSchema();

    this.titleService.setTitle(
      'Trading Books by Igor Arapov — Trading Fundamentals Series',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'The "Trading Fundamentals" series by Igor Arapov — 9 editions in English, Russian, and Ukrainian with international ISBNs (Bowker USA) and DOI (Zenodo/CERN). Volume analysis, Wyckoff method, Smart Money concept, trading psychology. Held in the collection of the Vernadsky National Library of Ukraine.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Trading, Trading education, Technical analysis, Stock exchange, Trading system, Igor Arapov',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
    });
    this.addWebSiteSchema();
    this.addBookSchema();
    this.addPersonSchema();
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

    this.refreshAOS();
  }
  refreshAOS() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh(); // Обновление позиций AOS
        this.cdr.detectChanges(); // Принудительное обнаружение изменений
      }, 100); // Задержка для синхронизации
    } else {
      console.warn('AOS is not defined, refresh skipped');
    }
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
      url: 'https://arapov.trade/en',
      jobTitle: 'Independent trader and researcher',
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
      url: 'https://arapov.trade/en/main',
      name: 'Arapov.Trade',
      alternateName: 'Trading education',
      description:
        'Free trading education by Igor Arapov. 151+ articles and 78+ video lessons.',
      inLanguage: 'en-US',
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
          json['name'] === "Igor Arapov's Trading Books"
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
      name: "Igor Arapov's Trading Books",
      description:
        'Free trading books by Igor Arapov. Trading basics, trading psychology, and practical trading methods.',
      numberOfItems: 3,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Book',
            '@id': 'https://arapov.trade/en/books/osnovy-treydinga#book',
            name: 'Trading fundamentals. Market Basics • Technical Analysis • Volume Analysis',
            isbn: '979-8-90243-734-5',
            inLanguage: 'en',
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
            url: 'https://arapov.trade/en/books/osnovy-treydinga',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Book',
            '@id': 'https://arapov.trade/en/books/psihologiya-treydinga#book',
            name: 'Trading psychology. How to Master Your Emotions and Think Like a Professional',
            isbn: '979-8-90243-138-1',
            inLanguage: 'en',
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
            url: 'https://arapov.trade/en/books/psihologiya-treydinga',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Book',
            '@id':
              'https://arapov.trade/en/books/osnovy-treydinga-tom-two#book',
            name: 'Analysis methods. Technical Analysis • Volume Analysis • Practice',
            isbn: '979-8-90243-755-0',
            inLanguage: 'en',
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
            url: 'https://arapov.trade/en/books/osnovy-treydinga-tom-two',
          },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
}
