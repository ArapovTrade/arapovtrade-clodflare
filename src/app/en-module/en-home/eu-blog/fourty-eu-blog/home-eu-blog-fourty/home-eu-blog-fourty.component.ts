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
  selector: 'app-home-eu-blog-fourty',
  templateUrl: './home-eu-blog-fourty.component.html',
  styleUrl: './home-eu-blog-fourty.component.scss',
})
export class HomeEuBlogFourtyComponent implements OnInit {
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
      'Trade Management: Entry, Handling, Exit | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How to manage a trade after entry: moving to breakeven, partial closing, trailing stop and the discipline of exiting by plan, not emotion.',
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
            'Trade management in trading: take-profit, break-even, trailing and hedge',
          description:
            'How to manage a trade after entry: moving to breakeven, partial closing, trailing stop and the discipline of exiting by plan, not emotion.',
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
            '@id': 'https://arapov.trade/en/freestudying/trade-management',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trade-management.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Risk management',
          keywords:
            'trade management, take profit, break-even, trailing stop, hedging, locking in profit, moving the stop, exiting a trade',
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
          name: 'What is trade management in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is everything you do with a position after the entry: where you lock in profit with the take, when you move the stop to break-even, how you carry the profit with a trailing stop. In essence it is managing your own greed and fear on the exit, since the plan there decides more than the entry itself.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do you correctly set a take-profit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'From the structure of the market, not from a desired sum. A logical target is the nearest strong level price will reach with high probability: a little below resistance in a long and a little above support in a short. First you look at how far price can really reach, then you count the profit.',
          },
        },
        {
          '@type': 'Question',
          name: 'When should you move the stop to break-even?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After price has travelled a noticeable distance in your direction and held above a level on volume. Before that moment the move is early: a normal pullback will catch the stop at the entry point and knock you out of a position that would later have worked into the plus.',
          },
        },
        {
          '@type': 'Question',
          name: 'What makes an early break-even dangerous?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A stop moved to zero too early catches the market noise and knocks you out of the trade before it has worked. Price goes off to the target without you. It turns out that, while protecting the profit, the trader cuts off its very source.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you set the distance of a trailing stop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'From how widely the instrument moves and how the move is built, not at random in points. The gap has to hold ordinary pullbacks but not hand back too much. A tight one stops you out on flat ground, a wide one gives back profit, and in a sideways market a trailing stop more often does harm.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does a beginner need hedging?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In my experience, no. The main task of a hedge, to limit a loss, is solved more simply and cheaply by an ordinary stop-loss. A hedge holds two opposing positions, adds spread, commissions and the risk of getting confused. A beginner is better off mastering protection by a stop and a risk of one to two percent per trade.',
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
      '@id': 'https://arapov.trade/en/freestudying/trade-management#howto',
      name: 'How to manage an open trade: take-profit, break-even, trailing and hedge',
      description:
        'A step-by-step breakdown of the topic and its practical use in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand that trade management begins after the entry',
          text: 'Trade management is everything a trader does with a position after the entry, to protect and take the profit by plan rather than on emotion.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set the take-profit from levels, not from a desired sum',
          text: 'The take-profit is set from the structure of the market, from the nearest strong level price will reach with high probability.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Count the take in tandem with the stop',
          text: 'The take on its own decides nothing, what matters is its ratio to the risk by the stop.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Move the stop to break-even after the move is confirmed',
          text: 'The stop is moved to break-even only after price has travelled the distance and held above a level on volume.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set the trailing stop from volatility',
          text: 'The distance of a trailing stop is set from the volatility of the instrument and the structure of the move.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: "Don't complicate protection with a hedge if a stop is enough",
          text: 'A beginner does not need hedging, its task is solved more simply and cheaply by an ordinary stop-loss.',
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
      name: 'Glossary of terms used in the article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Trade management',
          description:
            'Everything a trader does with a position after the entry, to protect and take the profit by plan rather than on emotion.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Take profit',
          description:
            'A pending order that automatically closes a position with a profit as soon as price reaches a level set in advance by the trader.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break-even',
          description:
            'Moving the stop-loss to the opening price of the position, after which the trade stops carrying the risk of a loss and at worst closes at zero.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hedging',
          description:
            'Reducing the risk on a main position by opening an opposite or related trade that brings profit when the main one goes into a loss.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
