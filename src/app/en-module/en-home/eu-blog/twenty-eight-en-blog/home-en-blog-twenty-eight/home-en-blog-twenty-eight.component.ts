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
  selector: 'app-home-en-blog-twenty-eight',
  templateUrl: './home-en-blog-twenty-eight.component.html',
  styleUrl: './home-en-blog-twenty-eight.component.scss',
})
export class HomeEnBlogTwentyEightComponent implements OnInit {
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
    this.titleService.setTitle('Fundamental Market Analysis | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'The basics of fundamental analysis: economic indicators, central bank rates, news and how they affect the market and exchange rates.',
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
            'Fundamental Analysis in Trading: A Full Guide to Macro, Rates and News',
          description:
            'The basics of fundamental analysis: economic indicators, central bank rates, news and how they affect the market and exchange rates.',
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
            '@id': 'https://arapov.trade/en/freestudying/fundamental-analysis',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/fundamentalanalysis.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Fundamental analysis',
          keywords:
            'fundamental analysis, economic factors, macroeconomic indicators, GDP, PMI, inflation, key rate, the Fed, economic calendar, news trading, volume analysis',
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
          name: 'What is fundamental analysis in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's the valuation of an asset through the economy, rates and reporting, to understand its fair value. Cheaper than fair value the asset is considered undervalued, more expensive overvalued. For a long-term investor it's a powerful tool, while for a trader it answers the question of why the price moves, but not when to enter.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which economic factors move the market?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Central-bank rates, inflation, employment, the trade balance, business activity (PMI), commodity and gold prices, and geopolitics. The rate affects currencies most of all, because it sets the cost of money in the economy.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does PMI show and why does the 50 mark matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PMI is a business-activity index built from surveys of purchasing managers. The 50 mark is the watershed: above it the economy is expanding, below it contracting. The indicator is leading, so the market reacts to it more keenly than to the lagging GDP.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Fed rate affect the dollar and risk assets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A rate hike makes money more expensive, usually strengthens the dollar and pressures stocks and crypto. A cut makes money cheaper, weakens the dollar and supports risk assets and gold. From the decision to the economy's real reaction there's a lag, as a rule more than half a year.",
          },
        },
        {
          '@type': 'Question',
          name: 'Should you trade the release of economic news?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "In my experience you shouldn't pile in at the moment of release: the spread widens, price is thrown in both directions, and a double spike collects stops even with the direction correctly guessed. It's wiser to know about releases in advance, wait out the burst and enter on the price's reaction at a level.",
          },
        },
        {
          '@type': 'Question',
          name: 'What should you use instead of fundamental analysis for entry?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Volume analysis. Fundamentals are kept as a background and the direction of the wind, while the entry is taken by volume and the price's reaction at strong levels, where the footprint of large capital is visible. The principle is simple: first see the action on the chart, then enter, rather than guessing the news in advance.",
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
      '@id': 'https://arapov.trade/en/freestudying/fundamental-analysis#howto',
      name: 'How a trader should work with fundamental analysis',
      description:
        'A step-by-step walk through macroeconomics for a trader: from understanding the factors and indicators to working with the calendar and entering by volume instead of the news',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand that fundamentals answer why, not when',
          text: "Fundamental analysis values an asset's fair value through the economy and rates, answering the question of why the price moves, but not when to enter.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Know which factors move the markets',
          text: 'Markets are moved by central-bank rates, inflation, employment, the trade balance, business activity, commodities, gold and geopolitics.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Read the key indicators: GDP, PMI, inflation, employment',
          text: 'The main indicators are GDP as overall growth, PMI as business activity, inflation and employment data.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Watch the rate and central-bank decisions',
          text: "A central bank's key rate is the strongest fundamental lever for the dollar and risk assets.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use the economic calendar defensively',
          text: 'The economic calendar is needed first of all so as not to be caught off guard and not to open a trade right before a strong news release.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Enter by volume at a level, not by the news itself',
          text: "The entry is better taken by volume and the price's reaction at a strong level, after the action of large capital has become visible.",
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
      name: 'Glossary of terms used in this article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Fundamental analysis',
          description:
            'A method of valuing an asset through the study of economic and financial factors: central-bank rates, inflation, company reporting and the state of the industry.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'GDP',
          description:
            "The total value of all the goods and services a country has produced over a period, and the main gauge of the economy's size and growth.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Key rate',
          description:
            'The percentage at which the central bank lends to commercial banks, the main lever for managing the cost of money in the economy.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fed',
          description:
            "The Federal Reserve System, the central bank of the United States, which manages the country's monetary policy through the interest rate and the quantity of money in the economy.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Economic calendar',
          description:
            'A table of upcoming economic events with the date, time and degree of their importance, where for each event the forecast, the previous value and the actual result are shown.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'News trading',
          description:
            'A style of trading in which a trader tries to earn on a sharp price move at the moment an important economic news release comes out.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
