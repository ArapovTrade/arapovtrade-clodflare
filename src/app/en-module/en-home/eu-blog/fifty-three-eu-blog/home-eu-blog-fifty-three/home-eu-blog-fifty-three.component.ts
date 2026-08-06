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
  selector: 'app-home-eu-blog-fifty-three',
  templateUrl: './home-eu-blog-fifty-three.component.html',
  styleUrl: './home-eu-blog-fifty-three.component.scss',
})
export class HomeEuBlogFiftyThreeComponent implements OnInit {
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
      'How to Read a Chart: Technical Analysis Basics | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How to read a price chart: chart types, timeframes, trends, support and resistance levels. The technical analysis basics for a beginner.',
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
            'How to read a price chart: technical analysis, levels, timeframes and channels',
          description:
            'How to read a price chart: chart types, timeframes, trends, support and resistance levels. The technical analysis basics for a beginner.',
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
            '@id': 'https://arapov.trade/en/freestudying/chart-reading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/chart-reading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical analysis',
          keywords:
            'reading a chart, technical analysis, chart types, japanese candlesticks, timeframes, support and resistance levels, trend channels',
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
          name: 'What is technical analysis in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is reading the price and volume chart to work out where an asset is cheap and where it is expensive, and to find an entry. It answers not why price moves but where it is cheap and where it is dear, on the assumption that everything already known to the market is baked into the quote.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which chart type is best for a beginner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Usually the candlestick. It gives you the full price for the period and reads fastest thanks to the coloured body: one glance tells you whether price went up or down. A line chart is handy for the big picture and a bar chart takes practice, so the candle is the comfortable middle ground.',
          },
        },
        {
          '@type': 'Question',
          name: 'What timeframe should a beginner choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The higher ones, the hour and the day. They carry less noise and fewer false signals, leave more room for analysis, and the spread and commissions eat a smaller share. One more plus: a higher chart does not chain you to the screen, you can run it alongside a job.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you draw support and resistance correctly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Draw the level as a zone, not a perfect line along the very peak. Lean on several touches: the more often price responded to a patch, the firmer it is. And check it against volume, because a level that matters is one that large turnover passed through.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you tell a real breakout from a false one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'By volume. A real breakout runs on raised volume and settles beyond the level, while a false break is usually sluggish: price jumps past the level, collects stops and comes straight back. So it is wiser to wait for a hold and a retest than to dive into the false break at once.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do chart patterns actually work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As ready-made signals, in my experience, they work about half the time: everyone sees them, and big money harvests liquidity off them. The edge shows up when you play off zones and confirm the entry with volume, not when you guess from a drawing on the chart.',
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
      '@id': 'https://arapov.trade/en/freestudying/chart-reading#howto',
      name: 'How to learn to read a price chart',
      description:
        'A step-by-step path: from the chart type and timeframe to levels, channels and confirming the entry with volume',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what technical analysis reads',
          text: 'Technical analysis reads the behaviour of price and volume and answers where an asset is cheap and where it is expensive, and the most objective thing on the chart is a level.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a chart type',
          text: 'A line chart shows only the close, while a bar and a candle carry the full price data, which is why serious work is done on candles.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Pick a timeframe to fit your style',
          text: 'The lower the timeframe, the more noise, so a beginner is calmer starting on the higher periods.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Work top down across timeframes',
          text: 'The higher timeframe sets the direction, the lower one is only there for a precise entry in that direction.',
        },
        {
          '@type': 'HowToStep',
          name: 'Read the market phase: trend or range',
          text: 'First work out the phase: an up or down trend is imbalance, a range is balance and a price box of accumulation or distribution; in a range work the edges, in a trend only with the trend.',
          position: 5,
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Draw a level as a zone, not a line',
          text: 'A level is a range across several touches, confirmed by volume, not an exact line along a peak.',
        },
        {
          '@type': 'HowToStep',
          name: 'Read the structure of the move: impulse and pullback',
          text: 'A trend is made of impulses on raised volume and pullbacks on lower volume; while highs and lows keep updating the structure holds, and a break with a retest of the priority-change level shows control has changed.',
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Enter on reaction and volume, not on a pattern',
          text: 'Chart patterns come out roughly fifty-fifty, so the entry comes from a level with volume confirmation, not from a drawing.',
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
          name: 'Technical analysis',
          description:
            'A method of studying the market by the price chart and trading volume, without looking at news or reports, on the premise that everything the market knows is already absorbed into the quote.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading chart',
          description:
            "A visual representation of how an asset's price changes over time; it can be a line, a bar or a candlestick chart.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Timeframe',
          description:
            'The time interval that a single candle or bar holds; on the hourly, for instance, one candle packs in exactly an hour of trading.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Support and resistance level',
          description:
            'A price zone where the move has stalled or reversed before: support below, resistance above.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading channel',
          description:
            'A price zone between two parallel trend lines that price swings inside: the upper line is dynamic resistance, the lower one dynamic support.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market phase',
          description:
            'The current mode of price movement: an up trend, a down trend or a range; a range is balance and a price box of accumulation or distribution, a trend is imbalance and price leaving the box.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Priority-change level',
          description:
            'A price whose break and hold show that control of the market has passed from sellers to buyers or the other way round; the change reads most reliably as a break plus a retest.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
