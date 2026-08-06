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
  selector: 'app-home-en-blog-ninty-two',
  templateUrl: './home-en-blog-ninty-two.component.html',
  styleUrl: './home-en-blog-ninty-two.component.scss',
})
export class HomeEnBlogNintyTwoComponent implements OnInit {
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

    this.titleService.setTitle(
      'Binary Options: What They Are, How They Work, and Should You Trade Them | Igor Arapov',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Binary options explained: comprehensive guide covering how they work, types of binary options, risks, and whether you should trade them.',
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
          '@id': 'https://arapov.trade/en/freestudying/binarnyeopciony#article',
          headline:
            'Binary Options: What They Are, How They Work, and Should You Trade Them',
          description:
            'Binary options explained: comprehensive guide covering how they work, types of binary options, risks, and whether you should trade them.',
          image: 'https://arapov.trade/assets/img/content/binarnieoptions1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/binarnyeopciony',
          },
          articleSection: 'Trading Education',
          keywords: [
            'binary options',
            'options trading',
            'Call Put options',
            'trading risks',
            'expiration',
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
      '@id': 'https://arapov.trade/en/freestudying/binarnyeopciony#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are binary options in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Binary options are financial contracts where traders predict whether an asset's price will move up or down within a specific timeframe. The outcome is always one of two: either a fixed profit (typically 60-90% of the stake) or complete loss of the invested amount. The name 'binary' comes from this two-outcome nature.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can you make money trading binary options?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Theoretically yes, but in practice most traders lose money. Reasons include: negative expected value (losing trades cost 100% while winning trades pay 60-90%), short timeframes, and emotional trading. Consistent profitability requires a serious strategy and strict discipline.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do binary options differ from Forex trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In Forex, profit depends on how much the price moves, and you can use stop-losses and manage positions. In binary options, the outcome is fixed: whether price moves 1 pip or 100, you either get a fixed percentage or lose your entire stake. Forex also has no time limit on holding positions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are binary options legal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Legal status varies by country. In the EU and UK, binary options are banned for retail clients. In the US, they're legal only on regulated exchanges (NADEX, CBOE). In many other countries, they exist in a gray area — not prohibited but not regulated, creating risks with unscrupulous brokers.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the minimum deposit for binary options trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most brokers offer minimum deposits from $10-50, with minimum trades starting at $1. However, this low entry barrier is also a trap: small deposits quickly disappear after a series of losing trades. Having adequate capital for proper risk management is recommended.',
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
      '@id': 'https://arapov.trade/en/freestudying/binarnyeopciony#howto',
      name: 'How to Start Trading Binary Options',
      description: 'Step-by-step guide for beginners in binary options trading',
      totalTime: 'PT30M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '10-100',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn the basics and risks',
          text: 'Before investing money, understand binary options mechanics, their risks and characteristics. Recognize this is a high-risk instrument with negative expected value.',
          url: 'https://arapov.trade/en/freestudying/binarnyeopciony#basics',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a reliable broker',
          text: 'Check for licensing, broker reputation, and real trader reviews. Avoid companies with aggressive advertising and guaranteed profit promises.',
          url: 'https://arapov.trade/en/freestudying/binarnyeopciony#broker',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Practice on a demo account',
          text: 'Most brokers offer demo accounts with virtual money. Use it to develop your strategy and understand the platform interface.',
          url: 'https://arapov.trade/en/freestudying/binarnyeopciony#demo',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Develop a trading strategy',
          text: 'Define entry rules, expiration time selection, and stake size. Never trade randomly — this turns trading into gambling.',
          url: 'https://arapov.trade/en/freestudying/binarnyeopciony#strategy',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Start with minimum amounts',
          text: 'When transitioning to real trading, start with minimum stakes. Risk no more than 1-2% of deposit per trade. Control emotions and strictly follow your plan.',
          url: 'https://arapov.trade/en/freestudying/binarnyeopciony#start',
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
      '@id': 'https://arapov.trade/en/freestudying/binarnyeopciony#terms',
      name: 'Binary Options Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Binary Option',
          description:
            'A financial contract with two possible outcomes: fixed profit if the prediction is correct or loss of stake if incorrect',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Expiration',
          description:
            'The moment when a binary option closes and the trade result is determined',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Call Option',
          description:
            'A bet that the asset price will be higher at expiration',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Put Option',
          description: 'A bet that the asset price will be lower at expiration',
        },
        {
          '@type': 'DefinedTerm',
          name: 'One Touch',
          description:
            'An option type requiring the price to touch a specified level before expiration',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Payout',
          description:
            'The percentage of profit from the stake amount on a successful prediction, typically 60-90%',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Strike Price',
          description:
            'The asset price at the moment of opening the option, against which the result is determined',
        },
        {
          '@type': 'DefinedTerm',
          name: 'In The Money (ITM)',
          description:
            'Option status when the prediction was correct and the trader receives profit',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Out of The Money (OTM)',
          description:
            'Option status when the prediction was incorrect and the trader loses the stake',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Turbo Option',
          description:
            'Ultra-short-term option with expiration time from 30 seconds to 5 minutes',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
