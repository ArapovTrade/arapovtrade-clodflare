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
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-blog-sixty-four',
  templateUrl: './home-en-blog-sixty-four.component.html',
  styleUrl: './home-en-blog-sixty-four.component.scss',
})
export class HomeEnBlogSixtyFourComponent {
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
      'Trading System That Works — Real Examples with Entry & Exit Rules',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete trading system with real trade examples. Step-by-step guide to finding entry points, setting stop-losses, and taking profits using false breakout strategy.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
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
          headline: 'Trading Strategy for Beginners',
          description:
            'Self-study guide for trading by Igor Arapov: step-by-step course from scratch, real strategies and tips for a confident start in trading.',
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
            '@id': 'https://arapov.trade/en/freestudying/practic',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/prakticuk.jpg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Trade Examples',
          keywords: 'trading strategy',
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
        'trader',
        'author and founder of arapov.trade',
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
      inLanguage: 'en',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a trading strategy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "A trading strategy is a pre-built set of clear rules that govern a trader's actions at every stage, from entering a trade to exiting it. It removes improvisation, emotional swings and subjectivity.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why does trading without a strategy lead to losses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because without rules, trading becomes a game of chance: commissions, the spread and emotional decisions constantly work against you, and unchecked risk eats the account. The majority of traders without a system and risk control lose their account.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the 3-to-1 rule in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It means that for every 1 dollar of risk you build in a potential of at least 3 dollars of profit, so the distance to the target is three times the distance to the stop-loss. If a setup does not offer that ratio, the trade is skipped.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a false breakout of a level?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is an attempt to push price beyond a level that fails and quickly returns, often on raised volume, knocking out stops and pulling in breakout orders. It frequently marks the point where Smart Money grabs liquidity before a move in the opposite direction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What WinRate is considered workable for a trading system?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A win rate around 60 to 63 percent is classic when working with levels, but the figure alone means little. What matters is the win rate together with the profit factor, about 1.8 to 2 or higher after commissions, which gives a positive expectation over the long run.',
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
      inLanguage: 'en',
      name: 'How to Find a Trade Entry with the Trading System',
      description:
        'A step-by-step algorithm for defining a sell entry at a resistance level by the rules of Price Action and Smart Money.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Define the level',
          text: 'Draw the resistance range from the higher (x4) timeframe and mark it as the zone of interest.',
        },
        {
          '@type': 'HowToStep',
          name: 'Wait for a pin bar',
          text: 'In the range of the level, wait for a pin bar as the first sign of buyer weakness and a shortage of demand.',
        },
        {
          '@type': 'HowToStep',
          name: 'Identify the false breakout',
          text: 'Recognise an attempt to break the level on raised volume that gets no continuation and grabs liquidity.',
        },
        {
          '@type': 'HowToStep',
          name: 'Enter on a bearish engulfing',
          text: 'Open a sell trade on a break of the low of the false-breakout bar, by the bearish engulfing pattern.',
        },
        {
          '@type': 'HowToStep',
          name: 'Place the stop-loss',
          text: 'Place a protective order beyond the top of the false-breakout bar, plus a couple of points for the exchange or broker commission.',
        },
        {
          '@type': 'HowToStep',
          name: 'Set the target and check 3-to-1',
          text: 'The target sits at the opposite impulse level; take the trade only if the potential profit is at least three times the risk.',
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
      '@id': 'https://arapov.trade/en/freestudying/practic#terms',
      inLanguage: 'en',
      name: 'Trading strategy terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading strategy',
          description:
            'A pre-built set of clear rules for entry, exit and risk control that replaces improvisation and emotion with logic and statistics.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False breakout',
          description:
            'An attempt to push price beyond a support or resistance level with no continuation, often on raised volume.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bearish engulfing',
          description:
            'A Price Action pattern showing seller dominance; an entry signal for a sell on a break of the false-breakout bar low.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: '3-to-1 rule',
          description:
            'A condition where for every dollar of risk you build in a potential of at least 3 dollars of profit.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win rate',
          description:
            'The share of winning trades in a trading system; when working with levels it is usually around 60 to 65 percent.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Profit factor',
          description:
            'The ratio of total profit to total loss; a minimally sufficient figure is 1.8 to 2 once commissions are accounted for.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Maximal drawdown',
          description:
            'The deepest fall of the account over a period; a stop-loss limits its depth but does not cancel it.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Money management',
          description:
            'Capital management: what percentage of the account to use in a trade and how to carry risk from trade to trade.',
          inDefinedTermSet:
            'https://arapov.trade/en/freestudying/practic#terms',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
