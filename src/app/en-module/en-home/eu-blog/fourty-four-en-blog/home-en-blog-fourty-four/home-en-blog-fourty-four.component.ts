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
  selector: 'app-home-en-blog-fourty-four',
  templateUrl: './home-en-blog-fourty-four.component.html',
  styleUrl: './home-en-blog-fourty-four.component.scss',
})
export class HomeEnBlogFourtyFourComponent implements OnInit {
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
    this.titleService.setTitle('Stochastic Oscillator | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'The stochastic oscillator: settings, the %K and %D lines, overbought and oversold signals, divergences and combining it with the trend.',
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
            'Stochastic Oscillator in Trading: What It Is and When It Works',
          description:
            'The stochastic oscillator: settings, the %K and %D lines, overbought and oversold signals, divergences and combining it with the trend.',
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
            '@id': 'https://arapov.trade/en/freestudying/stochastic-oscillator',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stochastic1.jpg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical analysis',
          keywords:
            'stochastic oscillator, what is the stochastic, overbought oversold, %K %D, stochastic divergence, stochastic settings, stochastic in a trend',
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
          name: 'What does the stochastic oscillator show in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It shows whether price closed nearer the top or the bottom of its recent range. Near the top the value is high, near the bottom low. At bottom it's a gauge of momentum, not a predictor of the future.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are the standard stochastic settings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most often the default is a period of 14, signal-line smoothing of 3, and zones at 80 and 20. These are starting values, tuned to the instrument and the timeframe. There are no universal numbers.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between the stochastic and the RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are momentum oscillators on a 0-to-100 scale, but they ask slightly different questions: the stochastic shows where the close sits in the recent high-low range, handy for timing entries in a range, while RSI measures the broader strength of the move. Because both are built from the same price they tend to agree, so running them together rarely gives a truly independent second opinion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does overbought on the stochastic mean it is time to sell?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. A reading above 80 only means price closed near the top of its recent range. In a strong uptrend the stochastic can stay above 80 for weeks while price keeps rising, so selling on the reading alone trades against the move. Overbought is a reason to look closer, not a command, and it carries weight mainly in a range.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the stochastic give false signals in a trend?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Because in a strong trend price holds at one edge of the range for a long time. The indicator sticks above 80 or below 20 and fires signal after signal against the move. In a range that problem almost vanishes, and there it's more meaningful.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can you trade with the stochastic alone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In my experience, no. It lags and is derived from price, so on its own it often deceives. If you do use it, then as a helper in a range, while I build the core of the decision on volume and levels.',
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
      '@id': 'https://arapov.trade/en/freestudying/stochastic-oscillator#howto',
      name: 'How to understand and use the stochastic oscillator in trading',
      description:
        'A step-by-step walk through the topic and its practical use in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Learn what the stochastic oscillator is',
          text: 'The stochastic is a momentum indicator that compares the closing price with the range of highs and lows over a chosen period and plots the result as two lines on a 0-to-100 scale.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Know the %K formula and the 14, 3, 3 settings, fast versus slow',
          text: '%K measures where the close sits in the recent high-low range, %D is its smoothed signal, and 14, 3, 3 is the standard slow-stochastic default.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Read stochastic signals: line cross and the overbought zone',
          text: 'The stochastic has three signals.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Stochastic in a range versus a trend: where it works and where it doesn't",
          text: "Here is where the indicator's main trap hides.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Stochastic and a moving average together: why they contradict each other',
          text: 'Beginners often stack several indicators on the chart hoping for accuracy.',
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
          name: 'stochastic',
          description:
            'A momentum indicator that compares the closing price with the range of highs and lows over a chosen period and plots the result as two lines on a 0-to-100 scale.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'slow stochastic',
          description:
            'The smoothed version of the stochastic that most platforms show by default: its %K is averaged over a few periods so it reacts more calmly and throws fewer false signals than the raw fast stochastic.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
