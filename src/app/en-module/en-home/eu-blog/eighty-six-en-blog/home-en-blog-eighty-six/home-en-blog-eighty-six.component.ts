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
  selector: 'app-home-en-blog-eighty-six',
  templateUrl: './home-en-blog-eighty-six.component.html',
  styleUrl: './home-en-blog-eighty-six.component.scss',
})
export class HomeEnBlogEightySixComponent {
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
      'Pattern 123 in Trading: Complete Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to trade Pattern 123. Formation of points 1-2-3, entry signals, stop-loss, take-profit and common trader mistakes.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-23' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pattern-1-2-3.png',
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
          headline: 'Pattern 123 in Trading: Complete Trading Guide',
          description:
            'Comprehensive guide to Pattern 123. Model formation, entry and exit points, stop-loss and take-profit placement, typical trader mistakes.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-11T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/pattern-1-2-3',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pattern-1-2-3.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical Analysis',
          keywords:
            'pattern 123, 123 formation, trend reversal, level breakout',
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
          name: 'What is Pattern 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pattern 123 is a universal technical analysis model consisting of three sequential points: local extreme (point 1), correction level (point 2), and potential reversal zone (point 3). Breaking through point 2 level serves as the main trading signal.',
          },
        },
        {
          '@type': 'Question',
          name: 'When to enter a trade using Pattern 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Optimal entry is after confirmed breakout of point 2 level with increased volume. Conservative approach involves waiting for candle close beyond the level, aggressive — entry on level touch. Best opportunity is retest of point 2 after breakout.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where to place stop-loss?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop-loss is placed beyond point 3: below point 3 for buys, above point 3 for sells. You can also use ATR indicator to calculate adaptive stop based on volatility or dynamic trailing stop.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to calculate profit target?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Take-profit is determined several ways: nearest support/resistance level, pattern height projection (distance from point 1 to point 2 projected from breakout point), or partial close with trailing stop.',
          },
        },
        {
          '@type': 'Question',
          name: 'On which timeframes does Pattern 123 work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pattern 123 works on any timeframes from M1 to D1 and higher. Most reliable signals appear on higher timeframes (H1, H4, D1). On lower timeframes the pattern suits scalping, on higher — medium-term trading.',
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
      name: 'How to Trade Pattern 123',
      description:
        'Step-by-step guide to trading the 123 reversal pattern in financial markets.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify point 1',
          text: 'Find a local extreme after a trend move: high in a downtrend or low in an uptrend. This is the first pattern point marking potential completion of the current impulse.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Determine point 2',
          text: 'After point 1, price makes a correction forming point 2 — an important support or resistance level. This level becomes key for determining trade entry moment.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for point 3 formation',
          text: "Price makes another move but doesn't exceed point 1 extreme. Point 3 forms between points 1 and 2. Reversal candlestick patterns at point 3 strengthen the signal.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Enter trade on point 2 breakout',
          text: 'Open position after candle closes beyond point 2 level with volume increase confirmation. To reduce risk, wait for retest of the broken level.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set stop-loss and take-profit',
          text: 'Place stop-loss beyond point 3. Determine take-profit at nearest level or using pattern height projection. Consider partial position close with trailing stop.',
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
      name: 'Pattern 123 Glossary',
      description:
        'Key terms and definitions related to the 123 reversal pattern',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Pattern 123',
          description:
            'Universal technical analysis model of three points signaling trend reversal or continuation.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point 1',
          description:
            'Local price extreme — high in downtrend or low in uptrend, marking pattern start.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point 2',
          description:
            'Correction level after point 1 forming key support or resistance level. Breaking this level is the main trading signal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point 3',
          description:
            "Potential reversal zone that doesn't exceed point 1 extreme, confirming current trend weakening.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Level Breakout',
          description:
            'Moment when price overcomes point 2 level, confirming trend change and giving signal to open position.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Retest',
          description:
            'Price return to broken point 2 level to test it in new role — as support or resistance.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Situation when price breaks point 2 level but then returns, not confirming reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Conservative Entry',
          description:
            'Trade entry method after candle closes beyond point 2 level with volume confirmation.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Aggressive Entry',
          description:
            'Trade entry method on point 2 level touch without waiting for candle close confirmation.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description:
            'Dynamic stop-loss that moves with price movement, protecting accumulated profit.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
