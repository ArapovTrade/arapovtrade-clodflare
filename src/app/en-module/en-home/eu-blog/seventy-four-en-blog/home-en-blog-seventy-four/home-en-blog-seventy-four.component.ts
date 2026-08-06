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
  selector: 'app-home-en-blog-seventy-four',
  templateUrl: './home-en-blog-seventy-four.component.html',
  styleUrl: './home-en-blog-seventy-four.component.scss',
})
export class HomeEnBlogSeventyFourComponent {
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
      'Global Fundamental Analysis of Currency Markets | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Global fundamental analysis of currency markets: interest rates, inflation, GDP, labor market data, and central bank policies. A comprehensive trading guide.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/globalfundamentalanalysis.webp',
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
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Global Fundamental Analysis of Currency Markets',
          description:
            'Global fundamental analysis of currency markets: interest rates, inflation, GDP, labor market data, and central bank policies. A comprehensive trading guide.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/en/freestudying/globalfundamentalanalysis',
          },
          image:
            'https://arapov.trade/assets/img/content/globalfundamentalanalysis1.png',
          articleSection: 'Trading Education',
          keywords: [
            'fundamental analysis',
            'currency market',
            'interest rates',
            'inflation',
            'central banks',
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
          name: 'What is fundamental analysis in currency trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fundamental analysis in currency trading is a method of evaluating currency values based on macroeconomic indicators: interest rates, inflation, GDP, unemployment levels, and central bank policies. Unlike technical analysis, fundamental analysis examines the underlying causes of exchange rate movements.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do interest rates affect currency exchange rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Higher interest rates make a currency more attractive to investors because deposits and bonds yield greater returns. This increases demand for the currency and strengthens its exchange rate. Lower rates have the opposite effect, weakening the currency.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is inflation important for forex traders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "High inflation reduces a currency's purchasing power and its attractiveness to investors. Central banks respond to inflation by adjusting interest rates, which directly impacts exchange rates. Traders monitor CPI and PPI to anticipate regulatory actions.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which employment data impacts currency markets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The key report is Non-Farm Payrolls (NFP) in the United States. Unemployment rate, average hourly earnings, and jobless claims are also important. A strong labor market strengthens the currency, while a weak one weakens it.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does trade balance affect national currency value?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A positive trade balance (exports exceeding imports) creates demand for the national currency from foreign buyers, strengthening it. A trade deficit weakens the currency as the country needs more foreign currency to pay for imports.',
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
      name: 'How to Apply Fundamental Analysis to Currency Markets',
      description:
        'Step-by-step guide for using macroeconomic data to make trading decisions in currency markets',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Study the economic calendar',
          text: 'Track the schedule of key macroeconomic releases: rate decisions, inflation data, GDP, NFP. Plan your trading around these events.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze forecast vs actual discrepancies',
          text: 'Compare actual data with analyst consensus forecasts. Strong discrepancies cause sharp currency movements. Beating expectations typically strengthens a currency.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Monitor central bank policies',
          text: 'Study meeting minutes from the Fed, ECB, and Bank of England. Hawkish or dovish rhetoric signals future rate changes and currency direction.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Combine with technical analysis',
          text: 'Use fundamental analysis for trend direction and technical analysis for entry and exit points. This improves trading decision quality.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Evaluate cross-market correlations',
          text: 'Study relationships between currencies, commodities, and bonds. For example, rising oil prices often strengthen the Canadian dollar, while falling bond yields weaken currencies.',
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
      name: 'Currency Market Fundamental Analysis Terms',
      description: 'Glossary of key concepts in global fundamental analysis',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental Analysis',
          description:
            "A method of evaluating currency value based on macroeconomic indicators, political events, and a country's economic condition",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Interest Rate',
          description:
            'The rate at which a central bank lends to commercial banks. A key monetary policy tool affecting currency exchange rates',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Inflation',
          description:
            "A sustained increase in the general price level of goods and services, reducing a currency's purchasing power",
        },
        {
          '@type': 'DefinedTerm',
          name: 'GDP (Gross Domestic Product)',
          description:
            'The total value of all goods and services produced in a country over a specific period. The primary indicator of economic growth',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Farm Payrolls (NFP)',
          description:
            'A monthly report on the number of employed persons in the US non-agricultural sector. The most important labor market indicator',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CPI (Consumer Price Index)',
          description:
            'An indicator measuring price changes in a basket of consumer goods and services. The main inflation metric',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Carry Trade',
          description:
            'A strategy where a trader borrows a low-rate currency and invests in a high-rate currency to profit from the yield differential',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trade Balance',
          description:
            "The difference between a country's exports and imports. A positive balance strengthens the currency, a negative one weakens it",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Quantitative Easing (QE)',
          description:
            'An unconventional monetary policy where a central bank purchases assets to increase money supply and stimulate the economy',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Balance of Payments',
          description:
            'A statistical report reflecting all economic transactions between a country and the rest of the world over a specific period',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
