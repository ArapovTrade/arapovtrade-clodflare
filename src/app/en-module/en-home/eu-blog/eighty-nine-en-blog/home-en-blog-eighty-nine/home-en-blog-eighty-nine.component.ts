import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-en-blog-eighty-nine',
  templateUrl: './home-en-blog-eighty-nine.component.html',
  styleUrl: './home-en-blog-eighty-nine.component.scss',
})
export class HomeEnBlogEightyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'Bitcoin Dominance (BTC.D): What It Is and How to Use It in Trading | Igor Arapov',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Bitcoin dominance (BTC.D) explained: what it is, how to calculate it, historical trends, and impact on altcoins. Complete guide for crypto traders.',
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
          '@id':
            'https://arapov.trade/en/freestudying/bitcoin-domination#article',
          headline:
            'Bitcoin Dominance (BTC.D): What It Is and How to Use It in Trading',
          description:
            'Bitcoin dominance (BTC.D) explained: what it is, how to calculate it, historical trends, and impact on altcoins. Complete guide for crypto traders.',
          image:
            'https://arapov.trade/assets/img/content/bitcoin_dominance_1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/bitcoin-domination',
          },
          articleSection: 'Cryptocurrency',
          keywords: [
            'bitcoin dominance',
            'BTC.D',
            'altseason',
            'crypto market cap',
            'capital flow',
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
      '@id': 'https://arapov.trade/en/freestudying/bitcoin-domination#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Bitcoin dominance in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Bitcoin dominance (BTC.D) is a percentage showing Bitcoin's share of the total cryptocurrency market capitalization. For example, 60% dominance means that of all money invested in cryptocurrencies, 60% is in Bitcoin while 40% is distributed among all other coins combined.",
          },
        },
        {
          '@type': 'Question',
          name: 'What does falling Bitcoin dominance mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Falling Bitcoin dominance signals capital flowing from BTC into altcoins. This often occurs during 'altseason' periods when investors take profits in Bitcoin and allocate funds to alternative cryptocurrencies seeking higher returns.",
          },
        },
        {
          '@type': 'Question',
          name: 'At what dominance level does altseason start?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Historically, altseason often begins when BTC.D falls below 45-48%. However, this isn't a strict rule — the overall dominance trend, trading volumes, and macroeconomic factors matter. A rapid BTC.D drop over a short period is a more reliable signal than the absolute value.",
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I view the Bitcoin dominance chart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The BTC.D chart is available on TradingView (ticker BTC.D), CoinMarketCap and CoinGecko in the global charts section, as well as on analytical platforms Glassnode and CryptoQuant with advanced metrics. TradingView allows adding indicators and setting alerts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does Bitcoin dominance increase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Dominance rises when investors move funds from altcoins to Bitcoin. Reasons include: market uncertainty, major altcoin crashes, institutional BTC purchases, Bitcoin ETF launches, or negative news in the altcoin sector. BTC is perceived as the 'safe haven' of the crypto world.",
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
      '@id': 'https://arapov.trade/en/freestudying/bitcoin-domination#howto',
      name: 'How to Use Bitcoin Dominance in Trading',
      description: 'Practical guide to analyzing BTC.D for trading decisions',
      totalTime: 'PT15M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Open the BTC.D chart',
          text: 'Go to TradingView and enter ticker BTC.D. Select daily or weekly timeframe for medium-term trend analysis.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify key levels',
          text: 'Mark historical support and resistance levels: 40%, 45%, 50%, 55%, 60%. These zones often serve as reversal points.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Add indicators',
          text: 'Apply RSI and moving averages to confirm trends. RSI divergences often precede dominance reversals.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Compare with BTC price',
          text: 'Compare BTC.D chart with BTC/USD chart. Rising BTC price with falling dominance is a strong altseason signal.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Make trading decision',
          text: 'When BTC.D falls below key levels, consider increasing altcoin positions. When rising, reduce altcoin exposure and increase BTC allocation.',
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
      '@id': 'https://arapov.trade/en/freestudying/bitcoin-domination#terms',
      name: 'Cryptocurrency Market Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bitcoin Dominance (BTC.D)',
          description:
            "The percentage of Bitcoin's market capitalization relative to the total cryptocurrency market capitalization",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Capitalization',
          description:
            'Total value of all circulating coins of a cryptocurrency, calculated as price multiplied by supply',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Altseason',
          description:
            'A period in the crypto market when altcoins outperform Bitcoin in terms of price growth',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Altcoins',
          description:
            'All cryptocurrencies other than Bitcoin, including Ethereum, Solana, XRP, and thousands of other projects',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Capital Flow',
          description:
            'Movement of investment funds between different assets or market sectors',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TOTAL',
          description:
            'Total market capitalization of all cryptocurrencies, displayed on TradingView',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TOTAL2',
          description:
            'Total cryptocurrency market capitalization excluding Bitcoin',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Crypto Winter',
          description:
            'An extended period of declining prices in the cryptocurrency market',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ICO',
          description:
            'Initial Coin Offering — primary token placement for raising investments in crypto projects',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Decentralized Finance — ecosystem of financial applications on blockchain without intermediaries',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
