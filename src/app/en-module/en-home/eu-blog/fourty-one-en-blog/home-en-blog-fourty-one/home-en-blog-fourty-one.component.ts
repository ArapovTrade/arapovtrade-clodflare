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
  selector: 'app-home-en-blog-fourty-one',
  templateUrl: './home-en-blog-fourty-one.component.html',
  styleUrl: './home-en-blog-fourty-one.component.scss',
})
export class HomeEnBlogFourtyOneComponent implements OnInit {
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
      'Trading for Beginners: Where to Start | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading for beginners from scratch: how markets work, what skills you need, first steps and typical beginner mistakes. A guide from Arapov.trade.',
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
    if (index == 0) {
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
            'Trading From Scratch for Beginners: Where to Start in 2026',
          description:
            'Trading for beginners from scratch: how markets work, what skills you need, first steps and typical beginner mistakes. A guide from Arapov.trade.',
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
            '@id': 'https://arapov.trade/en/freestudying/trading-for-beginners',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingbasics.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Trading for Beginners',
          keywords:
            'trading for beginners, trading from scratch, long and short, demo account, beginner mistakes, how to start trading',
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
          name: 'What is trading in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A way to earn on price movement: you take an asset cheaper, give it back dearer, or the other way round in a short. It differs from investing in timeframe, here minutes and weeks, not years. And it is a craft with an entry barrier, where profit shows only over a long series of trades.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does a beginner start trading in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First theory and choosing a method, then practice on demo to an even plus over a series, then a regulated broker and only after that a small live account with a stop and modest risk. At the start what matters most is not to rush and not to bet much.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does a long differ from a short?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A long is a purchase betting on a price rise, a short is selling a borrowed asset betting on a fall. A short is harder and more dangerous for a beginner: the loss in it is theoretically not capped from above, because price upward can go as far as it likes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many trades out of a hundred are losing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Losing trades exist even in a working system, roughly thirty out of a hundred, and that is the norm. More dangerous is the spread: red entries can go in a row of five to ten, and on big risk such a streak burns the account, though over the distance you would have been in profit.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much time is needed to become a steady trader?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not weeks but years of practice. The method itself takes two or three months, harder is to build up the stamina: to hold the rules, not jack up the risk, and not take revenge on the market. Practice and a trade journal speed up the road, not a pile of watched videos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you get rich quick on trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. It is a profession, not a fast-money till: income comes through study, discipline, and time, while the seekers of easy money usually lose it. Profitable trading is boring to look at, it is repeating the same steps by the rules.',
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
      '@id': 'https://arapov.trade/en/freestudying/trading-for-beginners#howto',
      name: 'How to start trading from scratch as a beginner',
      description:
        'A step-by-step path for a beginner trader: from understanding the basics to moving to a real account',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'What trading is in simple terms',
          text: 'Trading is working with financial assets: they are bought and sold to earn on price movement.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Whether to get into trading at all and who it is not for',
          text: 'Before learning how, honestly answer yourself the question of whether you should.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Long and short: how you earn on a rise and a fall',
          text: 'You can earn in trading in both directions, and that is the first thing worth lodging in your head.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Which method a beginner should choose: why I watch volume, not indicators',
          text: 'A method is what you look at when you decide to buy or sell.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'What a beginner should trade: one instrument instead of ten',
          text: 'The most frequent mistake at the start on the choice side is spreading thin: a beginner watches shares, crypto, currency, and a dozen coins at once.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'How to start trading on the exchange: a step-by-step path',
          text: "I divide a beginner's road into steps, and what matters here is not the pace but the order.",
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'How much money is needed to start and what return is realistic',
          text: 'The question of what sum to come in with a beginner asks first, though at the start it is not the main one.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'How a single trade works: entry, stop, and exit point',
          text: 'Since it has come to a real account, let us break down what a single trade is even made of.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Demo account: what it really teaches and what it does not',
          text: 'A demo is a tool everyone praises, but few honestly speak of its limits.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'The main beginner mistakes that lose the account',
          text: 'Year after year the picture of losses is the same: the market is almost not to blame, the source sits in the person themselves.',
        },
        {
          '@type': 'HowToStep',
          position: 11,
          name: 'Teaching yourself trading: a roadmap and a trade journal',
          text: 'Mastering trading on your own is realistic, I am living proof of it.',
        },
        {
          '@type': 'HowToStep',
          position: 12,
          name: 'What sets a successful trader apart and how long the path takes',
          text: 'A secret or a miracle strategy is expected from the answer.',
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
      name: 'Article glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trading',
          description:
            'Buying and selling financial assets to earn on the change in their price over a short horizon.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Long',
          description:
            'A long position: buying an asset betting on a rise in its price and earning on that rise.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Short',
          description:
            'A short position: selling a borrowed asset to buy it back cheaper after the price falls.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demo account',
          description:
            'A training account with virtual money and real quotes, on which trading is practised without risk to capital.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Averaging down a loss',
          description:
            "Adding to a losing position instead of closing by the stop in hope of a comeback, which increases the trader's risk and losses.",
        },
      ],
    };
    this.addJsonLdSchema(data);
  }
}
