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
  selector: 'app-home-en-thirty-seven',
  templateUrl: './home-en-thirty-seven.component.html',
  styleUrl: './home-en-thirty-seven.component.scss',
})
export class HomeEnThirtySevenComponent implements OnInit {
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
      'Stop Hunting: How Smart Money Triggers Your Stop-Losses | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Stop Hunting is a manipulation strategy used by Smart Money to trigger retail traders` stop-losses. Learn how to recognize stop hunts and protect your positions in forex and crypto markets.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stophunting.png',
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
            "Stop Hunting: How Smart Money Triggers Retail Traders' Stop-Losses",
          description:
            "Complete guide to Stop Hunting — a manipulation strategy used by institutional players to collect liquidity by triggering retail traders' stop-loss orders.",
          image: 'https://arapov.trade/assets/img/content/stophunting1.webp',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/stophunting',
          },
          articleSection: 'Trading',
          keywords: [
            'stop hunting',
            'smart money',
            'liquidity',
            'market manipulation',
            'forex',
          ],
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
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Independent researcher,',
        'trader',
        'author and founder of arapov.trade',
      ],
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
          name: 'What is Stop Hunting in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting is a manipulation strategy employed by large market participants (Smart Money) where they deliberately move price toward zones where retail traders have placed stop-loss orders. The goal is to trigger these orders, collect liquidity, and then reverse price in their favor.',
          },
        },
        {
          '@type': 'Question',
          name: "How do Smart Money find traders' stop-losses?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money use volume analysis, order book data (Order Flow), analysis of key support and resistance levels, and algorithmic systems. Most traders place stops in predictable locations — behind obvious levels and round numbers, making them easy targets.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I protect myself from stop hunting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key protection methods include: avoiding placing stops at obvious levels, using wider stop-losses with smaller position sizes, analyzing volume during breakouts, avoiding trading during major news releases, and waiting for confirmation before entering trades.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between a false and true breakout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A true breakout is accompanied by significant volume increase and price holding beyond the level. A false breakout occurs on low volume with price quickly returning. Analyzing volume and price behavior after the breakout helps distinguish manipulation from genuine moves.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which markets experience Stop Hunting most frequently?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting occurs in all markets but is particularly active in forex (due to high liquidity and decentralization) and cryptocurrency markets (due to volatility and weak regulation). In stock markets, manipulation is more common before major corporate events.',
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
      name: 'How to Recognize and Avoid Stop Hunting',
      description:
        'Step-by-step guide to protecting yourself from Smart Money manipulation in financial markets',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify liquidity zones',
          text: 'Locate obvious support and resistance levels, round numbers, and local swing highs/lows on your chart — these are where most traders place their stop-losses.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze volume during breakouts',
          text: "Use volume indicators (Volume Profile, OBV, Delta). If a level breakout occurs without significant volume increase, it's potentially a Smart Money trap.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for confirmation',
          text: "Don't enter trades immediately on breakouts. Wait for a retest and confirming pattern (pin bar, engulfing) to verify the move is genuine.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Place stops strategically',
          text: 'Set your stop-loss with buffer space beyond the level, not right at it. Use ATR to calculate optimal distance and reduce position size to compensate for wider stops.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Avoid trading news events',
          text: 'During major economic releases, volatility spikes and Smart Money actively hunt stops in both directions. Wait for market stabilization before trading.',
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
      name: 'Stop Hunting Glossary',
      description:
        'Key terms related to stop hunting and Smart Money manipulation',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            "A manipulation strategy used by large players to trigger retail traders' stop-losses in order to collect liquidity",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Large market participants — banks, hedge funds, institutional traders — capable of influencing price movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The volume of buy and sell orders in a specific price zone, necessary for executing large positions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A brief price movement beyond a key level followed by quick reversal, used to collect stop orders',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Analysis of real orders and trades to understand the intentions of large market participants',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order for automatic position closure when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between expected and actual order execution price, occurring due to insufficient liquidity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — algorithmic trading executing thousands of trades per second',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'An analysis tool showing the distribution of trading volume across price levels',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A market participant providing liquidity by posting buy and sell quotes for an asset',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
