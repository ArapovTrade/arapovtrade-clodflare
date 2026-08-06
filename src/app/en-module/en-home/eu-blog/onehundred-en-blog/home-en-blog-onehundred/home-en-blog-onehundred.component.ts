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
  selector: 'app-home-en-blog-onehundred',
  templateUrl: './home-en-blog-onehundred.component.html',
  styleUrl: './home-en-blog-onehundred.component.scss',
})
export class HomeEnBlogOnehundredComponent implements OnInit {
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
      'S&P 500 Trading Guide | Index Analysis & Strategies',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'S&P 500 trading guide: index fundamentals, technical analysis, trading strategies and risk management for equity index traders.',
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
          headline: 'S&P 500 Trading: Complete Index Guide',
          description:
            'Comprehensive guide to trading S&P 500 covering fundamentals, technicals, and strategies',
          image: 'https://arapov.trade/assets/img/content/sp500trading1.jpg',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-19T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/sp500trading',
          },
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
          name: 'What is the S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The S&P 500 tracks 500 largest US public companies by market capitalization. It represents approximately 80% of total US equity market value and serves as primary benchmark for US stock performance.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I trade the S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading options include: SPY ETF for direct exposure, ES futures for leverage, SPX options for derivatives, and CFDs through brokers. Each instrument has different margin requirements and trading hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'What moves the S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key drivers: Federal Reserve policy, corporate earnings, economic data (jobs, GDP, inflation), sector rotation, and global risk sentiment. Technology sector has outsized impact due to weighting.',
          },
        },
        {
          '@type': 'Question',
          name: 'When is the best time to trade S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Peak activity occurs at US market open (9:30 AM EST) and close (4:00 PM EST). Economic data releases and Fed announcements create specific volatility windows.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is normal S&P 500 volatility?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Average daily range is 0.5-1.5%. VIX above 20 signals elevated volatility. Major events can cause 2-5% daily moves. Lower volatility than individual stocks due to diversification.',
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
      name: 'How to Trade S&P 500',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Analyze Macro Environment',
          text: 'Assess Fed policy direction, economic cycle position, and earnings trends.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Monitor Key Data',
          text: 'Track employment, inflation, GDP releases and their market impact.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply Technical Analysis',
          text: 'Use support/resistance, moving averages, and trend structure.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Choose Appropriate Instrument',
          text: 'Select ETFs, futures, or CFDs based on account size and objectives.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Implement Risk Controls',
          text: 'Size positions appropriately for index volatility and event risk.',
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
      name: 'S&P 500 Trading Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'S&P 500',
          description:
            'Index of 500 largest US public companies by market cap.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SPY',
          description: 'SPDR S&P 500 ETF tracking the index.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ES Futures',
          description: 'E-mini S&P 500 futures contracts on CME.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VIX',
          description:
            'Volatility index measuring expected S&P 500 volatility.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Cap',
          description: 'Total market value of company shares outstanding.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sector Rotation',
          description: 'Capital movement between market sectors.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Earnings Season',
          description: 'Quarterly period of corporate earnings releases.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FOMC',
          description: 'Federal Open Market Committee setting interest rates.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk-On',
          description: 'Market environment favoring risky assets.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'All-Time High',
          description: 'Highest price level ever reached by an asset.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
