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
  selector: 'app-home-ru-blog-onehundred-four',
  templateUrl: './home-ru-blog-onehundred-four.component.html',
  styleUrl: './home-ru-blog-onehundred-four.component.scss',
})
export class HomeRuBlogOnehundredFourComponent implements OnInit {
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
    this.titleService.setTitle('Торговля Solana (SOL) | Полное руководство');
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговля Solana (SOL): полное руководство. Технология, фундаментальный анализ, технические стратегии, DeFi экосистема.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/solana',
          },
          headline: 'Торговля Solana (SOL) | Полное руководство',
          description:
            'Торговля Solana (SOL): полное руководство. Технология, фундаментальный анализ, технические стратегии, DeFi экосистема.',
          image: 'https://arapov.trade/assets/img/content/sol1.jpg',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-07-01T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          inLanguage: 'ru',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Что такое Solana?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Solana — высокоскоростной блокчейн с механизмом Proof of History, способный обрабатывать до 65,000 транзакций в секунду с минимальными комиссиями.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает Proof of History?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PoH создаёт криптографическую временную метку для каждой транзакции, позволяя валидаторам обрабатывать транзакции параллельно без ожидания консенсуса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски торговли SOL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски: исторические проблемы со стабильностью сети, высокая волатильность, концентрация стейка, зависимость от общего крипторынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое TVL в контексте Solana?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TVL (Total Value Locked) — общая стоимость активов, заблокированных в DeFi протоколах Solana. Рост TVL указывает на здоровье экосистемы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где торговать SOL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SOL торгуется на крупнейших биржах: Binance, Coinbase, Kraken, OKX. Также доступны DEX на самой Solana: Raydium, Orca, Jupiter.',
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
      name: 'Как начать торговать Solana',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите фундаментал',
          text: 'Проанализируйте TVL, активность экосистемы, новости о партнёрствах и развитии сети Solana.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите биржу',
          text: 'Откройте счёт на централизованной бирже (Binance, Coinbase) или используйте DEX на Solana.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определите точку входа',
          text: 'Используйте технический анализ: уровни поддержки, объёмы, корреляцию с Bitcoin.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Управляйте рисками',
          text: 'Установите стоп-лоссы, не превышайте 2-5% риска на сделку, учитывайте высокую волатильность.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Следите за новостями',
          text: 'Мониторьте обновления сети, статус экосистемы и общий sentiment крипторынка.',
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
      name: 'Глоссарий терминов Solana',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Solana',
          description:
            'Высокоскоростной блокчейн для масштабных децентрализованных приложений.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof of History',
          description:
            'Механизм консенсуса, создающий криптографическую временную метку для транзакций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TPS',
          description:
            'Transactions Per Second — количество транзакций, обрабатываемых сетью в секунду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sealevel',
          description:
            'Среда параллельного исполнения смарт-контрактов на Solana.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gulf Stream',
          description:
            'Протокол пересылки транзакций без мемпула для снижения задержек.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Turbine',
          description:
            'Протокол распространения блоков через дерево валидаторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TVL',
          description:
            'Total Value Locked — общая стоимость активов в DeFi протоколах.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tokenomics',
          description:
            'Экономическая модель токена: распределение, инфляция, механизмы стейкинга.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
