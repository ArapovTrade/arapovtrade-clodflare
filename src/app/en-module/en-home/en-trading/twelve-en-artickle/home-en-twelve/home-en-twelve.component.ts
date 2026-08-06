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
  selector: 'app-home-en-twelve',
  templateUrl: './home-en-twelve.component.html',
  styleUrl: './home-en-twelve.component.scss',
})
export class HomeEnTwelveComponent implements OnInit {
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
      'Bitcoin Halving — What It Is and How It Affects BTC Price',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Bitcoin halving explained — what it is, how it works, and when the next one occurs. Complete guide to BTC supply reduction mechanism, price impact, and mining economics.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/halving.webp',
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
          '@id': 'https://arapov.trade/en/freestudying/halving#article',
          headline:
            'Bitcoin Halving — Supply Reduction Mechanism and Market Impact',
          description:
            'Bitcoin halving explained — what it is, how it works, and when the next one occurs. Complete guide to BTC supply reduction mechanism, price impact, and mining economics.',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/halving',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/halving1.webp',
          },
          articleSection: 'Cryptocurrency',
          keywords: [
            'halving',
            'Bitcoin',
            'BTC',
            'mining',
            'cryptocurrency',
            'supply',
          ],
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
      '@id': 'https://arapov.trade/en/freestudying/halving#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Bitcoin halving?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Halving is a programmed reduction of miner rewards for mining new blocks by half. It occurs every 210,000 blocks, approximately every four years.',
          },
        },
        {
          '@type': 'Question',
          name: 'When will the next halving occur?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2024 halving already occurred in April, reducing the reward to 3.125 BTC. The next is expected in 2028 with a reward of 1.5625 BTC per block.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does halving affect Bitcoin price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Historically, halving has been accompanied by BTC price increases due to reduced supply with maintained or growing demand. After the 2020 halving, Bitcoin reached $69,000.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens after all bitcoins are mined?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After the last of 21 million bitcoins is mined (around 2140), miners will earn exclusively from transaction fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is halving important for investors?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Halving creates Bitcoin scarcity by limiting supply. This makes BTC analogous to digital gold with predictable monetary policy.',
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
      '@id': 'https://arapov.trade/en/freestudying/halving#howto',
      name: 'How to Prepare for Bitcoin Halving',
      description:
        'Step-by-step guide to preparing your investment strategy for the halving event.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Study Previous Halving History',
          text: 'Analyze price dynamics after the 2012, 2016, 2020, and 2024 halvings to understand typical market patterns.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify Market Cycle Phase',
          text: 'Determine current position in the four-year cycle: accumulation, growth, peak, or correction.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Assess Macroeconomic Factors',
          text: 'Consider interest rates, inflation, and regulatory environment affecting the cryptocurrency market.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Develop Risk Management Strategy',
          text: 'Define position size, profit-taking levels, and stop-losses to protect capital.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Diversify Your Portfolio',
          text: 'Distribute investments between Bitcoin, altcoins, and traditional assets to reduce risk.',
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
      '@id': 'https://arapov.trade/en/freestudying/halving#terms',
      name: 'Bitcoin Halving Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Halving',
          description:
            'Programmed reduction of block mining reward by half, occurring every 210,000 blocks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Mining',
          description:
            'Process of confirming transactions and creating new blocks in the blockchain using computational power.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hash Rate',
          description:
            'Total computational power of the Bitcoin network, measured in hashes per second.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Work',
          description:
            'Consensus mechanism requiring solving cryptographic puzzles to confirm transactions.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Block',
          description:
            'Unit of data in the blockchain containing transaction information and linked to previous blocks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Issuance',
          description:
            'Process of releasing new bitcoins through miner rewards for block mining.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Mining Difficulty',
          description:
            'Parameter determining how hard it is to find a new block, adjusted every 2016 blocks.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Mining Pool',
          description:
            'Association of miners for joint block mining and reward distribution.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bull Market',
          description:
            'Period of sustained price growth characterized by investor optimism.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bear Market',
          description:
            'Period of sustained price decline accompanied by participant pessimism.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
