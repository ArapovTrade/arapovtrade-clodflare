import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-en-blog-ninty-four',
  templateUrl: './home-en-blog-ninty-four.component.html',
  styleUrl: './home-en-blog-ninty-four.component.scss',
})
export class HomeEnBlogNintyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'What is Spread in Trading: Types, Calculation and Optimization Strategies | Igor Arapov',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Spread in trading is the difference between the buy and sell price of an asset. Learn about spread types, influencing factors, and strategies to minimize trading costs on Forex.',
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
          '@id': 'https://arapov.trade/en/freestudying/spread#article',
          headline:
            'What is Spread in Trading: Types, Calculation and Optimization Strategies',
          description:
            'Complete guide to spread in trading. Understanding spread types, factors affecting size, and practical methods for reducing trading costs.',
          image: 'https://arapov.trade/assets/img/content/spread3.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/spread',
          },
          articleSection: 'Trading Education',
          keywords: ['spread', 'bid ask', 'trading costs', 'forex', 'trading'],
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
      '@id': 'https://arapov.trade/en/freestudying/spread#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is spread in trading in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Spread is the difference between the buy price (Ask) and sell price (Bid) of a financial instrument. It is essentially a transaction fee that is automatically charged when opening a position.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which is better: fixed or floating spread?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fixed spread suits beginners and trading robots due to its predictability. Floating spread is more advantageous for experienced traders who can choose optimal trading times with minimal costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does spread widen during news releases?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'During important economic data releases, volatility sharply increases. Market makers widen spreads to protect against risks associated with unpredictable price movements during these moments.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to minimize spread impact on profits?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trade during maximum liquidity periods, use limit orders, choose brokers with competitive spreads, and participate in rebate programs to recover part of your trading costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which instruments have the lowest spreads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Minimum spreads are found on major Forex currency pairs: EUR/USD, GBP/USD, USD/JPY. In stock markets, high-cap stocks have tight spreads. In crypto, Bitcoin and Ethereum on major exchanges offer the best spreads.',
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
      '@id': 'https://arapov.trade/en/freestudying/spread#howto',
      name: 'How to Reduce Trading Costs from Spreads',
      description:
        'Step-by-step guide to minimizing spread impact on trading results',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Compare brokers',
          text: 'Analyze spreads from multiple brokers on your target instruments. Compare average values, not just minimum advertised spreads.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose optimal timing',
          text: 'Trade during the overlap of European and American sessions when liquidity is maximum and spreads are at their tightest.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Use limit orders',
          text: 'Instead of market orders, use limit orders to control entry price and reduce spread impact on your trades.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Join a rebate program',
          text: 'Register with broker loyalty programs or rebate services to recover part of your trading costs over time.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Avoid trading during news',
          text: 'Monitor the economic calendar and avoid opening positions immediately before major data releases when spreads spike.',
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
      '@id': 'https://arapov.trade/en/freestudying/spread#glossary',
      name: 'Spread Terminology Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy price (Ask) and sell price (Bid) of a financial instrument',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid',
          description:
            'The demand price — the maximum price buyers are willing to pay for an asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask',
          description:
            'The offer price — the minimum price sellers are willing to accept for an asset',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fixed Spread',
          description:
            'A spread with an unchanging value regardless of market conditions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Floating Spread',
          description:
            'A spread that dynamically changes based on market liquidity and volatility',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Rebate',
          description:
            'A return of part of the spread or commission to the trader for completed trades',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Maker',
          description:
            'A market participant that provides liquidity by continuously quoting buy and sell prices',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN Broker',
          description:
            'A broker providing direct access to interbank liquidity through an electronic communication network',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pip',
          description:
            'The minimum price change of a currency pair, typically the fourth decimal place',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of an asset to be quickly sold at a price close to market value',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
