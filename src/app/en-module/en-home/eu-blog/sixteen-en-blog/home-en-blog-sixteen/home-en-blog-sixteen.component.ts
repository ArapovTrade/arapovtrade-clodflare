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
  selector: 'app-home-en-blog-sixteen',
  templateUrl: './home-en-blog-sixteen.component.html',
  styleUrl: './home-en-blog-sixteen.component.scss',
})
export class HomeEnBlogSixteenComponent implements OnInit {
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
      'How to Analyze and Trade Ethereum (ETH) | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What Ethereum is, how smart contracts and dApps work, how ETH differs from bitcoin and what prospects the network has.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

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
          headline: 'Ethereum in Trading: How to Analyze ETH',
          description:
            'What Ethereum is, how smart contracts and dApps work, how ETH differs from bitcoin and what prospects the network has.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/ethereum-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ethereum.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Cryptocurrency',
          keywords: 'ethereum',
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
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
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
        'Independent researcher',
        'Trader',
        'Author and founder of arapov.trade',
      ],
      description:
        'Independent researcher, practising trader, author of trading books and scientific publications. Specialises in trading psychology and cognitive biases in financial markets.',
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
          name: 'How does Ethereum differ from Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin is first of all digital money with an emission cap of 21 million coins. Ethereum is a platform for smart contracts and applications, and its coin ETH also pays for operations in the network. <strong>In short:  </strong> bitcoin is about storing value, ether is about programmability.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a smart contract in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a self-executing program on the blockchain that runs by itself when its conditions are met, with no person and no off-switch in the middle. Like a vending machine: the right input gives a guaranteed output. DeFi, NFTs and stablecoins are all built from such contracts, and every action on them is paid for in ETH.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you analyze Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Just like any market: through support and resistance levels and through volume. I look for the traces of large capital and false breakouts. The only caveat is that volumes on unregulated exchanges can't be trusted blindly.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why is the ETH/BTC ratio important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because ether depends heavily on bitcoin and often moves after it. The ratio of ETH to BTC shows relative strength: rising means ether is stronger than the market, falling means weaker. It is useful context before a trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the risks of trading Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "High volatility, dependence on bitcoin, and thinner liquidity than BTC's, plus regulatory and technical risks. That is why risk control, a stop-loss, and entering only with funds you can afford to lose are especially important.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is gas in Ethereum and why do fees spike?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gas is the payment for every operation in the network, counted in gwei (fractions of ETH). The size of the fee depends on the network load: the more people want to push transactions through, the dearer the gas. So at peak hours transfers and trades cost noticeably more, and sharp spikes in fees usually coincide with surges of activity in the network.',
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
      '@id': 'https://arapov.trade/en/freestudying/ethereum-guide#howto',
      name: 'How to understand and apply: Ethereum in trading and how to analyze ETH',
      description:
        'A step-by-step breakdown of the topic and its practical use in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'What is Ethereum and how does it differ from Bitcoin?',
          text: 'Ethereum is a decentralized blockchain platform for smart contracts and applications, with its own coin ETH that works both as an asset and as the payment for operations in the network.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'What defines ETH: smart contracts, gas, staking, and The Merge',
          text: 'Four pillars of ETH: smart contracts, gas (the payment for operations), staking, and The Merge (the move to Proof of Stake).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Smart contracts: what they are and why their bugs are dangerous',
          text: 'A smart contract is self-executing code with no off-switch, and once it is live its bugs usually cannot be patched.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Technical analysis of Ethereum: levels and volumes',
          text: 'Good news for a trader: ETH is the same kind of chart as any other, and it trades by the same laws of supply and demand.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'ETH/BTC correlation: how the ratio affects trading',
          text: 'The main thing to keep in mind when trading ETH: it depends heavily on bitcoin.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Risks of trading Ethereum: liquidity and volatility',
          text: 'The risks of ETH are the same as those of all crypto, only it is useful to know them well.',
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
      name: 'Glossary of article terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ethereum',
          description:
            'Ethereum is a decentralized blockchain platform for smart contracts and applications, with its own coin ETH that works both as an asset and as the payment for operations in the network.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'gas (the gas fee)',
          description:
            'Gas (the gas fee) is the payment for every operation in the Ethereum network, measured in gwei; under heavy network load the fee rises.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'The Merge',
          description:
            "The Merge is Ethereum's move in September 2022 from mining (Proof of Work) to staking (Proof of Stake), which sharply cut the network's energy use.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'smart contract',
          description:
            'A smart contract is a self-executing program stored on the blockchain that runs automatically when its conditions are met, with no intermediary and no off-switch, and whose code usually cannot be changed once it is deployed.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
