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
  selector: 'app-home-en-blog-nineteen',
  templateUrl: './home-en-blog-nineteen.component.html',
  styleUrl: './home-en-blog-nineteen.component.scss',
})
export class HomeEnBlogNineteenComponent implements OnInit {
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
      'Tokenomics: How to Assess a Crypto Project | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What tokenomics is, how coin distribution, issuance and unlocks affect price and why it reveals crash risk before you even buy a token.',
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
            'Tokenomics: What It Is and How to Evaluate a Crypto Project',
          description:
            'What tokenomics is, how coin distribution, issuance and unlocks affect price and why it reveals crash risk before you even buy a token.',
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
            '@id': 'https://arapov.trade/en/freestudying/tokenomics',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tokenomics.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Cryptocurrency',
          keywords: 'tokenomics, cryptocurrency',
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
          name: 'What is tokenomics in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It is the internal economy of a token: the rules of its issuance, distribution, utility, and incentives. Together they set the balance of supply and demand, and so largely the fate of the token's price.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which tokenomics parameters are the most important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Supply (total and circulating), emission and inflation, distribution across groups, the vesting schedule, and above all the utility of the token. Real use is what gives demand support, not just hype.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can bad tokenomics destroy a coin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, and the textbook case is Terra's UST and LUNA in 2022. The peg was held by a mint-and-burn loop between two tokens rather than by real collateral, and once confidence cracked the loop ran in reverse and both coins fell to near zero in days. A self-referential or unlimited-mint design with nothing real underneath carries a built-in death spiral.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are the red flags in tokenomics?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Short team vesting or no unlock schedule, a huge share of tokens in insiders' hands, and no real utility for the token. The last turns the project into pure speculation, as with meme coins.",
          },
        },
        {
          '@type': 'Question',
          name: 'Does good tokenomics guarantee a price rise?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Good tokenomics is only one of the conditions and a filter that screens out plainly weak projects. Its absence is almost always a bad sign, but its presence promises no profit. The decision and the risk always stay with you.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can you check a token unlock schedule and when is the next unlock?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unlock calendars are shown by dedicated services such as TokenUnlocks and aggregators such as CoinGecko, while the primary source is the project documentation. Look not at the absolute number of tokens but at the share of circulating supply and at the unlock type: a large cliff presses the price harder than a smooth linear vesting.',
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
      '@id': 'https://arapov.trade/en/freestudying/tokenomics#howto',
      name: 'How to understand and apply: Tokenomics',
      description:
        'A step-by-step breakdown of the topic and its practical use in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what tokenomics is in simple terms',
          text: 'Tokenomics is the internal economy of a crypto token: the set of rules for its issuance, distribution, utility, and incentives for holders, which together set the balance of supply and demand.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'The key parameters of tokenomics',
          text: 'To assess tokenomics, it is enough to break down a few key parameters.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Vesting, the cliff, and unlocks: how to read the unlock schedule',
          text: 'Vesting is the freeze schedule, an unlock is the event on it; linear is smooth, a cliff lands at once; watch the share of supply and the unlock calendar.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Tokenomics in the wild: bitcoin, ether, and how a coin dies',
          text: "Bitcoin and ether show two opposite but workable models, while Terra's LUNA shows a self-referential design that spiraled to zero.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Learn to tell a solid project from a hollow one',
          text: 'Putting it all together, good tokenomics is given away by a few signs: a limited and clear supply, a reasonable distribution with no excessive insider share, a transparent and not-too-short vesting schedule, and above all the real utility of the token.',
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
          name: 'Tokenomics',
          description:
            'The internal economy of a crypto token: the set of rules for its issuance, distribution, utility, and incentives for holders, which together set the balance of supply and demand.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'fully diluted valuation (FDV)',
          description:
            'Fully diluted valuation is the market capitalization a token would have if every token that will ever exist were already in circulation; a large gap from the current capitalization signals a lot of future supply still to come.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'unlock',
          description:
            'An unlock is the event when the next batch of previously frozen tokens enters circulation according to the vesting schedule.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'cliff',
          description:
            'A cliff is a one-off unlock of a large tranche of tokens on a single date, which in weak demand can knock the price down noticeably.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
