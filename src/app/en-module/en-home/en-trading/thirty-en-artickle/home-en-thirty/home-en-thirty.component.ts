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
  selector: 'app-home-en-thirty',
  templateUrl: './home-en-thirty.component.html',
  styleUrl: './home-en-thirty.component.scss',
})
export class HomeEnThirtyComponent implements OnInit {
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
      'Imbalance and FVG: Liquidity Zones in Trading | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Imbalance and FVG in Trading: Complete guide to liquidity zones. Learn how to identify price imbalances and Fair Value Gaps for precise market entries.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/imbalanceandfvg.png',
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
          '@id': 'https://arapov.trade/en/freestudying/imbalanceandfvg#article',
          headline: 'Imbalance and FVG: Liquidity Zones in Trading',
          description:
            'Complete guide to Imbalance and Fair Value Gap concepts. Learn how to find price imbalances and use them for precise market entries.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/imbalanceandfvg1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/en#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/imbalanceandfvg',
          },
          articleSection: 'Trading Education',
          keywords: [
            'Imbalance',
            'FVG',
            'Fair Value Gap',
            'liquidity',
            'Smart Money',
          ],
          wordCount: 1420,
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
      '@id': 'https://arapov.trade/en/freestudying/imbalanceandfvg#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Imbalance in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Imbalance is a market condition where supply and demand diverge sharply, causing rapid price movement in one direction without significant resistance. These zones indicate activity from large institutional players.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a Fair Value Gap (FVG)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap is a price gap between candles on a chart that occurs during rapid price movement. FVG represents a zone where the market failed to form balanced liquidity, and price often returns to fill this gap.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to identify bullish and bearish FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bullish FVG forms between the low of the first candle and the high of the third candle during an upward impulse. Bearish FVG forms between the high of the first candle and the low of the third during downward movement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does price return to FVG zones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Markets seek equilibrium. Unfilled liquidity zones act as magnets for price. Smart Money uses these gaps to place orders, so price often tests FVG before continuing its movement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which timeframes are best for finding FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The most significant FVGs form on higher timeframes: H4, D1, W1. Daily chart gaps carry more weight than those on minute intervals and are more likely to be filled.',
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
      '@id': 'https://arapov.trade/en/freestudying/imbalanceandfvg#howto',
      name: 'How to Trade Imbalance and FVG Zones',
      description:
        'Step-by-step guide to using imbalances and Fair Value Gaps in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Find imbalance zone',
          text: 'Identify areas with impulsive candles on the chart where price moved sharply without pullbacks. Mark FVG boundaries between first and third candles.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Assess zone significance',
          text: 'Check if FVG aligns with key support or resistance levels. Use Volume Profile to confirm institutional interest.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Wait for price return',
          text: 'Do not enter immediately. Wait for FVG zone retest and confirming signal appearance.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Open position',
          text: 'Upon confirmation, enter in the direction of the initial impulse. Place stop-loss beyond FVG boundary.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Manage the trade',
          text: 'Set take-profit at the next liquidity level. Move stop to breakeven as price moves in your favor.',
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
      '@id': 'https://arapov.trade/en/freestudying/imbalanceandfvg#terms',
      name: 'Imbalance and FVG Terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Imbalance',
          description:
            'Supply and demand disparity causing rapid unidirectional price movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Price gap between candles indicating unfilled liquidity zone.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bullish FVG',
          description:
            'Fair value gap during upward impulse between first candle low and third candle high.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bearish FVG',
          description:
            'Fair value gap during downward movement between first candle high and third candle low.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Volume of available buy and sell orders at specific price levels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Retest',
          description:
            'Price return to previously passed level for testing before continuing movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Large institutional market participants: banks, hedge funds, market makers.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Analysis tool showing trading volume distribution across price levels.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Impulse Candle',
          description:
            'Candle with large body and small wicks indicating strong directional movement.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gap Fill',
          description:
            'Price return to gap zone to restore market equilibrium.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
