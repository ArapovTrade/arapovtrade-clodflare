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
  selector: 'app-home-en-fourty-four',
  templateUrl: './home-en-fourty-four.component.html',
  styleUrl: './home-en-fourty-four.component.scss',
})
export class HomeEnFourtyFourComponent implements OnInit {
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
      'Iceberg Orders in Trading: How Institutions Hide Their Positions | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn what iceberg orders are, how banks and hedge funds use hidden orders to mask large positions, and how to detect them on charts for better trading decisions.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/icebergorders.png',
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
          '@id': 'https://arapov.trade/en/freestudying/icebergorders#article',
          headline:
            'Iceberg Orders in Trading: How Institutions Hide Their Positions',
          description:
            'Learn what iceberg orders are, how banks and hedge funds use hidden orders to mask large positions, and how to detect them on charts for better trading decisions.',
          image: 'https://arapov.trade/assets/img/content/icebergorders1.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/icebergorders',
          },
          articleSection: 'Trading Education',
          keywords:
            'iceberg order, hidden orders, Smart Money, market maker, order book, liquidity',
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
      '@id': 'https://arapov.trade/en/freestudying/icebergorders#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an iceberg order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An iceberg order is a special type of limit order where only a small portion of the total volume is displayed in the order book. The bulk of the order remains hidden and executes gradually as the visible portion fills. Institutional players use this tool to mask large positions from other market participants.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do banks use hidden orders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Large financial institutions use iceberg orders to minimize market impact when executing massive orders. Placing a large order openly would cause immediate price movement against their position. Hidden orders allow gradual accumulation or distribution while maintaining anonymity.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to detect iceberg orders on charts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Signs of iceberg orders include: price holding at a specific level despite significant trading volume; continuous refreshing of orders at the same price in the order book; cluster analysis showing repeated trades at one price level. Use Footprint Charts and order flow analysis for confirmation.',
          },
        },
        {
          '@type': 'Question',
          name: 'On which markets are iceberg orders used?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Iceberg orders are used across all major financial markets: stock exchanges like NYSE and NASDAQ, the Forex market, and cryptocurrency platforms including Binance, Kraken, and OKX. Wherever large players work with substantial volumes, hidden orders become essential tools.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade considering hidden orders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Identify levels where price consistently holds despite high volume — these are potential hidden order zones. Enter trades in the direction of the large player after confirmation. Avoid trading against obvious accumulation zones. Use order book analysis and cluster charts for confirmation.',
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
      '@id': 'https://arapov.trade/en/freestudying/icebergorders#howto',
      name: 'How to Detect and Trade Iceberg Orders',
      description:
        'Step-by-step guide to identifying hidden institutional orders and using them in trading strategies',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Analyze the order book',
          text: 'Watch the dynamics of limit orders. If new orders constantly appear at a specific level replacing executed ones, this indicates an iceberg order.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Use cluster analysis',
          text: 'Footprint Charts show volume distribution within candles. Repeated trades at one level indicate hidden institutional activity.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Track price behavior',
          text: 'If price holds at a level despite significant buying or selling pressure, a hidden order is likely absorbing the incoming liquidity.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm with volume analysis',
          text: 'Divergence between trading volume and price movement is a key indicator of hidden orders at work.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Trade with institutional flow',
          text: 'After confirming a hidden order, enter trades in the direction of institutional capital. Place stops beyond the hidden support or resistance zone.',
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
      '@id': 'https://arapov.trade/en/freestudying/icebergorders#glossary',
      name: 'Hidden Orders Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg Order',
          description:
            'A limit order type where only a portion of total volume displays in the order book while the rest executes hidden.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hidden Liquidity',
          description:
            'Order volume not displayed in the public order book, used by institutional players.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Institutional market participants with large capital — banks, hedge funds, market makers.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description:
            'A table of limit buy and sell orders displaying current market depth.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Chart',
          description:
            'A cluster chart showing volume distribution within each candle by price levels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between expected and actual order execution price due to market movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A market participant providing liquidity by continuously placing buy and sell orders.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            "Analysis of trading order streams to determine large participants' actions.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Limit Order',
          description:
            'An order to buy or sell at a specified price or better, waiting in the order book.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Position Accumulation',
          description:
            'Gradual building of a large position by institutional players without significant price impact.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
