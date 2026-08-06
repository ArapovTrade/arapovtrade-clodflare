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
  selector: 'app-home-en-sixteen',
  templateUrl: './home-en-sixteen.component.html',
  styleUrl: './home-en-sixteen.component.scss',
})
export class HomeEnSixteenComponent implements OnInit {
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
      'Ethereum: How It Works and Why It Matters | Complete Guide',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to Ethereum: how the second-largest cryptocurrency works, smart contracts, DeFi ecosystem, NFTs, and the transition to Proof-of-Stake. Everything about ETH technology and prospects.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ethereum.webp',
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
            '@id': 'https://arapov.trade/en/freestudying/ethereum',
          },
          headline:
            'Ethereum: How It Works and Why It Matters — Complete Guide to ETH Technology',
          description:
            'Complete guide to Ethereum: how the second-largest cryptocurrency works, smart contracts, DeFi ecosystem, NFTs, and the transition to Proof-of-Stake.',
          image: 'https://arapov.trade/assets/img/content/ethereum1.png',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'How does Ethereum fundamentally differ from Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin was created as digital gold and store of value with limited supply. Ethereum is a programmable platform with smart contracts, enabling creation of decentralized applications, tokens, DeFi protocols, and NFTs. Essentially, Bitcoin is money, while Ethereum is a decentralized computer.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are smart contracts and how do they work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart contracts are blockchain programs that automatically execute when predefined conditions are met. Written in Solidity and running on the Ethereum Virtual Machine (EVM), their code becomes immutable after deployment and executes without intermediaries.',
          },
        },
        {
          '@type': 'Question',
          name: "What changed after Ethereum's transition to Proof-of-Stake?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Merge update in 2022 replaced energy-intensive mining (Proof-of-Work) with staking (Proof-of-Stake). Network energy consumption dropped by 99.9%, miners gave way to validators, and participation now requires staking minimum 32 ETH instead of purchasing expensive equipment.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are Ethereum network fees sometimes so high?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fees (gas fees) are determined by demand for block space. During high activity (popular NFT launches, market volatility), users compete for transaction inclusion, driving prices up. Layer 2 solutions (Optimism, Arbitrum) and future sharding aim to reduce main network load.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tokens operate on the Ethereum network?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Thousands of ERC-20 standard tokens run on Ethereum: stablecoins (USDT, USDC, DAI), DeFi protocol tokens (UNI, AAVE, COMP), oracle networks (LINK), gaming tokens, and many more. Most crypto projects launch on Ethereum due to its developed infrastructure.',
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
      name: 'How to Get Started with Ethereum',
      description:
        'Step-by-step guide for beginners on using Ethereum and its ecosystem.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Create a Cryptocurrency Wallet',
          text: 'Install a non-custodial wallet (MetaMask, Trust Wallet) for storing ETH and interacting with decentralized applications. Record your seed phrase and store it securely offline.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Acquire ETH',
          text: 'Purchase Ethereum on a centralized exchange (Binance, Coinbase, Kraken) or through P2P platforms. Transfer ETH to your non-custodial wallet for complete asset control.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Explore the DeFi Ecosystem',
          text: 'Start with simple operations: token swaps on Uniswap, providing liquidity. Always verify smart contracts through audits and use small amounts for initial experiments.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Learn Layer 2 Solutions',
          text: 'To reduce fees, explore L2 networks (Arbitrum, Optimism, Base). Transfer some assets via official bridges and use DeFi applications with minimal gas costs.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Participate in Staking (Optional)',
          text: 'With 32 ETH, you can become a validator directly. For smaller amounts, liquid staking through Lido or Rocket Pool allows earning rewards without locking the full amount.',
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
      name: 'Ethereum Terminology Glossary',
      description:
        'Essential terms from the Ethereum ecosystem and blockchain technology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Contract',
          description:
            'A blockchain program that automatically executes when predefined conditions are met without intermediary involvement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Decentralized Finance — an ecosystem of blockchain-based financial services operating without traditional intermediaries.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFT',
          description:
            'Non-Fungible Token — a unique digital asset confirming ownership rights to an object.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gas',
          description:
            'Unit measuring computational resources required for executing operations on the Ethereum network.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EVM',
          description:
            'Ethereum Virtual Machine — the virtual machine executing smart contract code on the Ethereum network.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake',
          description:
            'Consensus mechanism where validators confirm transactions by locking cryptocurrency as collateral.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Staking',
          description:
            'Process of locking cryptocurrency to participate in network security and earn rewards.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sharding',
          description:
            'Technology splitting blockchain into parallel segments to increase throughput capacity.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Layer 2',
          description:
            'Second layer solutions — protocols processing transactions outside the main network to reduce load and fees.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ERC-20',
          description:
            'Technical standard for creating fungible tokens on the Ethereum blockchain.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
