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
  selector: 'app-home-en-blog-eighty-one',
  templateUrl: './home-en-blog-eighty-one.component.html',
  styleUrl: './home-en-blog-eighty-one.component.scss',
})
export class HomeEnBlogEightyOneComponent {
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
      'Triangle Pattern in Trading: Complete Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Triangle Pattern in Trading: Complete Guide. Learn how to identify ascending, descending, and symmetrical triangles for successful trading strategies.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
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
          '@id': 'https://arapov.trade/en/freestudying/trianglefigure#article',
          headline:
            'Triangle Pattern in Trading: Complete Guide to Trading Strategies',
          description:
            'Comprehensive guide to triangle patterns in technical analysis. Ascending, descending, and symmetrical triangles: identification, trading strategies, and risk management.',
          image: 'https://arapov.trade/assets/img/content/triangle1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@id': 'https://arapov.trade/#organization',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/trianglefigure',
          },
          articleSection: 'Technical Analysis',
          keywords: [
            'triangle pattern',
            'technical analysis',
            'ascending triangle',
            'descending triangle',
            'symmetrical triangle',
            'trading strategies',
          ],
          wordCount: 1570,
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
      '@id': 'https://arapov.trade/en/freestudying/trianglefigure#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a triangle pattern in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A triangle pattern is a technical analysis chart formation that develops when price range narrows between support and resistance lines. This pattern signals market consolidation before a potential breakout in either direction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of triangles exist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Technical analysis identifies three main triangle types: ascending triangle (bullish signal with horizontal resistance), descending triangle (bearish signal with horizontal support), and symmetrical triangle (neutral pattern with balanced forces).',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade the triangle pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Triangle trading involves entering positions after confirmed breakout of one formation boundary. Stop-loss is placed beyond the opposite boundary, and profit target is calculated using triangle height projected from the breakout point.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to avoid false triangle breakouts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To filter false breakouts: wait for candle close beyond pattern boundary, confirm breakout with increased trading volume, use additional indicators (RSI, MACD), and apply percentage filters to exclude minor boundary violations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which timeframes are best for trading triangles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Triangle patterns provide most reliable signals on medium and higher timeframes from hourly to daily charts. Weekly chart formations lead to most significant movements but require patience. Lower timeframes generate more false signals.',
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
      '@id': 'https://arapov.trade/en/freestudying/trianglefigure#howto',
      name: 'How to Trade the Triangle Pattern',
      description:
        'Step-by-step guide to trading triangle patterns in technical analysis',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Pattern Identification',
          text: 'Locate a narrowing price range on the chart with at least four boundary touch points. Determine triangle type: ascending, descending, or symmetrical.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Volume Analysis',
          text: 'Confirm that trading volumes decline as the triangle forms. This validates pattern authenticity and energy accumulation for breakout.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Await Breakout',
          text: 'Wait for price to break one triangle boundary with candle closing beyond formation limits. Confirm breakout with increased trading volume.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Position Entry',
          text: 'Enter position in breakout direction. Place stop-loss beyond opposite triangle boundary or last local extremum.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Profit Taking',
          text: 'Calculate target level using triangle height. Consider partial profit taking at intermediate levels for risk reduction.',
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
      '@id': 'https://arapov.trade/en/freestudying/trianglefigure#terms',
      name: 'Triangle Pattern Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ascending Triangle',
          description:
            'A bullish technical analysis pattern with horizontal resistance level and ascending support line, indicating probable upward breakout.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Descending Triangle',
          description:
            'A bearish pattern with horizontal support line and descending resistance line, signaling possible downward breakout.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Symmetrical Triangle',
          description:
            'A neutral pattern with simultaneous convergence of both trend lines, reflecting market force equilibrium with unpredictable breakout direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Breakout',
          description:
            'Price exit beyond triangle boundary with confirmation beyond its limits, signaling the start of a new directional movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Temporary price exit beyond triangle boundary followed by return inside the formation, not leading to directional movement development.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Consolidation',
          description:
            'Period of sideways price movement in narrowing range, characterized by declining volatility and trading volumes.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Retest',
          description:
            'Price return to broken level to test it as new support or resistance after breakout.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Triangle Height',
          description:
            'Distance between upper and lower formation boundaries at its base, used for calculating target movement level after breakout.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
