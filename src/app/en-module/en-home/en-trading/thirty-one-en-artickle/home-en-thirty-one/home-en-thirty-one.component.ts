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
  selector: 'app-home-en-thirty-one',
  templateUrl: './home-en-thirty-one.component.html',
  styleUrl: './home-en-thirty-one.component.scss',
})
export class HomeEnThirtyOneComponent implements OnInit {
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
      'Market Order in Trading: How It Works and When to Use It | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn how a market order works, what slippage is, and when to use market orders in your trading strategy. Execution mechanics, risks, and practical tips.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketorder.webp',
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
          headline: 'Market Order in Trading: How It Works and When to Use It',
          description:
            'Learn how a market order works, what slippage is, and when to use market orders in your trading strategy. Execution mechanics, risks, and practical tips.',
          image: 'https://arapov.trade/assets/img/content/marketorder.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: { '@id': 'https://arapov.trade/en#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/marketorder',
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
          name: 'What is a market order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A market order is an instruction to buy or sell an asset immediately at the best available price. It executes instantly as long as there is sufficient liquidity in the order book.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is slippage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Slippage is the difference between the expected execution price and the actual fill price. It occurs when liquidity at the desired price level is insufficient to fill the entire order.',
          },
        },
        {
          '@type': 'Question',
          name: 'When should I use a market order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market orders are best suited for highly liquid instruments when speed of execution takes priority over price — scalping, news trading, and breakout entries are typical use cases.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between a market order and a limit order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A market order executes immediately at the current market price. A limit order executes only when the market reaches your specified price. Market orders guarantee execution; limit orders guarantee price.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the risks of market orders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The primary risks are slippage on illiquid markets, unfavorable fill prices during high volatility, and higher taker fees charged by most exchanges.',
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
      name: 'How to use market orders safely',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Check liquidity',
          text: 'Verify that the order book has enough volume at nearby price levels to fill your order without significant slippage.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Evaluate the spread',
          text: 'Check the bid-ask spread before entering. A wide spread directly increases your transaction cost.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Avoid extreme volatility',
          text: 'Do not place market orders immediately after major news releases or during abnormal price spikes.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Split large orders',
          text: 'Break large positions into smaller chunks to reduce market impact and get a better average fill price.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Add a protective stop',
          text: 'Always place a stop-loss immediately after your market order is filled to cap potential losses.',
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
      name: 'Trading Order Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Market Order',
          description:
            'An instruction to buy or sell immediately at the best available market price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'The difference between the expected and actual fill price of an order.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The gap between the best bid price and the best ask price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description:
            'A real-time list of all outstanding buy and sell orders for an asset.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of a market to absorb large orders without significantly moving the price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Taker',
          description:
            'A trader who removes liquidity from the order book by placing market orders.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A participant who adds liquidity to the order book by posting limit orders.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Limit Order',
          description:
            'An order to buy or sell at a specified price or better.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid Price',
          description:
            'The highest price a buyer is currently willing to pay for an asset.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask Price',
          description:
            'The lowest price a seller is currently willing to accept for an asset.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
