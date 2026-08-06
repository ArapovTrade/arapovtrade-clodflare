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
  selector: 'app-home-en-thirty-two',
  templateUrl: './home-en-thirty-two.component.html',
  styleUrl: './home-en-thirty-two.component.scss',
})
export class HomeEnThirtyTwoComponent implements OnInit {
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
      'Stop Order in Trading: Essential Guide to Capital Protection | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Stop order in trading — comprehensive guide to protective orders for risk management in cryptocurrency, forex and stock markets',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoporder.webp',
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
            'Stop Order in Trading: Essential Guide to Capital Protection',
          description:
            'Complete breakdown of stop orders: types, placement strategies, common mistakes and professional risk management techniques across different markets',
          image: 'https://arapov.trade/assets/img/content/stoporder.png',
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
            '@id': 'https://arapov.trade/en/freestudying/stoporder',
          },
          articleSection: 'Trading Education',
          wordCount: '1700',
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
          name: 'What is the difference between stop loss and stop limit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A stop loss guarantees execution but not price — once triggered, it becomes a market order filled at the current price. A stop limit guarantees price but not execution — if the market moves too fast past your limit price, the order may remain unfilled.',
          },
        },
        {
          '@type': 'Question',
          name: 'How far should I place my stop loss?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The optimal distance depends on asset volatility. Use the ATR indicator: for most assets, place stops 1.5-2 ATR from entry. For cryptocurrencies, extend to 2-3 ATR due to higher volatility. Always consider key support and resistance levels.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do my stops keep getting hit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Frequent stop triggers usually result from placing stops too close to entry or at obvious levels like round numbers. Solution: place stops beyond key support levels accounting for volatility, avoid round prices where stop clusters form.',
          },
        },
        {
          '@type': 'Question',
          name: 'When should I use a trailing stop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trailing stops work best in clear trending markets when price moves consistently in your direction. Avoid using them during consolidation or before major news events. Optimal trail distance: 3-5% for stocks, 5-7% for cryptocurrencies.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I trade without stop orders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trading without stops ignores fundamental risk management. Even experienced traders use protective orders. The only exception is long-term investors with multi-year horizons who may use mental stops, but they still need an exit plan for certain conditions.',
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
      name: 'How to Set an Effective Stop Order',
      description:
        'Step-by-step guide to configuring protective orders for minimizing trading risks',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine acceptable risk',
          text: 'Calculate the maximum loss per trade. Standard recommendation is 1-2% of account balance. This determines either the stop distance or position size.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Assess asset volatility',
          text: 'Add ATR indicator to your chart. Note its value — your stop must be far enough to survive normal price fluctuations without triggering.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Identify technical level',
          text: 'Find the nearest support level for long positions or resistance for shorts. This level serves as the reference point for stop placement.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Add protective buffer',
          text: 'Place the stop 0.3-0.8% beyond the technical level. This protects against false breakouts and stop hunting maneuvers.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Select order type and execute',
          text: 'Use stop loss for liquid markets, stop limit for less liquid ones. Enter parameters in your trading terminal and confirm the order.',
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
      name: 'Stop Order Terminology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stop Order',
          description:
            'A conditional trading instruction that activates when price reaches a specified level and automatically executes a trade',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Loss',
          description:
            'A protective order that automatically closes a losing position when price reaches a predetermined level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Limit',
          description:
            'A hybrid order that triggers like a stop but executes as a limit order at the specified price or better',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description:
            'A dynamic stop order that automatically follows price at a set distance when moving in the profitable direction',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between expected execution price and actual fill price due to market volatility or low liquidity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — an indicator measuring the average price movement range over a period to assess volatility',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Buy Stop',
          description:
            'An order to buy that triggers when price breaks above a specified level, used for entering long positions on breakouts',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sell Stop',
          description:
            'An order to sell that triggers when price drops below a specified level, used for short entries or position exits',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OCO Order',
          description:
            'One-Cancels-Other — a paired order setup where execution of one automatically cancels the other',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Price manipulation where large players push price to trigger clustered stop orders before reversing direction',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
