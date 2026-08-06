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
  selector: 'app-home-ru-blog-eighty-six',
  templateUrl: './home-ru-blog-eighty-six.component.html',
  styleUrl: './home-ru-blog-eighty-six.component.scss',
})
export class HomeRuBlogEightySixComponent {
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
      'Паттерн 123 в трейдинге: полное руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как торговать паттерн 123. Формирование точек 1-2-3, сигналы входа, стоп-лосс, тейк-профит и распространённые ошибки трейдеров.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-23' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pattern-1-2-3.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Паттерн 1-2-3: разворот тренда | ArapovTrade',
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
          headline: 'Паттерн 123 в трейдинге: полное руководство по торговле',
          description:
            'Подробное руководство по паттерну 123. Формирование модели, точки входа и выхода, установка стоп-лосса и тейк-профита, типичные ошибки трейдеров.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-11T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/pattern-1-2-3',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pattern-1-2-3.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords: 'паттерн 123, фигура 123, разворот тренда, пробой уровня',
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
          name: 'Что такое паттерн 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Паттерн 123 — универсальная модель технического анализа, состоящая из трёх последовательных точек: локальный экстремум (точка 1), уровень коррекции (точка 2) и зона потенциального разворота (точка 3). Пробой уровня точки 2 служит главным торговым сигналом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда открывать сделку по паттерну 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальный вход — после подтверждённого пробоя уровня точки 2 с увеличением объёмов. Консервативный подход предполагает ожидание закрытия свечи за уровнем, агрессивный — вход при касании уровня. Лучшая возможность — ретест точки 2 после пробоя.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где устанавливать стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс устанавливается за точкой 3: ниже точки 3 для покупок, выше точки 3 для продаж. Также можно использовать индикатор ATR для расчёта адаптивного стопа с учётом волатильности или динамический трейлинг-стоп.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать цель по прибыли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тейк-профит определяется несколькими способами: ближайший уровень поддержки/сопротивления, проекция высоты паттерна (расстояние от точки 1 до точки 2 откладывается от точки пробоя), или частичное закрытие с трейлинг-стопом.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах работает паттерн 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Паттерн 123 работает на любых таймфреймах от M1 до D1 и выше. Наиболее надёжные сигналы появляются на старших временных интервалах (H1, H4, D1). На младших таймфреймах паттерн подходит для скальпинга, на старших — для среднесрочной торговли.',
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
      name: 'Как торговать паттерн 123',
      description:
        'Пошаговое руководство по торговле разворотным паттерном 123 на финансовых рынках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентифицируйте точку 1',
          text: 'Найдите локальный экстремум после трендового движения: максимум при нисходящем тренде или минимум при восходящем. Это первая точка паттерна, обозначающая потенциальное завершение текущего импульса.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите точку 2',
          text: 'После точки 1 цена совершает коррекцию, формируя точку 2 — важный уровень поддержки или сопротивления. Этот уровень станет ключевым для определения момента входа в сделку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь формирования точки 3',
          text: 'Цена делает ещё одно движение, но не обновляет экстремум точки 1. Точка 3 формируется между точками 1 и 2. Наличие разворотных свечных паттернов на точке 3 усиливает сигнал.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Войдите в сделку при пробое точки 2',
          text: 'Откройте позицию после закрытия свечи за уровнем точки 2 с подтверждением увеличением объёмов. Для снижения риска дождитесь ретеста пробитого уровня.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс и тейк-профит',
          text: 'Разместите стоп-лосс за точкой 3. Определите тейк-профит на ближайшем уровне или используя проекцию высоты паттерна. Рассмотрите частичное закрытие позиции с трейлинг-стопом.',
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
      name: 'Глоссарий терминов паттерна 123',
      description:
        'Основные термины и определения, связанные с разворотным паттерном 123',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн 123',
          description:
            'Универсальная модель технического анализа из трёх точек, сигнализирующая о развороте или продолжении тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка 1',
          description:
            'Локальный экстремум цены — максимум при нисходящем тренде или минимум при восходящем, отмечающий начало паттерна.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка 2',
          description:
            'Уровень коррекции после точки 1, формирующий ключевой уровень поддержки или сопротивления. Пробой этого уровня — главный торговый сигнал.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка 3',
          description:
            'Зона потенциального разворота, которая не обновляет экстремум точки 1, подтверждая ослабление текущего тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой уровня',
          description:
            'Момент, когда цена преодолевает уровень точки 2, подтверждая смену тренда и давая сигнал на открытие позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возврат цены к пробитому уровню точки 2 для тестирования его в новом качестве — поддержки или сопротивления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Ситуация, когда цена пробивает уровень точки 2, но затем возвращается обратно, не подтверждая разворот.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консервативный вход',
          description:
            'Метод входа в сделку после закрытия свечи за уровнем точки 2 с подтверждением объёмами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Агрессивный вход',
          description:
            'Метод входа в сделку при касании уровня точки 2 без ожидания подтверждения закрытием свечи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, который перемещается вслед за движением цены, защищая накопленную прибыль.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
