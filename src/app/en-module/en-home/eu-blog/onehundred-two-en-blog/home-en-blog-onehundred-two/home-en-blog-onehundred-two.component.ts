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
  selector: 'app-home-en-blog-onehundred-two',
  templateUrl: './home-en-blog-onehundred-two.component.html',
  styleUrl: './home-en-blog-onehundred-two.component.scss',
})
export class HomeEnBlogOnehundredTwoComponent implements OnInit {
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

    this.titleService.setTitle('Bollinger Bands | Complete Trading Guide');
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Bollinger Bands: complete trading guide. Settings, strategies, squeeze and expansion, breakouts and bounces explained.',
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
          headline: 'Bollinger Bands: Complete Trading Guide',
          description:
            'Bollinger Bands: complete trading guide. Settings, strategies, squeeze and expansion, breakouts and bounces explained.',
          image: 'https://arapov.trade/assets/img/content/bollingerbands1.jpg',
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
          datePublished: '2025-06-25T00:00:00+02:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/bollingerbands',
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
          name: 'What are Bollinger Bands?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bollinger Bands is a volatility indicator consisting of three lines: the middle band (SMA 20), upper and lower bands positioned two standard deviations from the middle. Developed by John Bollinger in the 1980s.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the standard Bollinger Bands settings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard settings: SMA period — 20, standard deviation multiplier — 2. For short-term trading use period 10, for long-term — 50. Multiplier 2.5-3 for less frequent signals.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Bollinger Bands squeeze mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Squeeze occurs when bands narrow to minimum values, indicating low volatility. This signals an upcoming strong price movement, although breakout direction is unknown in advance.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to trade bounces from Bollinger Bands?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In sideways markets, price bounces from upper and lower bands. Buy on lower band touch with confirmation, sell on upper band touch. Stop-loss beyond the band, target — middle line or opposite band.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Bollinger Bands be used as support and resistance levels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, bands act as dynamic support and resistance levels. The middle line often serves as support in uptrends and resistance in downtrends. However, in strong trends price can walk along the band.',
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
      name: 'How to Use Bollinger Bands in Trading',
      description:
        'Step-by-step guide to applying Bollinger Bands for finding trading signals',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Add indicator to chart',
          text: 'Open trading platform, select Bollinger Bands from indicator list. Standard settings: period 20, deviation 2. Indicator displays over price chart.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Determine current market regime',
          text: 'Assess band width: wide bands indicate high volatility and trend, narrow — consolidation. This determines trading strategy choice.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Look for band squeeze',
          text: 'Track moments when bands narrow to minimum. Squeeze precedes strong movement. Prepare for entry in breakout direction.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze band touches',
          text: 'Observe price behavior on upper or lower band touch. In ranging markets — these are reversal zones, in trends — potential continuation points.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use the middle line',
          text: 'Middle line (SMA 20) serves as dynamic support/resistance. Pullbacks to middle in trends — potential entry points. Middle line break — sentiment shift signal.',
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
      name: 'Bollinger Bands Terminology',
      description: 'Key concepts for understanding Bollinger Bands indicator',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Bollinger Bands',
          description:
            'Volatility indicator consisting of middle line and two bands at standard deviation distance',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Middle Band',
          description:
            'Simple moving average (usually 20-period), central line of indicator',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Upper Band',
          description:
            'Middle line plus two standard deviations, potential overbought zone',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Lower Band',
          description:
            'Middle line minus two standard deviations, potential oversold zone',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Squeeze',
          description:
            'Band narrowing indicating low volatility and upcoming strong movement',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Band Expansion',
          description:
            'Increase in distance between bands during volatility growth',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Walking the Band',
          description:
            'Price movement along upper or lower band in strong trend',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Standard Deviation',
          description:
            'Statistical measure of price dispersion relative to average value',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
