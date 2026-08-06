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
  selector: 'app-home-en-blog-ninty-six',
  templateUrl: './home-en-blog-ninty-six.component.html',
  styleUrl: './home-en-blog-ninty-six.component.scss',
})
export class HomeEnBlogNintySixComponent implements OnInit {
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

    this.titleService.setTitle('Oil Trading Guide | WTI and Brent Analysis');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Crude oil trading guide: WTI and Brent analysis, fundamental drivers, technical strategies, and risk management for energy traders.',
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
          headline: 'Oil Trading: Complete Guide to Crude Markets',
          description:
            'Comprehensive guide to trading crude oil covering fundamentals, technicals, and strategies',
          image: 'https://arapov.trade/assets/img/content/oiltrading1.jpg',
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
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/oiltrading',
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
          name: 'What is the difference between WTI and Brent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WTI (West Texas Intermediate) is US benchmark traded on NYMEX. Brent is international benchmark from North Sea traded on ICE. Brent typically trades at premium due to global relevance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What factors drive oil prices?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key drivers: OPEC+ production decisions, global demand, US inventory data, geopolitical tensions, dollar strength, and seasonal patterns.',
          },
        },
        {
          '@type': 'Question',
          name: 'When are oil inventory reports released?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EIA releases weekly US inventory data on Wednesdays at 10:30 AM EST. API releases estimates Tuesday evening. Both reports move markets significantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'How volatile is crude oil trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oil is highly volatile with daily ranges of 2-5% common. Geopolitical events can cause 10%+ moves. Strict risk management is essential.',
          },
        },
        {
          '@type': 'Question',
          name: 'What leverage is recommended for oil?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Conservative leverage of 3-5x maximum recommended. Oil's volatility can quickly amplify losses. Position sizing should account for potential gaps.",
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
      name: 'How to Trade Crude Oil',
      description: 'Steps for effective oil trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Monitor Supply Factors',
          text: 'Track OPEC+ decisions, US production, and global supply disruptions.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Analyze Demand Indicators',
          text: 'Follow economic data, refinery activity, and seasonal consumption patterns.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Watch Inventory Data',
          text: 'Trade around EIA and API reports with appropriate risk controls.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Apply Technical Analysis',
          text: 'Use support/resistance, moving averages, and momentum indicators.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage Risk Strictly',
          text: 'Use wider stops, smaller positions, and respect volatility.',
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
      name: 'Oil Trading Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'WTI',
          description: 'West Texas Intermediate - US crude oil benchmark.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Brent',
          description: 'North Sea crude benchmark for international pricing.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OPEC',
          description:
            'Organization of Petroleum Exporting Countries controlling production.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EIA',
          description:
            'Energy Information Administration providing US energy data.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Contango',
          description: 'Futures trading above spot price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Backwardation',
          description: 'Futures trading below spot price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Crack Spread',
          description: 'Difference between crude and refined product prices.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'API Gravity',
          description: 'Measure of crude oil density and quality.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Barrel',
          description: 'Standard oil measurement unit equal to 42 US gallons.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Rig Count',
          description:
            'Number of active drilling rigs indicating production trends.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
