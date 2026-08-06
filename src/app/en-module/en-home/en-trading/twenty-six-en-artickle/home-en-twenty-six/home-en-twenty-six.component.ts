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
  selector: 'app-home-en-twenty-six',
  templateUrl: './home-en-twenty-six.component.html',
  styleUrl: './home-en-twenty-six.component.scss',
})
export class HomeEnTwentySixComponent implements OnInit {
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
      'Technical Analysis of Markets: Methods and Forecasting Principles',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to technical analysis of financial markets. Learn indicators, patterns, support and resistance levels for successful trading.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/technicalanalysis.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/technicalanalysis',
          },
          headline:
            'Technical Analysis of Markets: Methods and Forecasting Principles',
          description:
            'Complete guide to technical analysis of financial markets. Learn indicators, patterns, support and resistance levels for successful trading.',
          image:
            'https://arapov.trade/assets/img/content/technicalanalysis.webp',
          datePublished: '2025-06-11T00:00:00+03:00',
          dateModified: '2026-04-15T00:00:00Z',
          inLanguage: 'en',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Технический анализ для начинающих трейдеров | Полное руководство',
            description:
              'Технический анализ для начинающих трейдеров. Узнайте, как использовать технический анализ рынка. Разбираем основные инструменты: уровни поддержки и сопротивления, наклонные каналы, соотношение риск/прибыль.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/dOCLBmevcSU/maxresdefault.jpg',
              'https://img.youtube.com/vi/dOCLBmevcSU/hqdefault.jpg',
            ],
            uploadDate: '2025-11-14T00:00:00+02:00',
            duration: 'PT10M59S',
            contentUrl: 'https://www.youtube.com/watch?v=dOCLBmevcSU',
            embedUrl: 'https://www.youtube.com/embed/dOCLBmevcSU',
            inLanguage: 'ru',
            keywords:
              'технический анализ, уровни поддержки и сопротивления, наклонные каналы, трейдинг для начинающих',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Технический анализ рынка - что это и зачем нужен',
                startOffset: 103,
                endOffset: 148,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=103',
              },
              {
                '@type': 'Clip',
                name: 'Определение технического анализа и методы прогнозирования',
                startOffset: 148,
                endOffset: 190,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=148',
              },
              {
                '@type': 'Clip',
                name: 'Вероятности в трейдинге и винрейт технического анализа',
                startOffset: 190,
                endOffset: 230,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=190',
              },
              {
                '@type': 'Clip',
                name: 'Объемный анализ vs технический анализ - что эффективнее',
                startOffset: 230,
                endOffset: 261,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=230',
              },
              {
                '@type': 'Clip',
                name: 'Уровни поддержки и сопротивления - как строить и применять',
                startOffset: 261,
                endOffset: 300,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=261',
              },
              {
                '@type': 'Clip',
                name: 'Почему рынок реагирует на уровни поддержки и сопротивления',
                startOffset: 300,
                endOffset: 330,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=300',
              },
              {
                '@type': 'Clip',
                name: 'Когда использовать уровни в боковом движении',
                startOffset: 330,
                endOffset: 340,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=330',
              },
              {
                '@type': 'Clip',
                name: 'Наклонные каналы в трейдинге - построение и применение',
                startOffset: 340,
                endOffset: 390,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=340',
              },
              {
                '@type': 'Clip',
                name: 'Медвежий канал - как строить и торговать в нисходящем тренде',
                startOffset: 390,
                endOffset: 440,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=390',
              },
              {
                '@type': 'Clip',
                name: 'Бычий канал - восходящий тренд и правила торговли',
                startOffset: 440,
                endOffset: 659,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=440',
              },
            ],
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
          name: 'What is technical analysis of markets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Technical analysis is a method of forecasting price movements based on historical price data, trading volumes, and chart patterns. It helps identify trends and determine entry and exit points for positions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the main principles of technical analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Three fundamental principles: price discounts everything (all information is reflected in quotes), price movements are not random (prices follow trends and patterns), history repeats itself (market psychology creates recurring models).',
          },
        },
        {
          '@type': 'Question',
          name: 'What tools are used in technical analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main tools include support and resistance levels, trend lines, chart patterns (triangles, head and shoulders), technical indicators (RSI, MACD, moving averages), and volume analysis.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does technical analysis differ from fundamental analysis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Technical analysis studies price charts and statistical indicators, ignoring intrinsic asset value. Fundamental analysis evaluates economic indicators, financial statements, and macroeconomic factors.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which markets is technical analysis applicable to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Technical analysis is universal and applies to forex, stock markets, cryptocurrencies, commodities, and indices. Methods are adapted to the volatility and liquidity of specific markets.',
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
      name: 'How to Apply Technical Analysis in Trading',
      description:
        'Step-by-step guide to using technical analysis for making trading decisions',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select a timeframe',
          text: 'Determine the time interval for analysis: minute charts for scalping, hourly for day trading, daily and weekly for swing trading and investing.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify the trend',
          text: 'Use trend lines and moving averages to determine market direction. A crossover of fast and slow EMAs confirms a trend change.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Find key levels',
          text: 'Build support and resistance levels based on historical highs and lows. These zones determine potential reversal or breakout points.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze patterns and indicators',
          text: 'Look for chart patterns and confirm signals with technical indicators. Combining RSI, MACD, and volume increases analysis reliability.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage risks',
          text: 'Set stop-loss beyond support or resistance levels. Calculate position size based on acceptable risk per trade.',
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
      name: 'Technical Analysis Terms',
      description: 'Glossary of key technical analysis terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Technical analysis',
          description:
            'Method of price forecasting based on studying historical data, charts, and statistical indicators',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support level',
          description:
            'Price zone where demand exceeds supply and price tends to bounce upward',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Resistance level',
          description:
            'Price zone where supply exceeds demand and price tends to reverse downward',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trend',
          description:
            'Sustained price direction: upward (bullish), downward (bearish), or sideways (range)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pattern',
          description:
            'Chart formation that helps forecast subsequent price movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Indicator',
          description:
            'Mathematical calculation based on price or volume that visualizes market conditions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading volume',
          description:
            'Number of asset units bought and sold during a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Moving average',
          description:
            'Indicator that smooths price data by averaging prices over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Breakout',
          description:
            'Price movement through support or resistance level with subsequent confirmation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Timeframe',
          description:
            'Time interval over which one candle or bar forms on a chart',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
