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
  selector: 'app-home-ru-seventeen',
  templateUrl: './home-ru-seventeen.component.html',
  styleUrl: './home-ru-seventeen.component.scss',
})
export class HomeRuSeventeenComponent implements OnInit {
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
      'Что такое Биткоин (Bitcoin) | Полное руководство по BTC',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое Биткоин и как он работает. Полное руководство по первой криптовалюте: история, майнинг, хранение, преимущества и перспективы развития BTC.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-31' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoin.webp',
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
            '@id': 'https://arapov.trade/ru/freestudying/bitcoin',
          },
          headline:
            'Что такое Биткоин (Bitcoin): полное руководство по первой криптовалюте',
          description:
            'Что такое Биткоин и как он работает. Полное руководство по первой криптовалюте: история, майнинг, хранение, преимущества и перспективы развития BTC.',
          image: 'https://arapov.trade/assets/img/content/bitcoin1.webp',
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
          name: 'Что такое Биткоин?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биткоин — это первая децентрализованная криптовалюта, созданная в 2009 году Сатоши Накамото. BTC работает на технологии блокчейн и позволяет совершать транзакции без посредников вроде банков.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему у Биткоина ограниченная эмиссия?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Максимальное количество биткоинов ограничено 21 миллионом монет. Это запрограммировано в коде сети и делает BTC дефляционным активом, защищённым от обесценивания в отличие от фиатных валют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое халвинг Биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвинг — это сокращение награды майнерам вдвое каждые 210 000 блоков (примерно раз в 4 года). Механизм уменьшает темпы эмиссии новых монет и исторически предшествовал росту цены BTC.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как безопасно хранить Биткоин?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для долгосрочного хранения рекомендуются аппаратные кошельки Ledger или Trezor. Для активного использования подходят мобильные кошельки с обязательной двухфакторной аутентификацией и резервным копированием seed-фразы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему Биткоин называют цифровым золотом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'BTC обладает свойствами, схожими с золотом: ограниченное предложение, сложность добычи, долговечность и независимость от правительств. Это делает его привлекательным инструментом сохранения стоимости.',
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
      name: 'Как начать работать с Биткоином',
      description:
        'Пошаговое руководство для начинающих по покупке и использованию BTC',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы',
          text: 'Разберитесь в принципах работы блокчейна, механизме консенсуса Proof-of-Work и особенностях хранения криптовалюты. Понимание технологии защитит от типичных ошибок новичков.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите кошелёк',
          text: 'Определитесь с типом хранения: горячий кошелёк для активного использования или аппаратный для долгосрочного хранения. Надёжно сохраните seed-фразу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Приобретите BTC',
          text: 'Зарегистрируйтесь на проверенной бирже, пройдите верификацию и купите биткоин удобным способом: картой, переводом или через P2P-платформу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Обеспечьте безопасность',
          text: 'Включите двухфакторную аутентификацию, используйте уникальные пароли и переведите значительные суммы на холодное хранение.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Определите стратегию',
          text: 'Решите, будете ли вы долгосрочно инвестировать (HODL), активно торговать или использовать BTC для платежей. Каждый подход требует разных инструментов.',
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
      name: 'Терминология Биткоина',
      description: 'Ключевые понятия для понимания первой криптовалюты',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description:
            'Распределённый реестр, хранящий все транзакции сети в виде связанных блоков данных',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнинг',
          description:
            'Процесс создания новых биткоинов путём решения криптографических задач и подтверждения транзакций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Халвинг',
          description:
            'Сокращение награды майнерам вдвое каждые 210 000 блоков для контроля эмиссии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Work',
          description:
            'Алгоритм консенсуса, требующий вычислительных затрат для подтверждения блоков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сатоши',
          description:
            'Минимальная единица биткоина, равная одной стомиллионной BTC (0.00000001)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Lightning Network',
          description:
            'Протокол второго уровня для мгновенных и дешёвых микротранзакций в сети Bitcoin',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Стратегия долгосрочного удержания биткоина независимо от краткосрочных колебаний цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватный ключ',
          description:
            'Криптографический код, дающий полный контроль над биткоинами на соответствующем адресе',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Набор из 12-24 слов для восстановления доступа к криптовалютному кошельку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
