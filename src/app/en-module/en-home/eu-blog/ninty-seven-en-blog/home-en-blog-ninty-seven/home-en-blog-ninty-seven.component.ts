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
  selector: 'app-home-en-blog-ninty-seven',
  templateUrl: './home-en-blog-ninty-seven.component.html',
  styleUrl: './home-en-blog-ninty-seven.component.scss',
})
export class HomeEnBlogNintySevenComponent implements OnInit {
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
      'RSI Indicator | Complete Guide to Relative Strength Index',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'RSI Indicator (Relative Strength Index): complete trading guide. Settings, strategies, overbought and oversold signals, divergence patterns explained.',
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
          headline: 'RSI Indicator: Complete Guide to Relative Strength Index',
          description:
            'RSI Indicator (Relative Strength Index): complete trading guide. Settings, strategies, overbought and oversold signals, divergence patterns explained.',
          image: 'https://arapov.trade/assets/img/content/rsiindex1.png',
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
          datePublished: '2025-06-07T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/rsiindicator',
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
          name: 'What is the RSI indicator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI (Relative Strength Index) is a technical oscillator measuring the speed and magnitude of price changes on a scale from 0 to 100. Developed by Welles Wilder in 1978 to identify overbought and oversold conditions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What RSI values indicate overbought and oversold conditions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Classic levels: RSI above 70 signals overbought conditions (potential decline), RSI below 30 indicates oversold (potential rise). In strong trends, levels of 80/20 are used.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is RSI divergence?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Divergence is a discrepancy between price direction and the RSI indicator. Bullish divergence (price falling, RSI rising) foreshadows an upward reversal. Bearish divergence (price rising, RSI falling) signals a potential decline.',
          },
        },
        {
          '@type': 'Question',
          name: 'What RSI period is best to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The standard period is 14. For short-term trading, use 7-9; for long-term, 21-25. A shorter period gives more signals but increases false positives.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you trade using RSI alone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not recommended. RSI is more effective combined with other tools: support/resistance levels, volume analysis, Price Action patterns. A comprehensive approach improves entry accuracy.',
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
      name: 'How to Use the RSI Indicator in Trading',
      description:
        'Step-by-step guide to applying RSI for finding trading signals',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add RSI to your chart',
          text: 'Open your trading platform, select RSI from the oscillator list, and apply it to your chart. Standard settings: period 14, levels 70/30.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Determine the current trend',
          text: 'Analyze the higher timeframe to understand market direction. RSI works more effectively when signals align with the main trend.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Look for extreme zones',
          text: 'Note moments when RSI enters overbought (above 70) or oversold (below 30) zones. These are potential reversal areas.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Check for divergence',
          text: 'Compare the direction of price extremes with RSI extremes. Divergence indicates weakening momentum and a possible reversal.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Wait for confirmation',
          text: "Don't enter on the first RSI signal. Confirm entry through level breakout, candlestick pattern, or volume spike. Set stop-loss and take-profit.",
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
      name: 'RSI Indicator Terminology',
      description: 'Key concepts for understanding the Relative Strength Index',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — an oscillator measuring the relative strength of bullish and bearish movements',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overbought',
          description:
            'Market condition when price has risen too quickly and a downward correction is possible (RSI above 70)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Oversold',
          description:
            'Market condition when price has fallen too quickly and an upward bounce is possible (RSI below 30)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Divergence',
          description:
            'Discrepancy between price movement direction and indicator, signaling trend weakening',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Oscillator',
          description:
            'A class of indicators that oscillate within a defined range, showing movement momentum',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI Period',
          description:
            'Number of candles used for indicator calculation (standard value is 14)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Failure Swing',
          description:
            'RSI reversal pattern without reaching extreme zones, confirming trend change',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Centerline',
          description:
            'The 50 level on the RSI scale, separating bullish and bearish territory',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
