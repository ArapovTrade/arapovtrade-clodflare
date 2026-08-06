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
  selector: 'app-home-en-fourty-six',
  templateUrl: './home-en-fourty-six.component.html',
  styleUrl: './home-en-fourty-six.component.scss',
})
export class HomeEnFourtySixComponent implements OnInit {
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
      'What is Tether (USDT) | Complete Stablecoin Guide',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What is Tether (USDT) and how does the largest stablecoin work. Learn about the dollar peg mechanism, use cases, risks, and future prospects of USDT.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptotether.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/cryptotether',
          },
          headline:
            'What is Tether (USDT): Complete Guide to the Largest Stablecoin',
          description:
            'What is Tether (USDT) and how does the largest stablecoin work. Learn about the dollar peg mechanism, use cases, risks, and future prospects of USDT.',
          image: 'https://arapov.trade/assets/img/content/cryptotether1.webp',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          articleBody:
            'Tether occupies a unique position in the cryptocurrency ecosystem as the bridge connecting the volatile world of digital assets with the stability of traditional currencies...',
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
          name: 'What is Tether (USDT)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tether is a stablecoin pegged to the US dollar at a 1:1 ratio. USDT is used for trading, capital preservation, and transfers, providing stability in the volatile cryptocurrency world.',
          },
        },
        {
          '@type': 'Question',
          name: 'What backs Tether?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'According to Tether Limited, each USDT token is backed by reserves including US dollars, government bonds, commercial paper, and other financial assets.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which blockchains support USDT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'USDT is issued on multiple blockchains including Ethereum, Tron, Solana, Avalanche, Polygon, and others. Network choice affects transaction speed and fee costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What risks are associated with using USDT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key risks include reserve transparency concerns, regulatory pressure, centralized management, and competition from other stablecoins with more transparent structures.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to safely store Tether?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For long-term storage, hardware wallets like Ledger or Trezor are recommended. For active trading, hot wallets like Trust Wallet or MetaMask with mandatory two-factor authentication work well.',
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
      name: 'How to Start Using Tether (USDT)',
      description: 'Step-by-step guide to buying and using the USDT stablecoin',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose an Exchange',
          text: 'Register on a reliable cryptocurrency exchange: Binance, Bybit, OKX, or Kraken. Complete identity verification to access all features.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Fund Your Account',
          text: 'Deposit fiat currency via bank transfer, card, or P2P platform. Alternatively, transfer another cryptocurrency to exchange for USDT.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Purchase USDT',
          text: 'Complete your purchase through the spot market or instant exchange. Select the appropriate blockchain network based on your intended use.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set Up Storage',
          text: 'For active trading, keep USDT on the exchange. For long-term holding, transfer to a hardware wallet and securely store your seed phrase.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use USDT',
          text: 'Apply tokens for trading, transfers, DeFi protocol participation, or as volatility protection during periods of market uncertainty.',
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
      name: 'Tether and Stablecoin Terminology',
      description: 'Key concepts for understanding USDT mechanics',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stablecoin',
          description:
            'Cryptocurrency with a mechanism to maintain stable value, typically pegged to fiat currency or commodity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Peg',
          description:
            'Mechanism maintaining fixed ratio between token value and underlying asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Reserves',
          description:
            'Assets backing issued tokens: currency, bonds, commercial paper',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Multichain',
          description:
            'Token presence on multiple blockchains simultaneously for usage flexibility',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ERC-20',
          description:
            'Technical token standard on Ethereum blockchain that USDT follows on ETH network',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TRC-20',
          description:
            'Token standard on Tron blockchain with low fees and high transaction speed',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Depeg',
          description:
            'Loss of peg to underlying asset when stablecoin price deviates from target value',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tether Limited',
          description:
            'Issuing company managing USDT token issuance, backing, and redemption',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Reserve Attestation',
          description:
            'Independent verification that issued tokens match declared reserve assets',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
