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
  selector: 'app-home-eu-blog-thirty-two',
  templateUrl: './home-eu-blog-thirty-two.component.html',
  styleUrl: './home-eu-blog-thirty-two.component.scss',
})
export class HomeEuBlogThirtyTwoComponent implements OnInit {
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
    this.titleService.setTitle('How an Exchange Works | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What an exchange is, its types and functions, how trading is organized and how the exchange market differs from OTC. A guide for beginners.',
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
            'How a Stock Exchange Works in Plain Terms: Market, Price, Order Book, Clearing',
          description:
            'What an exchange is, its types and functions, how trading is organized and how the exchange market differs from OTC. A guide for beginners.',
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
            '@id': 'https://arapov.trade/en/freestudying/how-exchange-works',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/how-exchange-works.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Stock exchange',
          keywords:
            'stock exchange, broker, order book, clearing, price formation, share, trading sessions',
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
          name: 'What is the difference between a stock exchange and a broker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The exchange is the trading venue itself, where deals are matched and the price forms. The broker is the intermediary a retail trader uses to reach it. So you trade on the exchange, but through a broker.',
          },
        },
        {
          '@type': 'Question',
          name: "How is a stock's price determined?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Price is set by the balance of supply and demand. When buyers are keener the price rises; when sellers press, it falls. The current price is the price of the last trade, where a buyer and a seller met, not a number set by anyone.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an order book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a table of all live buy and sell orders, a real-time map of supply and demand. Limit orders sit in the book and wait for a counterparty, while market orders fill at once and move the price, eating through liquidity.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does a clearing house do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It steps between buyer and seller and guarantees the trade settles, removing the risk that the other side won't pay. Thanks to clearing on a regulated exchange like CME, volume is honest and deals are matched transparently.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is a share in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It is a security that gives its owner a stake in a company. By buying a share you become a part-owner of the business and gain a claim on part of its profit and, as a rule, a vote at the shareholders' meeting.",
          },
        },
        {
          '@type': 'Question',
          name: 'When is the best time to trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The most liquid stretch is the overlap of the European and American sessions, around the middle of the European day, when the market holds the most participants. Stepping in during major news releases is risky for a beginner because of chaotic moves.',
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
      '@id': 'https://arapov.trade/en/freestudying/how-exchange-works#howto',
      name: 'How to make sense of the way an exchange works',
      description:
        'A step-by-step walk-through of how an exchange-traded market is built and how to apply it in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Tell the exchange apart from the broker',
          text: 'The exchange is the centralised venue where trades are matched, while the broker is the intermediary a retail trader uses to reach it.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Know the players: big capital and the crowd',
          text: 'On an exchange, big capital (banks and funds) meets the retail crowd, while the broker, market maker and clearing house provide access and liquidity; the task is to read volume and stand with big capital.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Understand what a share is',
          text: "A share is the market's basic instrument, a stake in a company whose price in the moment is moved by supply and demand, not by the quality of the business.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Learn which assets trade, and where',
          text: 'An exchange carries shares, bonds, futures, commodities and currency under one market design, so start with a single instrument; part of the market, like Forex, is off-exchange, with no single honest volume.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Grasp how price is born',
          text: 'An exchange price is the price of the last trade, born from the balance of supply and demand; a market often falls not from sellers but from demand that has dried up.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Read the order book and order types',
          text: 'A limit order sits in the book and waits, while a market order fills at once and moves the price, eating through liquidity; the imbalance in the book shows who is stronger.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Understand the role of clearing and volume',
          text: 'Clearing removes the risk of non-payment, so volume on a regulated exchange is honest, and it is that volume that reveals the footprints of smart money.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Choose your time to trade',
          text: 'The most liquid moment is the overlap of the London and US sessions; trading less but in that window beats trading all day on a thin market.',
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
      name: 'Glossary of terms used in the article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stock exchange',
          description:
            'A centralised trading venue where buyers and sellers meet under one set of rules, and the price forms openly through an auction of orders in the book.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Share',
          description:
            'A security that locks in a stake in a company for its owner, along with a claim on part of its profit and assets.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Exchange price',
          description:
            'The price of the last trade, where a buyer and a seller met; it is born from the balance of supply and demand, not set from above.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Clearing house',
          description:
            'An intermediary that steps between buyer and seller and guarantees both sides will meet their obligations on the trade.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Institutional investors',
          description:
            'A large professional market participant, such as a bank or a fund, with deep capital, research and discipline; unlike the retail crowd, it can noticeably move the price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Over-the-counter (OTC) market',
          description:
            'Deals struck directly between participants with no single centralised venue and no shared order book; the prime example is the Forex currency market, where no single honest market-wide volume exists.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
