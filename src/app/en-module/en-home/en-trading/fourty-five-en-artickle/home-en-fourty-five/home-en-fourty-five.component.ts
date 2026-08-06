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
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-en-fourty-five',
  templateUrl: './home-en-fourty-five.component.html',
  styleUrl: './home-en-fourty-five.component.scss',
})
export class HomeEnFourtyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,

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
    this.setBreadcrumbSchema();
    this.setHowToSchema();
    this.setVideoObjectSchema();
    this.setGlossarySchema();
    this.setEducationalOccupationalProgramSchema();
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });
    this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Free Trading Course for Beginners — Igor Arapov',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Free trading course from scratch: technical analysis, Wyckoff method, volume analysis, complete trading system with positive mathematical expectancy. 32 sections, live trade breakdowns.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'dateModified',
      content: '2026-06-25T00:00:00Z',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/content/freeeducationnew.webp',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `https://arapov.trade/assets/img/content/freeeducationnew.webp`,
    });
    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
  }
  scrollToFragment(fragment: string) {
    // requestAnimationFrame надёжнее чем setTimeout
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = this.document.getElementById(fragment);
        if (element) {
          const offset = 80;
          const top =
            element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 400);
    });
  }

  // Вызывай этот метод при клике на ссылку
  navigateTo(fragment: string) {
    this.router
      .navigate([], {
        fragment,
        // Это заставляет Angular эмитить событие даже если fragment тот же
        onSameUrlNavigation: 'reload',
      })
      .then(() => {
        this.scrollToFragment(fragment);
      });
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
  // navigateTo(path: string) {
  //   this.router.navigate([path]);
  // }
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
      'VideoObject',
      'EducationalOccupationalProgram',
      'BreadcrumbList',
      'Course', // NEW (Organization сюда НЕ добавлять)
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);
        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
        );
        if (shouldRemove) script.remove();
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
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://arapov.trade/en/freestudying/freeeducation#article', // ← было /ru/ (баг A)
          headline: 'Free Trading Course for Beginners — Igor Arapov',
          description:
            'Free trading course from scratch: technical analysis, Wyckoff method, volume analysis, complete trading system with positive mathematical expectancy. 32 sections, live trade breakdowns.',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2026-06-25T00:00:00+02:00', // ← было '2026-05-29T00:00:00Z+02:00' (баг B)
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/freeeducation',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/freeeducationnew.webp',
          },
          articleSection: 'Trading training',
          keywords: [
            'Free trading course',
            'Training in trading from scratch',
            'Trading for beginners',
            'Technical analysis',
            'Smart Money',
            'Volume analysis',
          ],
          video: [
            {
              '@id':
                'https://arapov.trade/en/freestudying/freeeducation#video2',
            },
          ],
        },
      ],
    });
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
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
        'Independent researcher',
        'trader',
        'author and founder of arapov.trade',
      ], // ← убрал хвостовую запятую в первом элементе
      description:
        'Independent researcher, practicing trader, author of books on trading and scientific publications. Specializes in trading psychology and cognitive biases in financial markets.',
    });
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://arapov.trade/en/freestudying/freeeducation#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I really learn trading without paying for courses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Absolutely. This course contains 51+ articles and 78+ video lessons covering everything from basics to advanced Smart Money strategies. It's designed to give you a complete education without any paid upsells.",
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to become a profitable trader?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Theory takes 3-4 weeks of dedicated study. Practice requires 100+ demo trades over 1-2 months. Total time to consistent profitability: approximately 3 months of systematic work. Most people fail because they skip steps or rush to real money too fast.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the 1:3 risk-to-reward ratio and why does it matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It means your potential profit should be at least 3 times your risk. If your stop-loss is 10 pips, your target should be 30+ pips. This math allows you to be profitable even with only 40% winning trades because winners are 3x larger than losers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who are Smart Money and why should I care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Smart Money refers to institutional traders — banks, hedge funds, market makers. They have enough capital to move price. They don't guess — they engineer moves to trap retail traders. Understanding their playbook helps you trade with them, not against them.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why do 90% of traders lose money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Three main reasons: no trading system (negative expectancy), no risk management (overleveraging), and emotional trading (revenge trades, FOMO). A proven system with strict rules eliminates all three problems.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much money do I need to start trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For learning: zero — use a demo account. For live trading: depends on your broker and instrument, but the amount matters less than proper risk management. Never risk more than 1-2% per trade, regardless of account size.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a Priority Change Level?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's the price zone where an impulse move started that broke previous highs or lows. This level shows where the dominant side (buyers or sellers) established control. When price returns to this zone, it often presents a high-probability entry point.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do I identify a false breakout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Signs of a false breakout: price pierces a level on high volume but fails to hold, forms a rejection candle (pin bar or engulfing), then reverses back into range and moves in the opposite direction. Smart Money uses these to trap retail traders.',
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
      '@id': 'https://arapov.trade/en/freestudying/freeeducation#howto',
      name: 'Complete Trading Education Roadmap',
      description:
        'Step-by-step path from complete beginner to consistent trader.',
      totalTime: 'P3M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Destroy the get-rich-quick illusion',
          text: 'Start with the beginner section. Understand that trading is a skill-based business, not a lottery ticket. Most fail because they expect easy money.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Master chart reading',
          text: 'Learn technical analysis fundamentals: market phases, support/resistance, trend structure, and priority change levels.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Add volume to your analysis',
          text: 'Study Wyckoff method and effort-vs-result principle. Volume reveals what price alone cannot — the intentions of big players.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Decode institutional behavior',
          text: 'Learn Smart Money concepts: false breakouts, liquidity grabs, stop hunts. Understand how institutions engineer price moves.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Build your risk management system',
          text: 'Master position sizing, stop-loss placement, and the 1:3 rule. This is what keeps you in the game during losing streaks.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Execute 100+ demo trades',
          text: 'Practice turns knowledge into skill. Keep a trading journal, analyze mistakes, track your statistics religiously.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Go live with minimal size',
          text: 'When demo shows consistent profits, start trading real money with the smallest possible position size. Scale up gradually.',
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
      '@id': 'https://arapov.trade/en/freestudying/freeeducation#terms',
      name: 'Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading',
          description:
            'Buying and selling financial instruments to profit from price movements.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Technical Analysis',
          description:
            'Forecasting price direction by studying charts, patterns, and price action.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support Level',
          description:
            'Price zone where buying pressure stops a decline and pushes price up.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Resistance Level',
          description:
            'Price zone where selling pressure stops a rally and pushes price down.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Institutional traders with enough capital to influence price movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'False Breakout',
          description:
            'Price move beyond a level that fails to hold and reverses.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'Protective order that automatically exits a losing trade at a set price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take-Profit',
          description:
            'Order that automatically locks in profit when price hits target.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'System of rules to protect trading capital from excessive losses.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Expectancy',
          description:
            'Average profit per trade that determines long-term profitability.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description: 'Percentage of profitable trades in a trading system.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Price Action',
          description:
            'Trading method based on raw price movement without indicators.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  VIDEOOBJECT
  // ============================================================
  private setVideoObjectSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'VideoObject',
          '@id': 'https://arapov.trade/en/freestudying/freeeducation#video2',
          name: 'Complete Trading Course for Beginners | From Theory to Your First Trade',
          description:
            'A free trading course for those who are just getting started with the market. No unnecessary theory — just the essentials, a trading system, and practice on a demo account. We cover everything from scratch: from the trading terminal to the entry point using the Wyckoff Method.',
          thumbnailUrl: 'https://i.ytimg.com/vi/tmiHem6NOZs/maxresdefault.jpg',
          uploadDate: '2026-05-29T00:00:00+02:00',
          duration: 'PT45M2S',
          contentUrl: 'https://www.youtube.com/watch?v=tmiHem6NOZs',
          embedUrl:
            'https://www.youtube.com/embed/tmiHem6NOZs?si=lMeQKyeWBPviIQPq',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
        },
      ],
    });
  }

  // ============================================================
  //  EducationalOccupationalProgram
  // ============================================================
  private setEducationalOccupationalProgramSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalProgram',
      '@id': 'https://arapov.trade/en/freestudying/freeeducation#program',
      name: 'Free trading course',
      description:
        'A complete trading training program from scratch: from basic concepts to a professional trading system',
      provider: { '@id': 'https://arapov.trade/#person' },
      timeToComplete: 'P3M',
      occupationalCategory: 'Trader',
      programType: 'Online course',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      hasCourse: {
        '@type': 'Course',
        name: 'Training in trading from scratch',
        description: 'Over 51+ articles and 78+ video tutorials on trading',
        provider: { '@id': 'https://arapov.trade/#person' }, // ← было инлайн 'Ihor Arapov'
      },
    });
  }

  private setBreadcrumbSchema(): void {
    this.addJsonLdSchema({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': 'https://arapov.trade/en/freestudying/freeeducation#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://arapov.trade/en',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Free education',
          item: 'https://arapov.trade/en/freestudying',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Free Trading Course for Beginners',
          item: 'https://arapov.trade/en/freestudying/freeeducation',
        },
      ],
    });
  }
}
