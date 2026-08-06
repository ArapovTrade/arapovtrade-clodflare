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
  selector: 'app-home-en-blog-ninty-nine',
  templateUrl: './home-en-blog-ninty-nine.component.html',
  styleUrl: './home-en-blog-ninty-nine.component.scss',
})
export class HomeEnBlogNintyNineComponent implements OnInit {
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

    this.titleService.setTitle('MACD Indicator | Complete Trading Guide');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({
      name: 'description',
      content:
        'MACD Indicator: complete trading guide. Settings, signals, divergences, histogram analysis and trading strategies explained.',
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
            'MACD Indicator: Complete Guide to Moving Average Convergence Divergence',
          description:
            'MACD Indicator: complete trading guide. Settings, signals, divergences, histogram analysis and trading strategies explained.',
          image: 'https://arapov.trade/assets/img/content/macdindicator.png',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-16T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/macdindicator',
          },
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the MACD indicator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD (Moving Average Convergence Divergence) is a trend-following oscillator showing the relationship between two exponential moving averages. Developed by Gerald Appel in 1979 to determine trend strength and direction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the standard MACD settings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Classic MACD settings: fast EMA — 12 periods, slow EMA — 26 periods, signal line — 9 periods. These parameters work well for most markets and timeframes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade using MACD signals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main MACD signals: crossover of MACD line and signal line (buy when crossing from below, sell when crossing from above), zero line crossover, divergences between price and indicator.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the MACD histogram show?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The MACD histogram displays the difference between the MACD line and signal line. Growing histogram indicates strengthening momentum, declining histogram warns of weakening. Color change signals potential reversal.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between MACD and RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD is a trend indicator that works better in directional movements. RSI is an oscillator effective in sideways markets. MACD shows trend direction and strength, RSI shows overbought and oversold zones.',
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
      name: 'How to Use the MACD Indicator in Trading',
      description:
        'Step-by-step guide to applying MACD for finding trading signals',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add MACD to your chart',
          text: 'Open your trading platform, select MACD from the indicator list. Standard settings: 12, 26, 9. The indicator will display below the price chart.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Determine the current trend',
          text: 'Look at the MACD line position relative to the zero line. Above zero indicates bullish trend, below zero indicates bearish. This determines preferred trading direction.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Look for line crossovers',
          text: 'Watch for crossovers between the MACD line and signal line. Crossing from below upward is a buy signal, crossing from above downward is a sell signal.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze the histogram',
          text: 'Observe histogram bar height. Decreasing bars warn of weakening momentum and potential reversal or correction.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Check for divergences',
          text: 'Compare price extremes direction with MACD extremes. Divergence indicates trend weakening. Wait for confirmation before entering a trade.',
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
      name: 'MACD Indicator Terminology',
      description:
        'Key concepts for understanding the Moving Average Convergence Divergence indicator',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence — indicator measuring the convergence and divergence of moving averages',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD Line',
          description:
            'The difference between fast (12) and slow (26) exponential moving averages',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Signal Line',
          description:
            '9-period EMA of the MACD line, used for generating trading signals',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD Histogram',
          description:
            'Visual representation of the difference between MACD line and signal line',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Zero Line',
          description:
            'Central line of the indicator separating bullish and bearish territories',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Convergence',
          description:
            'Moving averages approaching each other, indicating trend slowdown',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Divergence',
          description:
            'Moving averages separating from each other, indicating trend strengthening',
        },
        {
          '@type': 'DefinedTerm',
          name: 'MACD Divergence',
          description:
            'Discrepancy between price direction and indicator, signaling potential reversal',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
