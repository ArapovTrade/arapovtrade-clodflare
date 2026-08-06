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
  selector: 'app-home-en-blog-sixty-three',
  templateUrl: './home-en-blog-sixty-three.component.html',
  styleUrl: './home-en-blog-sixty-three.component.scss',
})
export class HomeEnBlogSixtyThreeComponent {
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
      'Smart Money: Market Manipulation and Crowd Control | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how Smart Money manipulates markets and controls the crowd. Institutional methods: false breakouts, stop hunting, news manipulation. Practical tips for traders.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneycontrol.png',
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
            'https://arapov.trade/en/freestudying/smartmoneycontrol#article',
          headline: 'Smart Money: How Institutional Players Manipulate Markets',
          description:
            'Complete guide to market manipulation methods used by large institutional players. Learn mechanisms of creating false breakouts, stop hunting, and trend formation.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneycontrol1.webp',
            width: 1200,
            height: 630,
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/smartmoneycontrol',
          },
          articleSection: 'Trading',
          keywords: [
            'Smart Money',
            'market manipulation',
            'institutional traders',
            'false breakouts',
            'stop hunting',
          ],
          wordCount: 1545,
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneycontrol#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Smart Money in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money refers to large institutional market participants: investment banks, hedge funds, market makers, and algorithmic trading systems. They possess significant financial resources, advanced technologies, and access to information unavailable to retail traders.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Smart Money manipulate markets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Institutions use several methods: creating false breakouts of technical levels, hunting retail trader stop orders, manipulation through news, and forming artificial market sentiment through media and social networks.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a false breakout and how to recognize it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A false breakout is a short-term price move beyond a key technical level with subsequent quick return. It can be recognized by lack of confirming volume, quick return beyond the level, and inconsistency with overall market context.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to protect yourself from Smart Money manipulation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For protection, analyze volume before entering trades, avoid trading during major news releases, use level retests instead of breakout entries, and control emotions without succumbing to panic or euphoria.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do retail traders always lag behind?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Retail traders react to already formed movements rather than their preconditions. They enter markets after media publications when Smart Money are already preparing to exit. Emotional decisions lead to buying at highs and selling at lows.',
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneycontrol#howto',
      name: 'How to Trade Alongside Smart Money',
      description:
        'Step-by-step guide to identifying institutional player actions and trading on their side',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Volume Analysis',
          text: 'Study the price-volume relationship. Volume increase confirms movement direction, while volume decline during price movement signals possible reversal.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify Liquidity Zones',
          text: 'Find stop order cluster levels and high-interest zones. Smart Money use these zones for position accumulation and distribution.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Recognize Market Phases',
          text: 'Determine current market phase: accumulation, impulse, distribution, or correction. Enter trades during accumulation phase, not at impulse peak.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Wait for Confirmation',
          text: 'Do not enter immediately after level breakout. Wait for price consolidation, level retest, and volume confirmation.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Control Emotions',
          text: 'Act against the crowd during mass euphoria or panic moments. Maintain rational approach and follow your trading plan.',
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
      '@id': 'https://arapov.trade/en/freestudying/smartmoneycontrol#glossary',
      name: 'Smart Money Terms Glossary',
      description: 'Key terms of Smart Money concept in trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Large institutional market participants including banks, hedge funds, and market makers possessing significant resources and informational advantage.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Short-term price movement beyond a key technical level with subsequent quick return, used for liquidity collection.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Deliberate price movement into stop order cluster zones to activate them and obtain liquidity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Availability of sufficient buy and sell orders enabling trade execution without significant price impact.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation Phase',
          description:
            'Period of sideways price movement when large players gradually build positions before trending movement begins.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Distribution Phase',
          description:
            'Period when institutions close positions, transferring them to retail traders before trend reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'Market participant providing liquidity by simultaneously placing buy and sell orders.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Chart zone where large players accumulated or distributed positions, often acting as support or resistance level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Price imbalance occurring during impulse movement, where price often returns to fill.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunt',
          description:
            'Large player strategy of deliberately moving price into stop order cluster zones to activate them.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
