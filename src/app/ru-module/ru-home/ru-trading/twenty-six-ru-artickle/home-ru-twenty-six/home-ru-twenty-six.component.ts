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
  selector: 'app-home-ru-twenty-six',
  templateUrl: './home-ru-twenty-six.component.html',
  styleUrl: './home-ru-twenty-six.component.scss',
})
export class HomeRuTwentySixComponent implements OnInit {
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
      'Технический анализ рынка: методы и принципы прогнозирования',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по техническому анализу финансовых рынков. Изучите индикаторы, паттерны, уровни поддержки и сопротивления для успешной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/technicalanalysis.webp',
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
            '@id': 'https://arapov.trade/ru/freestudying/technicalanalysis',
          },
          headline:
            'Технический анализ в трейдинге: полный гайд для начинающих',
          description:
            'Основы технического анализа рынка. Уровни поддержки и сопротивления, наклонные каналы, соотношение риск/прибыль.',
          image:
            'https://arapov.trade/assets/img/content/technicalanalysis.webp',
          datePublished: '2025-06-11T00:00:00+03:00',
         dateModified: '2026-04-15T00:00:00Z',
          inLanguage: 'ru',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Технический анализ для начинающих трейдеров | Полное руководство',
            description:
              'Технический анализ для начинающих трейдеров. Узнайте, как использовать технический анализ рынка. Разбираем основные инструменты: уровни поддержки и сопротивления, наклонные каналы, соотношение риск/прибыль.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/dOCLBmevcSU/maxresdefault.jpg',
              'https://img.youtube.com/vi/dOCLBmevcSU/hqdefault.jpg',
            ],
            uploadDate: '2025-11-14T00:00:00+02:00',
            duration: 'PT10M59S',
            contentUrl: 'https://www.youtube.com/watch?v=dOCLBmevcSU',
            embedUrl: 'https://www.youtube.com/embed/dOCLBmevcSU',
            inLanguage: 'ru',
            keywords:
              'технический анализ, уровни поддержки и сопротивления, наклонные каналы, трейдинг для начинающих',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Технический анализ рынка - что это и зачем нужен',
                startOffset: 103,
                endOffset: 148,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=103',
              },
              {
                '@type': 'Clip',
                name: 'Определение технического анализа и методы прогнозирования',
                startOffset: 148,
                endOffset: 190,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=148',
              },
              {
                '@type': 'Clip',
                name: 'Вероятности в трейдинге и винрейт технического анализа',
                startOffset: 190,
                endOffset: 230,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=190',
              },
              {
                '@type': 'Clip',
                name: 'Объемный анализ vs технический анализ - что эффективнее',
                startOffset: 230,
                endOffset: 261,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=230',
              },
              {
                '@type': 'Clip',
                name: 'Уровни поддержки и сопротивления - как строить и применять',
                startOffset: 261,
                endOffset: 300,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=261',
              },
              {
                '@type': 'Clip',
                name: 'Почему рынок реагирует на уровни поддержки и сопротивления',
                startOffset: 300,
                endOffset: 330,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=300',
              },
              {
                '@type': 'Clip',
                name: 'Когда использовать уровни в боковом движении',
                startOffset: 330,
                endOffset: 340,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=330',
              },
              {
                '@type': 'Clip',
                name: 'Наклонные каналы в трейдинге - построение и применение',
                startOffset: 340,
                endOffset: 390,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=340',
              },
              {
                '@type': 'Clip',
                name: 'Медвежий канал - как строить и торговать в нисходящем тренде',
                startOffset: 390,
                endOffset: 440,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=390',
              },
              {
                '@type': 'Clip',
                name: 'Бычий канал - восходящий тренд и правила торговли',
                startOffset: 440,
                endOffset: 659,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=440',
              },
            ],
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
      url: 'https://arapov.trade/ru/',
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
          name: 'Что такое технический анализ рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технический анализ — метод прогнозирования ценовых движений на основе исторических данных о цене, объёмах торгов и графических паттернов. Он позволяет выявлять тренды, определять точки входа и выхода из позиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные принципы технического анализа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Три фундаментальных принципа: цена учитывает всё (вся информация отражена в котировках), ценовые движения не случайны (цены следуют трендам и паттернам), история повторяется (рыночная психология формирует повторяющиеся модели).',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие инструменты используются в техническом анализе?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные инструменты включают уровни поддержки и сопротивления, трендовые линии, графические паттерны (треугольники, голова и плечи), технические индикаторы (RSI, MACD, скользящие средние) и анализ объёмов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем технический анализ отличается от фундаментального?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технический анализ изучает ценовые графики и статистические индикаторы, игнорируя внутреннюю стоимость актива. Фундаментальный анализ оценивает экономические показатели, финансовую отчётность и макроэкономические факторы.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках применим технический анализ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технический анализ универсален и применяется на форекс, фондовом рынке, криптовалютах, сырьевых товарах и индексах. Методы адаптируются под волатильность и ликвидность конкретного рынка.',
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
      name: 'Как применять технический анализ в торговле',
      description:
        'Пошаговое руководство по использованию технического анализа для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите таймфрейм',
          text: 'Определите временной интервал для анализа: минутные графики для скальпинга, часовые для дейтрейдинга, дневные и недельные для свинг-трейдинга и инвестирования.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите тренд',
          text: 'Используйте трендовые линии и скользящие средние для выявления направления рынка. Пересечение быстрой и медленной EMA подтверждает смену тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите ключевые уровни',
          text: 'Постройте уровни поддержки и сопротивления на основе исторических максимумов и минимумов. Эти зоны определяют потенциальные точки разворота или пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проанализируйте паттерны и индикаторы',
          text: 'Ищите графические фигуры и подтверждайте сигналы техническими индикаторами. Комбинация RSI, MACD и объёмов повышает надёжность анализа.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте рисками',
          text: 'Установите стоп-лосс за уровнем поддержки или сопротивления. Рассчитайте размер позиции исходя из допустимого риска на сделку.',
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
      name: 'Термины технического анализа',
      description: 'Глоссарий ключевых терминов технического анализа рынка',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цен на основе изучения исторических данных, графиков и статистических индикаторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовая зона, где спрос превышает предложение и цена склонна отскакивать вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень сопротивления',
          description:
            'Ценовая зона, где предложение превышает спрос и цена склонна разворачиваться вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тренд',
          description:
            'Устойчивое направление движения цены: восходящий (бычий), нисходящий (медвежий) или боковой (флэт)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн',
          description:
            'Графическая модель на ценовом графике, позволяющая прогнозировать дальнейшее движение цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Индикатор',
          description:
            'Математический расчёт на основе цены или объёма, визуализирующий рыночные условия',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объём торгов',
          description:
            'Количество единиц актива, купленных и проданных за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скользящая средняя',
          description:
            'Индикатор, сглаживающий ценовые данные путём усреднения цен за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой',
          description:
            'Преодоление ценой уровня поддержки или сопротивления с закреплением за ним',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал, за который формируется одна свеча или бар на графике',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
