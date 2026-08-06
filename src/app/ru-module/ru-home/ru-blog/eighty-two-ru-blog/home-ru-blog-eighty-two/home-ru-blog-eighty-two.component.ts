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
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-eighty-two',
  templateUrl: './home-ru-blog-eighty-two.component.html',
  styleUrl: './home-ru-blog-eighty-two.component.scss',
})
export class HomeRuBlogEightyTwoComponent {
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
      'Паттерны Флаг и Вымпел в трейдинге | Фигуры продолжения тренда',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по торговле паттернами Флаг и Вымпел. Узнайте, как распознавать фигуры продолжения тренда, определять точки входа и выставлять стоп-лосс и тейк-профит.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagandpennant.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Флаг и вымпел: пробой тренда | ArapovTrade',
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
          headline: 'Паттерны Флаг и Вымпел в трейдинге — полное руководство',
          description:
            'Полное руководство по торговле паттернами Флаг и Вымпел. Узнайте, как распознавать фигуры продолжения тренда, определять точки входа и выставлять стоп-лосс и тейк-профит.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          image: [
            'https://arapov.trade/assets/img/content/flagandpennant.webp',
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/flagandpennant',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'паттерн флаг',
            'паттерн вымпел',
            'фигуры продолжения',
            'технический анализ',
            'пробой',
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
          name: 'Что такое паттерны Флаг и Вымпел?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Флаг и Вымпел — это классические фигуры продолжения тренда, формирующиеся после сильного импульсного движения. Флаг представляет собой наклонный прямоугольный канал, а Вымпел — симметричный сужающийся треугольник. Обе модели сигнализируют о паузе в тренде перед его продолжением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить Флаг от Вымпела на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Флаг формирует параллельный канал с наклоном против основного тренда, тогда как Вымпел образует симметричный треугольник с сходящимися линиями. Флаг обычно имеет более длительную фазу консолидации, а Вымпел характеризуется быстрым сужением ценового диапазона.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить истинный пробой паттерна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинный пробой подтверждается увеличением торговых объёмов, закрытием свечи за границами фигуры и отсутствием быстрого возврата цены в паттерн. Дополнительное подтверждение дают индикаторы RSI, MACD и скользящие средние.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать цель по прибыли для паттернов Флаг и Вымпел?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Целевой уровень рассчитывается методом древка: высота импульсного движения перед формированием паттерна откладывается от точки пробоя в направлении тренда. Дополнительные цели можно определить по уровням Фибоначчи 161.8% и 261.8%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где размещать стоп-лосс при торговле Флагом и Вымпелом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При бычьих паттернах стоп-лосс размещается ниже нижней границы фигуры или под последним локальным минимумом. При медвежьих — выше верхней границы или последнего максимума. Рекомендуется учитывать волатильность с помощью индикатора ATR.',
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
      name: 'Как торговать паттерны Флаг и Вымпел',
      description:
        'Пошаговая инструкция по торговле фигурами продолжения тренда',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентификация импульса',
          text: 'Найдите сильное направленное движение цены (древко), которое предшествует формированию паттерна. Это движение определяет контекст тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Распознавание фигуры',
          text: 'Определите тип паттерна: Флаг формирует наклонный канал против тренда, Вымпел — симметричный сужающийся треугольник. Обратите внимание на снижение объёмов в фазе консолидации.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ожидание пробоя',
          text: 'Дождитесь выхода цены за границы паттерна в направлении основного тренда. Убедитесь, что пробой сопровождается ростом объёмов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтверждение сигнала',
          text: 'Проверьте закрытие свечи за границами фигуры. Используйте индикаторы RSI, MACD для дополнительного подтверждения направления движения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вход и управление позицией',
          text: 'Войдите в сделку после подтверждения пробоя. Установите стоп-лосс за границей паттерна и тейк-профит на уровне, равном высоте древка от точки пробоя.',
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
      name: 'Терминология паттернов Флаг и Вымпел',
      description: 'Основные термины торговли фигурами продолжения тренда',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн Флаг',
          description:
            'Фигура продолжения тренда в виде наклонного прямоугольного канала, формирующегося после импульсного движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн Вымпел',
          description:
            'Фигура продолжения тренда в виде симметричного сужающегося треугольника после импульсного движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Древко',
          description:
            'Импульсное движение цены, предшествующее формированию паттерна Флаг или Вымпел',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза консолидации',
          description:
            'Период временной паузы в движении цены, во время которого формируется тело паттерна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой паттерна',
          description:
            'Выход цены за границы фигуры в направлении основного тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за границы паттерна с последующим возвратом внутрь фигуры',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Метод древка',
          description:
            'Способ расчёта целевого уровня прибыли путём проекции высоты импульсного движения от точки пробоя',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объёмное подтверждение',
          description:
            'Увеличение торговых объёмов при пробое, подтверждающее истинность движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фигура продолжения',
          description:
            'Графический паттерн, сигнализирующий о паузе в тренде с последующим продолжением движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор среднего истинного диапазона для оценки волатильности',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
