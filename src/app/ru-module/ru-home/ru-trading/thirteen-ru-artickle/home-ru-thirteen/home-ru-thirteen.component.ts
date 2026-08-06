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
  selector: 'app-home-ru-thirteen',
  templateUrl: './home-ru-thirteen.component.html',
  styleUrl: './home-ru-thirteen.component.scss',
})
export class HomeRuThirteenComponent implements OnInit {
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
      'Валютный риск: полное руководство по защите капитала | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое валютный риск и как им управлять. Узнайте о хеджировании, диверсификации, роли центральных банков и психологии трейдинга для защиты инвестиций.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/riskCurrencyExchange.webp',
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
          headline: 'Валютный риск: полное руководство по защите капитала',
          description:
            'Что такое валютный риск и как им управлять. Узнайте о хеджировании, диверсификации, роли центральных банков и психологии трейдинга для защиты инвестиций.',
          image:
            'https://arapov.trade/assets/img/content/riskCurrencyExchange1.webp',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/riskcurrencyexchange',
          },
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
        'https://t.me/ArapovTrade'
      ],
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
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
          name: 'Что такое валютный риск простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Валютный риск — это возможность финансовых потерь из-за изменения курса одной валюты относительно другой. Например, если вы купили евро по курсу 100 рублей, а через месяц курс упал до 90 рублей — вы теряете 10% при обратной конвертации.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защититься от валютного риска?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные методы защиты: хеджирование через форварды, фьючерсы и опционы; диверсификация портфеля между несколькими валютами; использование стоп-лоссов в трейдинге; открытие счетов в разных валютах для бизнеса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие факторы влияют на курс валюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Курс валюты определяют процентные ставки центральных банков, экономические показатели страны (ВВП, инфляция, безработица), геополитические события, баланс спроса и предложения, а также настроения участников рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему кредитное плечо опасно при валютных операциях?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кредитное плечо усиливает как прибыль, так и убытки. При плече 1:100 движение курса на 1% против вашей позиции приводит к потере 100% депозита. Поэтому новичкам рекомендуется начинать с плеча не выше 1:10-1:20.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как центральные банки влияют на валютный курс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Центральные банки управляют курсом через изменение процентных ставок, валютные интервенции, операции на открытом рынке и монетарную политику. Даже словесные заявления глав ЦБ способны вызвать значительные колебания курса.',
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
      name: 'Как управлять валютным риском',
      description:
        'Пошаговое руководство по защите капитала от колебаний валютных курсов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оцените свою подверженность риску',
          text: 'Определите, какая часть ваших активов или доходов зависит от курса иностранной валюты. Рассчитайте потенциальные потери при неблагоприятном движении курса на 10-20%.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите стратегию хеджирования',
          text: 'В зависимости от суммы и сроков выберите подходящий инструмент: форварды для фиксации курса, опционы для гибкости, фьючерсы для биржевой торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Диверсифицируйте валютную корзину',
          text: 'Распределите активы между несколькими валютами. Классическое соотношение: 40% доллар США, 30% евро, 20% другие стабильные валюты, 10% национальная валюта.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите правила риск-менеджмента',
          text: 'Определите максимально допустимый убыток на одну позицию (1-2% от капитала), используйте стоп-лоссы и не превышайте безопасное кредитное плечо.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Мониторьте макроэкономику',
          text: 'Следите за решениями центральных банков, экономической статистикой и геополитическими событиями. Используйте экономический календарь для планирования.',
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
      name: 'Глоссарий терминов валютного риска',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Валютный риск',
          description:
            'Возможность финансовых потерь из-за изменения обменного курса валют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description:
            'Стратегия защиты от ценовых колебаний через производные финансовые инструменты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Форвард',
          description:
            'Внебиржевой контракт на обмен валюты по фиксированному курсу в будущем',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Заёмные средства брокера для увеличения размера торговой позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Автоматический ордер на закрытие позиции при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-колл',
          description:
            'Требование брокера пополнить счёт или принудительное закрытие позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение активов для снижения общего риска портфеля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютная интервенция',
          description:
            'Покупка или продажа валюты центральным банком для влияния на курс',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Корреляция валют',
          description:
            'Статистическая взаимосвязь между движением курсов разных валютных пар',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
