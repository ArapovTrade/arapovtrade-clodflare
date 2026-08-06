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
  selector: 'app-home-ru-eleven',
  templateUrl: './home-ru-eleven.component.html',
  styleUrl: './home-ru-eleven.component.scss',
})
export class HomeRuElevenComponent implements OnInit {
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
      'Как начать торговать криптовалютами: полное руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как начать торговать криптовалютами с нуля. Выбор биржи, регистрация, стратегии торговли, управление рисками и анализ рынка.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostart.webp',
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
          headline:
            'Как начать торговать криптовалютами: полное руководство для начинающих',
          description:
            'Подробное руководство по началу торговли криптовалютами. Выбор биржи, регистрация, стратегии, управление рисками и анализ рынка.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cryptostart',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostart1.png',
          },
          articleSection: 'Криптовалюты',
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
          name: 'Какую криптобиржу выбрать для начала?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для начинающих рекомендуются крупные биржи с хорошей репутацией: Binance, Kraken, Coinbase, Bybit. Выбирайте по критериям: безопасность, ликвидность, комиссии, удобство интерфейса и поддержка нужных криптовалют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько денег нужно для начала торговли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начать можно с минимальных сумм — от $10-50. Главное правило: не инвестируйте больше, чем готовы потерять. Для обучения используйте демо-счета или небольшие депозиты.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая стратегия лучше для новичков?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новичкам рекомендуется начинать со спотовой торговли без кредитного плеча. Стратегии: HODL (долгосрочное удержание) или свинг-трейдинг. Избегайте скальпинга и фьючерсов на начальном этапе.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защитить свой аккаунт на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Включите двухфакторную аутентификацию (2FA) через Google Authenticator. Настройте антифишинговый код, белый список адресов для вывода и уведомления о входе. Используйте сложные уникальные пароли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой процент капитала рисковать в одной сделке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Золотое правило — не более 1-2% от депозита на одну сделку. При агрессивном стиле допускается 3-5%, но это значительно увеличивает риски потери капитала.',
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
      '@id': 'https://arapov.trade/ru/freestudying/cryptostart#howto',
      name: 'Как начать торговать криптовалютами',
      description:
        'Пошаговое руководство для начинающих трейдеров по началу торговли криптовалютами на биржах',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выбор криптовалютной биржи',
          text: 'Выберите надежную биржу с хорошей репутацией, высокой ликвидностью и низкими комиссиями. Рекомендуются: Binance (0.1%), Kraken (0.16-0.26%), Bybit (0.1%), Coinbase.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Регистрация и верификация',
          text: 'Создайте аккаунт, введите email, придумайте сложный пароль. Настройте 2FA через Google Authenticator. Пройдите KYC: загрузите паспорт, подтвердите адрес, сделайте селфи.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Настройка безопасности',
          text: 'Включите антифишинговый код, белый список адресов для вывода, уведомления о входе. Используйте сложные уникальные пароли.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Пополнение счёта',
          text: 'Выберите способ: банковский перевод, карта (3-5% комиссия), P2P-торговля или перевод с криптокошелька. Начните с $10-50 для обучения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Изучение интерфейса биржи',
          text: 'Ознакомьтесь со спотовой торговлей, графиками, типами ордеров (рыночный, лимитный, стоп-лосс). Практикуйтесь с минимальными суммами.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Выбор торговой стратегии',
          text: 'Для новичков: спотовая торговля без плеча, HODL (Bitcoin, Ethereum) или свинг-трейдинг. Избегайте скальпинга и фьючерсов.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Анализ рынка перед сделкой',
          text: 'Определите тренд с помощью скользящих средних, MACD, ADX. Найдите уровни поддержки и сопротивления. Проверьте объемы торгов.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Открытие первой сделки',
          text: 'Выберите пару (BTC/USDT). Установите стоп-лосс (5-10%) и тейк-профит (соотношение 1:2 или 1:3). Рискуйте не более 1-2% депозита.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Управление рисками',
          text: 'Не рискуйте более 1-2% в сделке. Используйте стоп-лосс. Диверсифицируйте: 50% BTC/ETH, 30% альткоины, 20% стейблкоины.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Ведение торгового журнала',
          text: 'Записывайте все сделки: дату, причину входа, результат, ошибки. Регулярно анализируйте статистику и корректируйте стратегию.',
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
      name: 'Глоссарий криптотрейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'CEX',
          description:
            'Централизованная биржа, управляемая компанией с высокой ликвидностью.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Децентрализованная биржа на смарт-контрактах без посредников.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'KYC',
          description: 'Процедура верификации личности пользователя на бирже.',
        },
        {
          '@type': 'DefinedTerm',
          name: '2FA',
          description: 'Двухфакторная аутентификация для защиты аккаунта.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description: 'Ордер для автоматической фиксации прибыли.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description: 'Стратегия долгосрочного удержания криптовалюты.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description: 'Стратегия множества быстрых сделок с малой прибылью.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description: 'Удержание позиций от нескольких дней до недель.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description: 'Объём торгов, влияющий на скорость исполнения ордеров.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
