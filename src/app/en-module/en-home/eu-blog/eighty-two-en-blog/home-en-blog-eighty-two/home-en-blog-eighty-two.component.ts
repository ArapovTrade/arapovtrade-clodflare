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
  selector: 'app-home-en-blog-eighty-two',
  templateUrl: './home-en-blog-eighty-two.component.html',
  styleUrl: './home-en-blog-eighty-two.component.scss',
})
export class HomeEnBlogEightyTwoComponent {
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
      'Flag and Pennant Patterns in Trading | Trend Continuation Patterns',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to trading Flag and Pennant patterns. Learn how to identify trend continuation patterns, determine entry points and set stop-loss and take-profit levels.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagandpennant.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Flag and Pennant: How to Trade After an Impulse?',
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
          headline: 'Flag and Pennant Patterns in Trading — Complete Guide',
          description:
            'Complete guide to trading Flag and Pennant patterns. Learn how to identify trend continuation patterns, determine entry points and set stop-loss and take-profit levels.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          image: [
            'https://arapov.trade/assets/img/content/flagandpennant.webp',
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/flagandpennant',
          },
          articleSection: 'Trading',
          keywords: [
            'flag pattern',
            'pennant pattern',
            'continuation patterns',
            'technical analysis',
            'breakout',
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
          name: 'What are Flag and Pennant patterns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Flag and Pennant are classic trend continuation patterns that form after strong impulsive price movements. A Flag appears as a tilted rectangular channel, while a Pennant forms a symmetrical converging triangle. Both patterns signal a pause in the trend before continuation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you distinguish a Flag from a Pennant on a chart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Flag forms a parallel channel tilted against the main trend, while a Pennant creates a symmetrical triangle with converging lines. Flags typically have longer consolidation phases, while Pennants are characterized by rapid narrowing of the price range.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can you identify a genuine pattern breakout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A genuine breakout is confirmed by increased trading volume, candle closing beyond pattern boundaries, and absence of quick price return into the pattern. Additional confirmation comes from RSI, MACD indicators, and moving averages.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you calculate profit targets for Flag and Pennant patterns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Target levels are calculated using the flagpole method: the height of the impulsive move preceding the pattern is projected from the breakout point in the trend direction. Additional targets can be identified using Fibonacci extension levels at 161.8% and 261.8%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where should stop-loss be placed when trading Flag and Pennant patterns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For bullish patterns, stop-loss is placed below the lower pattern boundary or beneath the last local minimum. For bearish patterns — above the upper boundary or last maximum. Using the ATR indicator to account for volatility is recommended.',
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
      name: 'How to Trade Flag and Pennant Patterns',
      description: 'Step-by-step guide to trading trend continuation patterns',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the Impulse',
          text: 'Find a strong directional price movement (flagpole) that precedes pattern formation. This move establishes the trend context.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Recognize the Pattern',
          text: 'Determine the pattern type: Flag forms a tilted channel against the trend, Pennant forms a symmetrical converging triangle. Note the declining volume during consolidation.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for Breakout',
          text: 'Wait for price to exit pattern boundaries in the main trend direction. Ensure the breakout is accompanied by volume increase.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm the Signal',
          text: 'Verify candle closes beyond pattern boundaries. Use RSI, MACD indicators for additional confirmation of movement direction.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Enter and Manage Position',
          text: 'Enter the trade after breakout confirmation. Set stop-loss beyond pattern boundary and take-profit at a level equal to flagpole height from the breakout point.',
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
      name: 'Flag and Pennant Pattern Terminology',
      description: 'Essential terms for trading trend continuation patterns',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Flag Pattern',
          description:
            'A trend continuation pattern appearing as a tilted rectangular channel following an impulsive move',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pennant Pattern',
          description:
            'A trend continuation pattern forming a symmetrical converging triangle after an impulsive move',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flagpole',
          description:
            'The impulsive price movement preceding the formation of a Flag or Pennant pattern',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Consolidation Phase',
          description:
            'A period of temporary pause in price movement during which the pattern body forms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pattern Breakout',
          description:
            'Price exiting pattern boundaries in the direction of the main trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A brief price exit beyond pattern boundaries followed by return inside the formation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flagpole Method',
          description:
            'A technique for calculating profit targets by projecting impulse move height from breakout point',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Confirmation',
          description:
            'Increased trading volume during breakout confirming the validity of the move',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Continuation Pattern',
          description:
            'A chart pattern signaling a pause in trend followed by continuation of movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — an indicator measuring volatility to help set appropriate stop levels',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
