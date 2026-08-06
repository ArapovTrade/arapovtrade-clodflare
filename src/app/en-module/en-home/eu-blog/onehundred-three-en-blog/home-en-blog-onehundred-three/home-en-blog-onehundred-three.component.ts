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
  selector: 'app-home-en-blog-onehundred-three',
  templateUrl: './home-en-blog-onehundred-three.component.html',
  styleUrl: './home-en-blog-onehundred-three.component.scss',
})
export class HomeEnBlogOnehundredThreeComponent implements OnInit {
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
      'Ichimoku Cloud Indicator | Complete Trading Guide',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Ichimoku Kinko Hyo indicator guide: Kumo cloud analysis, trend identification, trading signals, and practical strategies for technical traders.',
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
          headline: 'Ichimoku Cloud Indicator | Complete Trading Guide',
          description:
            'Ichimoku Kinko Hyo indicator guide: Kumo cloud analysis, trend identification, trading signals, and practical strategies for technical traders.',
          image: 'https://arapov.trade/assets/img/content/ichimoku1.png',
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
          datePublished: '2025-06-28T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/ichimoku',
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
          name: 'What is the Ichimoku indicator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ichimoku Kinko Hyo is a comprehensive indicator showing trend direction, momentum, and support/resistance levels at a glance. Developed by Japanese journalist Goichi Hosoda after 30 years of research.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Kumo cloud?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kumo is the shaded area between Senkou Span A and B lines. It acts as dynamic support/resistance zone. Thick cloud indicates strong zone, thin cloud suggests weakness.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you identify trend with Ichimoku?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Price above cloud indicates uptrend. Price below cloud signals downtrend. Price inside cloud suggests consolidation or uncertainty. Cloud color confirms trend strength.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the TK Cross signal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TK Cross occurs when Tenkan Sen crosses Kijun Sen. Bullish when Tenkan crosses above Kijun. Signal strength depends on position relative to the cloud.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are standard Ichimoku settings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard settings are 9, 26, 52 based on Japanese trading week. For crypto and forex, adapted settings like 10, 30, 60 or 20, 60, 120 are often used.',
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
      name: 'How to Trade Using Ichimoku Cloud',
      description: 'Step-by-step approach to Ichimoku trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Identify Trend Direction',
          text: 'Determine if price is above, below, or inside the cloud to establish primary trend bias.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Assess Cloud Characteristics',
          text: 'Evaluate cloud thickness and color for support/resistance strength and trend confirmation.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Watch for TK Cross',
          text: 'Monitor Tenkan-Kijun crossovers for entry signals, confirming with cloud position.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Confirm with Chikou Span',
          text: 'Verify momentum by checking if Chikou is above or below price from 26 periods ago.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Execute with Cloud Support',
          text: 'Enter trades at cloud boundaries with stops beyond opposite cloud edge.',
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
      name: 'Ichimoku Terminology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ichimoku Kinko Hyo',
          description:
            "Japanese for 'equilibrium chart at a glance' - comprehensive trend indicator.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kumo',
          description:
            'The cloud - shaded area between Senkou Span A and B serving as support/resistance.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tenkan Sen',
          description:
            'Conversion line - fast line calculated from 9-period midpoint.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kijun Sen',
          description:
            'Base line - slower line from 26-period midpoint acting as dynamic support.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Senkou Span A',
          description:
            'Leading span A - average of Tenkan and Kijun projected 26 periods ahead.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Senkou Span B',
          description:
            'Leading span B - 52-period midpoint projected 26 periods ahead.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Chikou Span',
          description:
            'Lagging span - current close plotted 26 periods back for momentum confirmation.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TK Cross',
          description: 'Trading signal when Tenkan crosses Kijun line.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kumo Twist',
          description:
            'Point where Senkou Span A and B cross, indicating potential trend change.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kumo Breakout',
          description:
            'Strong signal when price breaks through cloud boundaries.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
