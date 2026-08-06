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
  selector: 'app-home-en-blog-fourty-two',
  templateUrl: './home-en-blog-fourty-two.component.html',
  styleUrl: './home-en-blog-fourty-two.component.scss',
})
export class HomeEnBlogFourtyTwoComponent implements OnInit {
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
      'Trading Styles: Scalping, Day Trading, Swing | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading styles in simple terms: scalping, intraday, swing and position trading. How they differ and which style suits whom.',
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
            'Trading styles: scalping, day trading and swing — which to choose as a beginner',
          description:
            'Trading styles in simple terms: scalping, intraday, swing and position trading. How they differ and which style suits whom.',
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
            '@id': 'https://arapov.trade/en/freestudying/trading-styles',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trading-styles.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Trading for beginners',
          keywords: 'trading styles, scalping, day trading, swing trading',
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
          name: 'Which trading style should a beginner choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "In my experience it is calmer to start with medium-term swing. Decisions are made without a rush, you don't have to sit at the screen all day, and there are fewer emotions. A fast tempo hits a discipline that is not yet fixed, and a beginner easily slides into impulsive trading. To day trading, and even more so to scalping, it is more sensible to come already prepared.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does scalping differ from day trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'By tempo and the size of the move. A scalper sits on seconds and minutes and makes dozens of trades for micro-moves in points. A day trader holds a trade for hours, catches a larger move and makes from one to a few trades a day, but by the close exits all positions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is swing trading in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a style in which a position is held from several days to several weeks and you take the whole swing of a move rather than every small fluctuation. You work on the higher timeframes, more often the daily and four-hour chart, where the picture is visible rather than the noise. The style is calm and suits busy people, but it demands patience.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is commission so dangerous in scalping?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Because commission and spread sit inside every trade, and on a tiny move they take a huge share of the profit, up to half. Multiply that by dozens of trades a day, and the mathematical expectation goes into the minus. Without the costs the odds would be roughly fifty-fifty, but it is exactly they that most often drain the scalper's account.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the main advantage of day trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The absence of night risks: since all positions are closed by the end of the day, the trader is not touched by overnight price gaps and news coming out while the market is closed. The downside is a high load on attention and the psyche, because decisions have to be made fast and often throughout the whole day.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does position trading differ from swing and investing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'By horizon and by what it leans on. Swing is days and weeks on technical analysis, while position trading is months and years first of all on fundamentals. What sets it apart from investing is activity: a position trader exits when the trade idea breaks, rather than holding an asset indefinitely. It takes the least time of all the styles, but it locks up capital for a long while.',
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
      '@id': 'https://arapov.trade/en/freestudying/trading-styles#howto',
      name: 'How to understand trading styles and choose your own',
      description:
        'A step-by-step breakdown of the topic and its practical use in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what trading styles there are',
          text: 'Styles differ above all by the horizon of the trade: from seconds in scalping to weeks in swing.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Understand why commission eats scalping',
          text: 'On a tiny move a fixed commission and spread take a huge share of the result, pulling the expectation below zero.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Compare day trading and swing by load and time',
          text: 'Day trading closes the day with no night risks but loads the psyche, while swing is calmer but demands patience.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Choose a style for yourself, starting with the calm one',
          text: 'A beginner is calmer to start with medium-term swing and come to the fast tempo already with discipline.',
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
          name: 'Scalping',
          description:
            'A trading style in which a trade lives seconds or minutes, and the trader takes a very small price move in points, making dozens or even hundreds of trades a day.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Day trading',
          description:
            'A style of intraday trading in which a trader opens and closes all positions within one trading day, not leaving them overnight.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Swing trading',
          description:
            'A trading style in which a trader holds positions from several days to several weeks, aiming to take the medium-term move of the market from one reversal to another.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Position trading',
          description:
            'A trading style that holds positions from several months to several years, leaning first of all on fundamentals and demanding the least screen time.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Algo trading',
          description:
            'Trading by rules wired into a program that executes trades automatically; defined not by the trade horizon but by the manner of execution.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
