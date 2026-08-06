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
  selector: 'app-home-eu-blog-thirty-five',
  templateUrl: './home-eu-blog-thirty-five.component.html',
  styleUrl: './home-eu-blog-thirty-five.component.scss',
})
export class HomeEuBlogThirtyFiveComponent implements OnInit {
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
      'Trader vs Investor: What’s the Difference | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How a trader differs from an investor, what is better, trading or investing, and how they differ in horizon, risk and approach to the market.',
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
            "Trading vs Investing: What's the Difference and What to Choose",
          description:
            'How a trader differs from an investor, what is better, trading or investing, and how they differ in horizon, risk and approach to the market.',
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
            '@id': 'https://arapov.trade/en/freestudying/trading-vs-investing',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingandinvestments.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Trading vs investing',
          keywords:
            'trading vs investing, trader vs investor, difference, risk control, time horizon, dividends, stop-loss',
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
          name: "What's the difference between trading and investing?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A trader earns on the price difference over a short horizon, buying cheaper and selling dearer. An investor buys an asset for the long run and earns on its growth and cash flow like dividends. Trading is work; investing is closer to ownership.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which is more profitable: trading or investing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Trading's return is potentially higher, but less stable and harder won; it's the price of time, skill and risk. Investing grows more slowly but calmer, historically around 10 to 15 percent a year on a broad index. Which is more profitable depends on how much time and nerve you're ready to put in.",
          },
        },
        {
          '@type': 'Question',
          name: 'Do a trader and an investor look at different things?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mostly yes. A trader reads the chart, price, volume and levels, that is technical analysis, because over a short horizon current supply and demand set the move. An investor leans on the fundamentals, business profit, dividends and the economy, because they hold for years.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does risk control differ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In trading the risk is fast and the protection mechanical: a stop-loss and a small risk per trade. In investing the risk is slow, and diversification and a long horizon that smooths out drawdowns do the work. But risk control is needed in both.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is trading riskier than investing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, over a short horizon the risk is faster and concentrated, so a trade can turn against you in minutes. Investing spreads the risk across time and assets, but it is not risk-free either: a deep market drawdown can hit a portfolio hard. The protection is just built differently.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the better start for a beginner?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "In my experience, someone who isn't ready to sit at the chart every day finds it calmer to start with investing. You can also combine: hold the bulk of your capital in long-term investments and actively trade with a small part, if you have the discipline.",
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
      '@id': 'https://arapov.trade/en/freestudying/trading-vs-investing#howto',
      name: 'How to choose between trading and investing',
      description:
        'A step-by-step look at how trading and investing differ in essence, goals, horizon, profitability and risk control',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Grasp the key difference between trading and investing',
          text: 'Trading is earning on the price difference over a short stretch, while investing is buying an asset for the long run; investing has surplus value, trading only the price difference.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Match the goal and horizon to yourself',
          text: "A trader works a short horizon for a regular income and it's a daily profession, while an investor plays the long game to protect and grow capital.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'See which one really pays more',
          text: "Trading's ceiling is higher than investing's calm 10 to 15 percent a year, but it is the price of time, skill and risk, and without a stop the dispersion eats the account.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Build risk control for your approach',
          text: "In trading the protection is mechanical, a stop on every trade and small risk; in investing diversification and a long horizon do the work, and in both it's risk control that earns, not guessing.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Choose your path or combine them',
          text: "If you can't sit at the chart daily, investing is the calmer start; many sensibly combine both, trading only with a small slice they can afford to lose.",
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
      name: 'Trading Glossary',
      description: 'Essential trading terminology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading',
          description:
            'The activity of buying and selling financial instruments to profit from price changes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-loss',
          description:
            'A protective order that automatically closes a position when it reaches a predetermined loss level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Technical analysis',
          description:
            'A method of forecasting prices based on studying charts and historical price movement data',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental analysis',
          description:
            'A method of evaluating asset value based on economic indicators, news, and financial reports',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'A measure of price variability showing the amplitude of quote fluctuations over a given period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'The ability of an asset to be quickly bought or sold without significantly affecting its price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'The difference between the buy price (ask) and sell price (bid) of a financial instrument',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description:
            'A trading style involving numerous short-term trades aiming to capture small profits from each transaction',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing trading',
          description:
            'A trading style holding positions from several days to weeks to capture medium-term price movements',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Diversification',
          description:
            'Distributing capital across different assets to reduce overall portfolio risk',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
