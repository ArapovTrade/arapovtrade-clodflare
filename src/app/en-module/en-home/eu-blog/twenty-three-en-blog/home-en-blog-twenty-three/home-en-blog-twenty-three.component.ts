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
  selector: 'app-home-en-blog-twenty-three',
  templateUrl: './home-en-blog-twenty-three.component.html',
  styleUrl: './home-en-blog-twenty-three.component.scss',
})
export class HomeEnBlogTwentyThreeComponent implements OnInit {
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

    this.titleService.setTitle('Market Volume Analysis | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How market volume analysis works: volume profile, clusters, delta and why volume is the primary cause of price movement.',
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
            'Market Volume Analysis: A Complete Guide to Reading Volume',
          description:
            'How market volume analysis works: volume profile, clusters, delta and why volume is the primary cause of price movement.',
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
            '@id': 'https://arapov.trade/en/freestudying/volume-analysis',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/volmarketanalisys.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Volume analysis',
          keywords:
            'volume analysis, trading volume, effort and result, Wyckoff, Volume Profile, POC, Market Profile, peak volume levels',
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
          name: 'What is volume analysis in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is reading the market by the number of trades, not by price alone. Volume shows how much was really traded per bar. If a large volume stands behind a price move, there is money in the market, and if the volume is dry, the move is dangerous to trust.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the effort-result principle mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume is the effort, the price move is the result. A big effort should give a big move. If the volume is huge but price stands still, the opposite side is absorbing the market, and that is a frequent signal of a reversal.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does volume confirm a trend?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A rising trend on rising volume is confirmed, buyers are adding. If price rises while volume falls, interest is fading and a correction is possible. High volume on a level breakout says the breakout is real.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are Volume Profile and POC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume Profile shows how much volume passed at each price level, not over time. POC is the level with the maximum volume, the point of greatest participant interest. Such zones often work as strong support and resistance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are there no real volumes on forex?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forex is an over-the-counter market with no single center, so total trade volume is not counted there. Only tick volume is available, the number of price changes over time. It correlates with real volume but with error, so it is a guide, not exact data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you trade on volume alone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In my experience, no. Volume gives no signals on its own, it confirms or cancels what is visible from levels and the market phase. It works best paired with levels, not instead of them.',
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
      '@id': 'https://arapov.trade/en/freestudying/volume-analysis#howto',
      name: 'How to read the market by volume',
      description:
        'A step-by-step breakdown of volume analysis: from reading effort and result to entering on the price reaction',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what volume measures',
          text: 'Volume is the number of contracts or lots that really changed hands per bar, and what matters is not the figure itself but its dynamic relative to neighboring bars.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Read effort and result',
          text: "Compare the bar's volume (effort) with how far price travelled (result): big volume on a weak move means someone large is absorbing the flow.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Gauge trend strength by volume',
          text: 'A rising trend on rising volume is healthy, while a price rise on falling volume signals weakening and a possible reversal.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Read the deficit of demand and supply',
          text: 'The cause of a fall is a deficit of demand, when large capital stops buying, and the cause of a rise is a deficit of supply; a skyscraper of volume on bars shows the path of least resistance.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Find peak levels and the POC',
          text: 'With Volume Profile look for prices with the maximum traded volume, the POC and the value area, where large capital was active.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Read the value area by Market Profile',
          text: 'Market Profile shows the market as an auction: where price is fair, and where it is expensive or cheap relative to the value area.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Build the entry on the price reaction',
          text: 'Mark the zones on the higher timeframe, but take the entry on the lower one, by the price reaction at the level, not on the touch itself.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Take honest volume',
          text: 'Look at real volume on cleared exchange futures, for example on the CME, not the forex tick or the painted crypto one.',
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
      name: 'Article glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volume analysis',
          description:
            'A method of reading the market by the number of trades that passed over a period, not just by the price move.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Effort and result principle',
          description:
            'A Wyckoff rule by which volume is treated as the applied effort and the price move as its result, and these two are always checked against each other.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Peak volume level',
          description:
            'A price level at which the maximum trading volume passed over a chosen period; large capital was active there, so it works as strong support or resistance.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'A way of organizing data on price, time and volume as a distribution that shows at which prices the market spent the most time and trades.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Demand deficit',
          description:
            'A situation where large capital stops buying at current prices and its demand disappears, so the remaining sellers push price down; the mirror supply deficit becomes the cause of a rise.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
