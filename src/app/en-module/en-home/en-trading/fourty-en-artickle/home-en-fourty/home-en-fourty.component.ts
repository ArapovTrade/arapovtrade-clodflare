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
  selector: 'app-home-en-fourty',
  templateUrl: './home-en-fourty.component.html',
  styleUrl: './home-en-fourty.component.scss',
})
export class HomeEnFourtyComponent implements OnInit {
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
      'Common Beginner Trading Mistakes and How to Avoid Them | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Common trading mistakes beginners make — comprehensive guide. Learn typical errors new traders commit and practical strategies to avoid costly losses.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/beginnermistakes.webp',
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
          headline: 'Common Beginner Trading Mistakes and How to Avoid Them',
          description:
            'Comprehensive guide to typical mistakes new traders make. Analysis of loss causes and practical recommendations for successful trading.',
          image:
            'https://arapov.trade/assets/img/content/beginnermistakes.webp',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/beginnermistakes',
          },
          articleSection: 'Trading Education',
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
          name: 'What is the biggest mistake beginner traders make?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The biggest mistake is lacking a proper risk management system. Beginners often risk too much capital on single trades, use excessive leverage, and fail to set stop-losses. This leads to rapid account depletion even with small market movements against positions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much should I risk per trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Professional traders recommend risking no more than 1-2% of your account on any single trade. With a $1,000 account, maximum loss per trade should not exceed $10-20. This allows surviving losing streaks without catastrophic damage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do emotions hurt trading performance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fear causes premature exits from profitable trades, while greed leads to holding losing positions hoping for reversals. The desire to recover losses quickly pushes traders toward reckless decisions and increased risk-taking.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do beginners need a trading journal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A trading journal is essential for development. Recording each trade with entry reasons, outcomes, and emotions helps identify weaknesses and recurring mistakes. Journal analysis reveals which strategies work and which cause losses.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I choose the right timeframe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Timeframe selection depends on your schedule and temperament. For active trading, M15-H1 work well; for a calmer approach, H4-D1 are better. Beginners should start with higher timeframes where there is less noise and signals are more reliable.',
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
      name: 'How to Avoid Common Beginner Trading Mistakes',
      description:
        'Step-by-step guide to developing proper trading habits and avoiding typical beginner errors',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn market fundamentals',
          text: 'Spend several months studying technical and fundamental analysis before risking real money on live trading.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Implement risk management',
          text: 'Establish a rule to never risk more than 1-2% of your account per trade. Always use stop-losses and calculate position sizes before entering.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Control your emotions',
          text: 'Develop a trading plan and follow it strictly. Take breaks after losing trades and practice stress management techniques.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Keep a trading journal',
          text: 'Record every trade including asset, entry and exit points, entry reason, and outcome. Review weekly to identify patterns.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Practice on demo account',
          text: 'Test strategies on a demo account for at least 2-3 months. Only transition to live trading after achieving consistent profitability.',
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
      name: 'Trading Terminology Glossary: Beginner Mistakes',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System of capital management rules defining maximum risk per trade and methods for protecting account from critical losses',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order for automatically closing losing positions when price reaches a predetermined level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'Tool allowing traders to control positions larger than their account balance, amplifying both potential profits and losses',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overtrading',
          description:
            'Excessive trading activity with numerous trades, often leading to exhaustion and increased transaction costs',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Plan',
          description:
            'Document containing rules for trade entry and exit, asset selection criteria, and risk management principles',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Timeframe',
          description:
            'Time interval for displaying price data on charts, affecting trading style and signal frequency',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin Call',
          description:
            "Broker's demand to deposit additional funds when account equity falls below required maintenance margin level",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description:
            'Percentage of profitable trades out of total number of executed trading operations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'Emotional state following losses that leads to impulsive decisions and deviation from trading plan',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Diversification',
          description:
            'Distribution of capital across different assets to reduce overall portfolio risk',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
