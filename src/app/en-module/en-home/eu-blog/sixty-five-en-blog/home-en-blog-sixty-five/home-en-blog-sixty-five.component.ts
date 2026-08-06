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
  selector: 'app-home-en-blog-sixty-five',
  templateUrl: './home-en-blog-sixty-five.component.html',
  styleUrl: './home-en-blog-sixty-five.component.scss',
})
export class HomeEnBlogSixtyFiveComponent {
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
      'Order Book & Time and Sales: How to Read Market Depth | Igor Arapov',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete guide to Order Book and Time & Sales analysis. Learn to read market depth, identify institutional activity, spot manipulation, and find high-probability entries.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stockorderbook.png',
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
          '@id': 'https://arapov.trade/en/freestudying/stockorderbook#article',
          headline:
            'Order Book & Time and Sales: Complete Guide to Reading Market Depth',
          description:
            'Master Order Book and Time & Sales analysis to identify institutional activity and find high-probability trade entries.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stockorderbook1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/en#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/stockorderbook',
          },
          articleSection: 'Trading Education',
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
      '@id': 'https://arapov.trade/en/freestudying/stockorderbook#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an Order Book in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Order Book (also called Depth of Market or DOM) is a real-time display of all active limit orders to buy and sell an asset. Buy orders (Bids) appear below the current price, sell orders (Asks) above. It shows how many contracts traders are willing to trade at each price level.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Time & Sales differ from the Order Book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The Order Book shows pending limit orders — intentions. Time & Sales shows executed trades — actual actions. The Order Book answers 'who wants to trade,' while the tape answers 'who is actually trading.' Combining both reveals the complete picture.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is spoofing in the Order Book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Spoofing is a manipulative tactic where large traders place substantial limit orders without intending to execute them. The goal is to create false impressions of supply or demand, trigger price movements, then cancel orders before execution. Spoofing is illegal on regulated markets.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an iceberg order?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An iceberg order is a hidden limit order split into multiple smaller portions. Only a fraction shows in the Order Book; the full size remains hidden. As each portion executes, another appears. This allows large players to enter positions without revealing their true size.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I identify manipulation in the Order Book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Signs of manipulation include: large orders disappearing before price reaches them, rapid appearance/cancellation of orders, volume in the Order Book not matching actual trades in Time & Sales. Always compare both tools to filter false signals.',
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
      '@id': 'https://arapov.trade/en/freestudying/stockorderbook#howto',
      name: 'How to Analyze Order Book and Time & Sales',
      description:
        'Step-by-step guide to reading market depth for finding trade entries',
      totalTime: 'PT25M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Configure Order Book display',
          text: 'Set up your DOM ladder on your trading platform. Select appropriate depth — typically 10-20 levels suffice for analysis.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify significant orders',
          text: 'Locate levels with abnormally high volume. These represent potential support (large Bids) or resistance (large Asks) zones.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Open Time & Sales window',
          text: 'Add the tape reader alongside your Order Book. Configure filters to display only large prints above your threshold.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Cross-reference both tools',
          text: 'Verify whether large orders from the Book actually execute. If orders persist but no matching trades appear — likely manipulation.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Identify activity patterns',
          text: 'Watch for absorption, iceberg orders, and clusters of large prints. These signal institutional presence and potential trade setups.',
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
      '@id': 'https://arapov.trade/en/freestudying/stockorderbook#glossary',
      name: 'Order Book Trading Glossary',
      inLanguage: 'en',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description:
            'Real-time display of active limit buy and sell orders, also called DOM or Depth of Market.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Time & Sales',
          description:
            'The tape — real-time stream of executed market transactions showing price, size, and direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid',
          description: 'Limit buy order placed below current market price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask',
          description: 'Limit sell order placed above current market price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description: 'The difference between best bid and best ask prices.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Depth',
          description:
            'Total volume of orders at various price levels in the Order Book.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spoofing',
          description:
            'Illegal manipulation using fake orders to create false impressions of supply or demand.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg Order',
          description:
            'Hidden order split into smaller portions to mask true size.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Absorption',
          description:
            'When limit orders absorb aggressive market orders without price movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Print',
          description: 'An executed trade appearing on the Time & Sales tape.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
