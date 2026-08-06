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
  selector: 'app-home-en-twenty-four',
  templateUrl: './home-en-twenty-four.component.html',
  styleUrl: './home-en-twenty-four.component.scss',
})
export class HomeEnTwentyFourComponent implements OnInit {
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
      'Fibonacci Levels in Trading: Complete Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to use Fibonacci levels in trading. Retracement, extension, golden ratio — construction, strategies and practical examples.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicstate.webp',
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
            'Fibonacci Levels in Trading: Complete Guide to Application',
          description:
            'Comprehensive guide to Fibonacci levels. Retracement levels (23.6%, 38.2%, 50%, 61.8%, 78.6%), extensions, trading strategies and practical examples from real markets.',
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
            '@id': 'https://arapov.trade/en/freestudying/fibonaccilevels',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/economicstate.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical Analysis',
          keywords:
            'Fibonacci levels, retracement, extension, golden ratio, trading',
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
          name: 'What are Fibonacci levels in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fibonacci levels are a technical analysis tool based on the mathematical Fibonacci number sequence. Key levels (23.6%, 38.2%, 50%, 61.8%, 78.6%) are used to identify support and resistance zones, forecast retracement depth, and find market entry points.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which Fibonacci level is most important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 61.8% level, known as the golden ratio, is considered most significant. It often acts as a strong support or resistance zone. The 50% (psychological) and 38.2% (first significant retracement) levels are also important. Level selection depends on trend strength and market context.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to properly draw Fibonacci levels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To draw Fibonacci levels, select significant extremes — local high and low of a price movement. In an uptrend, draw the tool from low to high; in a downtrend — from high to low. The platform will automatically calculate and display retracement levels.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are Fibonacci extensions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fibonacci extensions are used to determine price movement targets after key level breakouts. Main extension levels: 127.2% (first target), 161.8% (key profit-taking target), 261.8% and 423.6% (for highly volatile markets). They help set take-profit orders.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do Fibonacci levels work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fibonacci levels work due to widespread use by traders, creating a self-fulfilling prophecy effect. Many market participants place orders at these levels, reinforcing their significance. Additionally, Fibonacci numbers reflect natural proportions found in nature and market structures.',
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
      name: 'How to Trade Using Fibonacci Levels',
      description:
        'Step-by-step guide to applying Fibonacci levels for profitable trading in financial markets.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify trend and significant extremes',
          text: 'Find a clear impulse movement on the chart. Identify the local low and high of this movement. For an uptrend, this will be swing low and swing high; for a downtrend — the opposite.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Draw Fibonacci retracement levels',
          text: 'Select the Fibonacci Retracement tool on your trading platform. In an uptrend, draw the line from low to high. The platform will automatically display 23.6%, 38.2%, 50%, 61.8%, and 78.6% levels.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for retracement to key level',
          text: 'Watch for price pullback to Fibonacci levels. Most significant entry zones are 38.2%, 50%, and 61.8%. The 61.8% level (golden ratio) is considered optimal for trend-direction entries.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm signal with additional tools',
          text: 'Look for confirmation: candlestick patterns (pin bar, engulfing), confluence with horizontal levels or moving averages, RSI or MACD indicator signals. A cluster of multiple factors strengthens the signal.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set stop-loss and profit target',
          text: 'Place stop-loss beyond the 78.6% level or local extreme. Use Fibonacci extension levels (161.8%, 261.8%) to determine profit targets. Risk-to-reward ratio should be at least 1:2.',
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
      name: 'Fibonacci Levels Glossary',
      description:
        'Key terms and definitions related to Fibonacci levels in technical analysis',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Fibonacci Sequence',
          description:
            'A mathematical sequence of numbers (0, 1, 1, 2, 3, 5, 8, 13...) where each number is the sum of the two preceding ones. Ratios between numbers form key levels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Golden Ratio (61.8%)',
          description:
            'Key Fibonacci retracement level obtained by dividing a number by its successor in the sequence. Considered the most significant support and resistance level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fibonacci Retracement',
          description:
            'Tool for identifying potential price pullback levels after an impulse move. Main levels: 23.6%, 38.2%, 50%, 61.8%, 78.6%.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fibonacci Extension',
          description:
            'Tool for forecasting price movement targets after a breakout. Main levels: 127.2%, 161.8%, 261.8%, 423.6%.',
        },
        {
          '@type': 'DefinedTerm',
          name: '38.2% Level',
          description:
            'First significant retracement level, often used for entries in strong trends. Shallow pullback indicates strength of the main movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: '50% Level',
          description:
            'Psychologically important level, though not part of the Fibonacci sequence. Price often retraces half of the previous movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: '78.6% Level',
          description:
            'Deep retracement level after which trend reversal probability is high. Used for stop-loss placement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Level Cluster',
          description:
            'Zone where multiple technical levels coincide (Fibonacci, horizontal levels, moving averages), reinforcing the significance of that area.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Impulse Movement',
          description:
            'Strong directional price movement from which Fibonacci levels are drawn to identify potential retracement zones.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Situation when price temporarily breaks through a Fibonacci level but then returns, creating a trap for traders.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
