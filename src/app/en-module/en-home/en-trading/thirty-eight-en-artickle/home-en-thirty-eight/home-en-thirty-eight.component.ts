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
  selector: 'app-home-en-thirty-eight',
  templateUrl: './home-en-thirty-eight.component.html',
  styleUrl: './home-en-thirty-eight.component.scss',
})
export class HomeEnThirtyEightComponent implements OnInit {
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
      'Capital Management in Trading: Risk Management and Money Management | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to capital management in trading. Risk management, money management, strategies for protecting deposits and maximizing profits for beginner traders.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/capitalmanagement.webp',
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
            'Capital Management in Trading: Risk Management and Money Management',
          description:
            'Complete guide to capital management in trading. Risk management, money management, strategies for protecting deposits and maximizing profits for beginner traders.',
          image:
            'https://arapov.trade/assets/img/content/capitalmanagement1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/capitalmanagement',
          },
          articleSection: 'Trading Education',
          wordCount: 1580,
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
          name: 'What is risk management in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Risk management is a system of methods for protecting trading capital from losses. It includes limiting risk per trade (1-2% of deposit), using stop-losses, controlling drawdown, and diversifying assets.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between risk management and money management?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Risk management focuses on protecting capital from losses, while money management focuses on efficiently using funds to maximize profits. The former is responsible for survival, the latter for deposit growth.',
          },
        },
        {
          '@type': 'Question',
          name: 'What percentage of deposit can be risked in one trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The optimal risk per trade is 1-2% of trading capital. With a $10,000 deposit, maximum loss per trade should not exceed $100-200. This allows surviving a series of losing trades.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is risk-to-reward ratio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Risk-to-reward ratio (R:R) shows the relationship between potential loss and expected profit. The minimum acceptable value is 1:2, meaning profit should be twice the possible loss.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to calculate position size?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Position size is calculated using the formula: Volume = Risk in money / (Stop-loss in pips × Pip value). With a $10,000 deposit, 2% risk ($200), and 50-pip stop-loss, volume equals 0.4 lots.',
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
      name: 'How to Build a Capital Management System',
      description:
        'Step-by-step guide to creating an effective risk management and money management system in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Define Acceptable Risk',
          text: 'Set the maximum percentage of deposit you are willing to lose in one trade. Recommended value is 1-2%. Also define daily and weekly loss limits.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Calculate Position Size',
          text: 'Use the volume calculation formula based on distance to stop-loss and acceptable risk in money. Adapt position size to market volatility.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Set Stop-Loss and Take-Profit',
          text: 'Place protective orders before entering a trade. Risk-to-reward ratio should be at least 1:2. Use technical levels to determine exit points.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Diversify Your Portfolio',
          text: 'Distribute capital among different instruments and strategies. Do not concentrate your entire deposit in one asset or direction.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Keep Statistics and Analyze',
          text: 'Record all trades in a trading journal. Regularly analyze results, identify weaknesses, and adjust your capital management system.',
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
      name: 'Capital Management Terms',
      description:
        'Key concepts of risk management and money management in trading',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A system of methods for protecting trading capital from losses through risk limitation and protective tools',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Money Management',
          description:
            'Strategic capital management for optimizing profitability and efficient fund allocation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order that automatically closes a position when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'The decline of a trading account from its maximum value to the current minimum, expressed as a percentage',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'The relationship between potential loss and expected profit in a trade',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Position Size',
          description:
            'Trade volume calculated based on acceptable risk and distance to stop-loss',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Diversification',
          description:
            'Distribution of capital among different assets to reduce overall portfolio risk',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trailing Stop',
          description:
            'A dynamic stop-loss that automatically follows price at a set distance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Reinvestment',
          description:
            'Using earned profits to increase trading capital and position volumes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description:
            "A mechanism for increasing trading volume using broker's borrowed funds",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
