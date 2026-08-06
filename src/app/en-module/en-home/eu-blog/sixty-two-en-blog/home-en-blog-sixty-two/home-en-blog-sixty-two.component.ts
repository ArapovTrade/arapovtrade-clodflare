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
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-sixty-two',
  templateUrl: './home-en-blog-sixty-two.component.html',
  styleUrl: './home-en-blog-sixty-two.component.scss',
})
export class HomeEnBlogSixtyTwoComponent {
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
      'Smart Money Strategy: How to Find Entry Points | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money trading strategies: how to find entry points using Order Blocks, Fair Value Gaps, Break of Structure, and liquidity analysis. Complete guide.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneystrategies.png',
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
            'https://arapov.trade/en/freestudying/smartmoneystrategies#article',
          headline: 'Smart Money Strategy: How to Find Entry Points in Trading',
          description:
            'Complete guide to Smart Money strategies: Order Blocks, Fair Value Gaps, Break of Structure, and liquidity analysis for finding precise entry points',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneystrategies1.webp',
            width: 1200,
            height: 630,
          },
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
              width: 200,
              height: 60,
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/smartmoneystrategies',
          },
          articleSection: 'Trading',
          keywords: [
            'Smart Money',
            'Order Blocks',
            'Fair Value Gaps',
            'Break of Structure',
            'liquidity',
            'entry points',
            'trading',
          ],
          wordCount: 1627,
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneystrategies#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Smart Money in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money refers to large institutional market participants: investment banks, hedge funds, pension funds, and market makers. They possess significant capital and analytical resources, shaping major market trends through position accumulation and distribution.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to find Order Blocks on a chart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An Order Block is the last candle before a strong impulsive movement. A bullish Order Block forms with the last bearish candle before a rise, while a bearish one forms with the last bullish candle before a decline. Confirmation through elevated volume and price return to this zone is important.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a Fair Value Gap and how to use it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Fair Value Gap (FVG) is an unfilled price gap that forms during rapid price movement. It shows imbalance between buyers and sellers. Price tends to return to these zones, creating trading opportunities for position entry.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Break of Structure and Change of Character?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Break of Structure (BOS) confirms continuation of the current trend through a key level breakout. Change of Character (CHoCH) signals a potential trend change when price stops forming new extremes in the previous direction and breaks the opposite level.',
          },
        },
        {
          '@type': 'Question',
          name: 'What risk management to use when trading Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Optimal risk per trade is 1-2% of capital. Stop loss is placed beyond liquidity zones. Minimum risk-to-reward ratio is 1:2. Partial position closing at key levels and trailing stop use in trending movements is recommended.',
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneystrategies#howto',
      name: 'How to Find Entry Points Using Smart Money Concepts',
      description:
        'Step-by-step methodology for finding high-probability entry points using institutional trading concepts',
      totalTime: 'PT30M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Determine Market Structure',
          text: 'Analyze the current trend, identify key highs and lows. Detect accumulation and distribution zones on the chart.',
          url: 'https://arapov.trade/en/freestudying/smartmoneystrategies#structure',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Find Liquidity Zones',
          text: 'Locate stop order clusters: behind support and resistance levels, near daily and weekly extremes, at round psychological levels.',
          url: 'https://arapov.trade/en/freestudying/smartmoneystrategies#liquidity',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Identify Order Blocks and FVG',
          text: 'Determine Order Blocks—last candles before impulse. Find Fair Value Gaps—unfilled gaps after sharp movements. Mark these zones on the chart.',
          url: 'https://arapov.trade/en/freestudying/smartmoneystrategies#orderblocks',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Wait for Confirmation Signals',
          text: 'Wait for price return to the zone of interest. Look for confirmation: candlestick patterns, volume increase, Break of Structure or Change of Character.',
          url: 'https://arapov.trade/en/freestudying/smartmoneystrategies#confirmation',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Enter and Manage Position',
          text: 'Open position upon confirmation. Place stop loss beyond the liquidity zone. Set take profit at the next significant zone. Use minimum 1:2 risk-to-reward ratio.',
          url: 'https://arapov.trade/en/freestudying/smartmoneystrategies#entry',
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneystrategies#terms',
      name: 'Smart Money Concepts Glossary',
      description:
        'Key terms and definitions of Smart Money methodology in trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Large institutional market participants—banks, hedge funds, market makers—possessing significant capital and influencing market movements',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Chart zone where institutional players accumulated positions before significant price movement; the last candle before impulse',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Unfilled price gap forming during rapid price movement; zone of imbalance between supply and demand',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break of Structure',
          description:
            'Breakout of key high or low confirming continuation of current trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Change of Character',
          description:
            'Signal of potential trend change; breakout of level in direction opposite to current trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Sweep',
          description:
            'Process of triggering retail trader stop orders before price reversal; liquidity manipulation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Large player tactic of moving price to stop order cluster zones for liquidity collection',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Order clusters at specific price levels; resource needed by institutional players to open large positions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'Market participant providing liquidity by placing buy and sell quotes; large institutional player',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'Trading risk control system including position sizing, stop loss levels, and risk-to-reward ratio determination',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
