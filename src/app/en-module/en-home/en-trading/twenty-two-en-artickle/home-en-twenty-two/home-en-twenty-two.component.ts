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
  selector: 'app-home-en-twenty-two',
  templateUrl: './home-en-twenty-two.component.html',
  styleUrl: './home-en-twenty-two.component.scss',
})
export class HomeEnTwentyTwoComponent implements OnInit {
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
      'Economic Factors in Trading | Impact on Currency Rates',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to economic factors affecting currency exchange rates. Learn about the role of central banks, macroeconomic indicators, inflation, and commodity markets.',
    });
    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicfactors.webp',
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
            'Economic Factors and Their Impact on Currency Exchange Rates',
          description:
            'Complete guide to economic factors affecting currency exchange rates. Learn about the role of central banks, macroeconomic indicators, inflation, and commodity markets.',
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
          image: 'https://arapov.trade/assets/img/content/economicfactors.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/econimicfactors',
          },
          articleSection: 'Trading',
          keywords: [
            'economic factors',
            'currency rates',
            'central banks',
            'interest rates',
            'inflation',
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
          name: 'How do interest rates affect currency exchange rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Central bank interest rate increases make the currency more attractive to investors by raising asset yields denominated in that currency. This stimulates capital inflows and strengthens the exchange rate. Rate cuts have the opposite effect — the currency weakens.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which macroeconomic indicators are important for the forex market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key indicators include GDP (economic growth), inflation levels (CPI, PPI), labor market data (unemployment, Non-Farm Payrolls), trade balance, and the PMI business activity index. These data points shape expectations regarding monetary policy.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do oil prices affect currencies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rising oil prices strengthen currencies of exporting countries (CAD, RUB, NOK) as they increase export revenues. For importing countries (JPY, INR), higher oil prices create currency pressure due to increased import costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is quantitative easing and how does it affect exchange rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quantitative easing (QE) is a central bank program of asset purchases to increase money supply and stimulate the economy. QE typically weakens the currency as it increases supply in the market and lowers interest rates.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do geopolitical events affect currency exchange rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Political instability, conflicts, sanctions, and trade wars create market uncertainty. Investors move capital to safe-haven assets (USD, CHF, JPY, gold), strengthening these currencies while weakening those of affected countries.',
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
      name: 'How to Analyze Economic Factors for Currency Trading',
      description:
        'Step-by-step guide to fundamental analysis of the forex market',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Monitor the Economic Calendar',
          text: 'Track the schedule of key economic data releases: rate decisions, inflation data, GDP, employment. Plan trading around these events.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze Central Bank Policy',
          text: 'Study central bank statements and meeting minutes. Determine the direction of monetary policy: tightening or easing.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Evaluate Macroeconomic Indicators',
          text: 'Compare actual data with analyst forecasts. Significant deviations from expectations cause strong market movements.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Consider Inter-market Relationships',
          text: 'Analyze correlations between currencies, commodity markets, and stock indices. Understanding these connections improves forecast quality.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Form Trading Decisions',
          text: 'Integrate fundamental analysis with technical analysis. Use economic data to determine direction and technical analysis for entry points.',
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
      name: 'Economic Factors Terminology',
      description:
        'Essential terms for fundamental analysis of the forex market',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Interest Rate',
          description:
            'The base rate set by the central bank that determines borrowing costs in the economy',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Quantitative Easing',
          description:
            'A central bank program of asset purchases to increase money supply',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Inflation',
          description:
            'Rise in general price levels for goods and services reducing currency purchasing power',
        },
        {
          '@type': 'DefinedTerm',
          name: 'GDP',
          description:
            'Gross Domestic Product — measure of total value of goods and services produced in a country',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Farm Payrolls',
          description:
            'Number of new jobs in the non-agricultural sector of the United States',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trade Balance',
          description:
            'Difference between exports and imports of goods and services for a country',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Consumer Price Index',
          description:
            'CPI — measure of price changes for consumer goods and services',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PMI',
          description:
            'Purchasing Managers Index reflecting sentiment in the manufacturing sector',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Money Supply',
          description:
            'Total amount of monetary assets circulating in the economy',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Safe-Haven Asset',
          description:
            'An asset into which investors move capital during periods of uncertainty',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
