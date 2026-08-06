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
  selector: 'app-home-ru-blog-eighty-three',
  templateUrl: './home-ru-blog-eighty-three.component.html',
  styleUrl: './home-ru-blog-eighty-three.component.scss',
})
export class HomeRuBlogEightyThreeComponent {
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
      'Паттерн Чашка с ручкой в трейдинге | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Паттерн Чашка с ручкой: полное руководство по торговле. Как распознать фигуру, точки входа, стоп-лосс, целевые уровни и типичные ошибки трейдеров.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cupandhandle.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Чашка с ручкой: пробой тренда | ArapovTrade',
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
          headline: 'Паттерн Чашка с ручкой в трейдинге',
          description:
            'Полное руководство по торговле паттерна Чашка с ручкой: распознавание, точки входа, управление рисками',
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
          },
          datePublished: '2025-06-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/cupandhandle',
          },
          image: 'https://arapov.trade/assets/img/content/cupandhandle.png',
          articleSection: 'Обучение трейдингу',
          keywords:
            'чашка с ручкой, паттерн, технический анализ, фигура продолжения, трейдинг, пробой',
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
          name: 'Что представляет собой паттерн Чашка с ручкой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чашка с ручкой — это фигура продолжения восходящего тренда, состоящая из двух элементов: закруглённого основания (чашки), образующегося после коррекции, и небольшой консолидации (ручки) перед пробоем вверх. Паттерн сигнализирует о накоплении позиций крупными игроками.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах лучше торговать эту фигуру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее надёжные сигналы формируются на таймфреймах H1 и выше. На младших интервалах (M5-M15) паттерн чаще даёт ложные пробои из-за рыночного шума. Дневные и недельные графики показывают наивысшую точность отработки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить целевой уровень прибыли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимальная цель рассчитывается путём измерения глубины чашки от дна до уровня сопротивления. Эта величина откладывается вверх от точки пробоя. Дополнительно учитываются ближайшие уровни сопротивления на старших таймфреймах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где размещать стоп-лосс при торговле этого паттерна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Консервативный стоп-лосс устанавливается ниже минимума ручки. При повышенной волатильности или слабости тренда стоп размещается ниже дна чашки. Важно учитывать средний диапазон волатильности актива (ATR) для избежания случайных выбиваний.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие ошибки чаще всего допускают трейдеры?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные ошибки: преждевременный вход до подтверждённого пробоя, игнорирование объёмов, торговля фигур с неправильной формой (V-образное дно вместо закруглённого), установка слишком узкого стоп-лосса и отсутствие риск-менеджмента.',
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
      name: 'Как торговать паттерн Чашка с ручкой',
      description:
        'Пошаговое руководство по торговле фигуры продолжения тренда',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентифицируйте паттерн',
          text: 'Найдите на графике закруглённое основание после восходящего движения. Убедитесь, что форма чашки плавная, без резких V-образных движений.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дождитесь формирования ручки',
          text: 'После восстановления цены к уровню предыдущего максимума должна сформироваться небольшая консолидация в виде нисходящего канала или флага.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Подтвердите пробой',
          text: 'Дождитесь закрытия свечи выше уровня сопротивления. Убедитесь, что пробой сопровождается ростом торговых объёмов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите стоп-лосс',
          text: 'Разместите защитный ордер ниже минимума ручки или ниже дна чашки в зависимости от волатильности актива.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Определите цели и управляйте позицией',
          text: 'Рассчитайте минимальную цель по глубине чашки. Рассмотрите частичную фиксацию прибыли на промежуточных уровнях.',
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
      name: 'Глоссарий паттерна Чашка с ручкой',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Чашка',
          description:
            'Закруглённое основание паттерна, формирующееся в результате плавной коррекции и последующего восстановления цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ручка',
          description:
            'Зона консолидации после формирования чашки, представляющая небольшой нисходящий канал перед пробоем',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн продолжения',
          description:
            'Графическая модель, сигнализирующая о вероятном продолжении текущего тренда после периода консолидации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой',
          description:
            'Выход цены за пределы ключевого уровня сопротивления с закреплением выше него',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за уровень с последующим возвратом обратно',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объём торгов',
          description:
            'Количество совершённых сделок за период, используемое для подтверждения силы ценового движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Глубина чашки',
          description:
            'Расстояние от края чашки до её дна, используемое для расчёта целевого уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возврат цены к пробитому уровню для его тестирования в качестве поддержки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Индикатор среднего истинного диапазона, показывающий волатильность актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, автоматически следующий за ценой для защиты накопленной прибыли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
