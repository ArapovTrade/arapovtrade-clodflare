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
  selector: 'app-home-en-twenty-seven',
  templateUrl: './home-en-twenty-seven.component.html',
  styleUrl: './home-en-twenty-seven.component.scss',
})
export class HomeEnTwentySevenComponent implements OnInit {
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
      'Technical Analysis: Chart Types and Trends | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to technical analysis: chart types (bars, Japanese candlesticks, line charts), trend types, and support/resistance levels for trading.',
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
          headline: 'Technical Analysis: Chart Types and Trends',
          description:
            'Complete guide to technical analysis: chart types, trend types, and support/resistance levels for professional trading',
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
          },
          datePublished: '2024-06-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/technicalmarketcharts',
          },
          image:
            'https://arapov.trade/assets/img/content/technicalmarketcharts.webp',
          articleSection: 'Trading Education',
          keywords:
            'technical analysis, chart types, Japanese candlesticks, bars, line chart, trends, support and resistance',
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
          name: 'Which chart type is best for beginner traders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Japanese candlesticks are the optimal choice for beginners. They clearly show the balance of power between buyers and sellers, are easy to read thanks to color coding, and allow quick assessment of market sentiment for any time period.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you identify a trend change in the market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Trend changes are identified by several indicators: breakout of key support or resistance levels, formation of reversal candlestick patterns, divergence with volume indicators, and changes in the structure of highs and lows. It's important to wait for confirmation rather than trading on the first signal.",
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between support and resistance levels?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Support level is a price zone where demand exceeds supply and price tends to bounce upward. Resistance level is a zone where supply exceeds demand and price tends to pull back. When broken, levels switch roles: support becomes resistance and vice versa.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you trade during a sideways trend (range)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading in a range is possible but requires a specific approach. Traders buy near the lower boundary and sell near the upper boundary, using tight stop-losses. However, the main profit is made on the breakout, so many prefer to wait for price to exit the range.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which timeframe should you choose for chart analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Timeframe choice depends on trading style. Scalpers work on M1-M15, day traders on M15-H1, swing traders on H4-D1, position traders on D1-W1. It's recommended to analyze multiple timeframes: higher for trend direction, lower for entry timing.",
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
      name: 'How to Conduct Technical Market Analysis',
      description:
        'Step-by-step guide to analyzing market charts for trading decisions',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose the appropriate chart type',
          text: 'Determine which chart type matches your trading style. Japanese candlesticks suit most strategies, bars work for detailed analysis, line charts work for overall trend assessment.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify the current trend',
          text: 'Analyze the structure of highs and lows. Uptrend shows consecutively higher lows, downtrend shows consecutively lower highs, sideways trend shows price moving in a horizontal range.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Draw support and resistance levels',
          text: 'Mark key levels on the chart where price previously reversed. Connect lows to identify support and highs to identify resistance. More touches indicate stronger levels.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze candlestick patterns',
          text: 'Study candlestick formations near key levels. Reversal patterns signal potential direction changes, continuation patterns signal trend persistence.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Make a trading decision',
          text: 'Based on combined factors—trend direction, price position relative to levels, and candlestick signals—make an entry decision with mandatory stop-loss and take-profit placement.',
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
      name: 'Technical Analysis Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Japanese Candlesticks',
          description:
            'Chart type displaying open, close, high, and low prices using colored rectangles',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bar',
          description:
            'Graphical element showing price range with open and close marks on a vertical line',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Uptrend',
          description:
            'Market state with consecutively higher lows and highs indicating buyer dominance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Downtrend',
          description:
            'Market state with consecutively lower highs and lows indicating seller dominance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Range',
          description:
            'Sideways price movement in a horizontal channel without clear direction',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support Level',
          description:
            'Price zone where demand exceeds supply causing price to bounce up',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Resistance Level',
          description:
            'Price zone where supply exceeds demand limiting price growth',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Timeframe',
          description:
            'Time interval represented by one candle or bar on the chart',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Breakout',
          description:
            'Price closing above resistance or below support signaling continued movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Channel',
          description:
            'Two parallel trend lines between which asset price moves',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
