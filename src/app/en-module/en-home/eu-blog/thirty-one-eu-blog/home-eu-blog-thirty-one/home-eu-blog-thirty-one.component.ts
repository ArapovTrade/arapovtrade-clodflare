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
  selector: 'app-home-eu-blog-thirty-one',
  templateUrl: './home-eu-blog-thirty-one.component.html',
  styleUrl: './home-eu-blog-thirty-one.component.scss',
})
export class HomeEuBlogThirtyOneComponent implements OnInit {
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
      'Forex Market: How It Works and How to Trade | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What the Forex market is, who its participants are, how currency pairs and trading sessions work and how to start trading currencies.',
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
            'Forex for Beginners: Market, Positions, Leverage and Sessions',
          description:
            'What the Forex market is, who its participants are, how currency pairs and trading sessions work and how to start trading currencies.',
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
            '@id': 'https://arapov.trade/en/freestudying/forex-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ForexMarket.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Forex',
          keywords:
            'forex, currency market, long, short, swap, leverage, currency risk, carry trade, trading sessions, dollar index, DXY',
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
          name: 'What is forex trading and how does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forex is the global market for exchanging one currency for another, traded in pairs such as EUR/USD. It is the largest and most liquid market in the world, turning over more than 7 trillion dollars a day, but it is decentralized: there is no single exchange, so no honest centralized volume exists for a currency.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is forex trading legal and safe for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forex is legal in most countries when you use a properly regulated broker. Safe is a different question: most retail accounts on these leveraged products lose money, and the main reason is oversized leverage and weak risk control, not the market itself. A stop on every trade and small risk per trade matter far more than the broker you pick.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much money do you need to start trading forex?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can open an account with very little, but account size is the wrong thing to fix on. What matters is risk per trade: keeping it near one to two percent of the account and sizing the position to that. A tiny account on maximum leverage is far more dangerous than a modest account traded with discipline.',
          },
        },
        {
          '@type': 'Question',
          name: 'What leverage should a beginner use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The question is not the size of the leverage but the risk on the trade. Keep risk near one to two percent of the account and size the position to that. Under EU and UK rules retail traders get about 1:30 on majors, in the US up to 1:50, while offshore brokers lure with 1:100 and higher, which burns an account fastest.',
          },
        },
        {
          '@type': 'Question',
          name: 'When is the best time to trade forex?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The strongest window is the overlap of the London and New York sessions, when Europe is still trading and the US has already opened. Participants and liquidity peak there, and so do the cleanest moves on the major dollar, euro and pound pairs. The thin Asian session, the night and pre-holiday days are usually noise.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the US Dollar Index (DXY) and why does it matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "DXY is a single number showing the dollar's strength against a basket of six currencies, with the euro by far the heaviest. Because the dollar sits on one side of most pairs, the index points to the likely direction: you read dollar strength on DXY first, then look for the actual entry on the pair's own chart by level and reaction.",
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
      '@id': 'https://arapov.trade/en/freestudying/forex-guide#howto',
      name: 'How to understand the forex market from scratch',
      description:
        "A beginner's path: how the market is built, positions, leverage and risk, sessions and the dollar index",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand how the forex market is built',
          text: 'Forex is a decentralized currency market with no single exchange, so honest centralized volume does not exist for a currency, and it is easier to read by levels and the dollar index.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Get long, short and the swap straight',
          text: 'Long is a bet on a rise, short a bet on a fall by selling a borrowed instrument, and holding overnight earns or costs a swap based on the interest-rate difference.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Take control of leverage and risk',
          text: 'Leverage multiplies profit and loss equally, so you size risk first at one to two percent per trade, place the stop, and only then work out the position size.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Account for the carry trade and its trap',
          text: 'The carry trade earns the rate differential through the swap, but it is not passive income, it is a leveraged bet on the exchange rate staying calm.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Trade in the right session window',
          text: 'Volume and movement peak on the London and New York overlap, while the thin Asian session and holidays are better sat out.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Read the market through the dollar index',
          text: "The dollar index sets the likely direction across most pairs, while the actual entry is found on the pair's own chart by level and price reaction.",
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
          name: 'Pip',
          description:
            'The smallest step in a forex quote, usually the fourth decimal place; price movement and risk are both measured in pips.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Forex',
          description:
            'The international market for exchanging currencies, where one currency is bought for another; you trade not single currencies but pairs, for example EUR/USD.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Long position',
          description:
            'Buying an asset expecting the price to rise: buy lower to sell higher later.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Short position',
          description:
            'Selling an asset expecting a fall: sell a borrowed instrument higher and buy it back cheaper, keeping the difference.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'Borrowed capital from the broker that lets you control a position many times larger than your own account by posting only a small margin.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Currency risk',
          description:
            'The chance of a loss from an adverse move in the exchange rate against your open position.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Carry trade',
          description:
            'A strategy where a trader borrows in a low interest-rate currency and invests in a high-rate one, earning the rate difference.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Forex trading session',
          description:
            "The period when a given region's financial centre is active and the bulk of currency flow passes through it.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dollar Index',
          description:
            "A measure of the US dollar's strength against a basket of six major world currencies, used to judge whether the dollar is gaining or losing.",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
