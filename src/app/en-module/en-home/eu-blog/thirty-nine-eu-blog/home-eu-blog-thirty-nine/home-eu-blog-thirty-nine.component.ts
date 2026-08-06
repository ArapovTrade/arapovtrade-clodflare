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
  selector: 'app-home-eu-blog-thirty-nine',
  templateUrl: './home-eu-blog-thirty-nine.component.html',
  styleUrl: './home-eu-blog-thirty-nine.component.scss',
})
export class HomeEuBlogThirtyNineComponent implements OnInit {
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
    this.titleService.setTitle('Risk Management in Trading | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Risk and capital management: position size, risk per trade, stop-loss and why risk management is what keeps your account alive over time.',
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
            'Risk Management in Trading: How to Protect Capital and Not Blow the Account',
          description:
            'Risk and capital management: position size, risk per trade, stop-loss and why risk management is what keeps your account alive over time.',
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
            '@id': 'https://arapov.trade/en/freestudying/risk-management',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/capitalmanagement.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Risk Management',
          keywords:
            'risk management, money management, position size, lot, stop-loss, risk-reward ratio, expected value, drawdown, compound interest',
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
          name: 'What is risk management in trading in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rules about how much to put into a trade and where to exit it, so a streak of losses does not zero the account. There are two halves: risk management guards the account with small risk and a stop, while money management lifts it through position sizing and working with profit. Without the first, the second loses its meaning.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many percent of the account can you risk in one trade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'One or two percent of the account per trade. Variance is to blame: minuses come in streaks of five to ten in a row even in a working system. At ten percent risk such a streak wipes the account, at one or two it only dents it slightly, and trading goes on.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you calculate position size and lot for your risk?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'From the risk and stop, not by eye. Divide the money risk by the stop in pips and multiply by the pip value. For example, risk two hundred dollars, stop fifty pips, pip ten dollars comes out to 0.4 of a lot. The risk and stop are fixed first, the lot is counted last.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is the 1:2 ratio considered the minimum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At 1:2 it is enough to win about a third of trades to stay in profit, and a third of wins is within reach. Holding more than half steadily is something almost no one manages, which is why 1:1 is loss-making for most. At 1:3 even a quarter of successful entries is enough.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do you need a stop-loss if it locks in a loss?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A stop is not a loss but a pre-paid right to keep trading. A small planned minus is cheaper than a hung losing position that eats months of work. That is why it is set right at entry, without shifting it toward the loss, as is a fixed risk per trade.',
          },
        },
        {
          '@type': 'Question',
          name: 'What matters more: a precise entry or protecting capital?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In my approach, protecting capital. Because of variance losses come in streaks, and at high risk even a sound system fades before it plays out its edge. Managing risk holds the account more reliably than the accuracy of a single entry.',
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
      '@id': 'https://arapov.trade/en/freestudying/risk-management#howto',
      name: 'How to build risk management and capital management',
      description:
        'A step-by-step breakdown of capital management: from choosing the risk per trade to calculating size, the stop, the ratio, and the expected value of the system',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what capital management is made of',
          text: 'Capital management is a set of rules that decide the share of the account in each trade and protect the account from losses.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Understand why most traders lose',
          text: "The account is most often killed by excessive risk with no system, against the market's negative expected value.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Keep risk at one to two percent per trade',
          text: 'Risk of one to two percent of the account per trade is chosen not from caution but because of variance.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Calculate position size and lot from risk and stop',
          text: 'Position size is not guessed, it is derived from the money risk and the distance to the stop.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Set the stop-loss right at entry',
          text: 'A stop is not a loss but a pre-paid right to stay in the game.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Build in a risk-reward ratio from 1:2 and check expectancy',
          text: 'The risk-reward ratio is the lever with which you bring the expected value from minus into plus.',
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
          name: 'Capital management',
          description:
            'A set of rules that decide the share of the account in each trade and protect the account from losses.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Variance',
          description:
            'The unevenness with which losing trades are spread over time: they come not one at a time but in streaks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Lot',
          description:
            'A standardized unit of trade size that sets how much of an asset you trade in one position.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk-reward ratio',
          description:
            'The ratio of what you risk in a trade to what you expect to earn on it.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Expected value',
          description:
            'The average result of a single trade over a long distance.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Compound interest',
          description:
            'The accrual of income not only on invested capital but also on the profit already accumulated.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
