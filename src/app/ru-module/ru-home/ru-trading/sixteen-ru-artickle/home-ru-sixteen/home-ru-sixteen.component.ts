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
  selector: 'app-home-ru-sixteen',
  templateUrl: './home-ru-sixteen.component.html',
  styleUrl: './home-ru-sixteen.component.scss',
})
export class HomeRuSixteenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Ethereum: как работает и зачем он нужен | Полное руководство',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по Ethereum: как работает вторая по капитализации криптовалюта, смарт-контракты, DeFi-экосистема, NFT и переход на Proof-of-Stake. Всё о технологии и перспективах ETH.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ethereum.webp',
    });

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
            '@id': 'https://arapov.trade/ru/freestudying/ethereum',
          },
          headline:
            'Ethereum: как работает и зачем он нужен — полное руководство по технологии ETH',
          description:
            'Полное руководство по Ethereum: как работает вторая по капитализации криптовалюта, смарт-контракты, DeFi-экосистема, NFT и переход на Proof-of-Stake.',
          image: 'https://arapov.trade/assets/img/content/ethereum1.png',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Чем Ethereum принципиально отличается от Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bitcoin создавался как цифровое золото и средство сбережения с ограниченной эмиссией. Ethereum — это программируемая платформа со смарт-контрактами, позволяющая создавать децентрализованные приложения, токены, DeFi-протоколы и NFT. По сути, Bitcoin — это деньги, а Ethereum — децентрализованный компьютер.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое смарт-контракты и как они работают?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Смарт-контракты — это программы на блокчейне, автоматически исполняющиеся при выполнении заданных условий. Они написаны на языке Solidity и работают в Ethereum Virtual Machine (EVM). После развёртывания код становится неизменным и исполняется без посредников — например, автоматически переводит средства при выполнении договорённостей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что изменилось после перехода Ethereum на Proof-of-Stake?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обновление The Merge в 2022 году заменило энергозатратный майнинг (Proof-of-Work) на стейкинг (Proof-of-Stake). Энергопотребление сети снизилось на 99,9%, майнеры уступили место валидаторам, а для участия в обеспечении сети теперь нужно заморозить минимум 32 ETH вместо покупки дорогого оборудования.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему комиссии в сети Ethereum бывают такими высокими?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Комиссии (gas fees) определяются спросом на пространство в блоках. При высокой активности (запуск популярных NFT, волатильность рынка) пользователи конкурируют за включение транзакций, поднимая цены. Решения второго уровня (Optimism, Arbitrum) и будущий шардинг призваны снизить нагрузку на основную сеть.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие токены работают на базе Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На Ethereum работают тысячи токенов стандарта ERC-20: стейблкоины (USDT, USDC, DAI), токены DeFi-протоколов (UNI, AAVE, COMP), оракульные сети (LINK), игровые токены и многие другие. Большинство криптопроектов изначально запускаются именно на Ethereum благодаря развитой инфраструктуре.',
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
      name: 'Как начать работу с Ethereum',
      description:
        'Пошаговое руководство для новичков по началу использования Ethereum и его экосистемы.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Создание криптовалютного кошелька',
          text: 'Установите некастодиальный кошелёк (MetaMask, Trust Wallet) для хранения ETH и взаимодействия с децентрализованными приложениями. Запишите сид-фразу и храните её в безопасном месте офлайн.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Приобретение ETH',
          text: 'Купите Ethereum на централизованной бирже (Binance, Coinbase, Kraken) или через P2P-обменники. Переведите ETH на свой некастодиальный кошелёк для полного контроля над активами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Изучение DeFi-экосистемы',
          text: 'Начните с простых операций: обмен токенов на Uniswap, предоставление ликвидности. Всегда проверяйте смарт-контракты через аудиты и используйте небольшие суммы для первых экспериментов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Освоение решений второго уровня',
          text: 'Для снижения комиссий изучите L2-сети (Arbitrum, Optimism, Base). Переведите часть активов через официальные мосты и пользуйтесь DeFi-приложениями с минимальными затратами на gas.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Участие в стейкинге (опционально)',
          text: 'При наличии 32 ETH можно стать валидатором напрямую. Для меньших сумм доступен ликвидный стейкинг через Lido или Rocket Pool, позволяющий получать доход без блокировки полной суммы.',
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
      name: 'Глоссарий терминов Ethereum',
      description: 'Основные термины экосистемы Ethereum и блокчейн-технологий',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description:
            'Программа на блокчейне, автоматически исполняющаяся при выполнении заданных условий без участия посредников.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентрализованные финансы — экосистема финансовых сервисов на блокчейне, работающих без традиционных посредников.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFT',
          description:
            'Невзаимозаменяемый токен — уникальный цифровой актив, подтверждающий право собственности на объект.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gas',
          description:
            'Единица измерения вычислительных ресурсов, необходимых для выполнения операций в сети Ethereum.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EVM',
          description:
            'Ethereum Virtual Machine — виртуальная машина, исполняющая код смарт-контрактов в сети Ethereum.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake',
          description:
            'Механизм консенсуса, где валидаторы подтверждают транзакции, замораживая криптовалюту в качестве залога.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейкинг',
          description:
            'Процесс блокировки криптовалюты для участия в обеспечении безопасности сети и получения вознаграждений.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шардинг',
          description:
            'Технология разделения блокчейна на параллельные сегменты для увеличения пропускной способности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Layer 2',
          description:
            'Решения второго уровня — протоколы, обрабатывающие транзакции вне основной сети для снижения нагрузки и комиссий.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ERC-20',
          description:
            'Технический стандарт для создания взаимозаменяемых токенов на блокчейне Ethereum.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
