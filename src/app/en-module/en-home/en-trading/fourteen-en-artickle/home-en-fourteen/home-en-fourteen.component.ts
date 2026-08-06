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
  selector: 'app-home-en-fourteen',
  templateUrl: './home-en-fourteen.component.html',
  styleUrl: './home-en-fourteen.component.scss',
})
export class HomeEnFourteenComponent implements OnInit {
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
      'Forex Leverage Risk: Why Traders Lose Money | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Forex leverage risks: why 70% of traders lose money. Mathematics of leveraged losses, trading psychology, risk reduction strategies when using leverage.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/forexLeverageRisk.webp',
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
          headline: 'Forex Leverage Risk: Why Traders Lose Money',
          description:
            'Forex leverage risks: why 70% of traders lose money. Mathematics of leveraged losses, trading psychology, risk reduction strategies when using leverage.',
          image:
            'https://arapov.trade/assets/img/content/forexLeverageRisk1.webp',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/forexleveragerisk',
          },
          articleSection: 'Trading Education',
          wordCount: 1450,
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
          name: 'What leverage is safe for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginning traders should use leverage no higher than 1:10. This allows learning from mistakes without catastrophic consequences. Increasing leverage is justified only after demonstrating consistent profitability over several months of trading.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do most traders lose money when using high leverage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The main reason is asymmetric risk perception. Traders focus on potential profits while ignoring equally probable losses. With 1:100 leverage, a 1% price move against the position wipes out the deposit, and such fluctuations occur daily in the market.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a margin call and how to avoid it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A margin call is forced position closure by the broker when free funds fall below a specified level. To avoid it, use no more than 20-30% of available margin, set stop-losses, and choose moderate leverage.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to properly calculate position size when trading with leverage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Apply the one-percent rule: any single position loss should not exceed 1% of the deposit. Calculate the distance to stop-loss in pips, then determine position size so that when the stop triggers, the loss equals no more than 1% of capital.',
          },
        },
        {
          '@type': 'Question',
          name: 'What hidden costs are associated with high leverage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'High leverage increases spreads and swaps proportionally to position size. With 1:100 leverage, a 2-pip spread on a $100,000 position costs $20. Slippage risk also increases during high market volatility.',
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
      name: 'How to Safely Use Forex Leverage',
      description:
        'Step-by-step guide to risk management when trading with leverage',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Start with a demo account',
          text: 'Open a demo account with 1:10 leverage and trade for at least three months while maintaining a detailed trading journal. Analyze results weekly.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Limit risk per trade',
          text: 'Apply the one-percent rule: any position loss should not exceed 1% of your deposit. Set a stop-loss on every trade.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Diversify positions',
          text: 'Distribute capital across multiple instruments, considering currency pair correlations. Avoid concentration in related assets.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Monitor margin levels',
          text: 'Use no more than 20-30% of available margin. Track free funds in your terminal and reduce positions when approaching critical levels.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Increase leverage gradually',
          text: 'Raise leverage levels by no more than 10 points per quarter, contingent on stable profitability. Return to lower levels after losing streaks.',
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
      name: 'Trading Terms: Leverage and Risk',
      description:
        'Glossary of terms related to leverage and risk management in Forex',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            'A tool that allows traders to control amounts many times greater than their deposit using borrowed funds from the broker',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin Call',
          description:
            'Forced position closure by the broker when free funds in the account fall below the minimum required level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin',
          description:
            'Collateral amount blocked by the broker when opening a position using leverage',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order that automatically closes a position when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swap',
          description:
            'Fee for holding an open position overnight, dependent on the interest rate differential between currency pairs',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            "The difference between the buy and sell price of an asset, representing the broker's revenue",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description:
            'Order execution at a price different from intended due to high volatility or insufficient liquidity',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'A state of emotional breakdown after a series of losses, leading to impulsive decisions and strategy violations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — an indicator showing the average price movement range over a specified period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description:
            'The degree of asset price variability over a defined time period, measured in percentages or pips',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
