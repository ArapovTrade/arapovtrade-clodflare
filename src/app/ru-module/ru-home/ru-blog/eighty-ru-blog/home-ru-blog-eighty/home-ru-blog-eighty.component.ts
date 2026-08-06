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
  selector: 'app-home-ru-blog-eighty',
  templateUrl: './home-ru-blog-eighty.component.html',
  styleUrl: './home-ru-blog-eighty.component.scss',
})
export class HomeRuBlogEightyComponent {
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
      'Паттерн Голова и плечи: полное руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как торговать паттерн Голова и плечи. Классическая и перевернутая фигура, точки входа, стоп-лосс, тейк-профит и реальные примеры.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/headandshoulders.png',
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
          headline: 'Паттерн Голова и плечи: полное руководство по торговле',
          description:
            'Подробное руководство по паттерну Голова и плечи. Классическая и перевернутая фигура, сигналы входа, установка стоп-лосса и тейк-профита, комбинирование с индикаторами.',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/headandshoulders',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/headandshoulders1.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords: 'голова и плечи, паттерн разворота, линия шеи, трейдинг',
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
          name: 'Что такое паттерн Голова и плечи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Голова и плечи — это разворотная фигура технического анализа, формирующаяся на вершине восходящего тренда. Состоит из трёх вершин: левое плечо, голова (самая высокая точка) и правое плечо. Пробой линии шеи сигнализирует о развороте тренда вниз.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить линию шеи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Линия шеи — это уровень поддержки, соединяющий минимумы между левым плечом и головой, а также между головой и правым плечом. Она может быть горизонтальной или наклонной. Пробой этой линии является главным сигналом на вход в сделку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где устанавливать стоп-лосс при торговле паттерном?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс устанавливается выше правого плеча (консервативный подход) или выше головы (широкий стоп). Также можно использовать индикатор ATR для расчёта адаптивного стопа с учётом текущей волатильности рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое перевернутая Голова и плечи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевернутая Голова и плечи — зеркальный вариант паттерна, формирующийся на дне нисходящего тренда. Состоит из трёх впадин: левое плечо, голова (самая низкая точка) и правое плечо. Пробой линии шеи вверх сигнализирует о развороте к росту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать цель по прибыли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цель по прибыли рассчитывается по правилу симметрии: измерьте расстояние от головы до линии шеи и отложите его от точки пробоя в направлении сделки. Это расстояние является минимальной целью движения цены после пробоя.',
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
      name: 'Как торговать паттерн Голова и плечи',
      description:
        'Пошаговое руководство по торговле разворотной фигурой Голова и плечи на финансовых рынках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентифицируйте паттерн на графике',
          text: 'Найдите три последовательные вершины после восходящего тренда: левое плечо, голова (самая высокая точка) и правое плечо (ниже головы). Проведите линию шеи через минимумы между вершинами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дождитесь пробоя линии шеи',
          text: 'Не входите в сделку преждевременно. Дождитесь закрытия свечи ниже линии шеи с подтверждением роста торговых объёмов. Это главный сигнал на открытие короткой позиции.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Подтвердите сигнал дополнительными индикаторами',
          text: 'Проверьте дивергенцию на RSI или MACD, оцените объёмы при пробое. Если линия шеи совпадает с горизонтальным уровнем поддержки, сигнал усиливается.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите стоп-лосс',
          text: 'Разместите стоп-лосс выше правого плеча или используйте ATR для расчёта адаптивного стопа. Слишком узкий стоп может привести к преждевременному закрытию позиции.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Определите цель по прибыли',
          text: 'Измерьте высоту от головы до линии шеи и отложите это расстояние вниз от точки пробоя. Рассмотрите частичное закрытие позиции на 50% целевого движения.',
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
      name: 'Глоссарий терминов паттерна Голова и плечи',
      description:
        'Основные термины и определения, связанные с разворотным паттерном Голова и плечи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Голова и плечи',
          description:
            'Разворотная фигура технического анализа, состоящая из трёх вершин, сигнализирующая о смене восходящего тренда на нисходящий.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Линия шеи',
          description:
            'Уровень поддержки, соединяющий минимумы между вершинами паттерна. Пробой линии шеи является главным сигналом на вход в сделку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Левое плечо',
          description:
            'Первая вершина паттерна, формирующаяся после восходящего движения, за которой следует коррекция вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Голова',
          description:
            'Центральная и самая высокая вершина паттерна, отражающая последний импульс восходящего тренда перед разворотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Правое плечо',
          description:
            'Третья вершина паттерна, расположенная ниже головы, подтверждающая ослабление покупателей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перевернутая Голова и плечи',
          description:
            'Зеркальный вариант паттерна, формирующийся на дне нисходящего тренда и сигнализирующий о развороте к росту.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест линии шеи',
          description:
            'Возврат цены к линии шеи после пробоя для тестирования её в качестве нового уровня сопротивления или поддержки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Ситуация, когда цена пробивает линию шеи, но затем возвращается обратно, не подтверждая разворот тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Высота фигуры',
          description:
            'Расстояние от вершины головы до линии шеи, используемое для расчёта минимальной цели движения после пробоя.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объёмы при пробое',
          description:
            'Увеличение торговых объёмов во время пробоя линии шеи, подтверждающее силу сигнала и участие крупных игроков.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
