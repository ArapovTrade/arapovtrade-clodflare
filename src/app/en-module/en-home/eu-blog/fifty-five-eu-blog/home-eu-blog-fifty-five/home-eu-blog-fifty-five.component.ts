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
  selector: 'app-home-eu-blog-fifty-five',
  templateUrl: './home-eu-blog-fifty-five.component.html',
  styleUrl: './home-eu-blog-fifty-five.component.scss',
})
export class HomeEuBlogFiftyFiveComponent implements OnInit {
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
      'Candlestick Patterns: How to Read Japanese Candles | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Japanese candles and candlestick patterns: hammer, doji, engulfing, evening star. How to read reversal signals and why the level matters.',
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
            'Candlestick patterns: pin bar, engulfing, hammer and doji explained',
          description:
            'Japanese candles and candlestick patterns: hammer, doji, engulfing, evening star. How to read reversal signals and why the level matters.',
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
            '@id': 'https://arapov.trade/en/freestudying/candlestick-patterns',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/candlestick-patterns.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical analysis',
          keywords:
            'candlestick patterns, japanese candlesticks, pin bar, engulfing, hammer, doji, evening star',
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
          name: 'What are Japanese candlesticks in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a chart where every candle carries four prices for its period: the open, the close, the high and the low. The body and the wicks show how buyers and sellers fought over that stretch. The most important of the four is the close, because it shows who stayed in charge by the end.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which candlestick patterns actually work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A handful is enough: the pin bar, engulfing and the hammer. On their own their odds sit close to a coin toss, and large backtests confirm it. They turn into a working signal only at a strong level and with confirmation from volume. Memorising dozens of exotic formations is wasted effort.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between a pin bar and engulfing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A pin bar is one candle with a long wick and a small body, the trace of a level being rejected. Engulfing is two candles, where the second fully covers the body of the first and closes the other way, the moment control changes hands. Both matter only at a meaningful level.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does a doji mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A doji is a candle whose open and close almost coincide, so the body shrinks to a thin line. It shows balance and hesitation: neither buyers nor sellers took the upper hand. On its own a doji says nothing about direction, it is only a signal of a pause.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you trade with candlesticks alone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In my experience, no. A candle by itself is a picture with the odds split roughly evenly. I use it as the final brushstroke on a picture that is already there, only next to a key level and with confirmation from volume. The level gives the command to enter, the candle only fine-tunes the moment.',
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
      '@id': 'https://arapov.trade/en/freestudying/candlestick-patterns#howto',
      name: 'How to read candlestick patterns',
      description:
        'A step-by-step walk through Japanese candlesticks and the candlestick patterns that work, and how to apply them at a level and with volume',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn how a Japanese candle is built',
          text: 'A Japanese candle holds four prices for its period: the open, the close, the high and the low.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Read direction from the close against the open',
          text: 'A candle that closes above its open is bullish, one that closes below is bearish, and the body size hints at the strength of the move.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Recognise the pin bar as a rejection of a level',
          text: 'A pin bar is a single candle with a long wick and a small body, the trace of a price level being rejected.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Read engulfing as a change of control',
          text: 'Engulfing is two candles, where the second fully covers the body of the first and closes in the opposite direction.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Confirm the pattern with a level and volume',
          text: 'On its own a candle is close to a coin toss; a strong level and confirmation from volume are what make it work.',
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
          name: 'Japanese candlesticks',
          description:
            'A type of exchange chart where each element holds four prices for the period: the open, the close, the high and the low.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pin bar',
          description:
            'A single candle with a long wick and a small body that signals the rejection of a price level and a possible reversal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Engulfing',
          description:
            'A two-candle pattern where the body of the second fully covers the body of the first and closes in the opposite direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Harami',
          description:
            "A two-bar candlestick pattern in which the smaller candle's body sits wholly inside the body of the preceding larger one, signalling fading momentum and indecision.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hammer',
          description:
            'A reversal candle with a small body at the top and a long lower wick that appears after a decline and hints at a turn upward.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Doji',
          description:
            'A candle whose open and close almost coincide, so the body shrinks to a thin line; a sign of market indecision.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
