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
  selector: 'app-home-en-blog-fourty-three',
  templateUrl: './home-en-blog-fourty-three.component.html',
  styleUrl: './home-en-blog-fourty-three.component.scss',
})
export class HomeEnBlogFourtyThreeComponent implements OnInit {
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
      'Trading System: How to Build and Optimize | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What a trading system is, what it consists of, how to build, test and optimize it without curve-fitting it to past data.',
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
            "A Trading System from Scratch: Plan, Backtest and Trader's Journal",
          description:
            'What a trading system is, what it consists of, how to build, test and optimize it without curve-fitting it to past data.',
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
            '@id': 'https://arapov.trade/en/freestudying/trading-system',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingsystem.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Trading systems',
          keywords:
            "trading system, trading plan, backtest, trader's journal, strategy testing, demo account, risk management",
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
          name: 'What is a trading system in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's a set of preset rules: when to enter a trade, when to exit and how much to risk. Its job is to make the average result over the distance positive and remove chaotic decisions made on emotion. Without a system, trading turns into a coin toss.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does a trading plan differ from a system?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The system is the method and the entry signal itself. The plan is your personal rules around it: what risk per trade, what you trade and what you skip, when it's better not to enter the market at all. The system answers the question of how, the plan answers how exactly you behave.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do you test a trading system before real money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "First a backtest on history, then a forward test. Run the rules over past data, then necessarily over new data the system hasn't seen, on demo or a small real account. A distance of about a hundred trades shows the real edge with costs taken into account.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is overoptimization in a backtest?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's fitting the strategy's parameters to history up to a perfect curve. As a result the strategy describes the past rather than finding a working edge, and on new data it falls apart. The more precisely it sits on history, the worse it usually works afterward.",
          },
        },
        {
          '@type': 'Question',
          name: "Why do you need a trader's journal?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To see your recurring mistakes from the outside and remove them. Memory is unreliable: the lucky trades are remembered, the failed ones forgotten. The journal removes this self-deception and shows the real statistics, if you record the reason for entry and the emotions, not just the result.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which trading system is best?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "In my experience the simplest of those that give an edge. The more conditions and filters in a system, the harder it is to follow. A working but followed system always beats a perfect one abandoned at the market's first pressure.",
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
      '@id': 'https://arapov.trade/en/freestudying/trading-system#howto',
      name: 'How to build and test a trading system',
      description:
        "A step-by-step walk: from understanding why a system is needed, to its composition, the plan, the backtest, the forward test and the trader's journal",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand why you need a trading system',
          text: 'A trading system is preset rules of entry, exit and risk that make the average result over the distance positive.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Assemble the system from entry, exit and risk management',
          text: 'A working system is assembled from an entry condition, exit conditions and risk-management rules.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Write your personal rules into a trading plan',
          text: 'A trading plan is the written personal rules around the system: risk, discipline and what you trade and what you skip.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Test the system with a backtest without curve-fitting',
          text: 'A backtest runs the rules over past history, and the defence against fitting is splitting the data into a tuning part and a validation part.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Run a forward test on demo',
          text: 'After the backtest the system is tested forward on new data over about a hundred trades, better first on a demo account.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: "Keep a trader's journal and review your mistakes",
          text: "A trader's journal over the distance reveals the recurring mistakes that memory itself hides.",
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
          name: 'Trading system',
          description:
            'A set of preset rules that determine under what conditions to open and close a trade and how much to risk in doing so.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading plan',
          description:
            'A written set of rules by which you trade: which instruments, in what conditions, where the entry, where the stop, where the target and what risk.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Backtest',
          description:
            "A check of a trading strategy on the market's historical data, to assess whether it had profit in the past and how stably it worked.",
        },
        {
          '@type': 'DefinedTerm',
          name: "Trader's journal",
          description:
            'A structured record of all the trades made, with the reasons for entry and exit, the result and the emotional state, which helps to find and fix recurring mistakes.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
