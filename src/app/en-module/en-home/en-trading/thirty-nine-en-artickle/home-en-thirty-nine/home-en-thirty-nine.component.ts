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
  selector: 'app-home-en-thirty-nine',
  templateUrl: './home-en-thirty-nine.component.html',
  styleUrl: './home-en-thirty-nine.component.scss',
})
export class HomeEnThirtyNineComponent implements OnInit {
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
      'Risk/Reward Ratio in Trading: Calculation and Application | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Risk/Reward Ratio in trading: how to calculate, optimize and apply R/R for consistent profits in financial markets. Complete guide for traders.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/profitandlossratio.webp',
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
          headline: 'Risk/Reward Ratio in Trading: Calculation and Application',
          description:
            'Risk/Reward Ratio in trading: how to calculate, optimize and apply R/R for consistent profits in financial markets. Complete guide for traders.',
          image:
            'https://arapov.trade/assets/img/content/profitandlossratio1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
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
            '@id': 'https://arapov.trade/en/freestudying/profitandlossratio',
          },
          articleSection: 'Trading Education',
          keywords: [
            'risk reward ratio',
            'profit loss ratio',
            'risk management',
            'trading',
            'R/R',
          ],
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
          name: 'What is Risk/Reward Ratio in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Risk/Reward Ratio (R/R) is a metric showing the relationship between potential profit and potential loss in a trade. For example, R/R of 1:3 means for every dollar risked, the trader expects to gain three dollars in profit.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is considered an optimal R/R Ratio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The minimum recommended ratio is 1:2, where potential profit doubles the risk. Experienced traders often target 1:3 or higher, allowing profitability even with a low percentage of winning trades.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does R/R Ratio relate to win rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A high R/R compensates for a low win rate. With a 1:3 ratio, winning just 30% of trades still results in overall profit, whereas a 1:1 ratio requires over 50% winning trades to break even.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to calculate R/R before entering a trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Determine entry point, stop-loss level, and take-profit target. Divide distance to take-profit by distance to stop-loss. Account for spread and commissions to get the actual R/R value.',
          },
        },
        {
          '@type': 'Question',
          name: 'What common mistakes do traders make with R/R?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Common mistakes include: setting stop-losses too tight, ignoring spread and commissions, changing trade plans based on emotions, and setting unrealistic profit targets without considering volatility.',
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
      name: 'How to Apply Risk/Reward Ratio in Trading',
      description:
        'Step-by-step guide to calculating and applying R/R Ratio for improved trading performance.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify entry point',
          text: 'Analyze the market and find an optimal entry point based on technical or fundamental analysis. Precise entry improves the final R/R ratio.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set stop-loss',
          text: 'Place stop-loss beyond a key support or resistance level. Use ATR to determine optimal distance accounting for current volatility.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Define take-profit',
          text: 'Set profit target based on nearest resistance or support levels. Ensure distance to take-profit is at least twice the distance to stop-loss.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Calculate actual R/R',
          text: 'Account for broker spread and commissions. Actual ratio should remain at least 1:2 after accounting for all trading costs.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Follow the plan',
          text: 'Do not modify stop-loss or take-profit levels after entering a trade. Discipline is the key factor in successful R/R application.',
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
      name: 'Risk/Reward Terminology Glossary',
      description: 'Key terms and definitions in risk reward ratio management',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'The relationship between potential profit and potential loss in a trading position',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order to automatically close a position when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-Profit',
          description:
            'Order to automatically lock in profits when price reaches a specified target level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description:
            'Percentage of profitable trades relative to total number of trades executed',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range - indicator measuring asset volatility over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'Decline in trading capital from peak to trough over a specific period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Money Management',
          description:
            'System for managing trading capital to control risks and optimize position sizing',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description:
            'Dynamic stop-loss that automatically follows price to protect accumulated profits',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'Difference between bid and ask prices, constituting part of trading costs',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'Degree of price variation for an asset over a specific time period',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
