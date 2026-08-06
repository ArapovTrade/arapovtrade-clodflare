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
  selector: 'app-home-en-eleven',
  templateUrl: './home-en-eleven.component.html',
  styleUrl: './home-en-eleven.component.scss',
})
export class HomeEnElevenComponent implements OnInit {
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
      'How to Start Trading Cryptocurrency: Complete Guide | ArapovTrade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how to start trading cryptocurrency from scratch. Exchange selection, registration, trading strategies, risk management and market analysis.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostart.webp',
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
            'How to Start Trading Cryptocurrency: Complete Guide for Beginners',
          description:
            'Comprehensive guide to starting cryptocurrency trading. Exchange selection, registration, strategies, risk management and market analysis.',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptostart',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostart1.png',
          },
          articleSection: 'Cryptocurrency',
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
          name: 'Which crypto exchange to choose for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For beginners, large exchanges with good reputation are recommended: Binance, Kraken, Coinbase, Bybit. Choose by criteria: security, liquidity, fees, interface convenience and support for needed cryptocurrencies.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much money do I need to start trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "You can start with minimal amounts — from $10-50. Main rule: don't invest more than you're willing to lose. Use demo accounts or small deposits for learning.",
          },
        },
        {
          '@type': 'Question',
          name: 'What strategy is best for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners should start with spot trading without leverage. Strategies: HODL (long-term holding) or swing trading. Avoid scalping and futures at initial stage.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to protect my exchange account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enable two-factor authentication (2FA) via Google Authenticator. Set up anti-phishing code, whitelist addresses for withdrawal and login notifications. Use complex unique passwords.',
          },
        },
        {
          '@type': 'Question',
          name: 'What percentage of capital to risk per trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Golden rule — no more than 1-2% of deposit per trade. With aggressive style 3-5% is allowed, but this significantly increases capital loss risks.',
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
      '@id': 'https://arapov.trade/en/freestudying/cryptostart#howto',
      name: 'How to Start Trading Cryptocurrencies',
      description:
        'Step-by-step guide for beginner traders on how to start trading cryptocurrencies on exchanges',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose a cryptocurrency exchange',
          text: 'Select a reliable exchange with good reputation, high liquidity, and low fees. Recommended: Binance (0.1%), Kraken (0.16-0.26%), Bybit (0.1%), Coinbase.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Registration and verification',
          text: 'Create an account, enter email, create a strong password. Set up 2FA via Google Authenticator. Complete KYC: upload passport, confirm address, take a selfie.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Set up security',
          text: 'Enable anti-phishing code, whitelist addresses for withdrawals, login notifications. Use strong unique passwords.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Fund your account',
          text: 'Choose a method: bank transfer, card (3-5% fee), P2P trading, or transfer from crypto wallet. Start with $10-50 for learning.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Learn the exchange interface',
          text: 'Familiarize yourself with spot trading, charts, order types (market, limit, stop-loss). Practice with minimal amounts.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Choose a trading strategy',
          text: 'For beginners: spot trading without leverage, HODL (Bitcoin, Ethereum), or swing trading. Avoid scalping and futures.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Analyze the market before trading',
          text: 'Identify the trend using moving averages, MACD, ADX. Find support and resistance levels. Check trading volumes.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Open your first trade',
          text: 'Choose a pair (BTC/USDT). Set stop-loss (5-10%) and take-profit (1:2 or 1:3 ratio). Risk no more than 1-2% of deposit.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Risk management',
          text: "Don't risk more than 1-2% per trade. Use stop-loss. Diversify: 50% BTC/ETH, 30% altcoins, 20% stablecoins.",
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Keep a trading journal',
          text: 'Record all trades: date, entry reason, result, mistakes. Regularly analyze statistics and adjust your strategy.',
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
      name: 'Crypto Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'CEX',
          description:
            'Centralized exchange managed by company with high liquidity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Decentralized exchange on smart contracts without intermediaries.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'KYC',
          description: 'User identity verification procedure on exchange.',
        },
        {
          '@type': 'DefinedTerm',
          name: '2FA',
          description: 'Two-factor authentication for account protection.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description:
            'Protective order for automatic closing of losing position.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-profit',
          description: 'Order for automatic profit fixing.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description: 'Long-term cryptocurrency holding strategy.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description: 'Strategy of multiple quick trades with small profit.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing trading',
          description: 'Holding positions from several days to weeks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description: 'Trading volume affecting order execution speed.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
