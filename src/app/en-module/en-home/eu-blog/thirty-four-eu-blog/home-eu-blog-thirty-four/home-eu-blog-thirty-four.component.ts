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
  selector: 'app-home-eu-blog-thirty-four',
  templateUrl: './home-eu-blog-thirty-four.component.html',
  styleUrl: './home-eu-blog-thirty-four.component.scss',
})
export class HomeEuBlogThirtyFourComponent implements OnInit {
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
      'Types of Orders on the Exchange | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Types of orders on the exchange: market, limit, stop and stop-limit. How they differ, when to use them and how they get filled.',
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
            'Order Types on the Exchange: Every Order and How to Use It',
          description:
            'Types of orders on the exchange: market, limit, stop and stop-limit. How they differ, when to use them and how they get filled.',
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
            '@id': 'https://arapov.trade/en/freestudying/order-types',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ordertypes.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Exchange',
          keywords:
            'orders, order types, market order, limit order, stop order, stop-limit, stop-loss, trailing stop, iceberg, algorithmic orders',
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
          name: 'What is the difference between a market order and a limit order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A market order fills instantly at any available price: you get speed but pay the spread and possible slippage. A limit order fills only at your price or better and gives you control, but the fill is not guaranteed, since price may never reach your level.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a stop order and how does it move price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a pending order that sleeps until its level and turns into a market order the moment the stop price is touched. When a cluster of such stops triggers, they all pour into the market at once and push price further the same way, which is why stop zones act as fuel for sharp moves.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where should you place a stop-loss?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Not on a round number and not right next to your entry, but behind a structural level with a buffer, where the trade's scenario counts as broken. From that distance you size the position, risking around one to two percent of the account per trade rather than fixing the size first.",
          },
        },
        {
          '@type': 'Question',
          name: 'Stop-limit vs stop-market: which one protects you?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A stop-market turns into a market order and always fills, but at the available price, sometimes with slippage. A stop-limit places a limit order and controls the price, but may not fill if the market jumps past it. One guarantees the exit, the other the price, so for protecting the account I take the stop-market.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the market keep hitting my stop loss?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Most often because it sits in an obvious place where the crowd's stops pile up, just under a round number or right past a visible level. Liquidity rests there, and price is sometimes pushed into the zone on purpose with a false breakout. A stop set behind the level with a buffer lowers the chance of being swept out.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is an iceberg order and how do you read big players?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An iceberg is a large order sliced into visible portions, with only the tip showing in the order book while the bulk stays hidden. The order book can be faked, but volume records already-executed trades, so big capital is read more reliably by a spike of volume without a price move at a strong level.',
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
      '@id': 'https://arapov.trade/en/freestudying/order-types#howto',
      name: 'How to get to grips with exchange order types',
      description:
        'A step-by-step walkthrough of every order: from market and limit to stop-loss, trailing stop and the hidden orders of big capital',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what an order is and the types that exist',
          text: 'An order is a command to the broker to buy or sell on set conditions: a market order fills at once, a limit at your price, a stop triggers on its level.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Compare the market and limit order',
          text: 'The market order gives speed at the cost of slippage and moves price on size, while the limit order gives price control, and it is what big capital works with.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Learn the stop order and stop-limit',
          text: 'A stop order sleeps until its level and becomes a market order, while a stop-limit controls the price but risks not filling in a sharp move.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Place the stop-loss behind a structural level',
          text: 'A protective stop goes behind a structural level with a buffer, and from that distance you size the position at around one to two percent risk per trade.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Do not leave your stop where the crowd keeps it',
          text: 'Crowd stops pile up behind obvious levels and become liquidity for big capital, so your own stop is hidden with a buffer.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Read big capital by volume, not by the order book',
          text: 'Iceberg and algorithmic orders hide the real size in the order book, but volume cannot be faked, so big capital is read by a spike of volume at a level.',
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
          name: 'Order',
          description:
            'An instruction to the broker to buy or sell an asset under set rules; the order type determines the price and the speed of execution.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market order',
          description:
            'An instruction to the broker to buy or sell an asset immediately at the best price available at that moment.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop order',
          description:
            'A pending order with a set stop price that sleeps until triggered, then turns into a market order when price touches the level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-limit order',
          description:
            'A pending order built from two prices: the stop price activates the order, and the limit price places a limit order that fills only at your price or better.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description:
            'A protective order that automatically closes a position when price reaches a preset loss level.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing stop',
          description:
            'A moving stop-loss that follows price as the trade goes into profit and protects the gain already accrued.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg order',
          description:
            'A large exchange order split into a run of small ones, of which only a small visible share shows in the order book while the bulk stays hidden.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Algorithmic orders',
          description:
            'Large orders executed by a set algorithm and sliced into parts, so a participant can buy or sell big size without showing the market the real intent.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
