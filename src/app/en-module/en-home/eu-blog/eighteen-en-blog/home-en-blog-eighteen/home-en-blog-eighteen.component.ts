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
  selector: 'app-home-en-blog-eighteen',
  templateUrl: './home-en-blog-eighteen.component.html',
  styleUrl: './home-en-blog-eighteen.component.scss',
})
export class HomeEnBlogEighteenComponent implements OnInit {
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
    this.titleService.setTitle('Stablecoins and Tether (USDT) | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What stablecoins are, how they hold the dollar peg, how USDT differs from algorithmic coins and what risks stablecoins carry.',
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
            'Stablecoins and Tether: What They Are, Why a Trader Needs Them, and the Risk',
          description:
            'What stablecoins are, how they hold the dollar peg, how USDT differs from algorithmic coins and what risks stablecoins carry.',
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
            '@id': 'https://arapov.trade/en/freestudying/stablecoins-tether',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stablecoins.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Cryptocurrency',
          keywords: 'stablecoin, USDT, Tether, USDC, DAI, dollar peg, depeg',
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
          name: 'What is a stablecoin in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It is a crypto coin deliberately held near a stable mark, usually near the dollar in a one-to-one proportion. It is needed to store and move value inside crypto without bitcoin's swings, and for a trader it serves both as a wallet for pauses and as a pair for settlements.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do USDT, USDC, and DAI differ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "USDT is the largest and most liquid of all and rests on its issuer's reserves. USDC is issued by Circle, dollar-based too, but it wins on the openness of its reports. DAI stands apart: it is decentralized and relies not on dollars in a bank, but on crypto-collateral in smart contracts.",
          },
        },
        {
          '@type': 'Question',
          name: 'What backs USDT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Behind it stand the issuer's live assets, and more than eighty percent of them are short US government bonds, the rest gold and other things. There is still no full guarantee, no insurance like a deposit either, so it is reasonable to hold in USDT only the share you would not be afraid to part with.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can a stablecoin issuer freeze your tokens?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, for centralized coins. The issuer of USDT or USDC keeps the ability to freeze or blacklist tokens at any address, and both Circle and Tether have done so on sanctions and law-enforcement orders. It almost never touches an ordinary user, but it means a centralized stablecoin is an IOU from a company, not untouchable cash. A decentralized coin like DAI has no single freeze switch, but carries smart-contract risk instead.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happened to UST in 2022?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In spring 2022 the algorithmic UST broke off the dollar. Holders ran for the exit at once, a loop unwound: the token was burned, the linked LUNA swelled in volume, and within days both coins settled almost to zero. It is a textbook failure of an algorithmic scheme.',
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
      '@id': 'https://arapov.trade/en/freestudying/stablecoins-tether#howto',
      name: 'How to understand and apply: stablecoins and Tether, what they are and the risk',
      description:
        'A step-by-step breakdown of the topic and its practical use in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: "Understand what holds a stablecoin's peg to the dollar",
          text: 'Stablecoin is a cryptocurrency whose price is pegged to a stable asset, most often to the US dollar at a rate of one to one.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Compare USDT, USDC, and DAI',
          text: 'Take the trio a trader meets most often, because it is in these that he holds cash and counts trades.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Figure out what backs Tether in 2026',
          text: 'USDT is the stablecoin of the company Tether with a one-to-one peg to the dollar, issued back in 2014 and over time becoming the largest in the world.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Know that a centralized issuer can freeze your tokens',
          text: "A centralized stablecoin is an IOU from a company that can freeze or blacklist tokens at any address on a regulator's order, as Circle and Tether have both done.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Account for depeg risk and hold a conscious share',
          text: 'The word stable lulls your vigilance, and in vain, and the best lesson here was given by the collapse of TerraUSD in May 2022.',
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
      name: 'Glossary of article terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'stablecoin',
          description:
            'Stablecoin is a cryptocurrency whose price is pegged to a stable asset, most often to the US dollar at a rate of one to one.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'USDT',
          description:
            'USDT is the stablecoin of the company Tether with a one-to-one peg to the dollar, issued back in 2014 and over time becoming the largest in the world.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'depeg',
          description:
            "The loss of a stablecoin's peg to its target price, when the coin trades meaningfully below or above one dollar; it can be a brief wobble in a panic or, for algorithmic coins, a total collapse.",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
