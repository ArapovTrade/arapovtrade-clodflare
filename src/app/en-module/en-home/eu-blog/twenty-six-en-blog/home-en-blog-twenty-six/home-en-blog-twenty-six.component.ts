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
  selector: 'app-home-en-blog-twenty-six',
  templateUrl: './home-en-blog-twenty-six.component.html',
  styleUrl: './home-en-blog-twenty-six.component.scss',
})
export class HomeEnBlogTwentySixComponent implements OnInit {
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
      'Trading Psychology: How to Control Emotions | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How emotions affect trading: fear, greed, FOMO and tilt. The cognitive biases and the techniques that help you trade by the system.',
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
            'Trading Psychology: Why It Beats Strategy and How to Keep Emotions Under Control',
          description:
            'How emotions affect trading: fear, greed, FOMO and tilt. The cognitive biases and the techniques that help you trade by the system.',
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
            '@id': 'https://arapov.trade/en/freestudying/trading-psychology',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/emotionsaffect.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Trading psychology',
          keywords:
            'trading psychology, fear, greed, FOMO, tilt, cognitive biases, discipline',
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
          name: 'Is trading psychology really more important than strategy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, because even a technically sound trader loses money when trades are executed on emotion. The market is neutral; people mostly lose inside their own heads, as fear, greed and haste break any system. So working on psychology is not a soft optional topic but a good half of the result.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do fear and greed affect a trader?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fear makes you exit profit early and hold a loss hoping it returns. Greed mirrors it, pushing you to overstay a position and risk too much. They work as a pair and swing the trader between extremes, and after a painful loss tilt and the urge to win it all back often follow.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is FOMO and why does it make people buy the top?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO is the fear of missing a profit when price runs fast without you. It fires exactly when the move is almost over and everyone has already written about it, so the beginner enters at the very top, while professional money is fixing profit at that moment and handing it to the latecomers.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is tilt and why is it dangerous?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tilt is the state where, after a painful loss, a trader loses control and starts taking revenge on the market, opening trade after trade just to win it back fast. That is exactly how an account is blown in one evening. The best defence is a pause after a loss and a hard limit on trades.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you remove emotions from trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "You don't beat emotions in the moment, you take them out of the equation in advance with a trading plan: entries, exits, stop and risk written down before the terminal is open. The stop removes painful hope, small risk lowers fear, and a journal plus a pause after a loss keep you from breaking into revenge trading.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do you overcome the fear of entering a trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fear of entry is almost always about too much risk. Cut the share of the account per trade to one where the loss does not scare you, and write the entry, stop and target in advance, so the plan decides, not emotion in the moment. When the cost of a loss is small and the scenario is set, the hand stops shaking over the button, and practising on a demo account adds calm through habit.',
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
      '@id': 'https://arapov.trade/en/freestudying/trading-psychology#howto',
      name: 'How to work with psychology in trading',
      description:
        "A step-by-step look at a trader's main psychological traps and what to set against them",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Accept that the result is decided in your head, not on the chart',
          text: 'The market is neutral, and the same chart is traded by one as a casino and by another as a business.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Learn to see fear, greed and euphoria in your decisions',
          text: 'Loss aversion is built so that the pain of a loss is felt more strongly than the joy of an equal gain.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: "Recognise FOMO and don't enter at the top",
          text: 'FOMO fires exactly when the move is almost over and the last in have rushed into the market.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Understand how the crowd hands money to big capital',
          text: 'The market transfers money from the emotional crowd to cold capital: the crowd sells in fear at the bottom in accumulation and buys in euphoria at the top in distribution, while big capital stands on the other side of its emotions.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Notice cognitive biases instead of fighting them with willpower',
          text: 'Cognitive biases are built-in patterns of thinking that, on the market, slip you a convenient picture instead of a cold assessment.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Survive a drawdown and a streak without revenge',
          text: 'A losing streak is the normal statistics of a profitable system, not a breakage; keep small risk per trade so a drawdown does not knock you out emotionally, and keep a journal that separates a bad decision from an unlucky outcome.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Take emotions out of the equation with a plan, a stop and a journal',
          text: 'Emotions cannot be beaten in the moment, they must be taken out of the equation in advance with a trading plan.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Walk the path from thrill to discipline consciously',
          text: "Psychology moves through stages, from a beginner's recklessness through fear and grail-hunting to a maturity where a trade is a line in the journal; the path cannot be skipped, only shortened, by changing how you make decisions rather than hunting a magic indicator.",
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
      name: 'Glossary of terms in this article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'The fear of missing out: acute anxiety at the thought of a missed chance to earn, pushing you to enter the market on emotion.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'A state in which, after a painful loss, a trader loses control and starts taking revenge on the market with a string of trades to win it back fast.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cognitive biases',
          description:
            'Systematic errors of thinking that make a trader assess the market and their own trades unobjectively and take irrational decisions.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading discipline',
          description:
            'The habit of acting strictly by rules of entry, exit and risk written in advance, rather than by momentary feelings.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Loss aversion',
          description:
            'A cognitive bias in which the pain of a loss is felt more strongly than the joy of an equal gain, so a trader cuts profit early and holds a loss to the last.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'A temporary decline of the trading account after a run of losing trades; for a strategy profitable over the distance, losing streaks are statistically normal and do not mean the method is broken.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
