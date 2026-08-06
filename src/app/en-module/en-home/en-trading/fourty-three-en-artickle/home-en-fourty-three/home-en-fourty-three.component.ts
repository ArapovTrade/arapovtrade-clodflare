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
  selector: 'app-home-en-fourty-three',
  templateUrl: './home-en-fourty-three.component.html',
  styleUrl: './home-en-fourty-three.component.scss',
})
export class HomeEnFourtyThreeComponent implements OnInit {
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
      'Liquidity Pools in Trading: How Institutional Players Control the Market | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn what liquidity pools are in trading, how Smart Money manipulate price through liquidity hunting, and how to protect your trading capital from stop hunts.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/liquiditypools.png',
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
          '@id': 'https://arapov.trade/en/freestudying/liquiditypools#article',
          headline:
            'Liquidity Pools in Trading: How Institutional Players Control the Market',
          description:
            'Learn what liquidity pools are in trading, how Smart Money manipulate price through liquidity hunting, and how to protect your trading capital from stop hunts.',
          image: 'https://arapov.trade/assets/img/content/liquiditypools1.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/liquiditypools',
          },
          articleSection: 'Trading Education',
          keywords:
            'liquidity pools, Smart Money, stop hunting, market manipulation, order flow, volume analysis',
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
      '@id': 'https://arapov.trade/en/freestudying/liquiditypools#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are liquidity pools in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Liquidity pools are areas on the price chart where significant concentrations of trading orders exist. These zones form around key support and resistance levels, psychological price points, and local extremes. Institutional players use liquidity pools to accumulate and distribute positions without significantly impacting market price.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do Smart Money use liquidity?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — institutional players and market makers — use liquidity to execute large orders. They deliberately move price toward zones where retail traders have placed stop-losses, trigger these orders, and use the resulting liquidity to enter their own positions at favorable prices.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is stop hunting and how to protect against it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop hunting is the deliberate movement of price toward areas where stop orders are concentrated to trigger them and collect liquidity. For protection, place stop-losses beyond true liquidity levels rather than obvious local extremes. Also analyze volume before breakouts and wait for confirmation before entering.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tools help find liquidity pools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traders use volume cluster analysis, order book depth, Footprint Charts, and order flow analysis to find liquidity pools. These tools reveal hidden large orders and track institutional activity in real time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does price often reverse after liquidity collection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After collecting liquidity, large players have the volume needed to open or close their positions. Once the objective is achieved, pressure on price ceases and the market returns to fair value. This is why false breakouts often precede strong reversal moves.',
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
      '@id': 'https://arapov.trade/en/freestudying/liquiditypools#howto',
      name: 'How to Find and Use Liquidity Pools in Trading',
      description:
        'Step-by-step guide to identifying liquidity zones and applying them in trading strategies',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify key levels',
          text: 'Find significant support and resistance levels, local highs and lows, and psychological price points on the chart. These areas typically attract the most trading orders.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze volume',
          text: 'Use volume indicators and cluster analysis to identify zones with high order concentration. Pay attention to unusual volume spikes near key levels.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Track price behavior',
          text: 'Observe how price reacts when approaching liquidity zones. Sharp moves followed by reversals often indicate liquidity collection by large players.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Wait for confirmation',
          text: 'Do not enter trades immediately after level breakouts. Wait for a retest of the liquidity zone and confirming signals from volume before opening a position.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage risk',
          text: 'Place stop-losses beyond true liquidity levels, accounting for potential manipulation. Use partial position closing to reduce risk.',
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
      '@id': 'https://arapov.trade/en/freestudying/liquiditypools#glossary',
      name: 'Trading Liquidity Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Pool',
          description:
            'An area on the chart with high concentration of trading orders where large players accumulate or distribute positions.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Institutional market participants — banks, hedge funds, and market makers with significant capital and informational advantage.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Deliberate price movement toward zones of concentrated stop orders to trigger them and collect liquidity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            "Analysis of trading order streams that allows tracking large market participants' actions in real time.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'A price gap created by impulsive movement where supply and demand balance is absent.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Imbalance',
          description:
            'Disproportion between buyers and sellers leading to directional price movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A market participant that provides liquidity by continuously placing buy and sell orders.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between expected and actual order execution price, occurring when liquidity is insufficient.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Chart',
          description:
            'A chart type displaying volume distribution within each candle broken down by price levels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A brief price move beyond a key level followed by a return, used to collect liquidity.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
