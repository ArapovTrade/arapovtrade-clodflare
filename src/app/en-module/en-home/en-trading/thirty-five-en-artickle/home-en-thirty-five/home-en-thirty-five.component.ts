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
  selector: 'app-home-en-thirty-five',
  templateUrl: './home-en-thirty-five.component.html',
  styleUrl: './home-en-thirty-five.component.scss',
})
export class HomeEnThirtyFiveComponent implements OnInit {
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
      'Trading System: Types, Optimization and Testing Guide | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading system guide: types of strategies, optimization methods and testing approaches. Complete handbook for building a profitable trading system in financial markets.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingsystem.webp',
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
          headline: 'Trading System: Types, Optimization and Testing Guide',
          description:
            'Trading system guide: types of strategies, optimization methods and testing approaches. Complete handbook for building a profitable trading system in financial markets.',
          image: 'https://arapov.trade/assets/img/content/tradingsystem1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/tradingsystem',
          },
          articleSection: 'Trading Education',
          keywords: [
            'trading system',
            'trading strategies',
            'optimization',
            'testing',
            'risk management',
            'algorithmic trading',
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
          name: 'What is a trading system?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A trading system is a structured set of rules and algorithms that define entry and exit conditions, position sizing, and risk management. The system eliminates emotional decision-making and ensures consistency in trading decisions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the main types of trading systems?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main types include: trend-following systems (trading with the trend), counter-trend systems (trading against the trend), scalping systems (multiple quick trades), swing trading (holding positions for days), and arbitrage systems (exploiting price discrepancies).',
          },
        },
        {
          '@type': 'Question',
          name: 'How to test a trading system before live trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Testing includes backtesting on historical data, forward testing on a demo account, and gradual transition to live trading with minimal position sizes. Key metrics to analyze include profitability, drawdown, Sharpe ratio, and win rate.',
          },
        },
        {
          '@type': 'Question',
          name: 'What key elements should a trading system include?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key elements include: market analysis rules, entry and exit criteria, capital and risk management system, position sizing rules, and performance evaluation metrics.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the advantages of automated trading systems?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Automated systems eliminate emotional bias, provide instant signal execution, operate around the clock without fatigue, enable testing strategies on large datasets, and can monitor multiple instruments simultaneously.',
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
      name: 'How to Build a Profitable Trading System',
      description:
        'Step-by-step guide to developing and testing an effective trading system for financial markets.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define your trading style',
          text: 'Choose an appropriate time horizon and trading approach: scalping, day trading, swing trading, or position trading based on your schedule and temperament.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Develop entry and exit rules',
          text: 'Formulate clear criteria for opening and closing positions based on technical or fundamental analysis. Rules should be unambiguous and measurable.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Establish risk management framework',
          text: 'Define maximum risk per trade (typically 1-2% of capital), stop-loss placement rules, and position sizing methods for each trade.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Conduct system testing',
          text: 'Perform backtesting on at least 2-3 years of historical data, then conduct forward testing on a demo account for 2-3 months to verify real-world performance.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Optimize and document',
          text: 'Based on testing results, adjust system parameters, maintain a trading journal, and regularly analyze statistics for continuous improvement.',
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
      name: 'Trading System Terminology Glossary',
      description: 'Key terms and definitions in trading systems and trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading System',
          description:
            'A structured set of rules and algorithms for making trading decisions in financial markets',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Backtesting',
          description:
            'Testing a trading strategy on historical market data to evaluate its potential effectiveness',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Maximum decline in trading capital from peak to trough over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sharpe Ratio',
          description:
            'Investment performance measure that calculates return per unit of risk taken',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trend Following System',
          description:
            'Trading strategy designed to follow sustained directional price movements',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'Trading style involving multiple short-term trades to profit from small price movements',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing Trading',
          description:
            'Trading approach holding positions from several days to weeks to capture medium-term moves',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Loss',
          description:
            'Protective order to automatically close a position when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description:
            'Percentage ratio of profitable trades to total number of trades executed',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Money Management',
          description:
            'System for managing trading capital to control risks and optimize returns',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
