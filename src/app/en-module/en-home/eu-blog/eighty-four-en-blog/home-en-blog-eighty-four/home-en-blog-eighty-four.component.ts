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
  selector: 'app-home-en-blog-eighty-four',
  templateUrl: './home-en-blog-eighty-four.component.html',
  styleUrl: './home-en-blog-eighty-four.component.scss',
})
export class HomeEnBlogEightyFourComponent {
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
      'Engulfing Pattern: How to Identify Trend Reversals',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to the Engulfing candlestick pattern. Learn bullish and bearish engulfing for identifying trend reversals and market entry points.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/engulfing.webp',
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
          headline: 'Engulfing Pattern: How to Identify Trend Reversals',
          description:
            'Complete guide to the Engulfing candlestick pattern. Learn bullish and bearish engulfing for identifying trend reversals and market entry points.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/engulfing.webp',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/engulfing',
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
          name: 'What is an Engulfing pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Engulfing pattern is a reversal candlestick formation where the second candle completely covers the body of the previous one. Bullish engulfing signals an upward reversal after a downtrend, bearish engulfing signals a downward reversal after an uptrend.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to distinguish a true engulfing from a false one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'True engulfing forms at key support or resistance levels and is accompanied by increased trading volume. The second candle significantly exceeds the first in size, and additional indicators (RSI, MACD) confirm the reversal.',
          },
        },
        {
          '@type': 'Question',
          name: 'On which timeframes does the Engulfing pattern work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The pattern works on all timeframes, but the most reliable signals appear on H1, H4, D1 and higher. Lower timeframes (M1, M5) contain more market noise and false signals.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where to place stop-loss when trading engulfing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "For bullish engulfing, stop-loss is placed below the second candle's low. For bearish engulfing — above the second candle's high. Using ATR for calculating safe distance is recommended.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which indicators confirm the Engulfing pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI shows exit from overbought or oversold zones, MACD shows divergence or zero line crossover, volume shows activity spike on the second candle.',
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
      name: 'How to Trade the Engulfing Pattern',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the trend',
          text: 'Identify the current market trend. Look for bullish engulfing at the end of downtrends, bearish engulfing at the end of uptrends.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Find a key level',
          text: 'Determine the nearest support and resistance levels. A pattern formed at a key level has greater reliability.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for pattern formation',
          text: "Ensure the second candle completely engulfs the first candle's body. Don't enter before the second candle closes.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm the signal',
          text: 'Check trading volume — it should increase on the second candle. Use RSI or MACD for additional confirmation.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set stop-loss and take-profit',
          text: "Place stop-loss beyond the second candle's extreme. Calculate take-profit with a risk-to-reward ratio of at least 1:2.",
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
      name: 'Candlestick Analysis Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Engulfing Pattern',
          description:
            "Reversal candlestick formation where the second candle completely covers the previous candle's body",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bullish Engulfing',
          description: 'Upward reversal pattern forming after a downtrend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bearish Engulfing',
          description: 'Downward reversal pattern forming after an uptrend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Candle Body',
          description: 'Distance between opening and closing price of a period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Reversal Pattern',
          description: 'Chart formation signaling a change in trend direction',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Confirmation',
          description:
            'Increased trading activity strengthening signal reliability',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Signal',
          description: 'Pattern not leading to expected price movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Candlestick Analysis',
          description:
            'Technical analysis method based on Japanese candlesticks',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description: 'Average True Range indicator for volatility assessment',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward',
          description: 'Ratio of potential risk to expected profit',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
