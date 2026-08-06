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
  selector: 'app-home-en-blog-eighty',
  templateUrl: './home-en-blog-eighty.component.html',
  styleUrl: './home-en-blog-eighty.component.scss',
})
export class HomeEnBlogEightyComponent {
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
      'Head and Shoulders Pattern: Complete Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to trade the Head and Shoulders pattern. Classic and inverse formations, entry points, stop-loss, take-profit and real examples.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/headandshoulders.png',
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
          headline: 'Head and Shoulders Pattern: Complete Trading Guide',
          description:
            'Comprehensive guide to the Head and Shoulders pattern. Classic and inverse formations, entry signals, stop-loss and take-profit placement, combining with indicators.',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/headandshoulders',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/headandshoulders1.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical Analysis',
          keywords: 'head and shoulders, reversal pattern, neckline, trading',
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
          name: 'What is the Head and Shoulders pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Head and Shoulders is a reversal chart pattern that forms at the top of an uptrend. It consists of three peaks: left shoulder, head (highest point), and right shoulder. A neckline breakout signals a trend reversal to the downside.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to identify the neckline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The neckline is a support level connecting the lows between the left shoulder and head, and between the head and right shoulder. It can be horizontal or sloping. Breaking this line is the main signal to enter a trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where to place stop-loss when trading the pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop-loss is placed above the right shoulder (conservative approach) or above the head (wider stop). You can also use the ATR indicator to calculate an adaptive stop based on current market volatility.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Inverse Head and Shoulders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Inverse Head and Shoulders is a mirror version of the pattern forming at the bottom of a downtrend. It consists of three troughs: left shoulder, head (lowest point), and right shoulder. An upward neckline breakout signals a reversal to growth.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to calculate the profit target?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The profit target is calculated using the symmetry rule: measure the distance from the head to the neckline and project it from the breakout point in the trade direction. This distance is the minimum price movement target after breakout.',
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
      name: 'How to Trade the Head and Shoulders Pattern',
      description:
        'Step-by-step guide to trading the Head and Shoulders reversal formation in financial markets.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify the pattern on the chart',
          text: 'Find three consecutive peaks after an uptrend: left shoulder, head (highest point), and right shoulder (lower than head). Draw the neckline through the lows between the peaks.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Wait for neckline breakout',
          text: 'Do not enter prematurely. Wait for a candle close below the neckline with confirmation of increased trading volume. This is the main signal to open a short position.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Confirm signal with additional indicators',
          text: 'Check for divergence on RSI or MACD, evaluate volume on breakout. If the neckline coincides with a horizontal support level, the signal is strengthened.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set stop-loss',
          text: 'Place stop-loss above the right shoulder or use ATR for adaptive stop calculation. A stop that is too tight may result in premature position closure.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Determine profit target',
          text: 'Measure the height from the head to the neckline and project this distance downward from the breakout point. Consider partial position closure at 50% of the target move.',
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
      name: 'Head and Shoulders Pattern Glossary',
      description:
        'Key terms and definitions related to the Head and Shoulders reversal pattern',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Head and Shoulders',
          description:
            'A reversal chart pattern consisting of three peaks, signaling a change from an uptrend to a downtrend.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Neckline',
          description:
            'A support level connecting the lows between the pattern peaks. Breaking the neckline is the main entry signal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Left Shoulder',
          description:
            'The first peak of the pattern, forming after an upward move, followed by a downward correction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Head',
          description:
            'The central and highest peak of the pattern, reflecting the last impulse of the uptrend before reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Right Shoulder',
          description:
            'The third peak of the pattern, positioned lower than the head, confirming buyer weakness.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Inverse Head and Shoulders',
          description:
            'A mirror version of the pattern forming at the bottom of a downtrend, signaling a reversal to upward movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Neckline Retest',
          description:
            'Price return to the neckline after breakout to test it as a new resistance or support level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'A situation where price breaks the neckline but then returns, not confirming the trend reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pattern Height',
          description:
            'The distance from the head peak to the neckline, used to calculate minimum movement target after breakout.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Breakout Volume',
          description:
            'Increased trading volume during neckline breakout, confirming signal strength and large player participation.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
