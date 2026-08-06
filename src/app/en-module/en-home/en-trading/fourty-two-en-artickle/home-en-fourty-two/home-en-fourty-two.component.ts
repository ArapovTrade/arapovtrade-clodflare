import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-fourty-two',
  templateUrl: './home-en-fourty-two.component.html',
  styleUrl: './home-en-fourty-two.component.scss',
})
export class HomeEnFourtyTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;
  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });
    this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Timeframes in Trading: Complete Guide to Choosing the Right Chart Interval | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How to choose the right timeframe for trading. Learn about timeframe types, multi-timeframe analysis, and which interval suits your trading style.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }
  hoveredIndex: number | null = null;
  projects = [
   { title: 'Trading Books', link: 'https://arapov.trade/en/books' },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
     
  ];
  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    this.router.navigate(['/en/freestudying'], {
      queryParams: { group: value },
    });
    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;
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
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем
    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsEng.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }
  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';
  onFocus() {
    this.isFocused = true;
    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5,
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }
  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }
  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }
  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }
    this.router.navigate(['/en/freestudying', nextpage]);
  }
  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );
    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }
    this.router.navigate(['/en/freestudying', nextpage]);
  }

  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'Article',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline:
            'Timeframes in Trading: Complete Guide to Choosing the Right Chart Interval',
          description:
            'How to choose the right timeframe for trading. Learn about timeframe types, multi-timeframe analysis, and which interval suits your trading style.',
          image: 'https://arapov.trade/assets/img/content/timeframes1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/timeframes',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/en#person',
       name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/en',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
    'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade'
  ],
  jobTitle: ['Independent researcher,', 'trader', 'author and founder of arapov.trade'],
  description:
    'Independent researcher, practicing trader, author of books on trading and scientific publications. Specializes in trading psychology and cognitive biases in financial markets.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a timeframe in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A timeframe is the time interval over which one candlestick or bar forms on a chart. For example, on H1 each candle shows price movement over one hour, on D1 — over one day.',
          },
        },
        {
          '@type': 'Question',
          name: 'What timeframe should beginners trade on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners should use H1 or H4 timeframes. These provide enough time for analysis, contain less market noise, and generate more reliable signals.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why should traders use multiple timeframes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A single timeframe shows only part of the picture. Higher timeframes determine the global trend, middle ones identify zones of interest, lower ones provide entry points. Combining them gives complete market understanding.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best timeframe for scalping?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Scalpers use M1, M5, and M15. These intervals allow catching short impulses and making many trades per day, but require quick reactions and high concentration.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does volatility affect timeframe choice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'High volatility creates more opportunities on lower timeframes but also more risk. During low volatility, switching to higher timeframes provides more reliable signals.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Choose the Optimal Timeframe',
      description: 'Step-by-step guide to selecting the right trading interval',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define your trading style',
          text: 'Decide how frequently you want to trade. Scalping requires M1-M15, swing trading uses H4-D1, investing needs W1-MN.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Assess available time',
          text: 'If you can monitor markets all day, lower timeframes work. With limited time, choose H4 or D1.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Consider asset volatility',
          text: 'Cryptocurrencies are volatile — M15-H1 works well. Stock markets are more stable — H4-D1 is better.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Test on demo account',
          text: 'Trade at least 2-4 weeks on your chosen timeframe to understand its characteristics.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Implement multi-timeframe analysis',
          text: 'Use higher timeframe for trend, middle for zones, lower for entries. This improves trade accuracy.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Timeframe Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Timeframe',
          description:
            'The time interval over which one candlestick or bar forms on a price chart',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'Trading style with many short trades on lower timeframes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing Trading',
          description:
            'Medium-term trading with positions held from days to weeks',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Multi-Timeframe Analysis',
          description:
            'Method of analyzing markets using several time intervals simultaneously',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Noise',
          description:
            'Random price fluctuations that do not reflect the actual trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description: 'Average True Range indicator for measuring volatility',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Session',
          description:
            'Period of active operation for a specific financial center',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Intraday',
          description:
            'Day trading with all positions closed before session end',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Position Trading',
          description:
            'Long-term trading with positions held for weeks to months',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Trading volume and ability to quickly buy or sell without significant price impact',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
