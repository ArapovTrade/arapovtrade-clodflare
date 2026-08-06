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
  selector: 'app-home-en-thirty-three',
  templateUrl: './home-en-thirty-three.component.html',
  styleUrl: './home-en-thirty-three.component.scss',
})
export class HomeEnThirtyThreeComponent implements OnInit {
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
      'Requotes in Trading: What They Are and How to Avoid Them | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Requotes in trading explained — comprehensive guide for beginner traders. Learn why brokers change order prices and effective strategies to minimize requotes impact.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/requotes.webp',
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
          headline: 'Requotes in Trading: What They Are and How to Avoid Them',
          description:
            'Comprehensive guide to requotes for beginner traders. Understand causes, impacts on trading performance, and practical strategies for minimization.',
          image: 'https://arapov.trade/assets/img/content/requotes.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/requotes',
          },
          articleSection: 'Trading Education',
          keywords: [
            'requotes',
            'order execution',
            'broker',
            'volatility',
            'trading',
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
          name: 'What is a requote in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A requote occurs when a broker cannot execute your order at the requested price and offers a new price instead. This happens because market prices change rapidly between the moment you submit an order and when the broker processes it. You can accept the new price or cancel the trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do requotes happen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Main causes of requotes include: high market volatility during news releases, slow internet connection or latency issues, broker's order processing delays, low liquidity of the trading instrument, and the broker's execution model (Dealing Desk brokers tend to produce more requotes than ECN/STP brokers).",
          },
        },
        {
          '@type': 'Question',
          name: 'How can I avoid requotes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "To minimize requotes: choose ECN/STP brokers with fast execution, use pending orders instead of market orders, avoid trading during major news releases, improve your internet connection or use a VPS server near your broker's data center, and trade during high liquidity sessions.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between requote and slippage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A requote asks for confirmation before executing at a different price — you can decline. Slippage automatically executes your order at a different price without asking. With requotes you have a choice; with slippage the trade is already done at the new price.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which broker type is best for avoiding requotes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ECN or STP brokers with direct market access typically provide fewer requotes. Look for brokers regulated by reputable authorities (FCA, ASIC, CySEC), check execution speed reviews, and test the platform on a demo account during volatile periods before trading with real money.',
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
      name: 'How to Minimize Requotes in Trading',
      description:
        'Step-by-step guide to reducing requote frequency when trading financial markets',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select a reliable broker',
          text: 'Research broker reputation, verify regulatory licenses, and choose an ECN or STP account type with direct market access for faster order execution.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Use pending orders',
          text: 'Instead of market orders, use limit and stop orders that execute automatically at predetermined prices without requiring confirmation.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Optimize your connection',
          text: "Use wired ethernet instead of WiFi, consider renting a VPS server located near your broker's data center to minimize transmission delays.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Avoid trading during news',
          text: 'Monitor the economic calendar and refrain from opening positions 5-10 minutes before and after high-impact economic data releases.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Trade during optimal hours',
          text: 'Execute trades during high liquidity periods — the overlap of European and American sessions — while avoiding low-activity night hours and holidays.',
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
      name: 'Trading Terminology Glossary: Requotes',
      description:
        'Essential terms related to requotes and order execution in trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Requote',
          description:
            "A broker's request for price confirmation when the original order price is no longer available due to market movement",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'A statistical measure of price fluctuation intensity for an asset over a specific time period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            "The market's ability to execute large orders quickly without significantly affecting the asset's current price",
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN Broker',
          description:
            'A broker using Electronic Communication Network that provides direct access to interbank market without intermediaries',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dealing Desk',
          description:
            'A broker model where the company acts as counterparty to client trades and processes orders internally',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between expected order execution price and the actual price at which the trade was filled',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VPS Server',
          description:
            'Virtual Private Server used by traders to host trading platforms near broker servers for reduced latency',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pending Order',
          description:
            'A trading instruction to buy or sell at a predetermined price that activates automatically when that price is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the ask (buy) price and bid (sell) price of a financial instrument',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A market participant providing liquidity by simultaneously quoting buy and sell prices for an asset',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
