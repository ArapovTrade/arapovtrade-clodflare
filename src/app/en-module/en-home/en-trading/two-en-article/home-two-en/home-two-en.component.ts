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
  selector: 'app-home-two-en',
  templateUrl: './home-two-en.component.html',
  styleUrl: './home-two-en.component.scss',
})
export class HomeTwoEnComponent implements OnInit {
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
      'Financial Market Terms Glossary: Complete Guide for Traders | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Comprehensive financial market terminology guide for beginners. Stock and forex market basics, technical and fundamental analysis, trading strategies explained.',
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
            'Financial Market Terms Glossary: Complete Guide for Traders',
          description:
            'Comprehensive financial market terminology guide for beginners. Stock and forex market basics, technical and fundamental analysis, trading strategies explained.',
          image: 'https://arapov.trade/assets/img/content/osnovirinka1.webp',
          datePublished: '2026-03-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/en/freestudying/marketbasics',
          },
          articleSection: 'Trading Education',
          wordCount: 1540,
          inLanguage: 'en',
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
          name: 'What is a financial market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A financial market is a global ecosystem where participants exchange capital through various instruments: stocks, bonds, currencies, cryptocurrencies, and derivatives. Daily transaction volumes reach trillions of dollars.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between stock market and Forex?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The stock market is designed for trading securities (stocks, bonds, ETFs) on regulated exchanges. Forex is a decentralized currency market with 24-hour trading of currency pairs and daily turnover exceeding 6 trillion dollars.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is leverage in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leverage allows traders to control amounts exceeding their deposit. For example, 1:100 leverage means controlling $100,000 with a $1,000 deposit. Leverage amplifies both potential profits and possible losses.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between technical and fundamental analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Technical analysis studies historical price and volume data to forecast movements. Fundamental analysis evaluates fair asset value based on economic indicators, financial reports, and macroeconomic factors.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which strategy should beginners choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners are recommended to start with swing trading or position trading. These strategies require less screen time, allow for deliberate decision-making, and reduce emotional impact. Day trading and scalping require experience and high psychological resilience.',
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
      name: 'How to Start Learning Financial Markets',
      description:
        'Step-by-step guide for beginners on mastering financial market terminology and fundamentals',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn Basic Terminology',
          text: 'Master key stock and forex market terms: stocks, bonds, currency pairs, spread, lot, leverage. Understanding terminology is the foundation for further learning.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose Your Market Segment',
          text: 'Decide on your direction: stock market, Forex, cryptocurrencies, or commodities. Each segment has its own characteristics, risks, and opportunities.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Master Analysis Methods',
          text: 'Study technical analysis basics (charts, indicators, patterns) and fundamental analysis (economic indicators, corporate reports). Combining methods yields better results.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice on Demo Account',
          text: 'Open a demo account with a broker and practice skills without risking real money. Keep a trading journal, analyze trades, and refine your approach.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Develop Risk Management System',
          text: 'Create capital management rules: limit risk per trade (1-2% of deposit), use stop-losses, diversify your portfolio. Discipline is key to long-term success.',
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
      name: 'Financial Market Terms Glossary',
      description: 'Essential terms and concepts for traders and investors',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stock',
          description:
            'A security representing ownership share in a company, granting rights to a portion of profits through dividends',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bond',
          description:
            'A debt instrument where the issuer commits to paying the holder principal plus interest income',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy price (Ask) and sell price (Bid) of a financial instrument',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'A mechanism allowing traders to control amounts exceeding their own deposit',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'An order that automatically closes a position when a predetermined loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of price change of an asset over a specific period, measured in percentages',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of an asset to be quickly bought or sold without significant price change',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swap',
          description:
            'A fee for carrying an open position overnight, depends on interest rate differential',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — a technical indicator for determining overbought or oversold conditions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A market participant providing liquidity by continuously posting buy and sell orders',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
