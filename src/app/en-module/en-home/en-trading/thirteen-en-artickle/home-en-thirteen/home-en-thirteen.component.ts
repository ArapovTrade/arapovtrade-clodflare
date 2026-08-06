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
  selector: 'app-home-en-thirteen',
  templateUrl: './home-en-thirteen.component.html',
  styleUrl: './home-en-thirteen.component.scss',
})
export class HomeEnThirteenComponent implements OnInit {
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
      'Currency Risk: Complete Guide to Protecting Your Investment Capital | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to manage currency risk in trading and investments. Discover hedging strategies, central bank influence, and practical techniques for protecting your portfolio from exchange rate fluctuations.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/riskCurrencyExchange.webp',
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
            'Currency Risk: Complete Guide to Protecting Your Investment Capital',
          description:
            'Learn how to manage currency risk in trading and investments. Discover hedging strategies, central bank influence, and practical techniques for protecting your portfolio.',
          image:
            'https://arapov.trade/assets/img/content/riskCurrencyExchange1.webp',
          datePublished: '2026-03-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/en/freestudying/riskcurrencyexchange',
          },
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
          name: 'What is currency risk in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Currency risk is the potential for financial loss due to exchange rate changes. If you hold assets in foreign currency and the exchange rate moves against you, your investment loses value when converted back to your home currency.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can individual investors hedge currency risk?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Individual investors can use currency-hedged ETFs, diversify across multiple currencies, open foreign currency accounts, or use forward contracts through some banks. The simplest approach is maintaining a balanced portfolio across several stable currencies.',
          },
        },
        {
          '@type': 'Question',
          name: 'What factors influence exchange rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Exchange rates are driven by central bank interest rate decisions, economic indicators like GDP and inflation, geopolitical events, trade balances, capital flows, and market sentiment.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is leverage dangerous in forex trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leverage amplifies both gains and losses. With 100:1 leverage, a 1% move against your position wipes out 100% of your capital. Beginners should use leverage no higher than 10:1 or 20:1 and always implement stop-losses.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do central banks affect currency values?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Central banks influence currencies through interest rate changes, foreign exchange interventions, open market operations, and monetary policy. Even verbal guidance from central bank officials can trigger significant market moves.',
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
      name: 'How to Build Currency Risk Protection',
      description:
        'Step-by-step guide to creating a currency strategy for capital protection',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Assess your currency exposure',
          text: 'Calculate what portion of your assets, income, and liabilities are denominated in foreign currencies. Estimate potential losses if exchange rates move 20-30% against you.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Build a currency basket',
          text: 'Distribute funds across several currencies. Typical allocation: 30-40% US dollar, 20-30% euro, 20% local currency for expenses, 10-20% other stable currencies.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Set rebalancing rules',
          text: 'Determine at what deviation from target proportions you will rebalance. Common threshold is a 5-10 percentage point shift in allocation.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Implement natural hedging',
          text: 'If you have income in a foreign currency, try to match expenses in the same currency. This automatically reduces your net exposure without additional costs.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Monitor macroeconomic indicators',
          text: 'Track central bank decisions, inflation data, trade balances, and foreign reserves. These metrics signal future currency movements.',
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
      name: 'Currency Risk Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Currency Risk',
          description:
            'The potential for financial loss due to exchange rate fluctuations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hedging',
          description:
            'Strategy to protect against price movements using derivative instruments',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Forward Contract',
          description:
            'Agreement to exchange currency at a fixed rate on a future date',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'Borrowed funds from a broker to increase trading position size',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Automatic order to close a position at a predetermined loss level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin Call',
          description:
            'Broker demand to deposit more funds or face position liquidation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description: 'Degree of price variation over a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Diversification',
          description: 'Spreading assets to reduce overall portfolio risk',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Currency Intervention',
          description:
            'Central bank buying or selling currency to influence exchange rates',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Carry Trade',
          description:
            'Strategy of borrowing in low-yield currencies to invest in higher-yield ones',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
