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
  selector: 'app-home-ru-fourty-six',
  templateUrl: './home-ru-fourty-six.component.html',
  styleUrl: './home-ru-fourty-six.component.scss',
})
export class HomeRuFourtySixComponent implements OnInit {
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
      'Что такое Tether (USDT) | Полное руководство по стейблкоину',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое Tether (USDT) и как работает крупнейший стейблкоин. Узнайте о механизме привязки к доллару, способах использования, рисках и перспективах USDT.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptotether.webp',
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
            '@id': 'https://arapov.trade/ru/freestudying/cryptotether',
          },
          headline:
            'Что такое Tether (USDT): полное руководство по крупнейшему стейблкоину',
          description:
            'Что такое Tether (USDT) и как работает крупнейший стейблкоин. Узнайте о механизме привязки к доллару, способах использования, рисках и перспективах USDT.',
          image: 'https://arapov.trade/assets/img/content/cryptotether1.webp',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          articleBody:
            'Tether занимает особое место в криптовалютной экосистеме как инструмент, связывающий волатильный мир цифровых активов с устойчивостью традиционных валют...',
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
          name: 'Что такое Tether (USDT)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tether — это стейблкоин, цена которого привязана к доллару США в соотношении 1:1. USDT используется для торговли, хранения капитала и переводов, обеспечивая стабильность в волатильном криптовалютном мире.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем обеспечен Tether?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Согласно заявлениям компании Tether Limited, каждый токен USDT обеспечен резервами: долларами США, государственными облигациями, коммерческими бумагами и другими финансовыми активами.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких блокчейнах работает USDT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'USDT выпускается на множестве блокчейнов, включая Ethereum, Tron, Solana, Avalanche, Polygon и другие. Выбор сети влияет на скорость транзакций и размер комиссий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски связаны с использованием USDT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски включают вопросы прозрачности резервов, регуляторное давление, централизованное управление и конкуренцию со стороны других стейблкоинов с более прозрачной структурой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как безопасно хранить Tether?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для долгосрочного хранения рекомендуются аппаратные кошельки Ledger или Trezor. Для активной торговли подходят горячие кошельки Trust Wallet или MetaMask с обязательной двухфакторной аутентификацией.',
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
      name: 'Как начать использовать Tether (USDT)',
      description:
        'Пошаговое руководство по покупке и использованию стейблкоина USDT',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите биржу',
          text: 'Зарегистрируйтесь на надёжной криптовалютной бирже: Binance, Bybit, OKX или Kraken. Пройдите верификацию личности для доступа ко всем функциям.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Пополните счёт',
          text: 'Внесите фиатные средства через банковский перевод, карту или P2P-платформу. Альтернативно переведите другую криптовалюту для обмена на USDT.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Купите USDT',
          text: 'Совершите покупку через спотовый рынок или мгновенный обмен. Выберите нужную сеть блокчейна в зависимости от целей использования.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Настройте хранение',
          text: 'Для активной торговли храните USDT на бирже. Для долгосрочного хранения переведите на аппаратный кошелёк, записав seed-фразу в безопасном месте.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте USDT',
          text: 'Применяйте токены для торговли, переводов, участия в DeFi-протоколах или как защиту от волатильности в периоды рыночной неопределённости.',
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
      name: 'Терминология Tether и стейблкоинов',
      description: 'Ключевые понятия для понимания механизмов работы USDT',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стейблкоин',
          description:
            'Криптовалюта с механизмом поддержания стабильного курса, обычно привязанного к фиатной валюте или товару',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Привязка (Peg)',
          description:
            'Механизм поддержания фиксированного соотношения между стоимостью токена и базового актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Резервы',
          description:
            'Активы, обеспечивающие стоимость выпущенных токенов: валюта, облигации, коммерческие бумаги',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультичейн',
          description:
            'Присутствие токена на нескольких блокчейнах одновременно для гибкости использования',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ERC-20',
          description:
            'Технический стандарт токенов на блокчейне Ethereum, которому соответствует USDT в сети ETH',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TRC-20',
          description:
            'Стандарт токенов на блокчейне Tron с низкими комиссиями и высокой скоростью транзакций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Депег',
          description:
            'Потеря привязки к базовому активу, когда цена стейблкоина отклоняется от целевого значения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tether Limited',
          description:
            'Компания-эмитент, управляющая выпуском, обеспечением и погашением токенов USDT',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аттестация резервов',
          description:
            'Независимая проверка соответствия выпущенных токенов заявленным резервным активам',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
