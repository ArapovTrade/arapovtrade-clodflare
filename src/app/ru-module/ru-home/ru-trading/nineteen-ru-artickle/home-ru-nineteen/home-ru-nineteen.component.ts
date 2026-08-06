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
  selector: 'app-home-ru-nineteen',
  templateUrl: './home-ru-nineteen.component.html',
  styleUrl: './home-ru-nineteen.component.scss',
})
export class HomeRuNineteenComponent implements OnInit {
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
      'Торговля на Форекс: как начать — руководство для начинающих | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как начать торговать на Форекс: выбор брокера, открытие счёта, стратегии торговли и управление рисками. Полное руководство для начинающих трейдеров.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/howtotradeonforex.webp',
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
            'Торговля на Форекс: как начать — руководство для начинающих',
          description:
            'Как начать торговать на Форекс: выбор брокера, открытие счёта, стратегии торговли и управление рисками. Полное руководство для начинающих трейдеров.',
          image:
            'https://arapov.trade/assets/img/content/howtotradeonforex1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/howtotradeonforex',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'торговля на форекс',
            'валютный рынок',
            'брокер',
            'стратегии',
            'управление рисками',
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
          name: 'Что такое рынок Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Форекс (Foreign Exchange) — международный децентрализованный валютный рынок с ежедневным оборотом более 6 триллионов долларов. Работает круглосуточно с понедельника по пятницу, объединяя банки, фонды и частных трейдеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько денег нужно для начала торговли на Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимальный депозит зависит от брокера — от 10 до 100 долларов. Для комфортной торговли с соблюдением риск-менеджмента рекомендуется начинать с 500-1000 долларов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие валютные пары лучше выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новичкам рекомендуются основные пары с долларом США: EUR/USD, GBP/USD, USD/JPY. Они отличаются высокой ликвидностью, узкими спредами и предсказуемым поведением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое кредитное плечо и как его использовать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кредитное плечо позволяет торговать суммами, превышающими депозит. Плечо 1:100 означает управление 10 000 долларами при депозите 100 долларов. Увеличивает как прибыль, так и убытки — требует осторожности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выбрать надёжного брокера Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Проверяйте наличие лицензии регуляторов (FCA, CySEC, ASIC), изучайте отзывы трейдеров, условия торговли (спреды, комиссии), скорость вывода средств и качество поддержки.',
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
      name: 'Как начать торговать на Форекс',
      description:
        'Пошаговое руководство по началу торговли на валютном рынке для начинающих трейдеров.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите брокера',
          text: 'Изучите рейтинги, проверьте лицензии регуляторов и условия торговли. Выбирайте брокера с демо-счётом и образовательными материалами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Откройте торговый счёт',
          text: 'Зарегистрируйтесь на сайте брокера, пройдите верификацию личности и выберите тип счёта (стандартный, ECN, центовый).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Установите торговую платформу',
          text: 'Скачайте MetaTrader 4/5 или другую платформу брокера. Изучите интерфейс, настройте графики и индикаторы.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Потренируйтесь на демо-счёте',
          text: 'Освойте платформу и протестируйте стратегии на виртуальных деньгах без риска потери капитала.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Пополните счёт и начните торговлю',
          text: 'Внесите минимальный депозит, начните с малых объёмов и строго соблюдайте правила управления рисками.',
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
      name: 'Глоссарий терминов Форекс',
      description: 'Ключевые термины валютного рынка для начинающих трейдеров',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Форекс',
          description: 'Международный децентрализованный рынок обмена валют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютная пара',
          description:
            'Инструмент торговли, показывающий соотношение курсов двух валют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Разница между ценой покупки и продажи валютной пары',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм увеличения торгового объёма за счёт заёмных средств брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лот',
          description: 'Стандартная единица измерения объёма сделки на Форекс',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пункт',
          description: 'Минимальное изменение цены валютной пары',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Ордер автоматического закрытия позиции при достижении заданного убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер автоматической фиксации прибыли при достижении целевой цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Залог, блокируемый на счёте для обеспечения открытой позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description:
            'Плата за перенос позиции через ночь, зависящая от разницы процентных ставок',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
