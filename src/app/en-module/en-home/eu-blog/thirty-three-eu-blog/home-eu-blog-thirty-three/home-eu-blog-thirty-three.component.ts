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
  selector: 'app-home-eu-blog-thirty-three',
  templateUrl: './home-eu-blog-thirty-three.component.html',
  styleUrl: './home-eu-blog-thirty-three.component.scss',
})
export class HomeEuBlogThirtyThreeComponent implements OnInit {
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
      'Market Microstructure: Order Book and Tape | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How market microstructure works: the order book, the tape, liquidity and iceberg orders. How to read the flow of orders and trades.',
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
          headline:
            'Market Microstructure: How Price Forms, the Order Book, Spread, Liquidity and the Market Maker',
          description:
            'How market microstructure works: the order book, the tape, liquidity and iceberg orders. How to read the flow of orders and trades.',
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
            '@id': 'https://arapov.trade/en/freestudying/market-microstructure',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stockorderbook.png',
            width: 1200,
            height: 630,
          },
          articleSection: "Trader's Dictionary",
          keywords:
            'market microstructure, order book, bid ask, spread, liquidity, volatility, market maker',
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
          name: 'How does price form on an exchange?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Through the balance of supply and demand. When buyers push harder, price rises until enough sellers step in, and the reverse. Price is the participants' agreement at each moment, while the real imprint of that fight shows up in volume, which is where you see who is holding the move.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are Bid, Ask and the spread?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bid is the best price someone will buy at, Ask is the best price someone will sell at. All orders stack up in the order book, and the gap between Bid and Ask is the spread. It is the toll for entering instantly: the moment you open a trade you are already down by the spread.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is market liquidity and why does a trader need it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It is the market's ability to absorb an order without a noticeable shift in price. A liquid market gives a tight spread and fills near the expected price; a thin one gives a wide spread, slippage and sharp gaps. The zones where stops pile up are liquidity pools, and big capital deliberately drives price toward them.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can a beginner trade off the order book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In my experience it is hard: the book changes every second, and speed and algorithms sit with the large players, who also hide their orders with spoofing and icebergs. A beginner stands firmer leaning on levels and volume, where you can already see who actually built a position.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it true that the market maker hunts my stop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not yours personally. He collects liquidity where there is plenty of it, and that means the obvious places the crowd puts stops: round levels and local extremes. More often a trader loses not because of a villain but because he set the stop in the single most predictable spot.',
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
      '@id': 'https://arapov.trade/en/freestudying/market-microstructure#howto',
      name: 'How to make sense of market microstructure',
      description:
        'A step-by-step walk through how price is born, how the order book, spread and liquidity work, and what role the market maker plays',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Grasp that price is shaped by supply and demand',
          text: 'Price is always an agreement between those who want to buy and those who want to sell.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Get to grips with the order book, Bid and Ask',
          text: 'The order book is a list of all live buy and sell orders lined up by price.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Count the spread as a cost on every trade',
          text: 'The spread is the difference between the buy price and the sell price, a hidden cost on every trade.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Learn to see liquidity and its pools',
          text: "Liquidity is the market's ability to absorb an order without a noticeable change in price.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Fit risk to volatility through ATR',
          text: 'Volatility is the range of price swings over a period, not the direction of the move.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: "Understand the market maker's logic and follow capital, not fight it",
          text: 'The market maker is a professional participant who holds a two-sided quote and supplies liquidity.',
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
      name: 'Glossary of terms in this article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order book',
          description:
            'A list of all live buy and sell orders for an asset lined up by price; also called the book of orders or depth of market.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy price (Ask) and the sell price (Bid) of one asset at a given moment; a hidden cost on every trade.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            "The market's ability to absorb a trading order without a noticeable change in price.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            "A measure of the range of an asset's price swings over a set period; it describes the amplitude of the move, not its direction.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market maker',
          description:
            'A professional market participant who, by agreement with the exchange, holds a two-sided quote and supplies liquidity.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
