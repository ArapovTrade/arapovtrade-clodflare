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
  selector: 'app-home-en-blog-seventy-six',
  templateUrl: './home-en-blog-seventy-six.component.html',
  styleUrl: './home-en-blog-seventy-six.component.scss',
})
export class HomeEnBlogSeventySixComponent {
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
      'Gann Method in Trading: Tools and Trading Principles | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to William Gann methods: lines, fan, grid, square of 9. Market analysis principles, time cycles, and rules for successful trading.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
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
          headline: 'Gann Method in Trading: Tools and Trading Principles',
          description:
            'Complete guide to William Gann methods: lines, fan, grid, square of 9. Market analysis principles, time cycles, and rules for successful trading.',
          image: 'https://arapov.trade/assets/img/content/uljamgann1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/williamgannpsychology',
          },
          articleSection: 'Trading Education',
          wordCount: 1540,
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
          name: 'Who was William Gann?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'William Delbert Gann (1878-1955) was a legendary American trader and analyst who developed a unique market forecasting system based on mathematics, geometry, and time cycles. His methods are still used by traders worldwide.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Gann 1x1 line?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Gann 1x1 line is a trend line at a 45° angle that symbolizes equilibrium between price and time. If price is above the line, the trend is bullish; below it, bearish. This is the fundamental tool in Gann methodology.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Gann fan work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Gann fan is a set of lines at different angles (1x1, 2x1, 1x2, etc.) drawn from a single point. Lines serve as dynamic support and resistance levels. When one line breaks, price typically moves toward the next.',
          },
        },
        {
          '@type': 'Question',
          name: "What is Gann's Square of 9?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Square of 9 is a numerical matrix where numbers are arranged in a spiral. It's used to determine key price levels and reversal points. Considered one of the most complex but accurate Gann tools.",
          },
        },
        {
          '@type': 'Question',
          name: 'Are Gann methods still relevant today?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, Gann methods remain relevant. They're based on fundamental principles of price-time relationships that haven't changed. Many professional traders use Gann tools combined with modern analysis methods.",
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
      name: 'How to Apply Gann Methods in Trading',
      description:
        'Step-by-step guide to using William Gann tools for market analysis',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify Significant Extremes',
          text: 'Find important highs and lows on the chart that will become starting points for building Gann tools.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Draw Gann Lines and Fan',
          text: 'Draw a 1x1 line at 45° from the chosen point. Add additional fan lines to determine support and resistance levels.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply Gann Grid',
          text: 'Overlay the grid on the chart to identify time and price proportions. Determine potential reversal zones.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze Time Cycles',
          text: 'Study repeating patterns and market cycles. Use historical data to forecast future movements.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Combine with Other Methods',
          text: 'Combine Gann tools with classical technical analysis, Fibonacci levels, and volume analysis to increase accuracy.',
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
      name: 'Gann Methodology Terms',
      description: "Key concepts and tools of William Gann's theory",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Gann Line',
          description:
            'Trend line at 45° angle symbolizing equilibrium between price and time',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gann Fan',
          description:
            'Set of lines at different angles serving as dynamic support and resistance levels',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gann Grid',
          description:
            'Tool dividing chart into equal intervals by time and price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gann Box',
          description:
            'Geometric figure for determining consolidation zones and time cycles',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Square of 9',
          description:
            'Numerical matrix with spiral number arrangement for determining key levels',
        },
        {
          '@type': 'DefinedTerm',
          name: '1x1 Angle',
          description:
            'Base 45° angle showing uniform price movement relative to time',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Time Cycles',
          description:
            'Repeating periods of market activity used for forecasting',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price-Time Proportions',
          description:
            'Relationship between price movements and time intervals',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Geometry',
          description:
            'Application of geometric forms for price movement analysis',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gann Angles',
          description:
            'System of angles for determining trend strength and key levels',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
