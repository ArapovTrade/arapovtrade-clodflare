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
  selector: 'app-home-en-twenty-three',
  templateUrl: './home-en-twenty-three.component.html',
  styleUrl: './home-en-twenty-three.component.scss',
})
export class HomeEnTwentyThreeComponent implements OnInit {
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
      'World Stock Market Indices: Complete Guide | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn about key world stock indices: S&P 500, Dow Jones, NASDAQ, DAX, FTSE 100, Nikkei 225. How they work and influence markets.',
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
            'World Stock Market Indices: Complete Overview and Market Impact',
          description:
            'Detailed overview of key world stock indices. American, European and Asian indices, their structure, features and impact on global markets.',
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
            '@id': 'https://arapov.trade/en/freestudying/worldstockindicates',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/worldstockindicates.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Stock Market',
          keywords: 'stock indices, S&P 500, Dow Jones, NASDAQ, DAX, FTSE 100',
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
          name: 'What is a stock index?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A stock index is a weighted average indicator of stock prices included in its composition. It reflects the state of a specific group of companies or economic sector and allows assessing overall market dynamics.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which index is considered the main indicator of the US economy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'S&P 500 is considered the most objective indicator of the US economy as it includes 500 largest corporations from all key sectors: technology, healthcare, finance, consumer goods and other industries.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between Dow Jones and S&P 500?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dow Jones includes only 30 largest companies and is a price-weighted index. S&P 500 includes 500 companies and is weighted by market capitalization, making it more representative.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which index reflects the technology sector?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "NASDAQ-100 focuses on high-tech company stocks, including Apple, Amazon, Google, Microsoft, Tesla and other innovative corporations. It's the main technology sector indicator.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do stock indices influence markets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stock indices serve as economic barometers and influence investor sentiment. Rising indices attract capital, falling indices cause outflow to safe-haven assets. Indices also affect currency exchange rates and commodity markets.',
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
      '@id': 'https://arapov.trade/en/freestudying/worldstockindicates#howto',
      name: 'How to Analyze World Stock Market Indices',
      description:
        'Step-by-step guide to analyzing and using global stock indices in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn the Structure of Major Indices',
          text: 'Familiarize yourself with the composition of key indices: S&P 500 (500 largest US companies), Dow Jones (30 blue-chip stocks), NASDAQ (technology sector), DAX (40 German companies), FTSE 100 (British companies), Nikkei 225 (Japanese companies).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Understand Weighting Methods',
          text: 'Distinguish between market capitalization weighting (S&P 500, DAX) and price weighting (Dow Jones). Different methods reflect the impact of individual companies on the index differently.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Monitor Macroeconomic Indicators',
          text: 'Analyze GDP, inflation, interest rates, and employment for each region. These factors directly influence the movement of regional indices.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze Correlations Between Indices',
          text: 'Track how American indices move when Asian and European markets open. They usually move in the same direction, but divergences can develop.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use Indices in Your Trading Strategy',
          text: 'Apply indices as a trend confirmation tool and gauge overall market sentiment. Trade individual stocks while considering the direction of the index movement.',
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
      name: 'Stock Indices Glossary',
      description:
        'Key terms and definitions related to world stock market indices',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stock Index',
          description:
            'Statistical indicator reflecting changes in value of a group of securities united by a specific criterion.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'S&P 500',
          description:
            'American stock index including 500 largest US public companies weighted by market capitalization.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dow Jones Industrial Average',
          description:
            'One of the oldest American indices including 30 largest US industrial corporations.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NASDAQ-100',
          description:
            'Index tracking 100 largest non-financial companies traded on NASDAQ exchange, predominantly technology sector.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DAX',
          description:
            'German stock index including 40 largest German companies traded on Frankfurt Stock Exchange.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FTSE 100',
          description:
            'British stock index of 100 largest companies traded on London Stock Exchange.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Nikkei 225',
          description:
            'Japanese stock index including 225 largest companies traded on Tokyo Stock Exchange.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CAC 40',
          description:
            'French stock index of 40 largest companies by market capitalization on Euronext Paris.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Capitalization',
          description:
            'Total value of all issued company shares calculated as share price multiplied by shares outstanding.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price-Weighted Index',
          description:
            'Index type where company weight is determined by its share price rather than market capitalization.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
