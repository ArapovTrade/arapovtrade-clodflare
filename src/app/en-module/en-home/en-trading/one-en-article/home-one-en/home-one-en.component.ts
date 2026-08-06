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
  selector: 'app-home-one-en',
  templateUrl: './home-one-en.component.html',
  styleUrl: './home-one-en.component.scss',
})
export class HomeOneEnComponent implements OnInit {
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
    this.titleService.setTitle('10 Tips for Beginner Traders');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Useful tips for beginner traders. Learn how to manage risks, develop strategies, and avoid mistakes in trading.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/traderStarterw.webp',
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
          '@id':
            'https://arapov.trade/en/freestudying/adviceforbeginners#article',
          headline:
            '10 Essential Tips for Beginner Traders: Avoiding Common Mistakes',
          description:
            'Practical advice for beginner traders from a professional with 11 years of experience.',
          image: [
            'https://arapov.trade/assets/img/content/traderStarterw.webp',
          ],
          datePublished: '2025-01-10T12:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          author: { '@id': 'https://arapov.trade/en#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/adviceforbeginners',
          },
          articleSection: 'Trading for Beginners',
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
      '@id': 'https://arapov.trade/en/freestudying/adviceforbeginners#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much money do I need to start trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can start with $50-200 at brokers offering micro-lots. However, a comfortable starting point is around $500. The key rule: only trade with money you can afford to lose.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to learn trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Basic theory can be mastered in 1-2 months. Developing consistent skills takes 6-12 months of practice. Stable results typically appear after 1-2 years of systematic work.',
          },
        },
        {
          '@type': 'Question',
          name: 'What leverage should beginners use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners should use leverage no higher than 1:10-1:20. High leverage amplifies both profits and losses.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do most traders lose money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main reasons: lack of trading plan, poor risk management, emotional decisions, insufficient preparation, and unrealistic expectations of quick profits.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which trading style is best for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners should start with swing trading (positions held for several days). It allows time for analysis and reduces noise impact.',
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
      '@id': 'https://arapov.trade/en/freestudying/adviceforbeginners#howto',
      name: 'How to Start Trading Financial Markets',
      description: 'Step-by-step plan for beginner traders',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn basic theory',
          text: 'Spend 3-4 weeks studying fundamentals: market types, asset classes, basic terminology.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a reliable broker',
          text: 'Verify regulator license, compare spreads and commissions, test the platform on demo.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Create a trading plan',
          text: 'Define goals, choose strategy, document entry and exit rules, set risk limits.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice on demo account',
          text: 'Trade for 1-2 months with virtual money, keep a trading journal, analyze results.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Start with minimum capital',
          text: 'Transition to live trading with minimal funds, maintain risk management.',
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
      '@id': 'https://arapov.trade/en/freestudying/adviceforbeginners#terms',
      name: "Trader's Glossary",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description: 'Difference between ask and bid price',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Leverage',
          description: 'Borrowed funds from broker increasing trading capital',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Order for automatic position closure at specified loss level',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-Profit',
          description: 'Order for automatic position closure at target profit',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Lot',
          description: 'Standard unit of trading position volume',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Margin',
          description: 'Collateral funds blocked for leveraged positions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volatility',
          description: 'Degree of asset price variation over a period',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Scalping',
          description: 'Trading style with numerous short intraday trades',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing Trading',
          description: 'Trading positions held from days to weeks',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description: 'System of managing risks to protect capital',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
