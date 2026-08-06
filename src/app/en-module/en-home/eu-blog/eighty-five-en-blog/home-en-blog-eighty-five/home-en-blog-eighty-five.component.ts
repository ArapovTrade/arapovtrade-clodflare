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
  selector: 'app-home-en-blog-eighty-five',
  templateUrl: './home-en-blog-eighty-five.component.html',
  styleUrl: './home-en-blog-eighty-five.component.scss',
})
export class HomeEnBlogEightyFiveComponent {
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
      'Double Top and Double Bottom Patterns in Trading | Reversal Patterns',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to trading Double Top and Double Bottom patterns. Learn how to identify reversal formations, determine entry points, and manage risk effectively.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
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
            'Double Top and Double Bottom — Reversal Patterns in Trading',
          description:
            'Complete guide to trading Double Top and Double Bottom patterns. Learn how to identify reversal formations, determine entry points, and manage risk effectively.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/doubletopandbottom.png',
            width: 1200,
            height: 630,
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/doubletopandbottom',
          },
          articleSection: 'Trading',
          keywords: [
            'double top',
            'double bottom',
            'reversal patterns',
            'neckline',
            'technical analysis',
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
          name: 'What is a Double Top pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Double Top is a reversal pattern forming after an uptrend. It consists of two consecutive peaks at approximately the same level with an intermediate pullback. A downward break of the neckline confirms the reversal and signals the beginning of a downward movement.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a Double Bottom pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Double Bottom is a reversal pattern appearing after a downtrend. It consists of two consecutive lows at approximately the same level with an intermediate bounce upward. An upward break of the neckline confirms the reversal and signals the beginning of an upward movement.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you identify the neckline in these patterns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The neckline is drawn through the local minimum between the two peaks (for double top) or through the local maximum between the two lows (for double bottom). Breaking this line is the key signal for trade entry.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you calculate price targets after a breakout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The minimum target is calculated by projecting the pattern height from the neckline breakout point. Pattern height is the distance from the peak (or bottom) to the neckline. Additional targets are determined using support and resistance levels.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which indicators help confirm the pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Confirmation uses volume (increase on neckline break), RSI (divergence at second extreme), MACD (line crossover in reversal direction). Candlestick patterns at the second extreme also strengthen the signal.',
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
      name: 'How to Trade Double Top and Double Bottom Patterns',
      description: 'Step-by-step guide to trading reversal patterns',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the Trend',
          text: 'Ensure a defined trend exists before pattern formation — uptrend for double top or downtrend for double bottom.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Recognize the Formation',
          text: 'Identify two consecutive extremes at approximately the same level with an intermediate pullback. Draw the neckline through the point between extremes.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for Breakout',
          text: 'Wait for a confident neckline break with candle closing beyond it. Ensure volume increases during the breakout.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm the Signal',
          text: 'Use additional indicators: RSI divergence, MACD signals, candlestick patterns. Entry on neckline retest after breakout is possible.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage the Position',
          text: 'Set stop-loss beyond the second extreme of the pattern. Calculate target as pattern height projection from breakout point.',
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
      name: 'Double Top and Double Bottom Pattern Terminology',
      description: 'Essential terms for trading reversal patterns',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Double Top',
          description:
            'A reversal pattern with two consecutive peaks at the same level signaling the end of an uptrend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Double Bottom',
          description:
            'A reversal pattern with two consecutive lows at the same level signaling the end of a downtrend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Neckline',
          description:
            'A horizontal level drawn through the point between two pattern extremes, whose break confirms the reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Reversal Pattern',
          description:
            'A chart formation signaling probable end of current trend and beginning of opposite movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Neckline Retest',
          description:
            'Price returning to the broken neckline to test it before continuing the movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Divergence',
          description:
            'Discrepancy between price movement and indicator readings often preceding reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Height Projection',
          description:
            'Method of calculating target level by measuring pattern height from breakout point',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Brief price exit beyond neckline followed by return, not confirming reversal',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Extreme Symmetry',
          description:
            'Correspondence of two peaks or two lows levels increasing pattern reliability',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Confirmation',
          description:
            'Increased trading volume during neckline break confirming reversal validity',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
