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
  selector: 'app-home-en-blog-four',
  templateUrl: './home-en-blog-four.component.html',
  styleUrl: './home-en-blog-four.component.scss',
})
export class HomeEnBlogFourComponent implements OnInit {
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
    this.titleService.setTitle('Smart Money Concept (SMC) | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What the Smart Money Concept is: market structure, liquidity, Order Blocks and FVG. How big players trade and how to read their footprints.',
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
            'Smart Money: The Complete Guide to the Smart Money Concept in Trading',
          description:
            'What the Smart Money Concept is: market structure, liquidity, Order Blocks and FVG. How big players trade and how to read their footprints.',
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
            '@id': 'https://arapov.trade/en/freestudying/smart-money-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneyconceptsguide.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Smart Money',
          keywords:
            'Smart Money, smart money concept, stop hunting, false breakout, smart money traps, order block, liquidity, SMC, volume analysis',
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
          name: 'Who are the Smart Money in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'These are the large professional players: banks, funds and market makers. They hold big capital and access to information, so they are the ones who move price, while the retail crowd usually follows behind.',
          },
        },
        {
          '@type': 'Question',
          name: 'How are Smart Money different from retail traders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'By approach. The crowd trades on emotion, rushes and chases the move, buying high. Large players act coldly, to a plan and with patience, buying low and selling high.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is stop hunting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It is a deliberate push of price toward zones where stop-losses are clustered, to trigger them and collect liquidity. Large players drive price into where the crowd's stops sit, take those orders and turn the market around.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do you tell a false breakout from a real one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The main tell is volume. A real breakout runs on rising volume and holds beyond the level, while a false one pops on thin volume and snaps back into the range fast. A quick reversal right after the spike is a clear trap.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you see Smart Money on a chart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'By the footprints: abnormal volume spikes, liquidity taken through false breaks of a level, and the accumulation and distribution phases. The main tool here is volume analysis, without it any zone is guesswork.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you protect yourself from Smart Money manipulation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Do not place your stop in the most obvious spots, tight behind an extreme or a round level, give it room. Do not enter at the moment of the false break, wait for the trap to play out and for price to confirm the reversal on volume.',
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
      '@id': 'https://arapov.trade/en/freestudying/smart-money-guide#howto',
      name: 'How to read the market by the Smart Money concept',
      description:
        'A step-by-step walkthrough: who the smart money are, how they manipulate price, and how to follow their footprint in volume',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand who the Smart Money are',
          text: 'Smart Money are large players with big capital and information: banks, funds and market makers who buy low and sell high.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'See how they build a position',
          text: 'Large capital splits the volume into small and iceberg orders, quietly accumulating at the bottom and distributing at the top by Wyckoff logic.',
        },
        {
          '@type': 'HowToStep',
          name: 'Read the Wyckoff phases behind Smart Money',
          text: 'Large capital works to a Wyckoff script: accumulation in a low range, a trend along the path of least resistance and distribution at the top; a decline often starts from a demand deficit, not from seller aggression.',
          position: 3,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Grasp the mechanic of control',
          text: 'Control is working with the predictability of the crowd and with liquidity at obvious levels, not a secret conspiracy against you.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Recognise traps and the false breakout',
          text: "Stop hunting and the false breakout knock out the crowd's stops; volume is what separates a false break from a real one.",
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Look for the footprint on the chart',
          text: 'A large player is given away by a volume spike, liquidity taken through a false break and an accumulation range, but without volume any zone is guesswork.',
        },
        {
          '@type': 'HowToStep',
          name: 'Confirm the footprint by volume, not price alone',
          text: 'Order blocks and imbalances on pure price are easy to fit after the fact; add exchange volume from CME as the real footprint of large capital, since elevated volume on a rise gives away a buyer, on a fall a seller.',
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Learn the SMC building blocks',
          text: 'Liquidity, the order block, the imbalance and structure (BOS and CHoCH) are the tools of the concept, but for a beginner structure and volume matter more.',
        },
        {
          '@type': 'HowToStep',
          name: 'Do not believe SMC myths and keep your risk',
          text: "Manipulation is not a conspiracy against you but the large player's need for liquidity at clusters of stops; do not enter every zone in a row and always trade with a stop and a calculated risk per trade.",
          position: 9,
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Enter behind the large player after the trap',
          text: 'Find the impulse level, wait for the liquidity grab and the false break, and enter behind the large player with the stop beyond the false break at risk to reward from 1 to 3.',
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
          name: 'Smart Money',
          description:
            'Large professional market participants who hold big capital and access to information unavailable to the ordinary trader; literally the money that moves the market.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            "A deliberate push of price toward zones where traders' stop-losses are clustered, to trigger those orders and use them as liquidity.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Accumulation phase',
          description:
            'A range, usually after a long fall, in which large capital quietly builds a position from a frightened crowd selling at the bottom; a dull-looking band where the future move is set up.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
