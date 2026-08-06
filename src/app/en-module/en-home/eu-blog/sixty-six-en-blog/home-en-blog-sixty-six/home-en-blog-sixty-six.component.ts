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
  selector: 'app-home-en-blog-sixty-six',
  templateUrl: './home-en-blog-sixty-six.component.html',
  styleUrl: './home-en-blog-sixty-six.component.scss',
})
export class HomeEnBlogSixtySixComponent {
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
      'Volume Analysis in Trading: Finding High Volume Levels & Entry Points | Igor Arapov',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Master volume analysis in trading: learn to identify high volume levels, use Volume Profile and POC for precise entries. Complete guide with practical examples.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/peakvolumelevels.webp',
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
          '@id':
            'https://arapov.trade/en/freestudying/peakvolumelevels#article',
          headline:
            'Volume Analysis in Trading: Finding High Volume Levels & Entry Points',
          description:
            'Master volume analysis in trading: learn to identify high volume levels, use Volume Profile and POC for precise entries.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/peakvolumelevels1.png',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          datePublished: '2024-01-15T10:00:00+00:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/peakvolumelevels',
          },
          articleSection: 'Trading Education',
          keywords: [
            'volume analysis',
            'volume levels',
            'Volume Profile',
            'POC',
            'Point of Control',
            'trading',
            'Smart Money',
          ],
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
      '@id': 'https://arapov.trade/en/freestudying/peakvolumelevels#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is volume analysis in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume analysis is a methodology for studying market activity through the number of contracts traded at different price levels. It reveals where institutional players accumulated or distributed positions, helping identify significant support and resistance zones.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Volume Profile differ from regular volume indicators?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Regular volume shows trading activity over time periods, while Volume Profile displays volume distribution across price levels. This allows traders to see exactly where the most trading occurred, revealing institutional activity zones.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is POC in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POC (Point of Control) is the price level with the highest traded volume for a selected period. It represents the fair value price and often acts as a magnet for price, serving as strong support or resistance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can volume analysis be used in forex trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forex lacks centralized volume data, but tick volume and broker-provided data offer useful insights. For more accurate analysis, traders use currency futures where exchange volume is available.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which platforms support Volume Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume Profile is available on TradingView, ATAS, Sierra Chart, Ninja Trader, and other professional platforms. Most offer free versions with basic volume analysis functionality.',
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
      '@id': 'https://arapov.trade/en/freestudying/peakvolumelevels#howto',
      name: 'How to Use Volume Analysis for Trade Entries',
      description:
        'Step-by-step guide to analyzing market volume for identifying optimal entry points',

      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Configure Volume Profile',
          text: 'Open your chart and add the Volume Profile indicator. Select the profile type: session for intraday, fixed range for analyzing specific price areas.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels1.png',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify POC and Value Area',
          text: 'Locate the Point of Control (highest volume level) and Value Area boundaries — the zone containing 70% of all traded volume.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels2.webp',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Assess Market Context',
          text: 'Determine if the market is trending or ranging. In trends, look for pullbacks to POC. In ranges, trade from Value Area boundaries.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze Price Reaction',
          text: 'Observe how price behaves at volume levels. Bounces confirm level significance, breakouts with volume signal continuation.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Execute with Clear Plan',
          text: 'Enter trades with defined stop-loss beyond the nearest volume level and take-profit at the next significant level.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels3.png',
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
      '@id': 'https://arapov.trade/en/freestudying/peakvolumelevels#glossary',
      name: 'Volume Analysis Glossary',
      description: 'Essential volume analysis terms for traders',
      inLanguage: 'en',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Indicator showing traded volume distribution across price levels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control (POC)',
          description:
            'The price level with highest traded volume for a period.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area',
          description: 'Price range containing 70% of traded volume.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area High (VAH)',
          description: 'Upper boundary of Value Area, acts as resistance.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area Low (VAL)',
          description: 'Lower boundary of Value Area, acts as support.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description: 'Difference between buying and selling volume.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'Cluster charts showing volume distribution within each candle.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description: 'Large institutional market participants.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Method analyzing time and volume distribution across prices.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description: 'Concentration of orders at a specific price level.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
