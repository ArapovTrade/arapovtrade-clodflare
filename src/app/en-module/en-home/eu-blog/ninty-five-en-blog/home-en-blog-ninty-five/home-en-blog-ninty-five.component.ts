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
  selector: 'app-home-en-blog-ninty-five',
  templateUrl: './home-en-blog-ninty-five.component.html',
  styleUrl: './home-en-blog-ninty-five.component.scss',
})
export class HomeEnBlogNintyFiveComponent implements OnInit {
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

    this.titleService.setTitle('Gold Trading XAUUSD | Complete Trader`s Guide');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Gold XAUUSD trading guide: fundamental drivers, technical analysis strategies, risk management and market psychology for precious metals traders.',
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
          headline: 'Gold Trading XAUUSD: Complete Market Analysis Guide',
          description:
            'Comprehensive guide to trading gold XAUUSD covering fundamental factors, technical strategies and risk management',
          image: 'https://arapov.trade/assets/img/content/goldtrading1.jpg',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-04T00:00:00+02:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/goldtrading',
          },
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
          name: 'What does XAUUSD mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'XAUUSD is the trading symbol for gold priced in US dollars. XAU is the international code for gold, USD represents the US dollar. The quote shows the price of one troy ounce (31.1 grams) in dollars.',
          },
        },
        {
          '@type': 'Question',
          name: 'What drives gold prices?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key drivers include Federal Reserve interest rate policy, US dollar strength, inflation expectations, geopolitical tensions, central bank demand, and real interest rates (nominal rates minus inflation).',
          },
        },
        {
          '@type': 'Question',
          name: 'When is the best time to trade gold?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Peak liquidity occurs during the London-New York session overlap (8:00 AM - 12:00 PM EST). Volatility also increases around major US economic data releases and FOMC announcements.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is gold considered a safe haven?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gold has preserved value for millennia, carries no counterparty risk, and historically protects against currency devaluation. During crises, capital flows into gold as a store of value.',
          },
        },
        {
          '@type': 'Question',
          name: 'What risk percentage is recommended for gold trades?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Due to gold's volatility, 0.5-1% risk per trade is recommended. Stop losses need to be wider than forex pairs, accounting for daily ranges of $20-50.",
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
      name: 'How to Start Trading Gold XAUUSD',
      description: 'Step-by-step approach to gold trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand Fundamentals',
          text: 'Learn key drivers: Fed policy, inflation, dollar strength, geopolitical factors affecting gold prices.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Select Trading Style',
          text: "Choose between position trading, swing trading, or intraday. Adapt approach to gold's volatility characteristics.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Configure Risk Parameters',
          text: 'Use smaller position sizes, wider stop losses, and maximum 1% risk per trade for gold.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Identify Key Levels',
          text: 'Mark historical support/resistance and psychological levels at round numbers ($1800, $1900, $2000).',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Monitor Correlations',
          text: 'Track DXY, bond yields, and silver for signal confirmation and market context.',
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
      name: 'Gold Trading Terminology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'XAUUSD',
          description: 'Trading symbol for gold priced in US dollars.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Troy Ounce',
          description: 'Standard gold measurement unit equal to 31.1035 grams.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Safe Haven',
          description:
            'Asset that retains or increases value during market turbulence.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Real Interest Rates',
          description: 'Nominal interest rates adjusted for inflation.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'London Fix',
          description: 'Benchmark gold price set twice daily in London.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'COMEX',
          description: 'Primary exchange for gold futures trading.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spot Gold',
          description: 'Current market price for immediate delivery.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gold/Silver Ratio',
          description: 'Number of silver ounces needed to buy one gold ounce.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DXY',
          description:
            'US Dollar Index measuring dollar against major currencies.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flight to Safety',
          description: 'Capital movement into safe assets during uncertainty.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
