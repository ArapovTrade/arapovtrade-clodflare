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
  selector: 'app-home-en-blog-onehundred-five',
  templateUrl: './home-en-blog-onehundred-five.component.html',
  styleUrl: './home-en-blog-onehundred-five.component.scss',
})
export class HomeEnBlogOnehundredFiveComponent implements OnInit {
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
      'XRP Trading Guide | RippleNet Technology & Market Analysis',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Complete XRP trading guide: RippleNet technology, SEC lawsuit impact, trading strategies and risk management for cryptocurrency traders.',
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
            'XRP Trading Guide: RippleNet Technology and Market Analysis',
          description:
            'Comprehensive guide covering XRP trading strategies, RippleNet technology, SEC case developments for cryptocurrency traders',
          image: 'https://arapov.trade/assets/img/content/XRP2.jpg',
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
          datePublished: '2025-07-04T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/xrp',
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
          name: 'What makes XRP different from Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "XRP was designed for institutional cross-border payments with 3-5 second transactions and minimal fees. Unlike Bitcoin's proof-of-work, XRP uses consensus protocol. All 100 billion tokens were pre-mined at launch.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does SEC lawsuit affect XRP price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The SEC lawsuit creates significant volatility. Court decisions can move prices 20-50% within days. Traders must monitor case developments as they directly impact market access and institutional adoption.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is On-Demand Liquidity (ODL)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ODL uses XRP as bridge currency for cross-border payments. Financial institutions send payments without pre-funding accounts in destination currencies, reducing capital requirements and settlement times.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which exchanges offer XRP trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Major exchanges include Binance, Kraken, and Bitstamp. US availability varies due to regulatory concerns. Some brokers offer XRP exposure through CFDs without direct cryptocurrency ownership.',
          },
        },
        {
          '@type': 'Question',
          name: 'What leverage is safe for XRP trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Conservative leverage of 2-3x maximum is recommended. Daily movements of 10-20% are common, news-driven spikes can reach 30-50%, making higher leverage extremely risky.',
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
      name: 'How to Trade XRP Effectively',
      description: 'Step-by-step approach to trading XRP cryptocurrency',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Monitor Regulatory News',
          text: 'Follow SEC lawsuit updates through official court filings. Set alerts for major developments as they drive significant price movements.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify Key Levels',
          text: 'Mark support and resistance on daily charts. Historical prices at $0.50, $1.00, $1.50 serve as psychological barriers.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Track On-Chain Data',
          text: 'Monitor whale transactions and exchange flows. Large transfers to exchanges often precede selling pressure.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Manage Risk Properly',
          text: 'Use maximum 2% risk per trade. Set stops accounting for volatility. Reduce positions before court dates.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Execute with Discipline',
          text: 'Enter during consolidation, not chasing spikes. Take profits at resistance levels and trail stops in trends.',
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
      name: 'XRP Trading Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'XRP Ledger',
          description:
            'Decentralized blockchain processing XRP transactions using consensus protocol.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RippleNet',
          description:
            'Network of financial institutions using Ripple for cross-border payments.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'On-Demand Liquidity',
          description:
            'Service using XRP as bridge currency for instant settlements.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Escrow',
          description:
            'Mechanism holding XRP tokens with scheduled monthly releases.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Consensus Protocol',
          description:
            "XRP's validation method using trusted validators instead of mining.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bridge Currency',
          description:
            'Intermediary asset facilitating exchanges between different currencies.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Whale Transaction',
          description:
            'Large cryptocurrency transfers that can signal price movements.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Regulatory Risk',
          description:
            'Uncertainty from potential government actions affecting trading.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Ability to buy or sell quickly without significantly affecting price.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Institutional Adoption',
          description:
            'Integration of crypto technology by banks and financial institutions.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
