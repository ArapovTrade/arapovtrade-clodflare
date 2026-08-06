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
  selector: 'app-home-ru-blog-eighty-five',
  templateUrl: './home-ru-blog-eighty-five.component.html',
  styleUrl: './home-ru-blog-eighty-five.component.scss',
})
export class HomeRuBlogEightyFiveComponent {
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
      'Двойная вершина и Двойное дно в трейдинге | Разворотные паттерны',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по торговле паттернами Двойная вершина и Двойное дно. Узнайте, как распознавать разворотные фигуры, определять точки входа и управлять рисками.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
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
            'Двойная вершина и Двойное дно — разворотные паттерны в трейдинге',
          description:
            'Полное руководство по торговле паттернами Двойная вершина и Двойное дно. Узнайте, как распознавать разворотные фигуры, определять точки входа и управлять рисками.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/doubletopandbottom.png',
            width: 1200,
            height: 630,
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/doubletopandbottom',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'двойная вершина',
            'двойное дно',
            'разворотные паттерны',
            'линия шеи',
            'технический анализ',
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
          name: 'Что такое паттерн Двойная вершина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Двойная вершина — это разворотный паттерн, формирующийся после восходящего тренда. Он состоит из двух последовательных максимумов примерно на одном уровне с промежуточным откатом. Пробой линии шеи вниз подтверждает разворот и сигнализирует о начале нисходящего движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое паттерн Двойное дно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Двойное дно — это разворотный паттерн, появляющийся после нисходящего тренда. Он состоит из двух последовательных минимумов примерно на одном уровне с промежуточным отскоком вверх. Пробой линии шеи вверх подтверждает разворот и сигнализирует о начале восходящего движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить линию шеи в этих паттернах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Линия шеи проводится через локальный минимум между двумя вершинами (для двойной вершины) или через локальный максимум между двумя минимумами (для двойного дна). Пробой этой линии является ключевым сигналом для входа в сделку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать цель движения после пробоя?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимальная цель рассчитывается путём проекции высоты паттерна от точки пробоя линии шеи. Высота паттерна — это расстояние от вершины (или дна) до линии шеи. Дополнительные цели определяются по уровням поддержки и сопротивления.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы помогают подтвердить паттерн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для подтверждения используются объёмы (рост при пробое линии шеи), RSI (дивергенция на втором экстремуме), MACD (пересечение линий в направлении разворота). Свечные паттерны на втором экстремуме также усиливают сигнал.',
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
      name: 'Как торговать паттерны Двойная вершина и Двойное дно',
      description: 'Пошаговая инструкция по торговле разворотными паттернами',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентификация тренда',
          text: 'Убедитесь, что перед формированием паттерна присутствует выраженный тренд — восходящий для двойной вершины или нисходящий для двойного дна.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Распознавание формации',
          text: 'Определите два последовательных экстремума примерно на одном уровне с промежуточным откатом. Проведите линию шеи через точку между экстремумами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ожидание пробоя',
          text: 'Дождитесь уверенного пробоя линии шеи с закрытием свечи за её пределами. Убедитесь в росте объёмов при пробое.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтверждение сигнала',
          text: 'Используйте дополнительные индикаторы: дивергенцию RSI, сигналы MACD, свечные паттерны. Возможен вход на ретесте линии шеи после пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управление позицией',
          text: 'Установите стоп-лосс за вторым экстремумом паттерна. Рассчитайте цель как проекцию высоты фигуры от точки пробоя.',
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
      name: 'Терминология паттернов Двойная вершина и Двойное дно',
      description: 'Основные термины торговли разворотными паттернами',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Двойная вершина',
          description:
            'Разворотный паттерн с двумя последовательными максимумами на одном уровне, сигнализирующий об окончании восходящего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Двойное дно',
          description:
            'Разворотный паттерн с двумя последовательными минимумами на одном уровне, сигнализирующий об окончании нисходящего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Линия шеи',
          description:
            'Горизонтальный уровень, проведённый через точку между двумя экстремумами паттерна, пробой которого подтверждает разворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Разворотный паттерн',
          description:
            'Графическая модель, сигнализирующая о вероятном окончании текущего тренда и начале противоположного движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест линии шеи',
          description:
            'Возвращение цены к пробитой линии шеи для её тестирования перед продолжением движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между движением цены и показаниями индикатора, часто предвещающее разворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проекция высоты',
          description:
            'Метод расчёта целевого уровня путём откладывания высоты паттерна от точки пробоя',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за линию шеи с последующим возвратом, не подтверждающий разворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Симметрия экстремумов',
          description:
            'Соответствие уровней двух вершин или двух минимумов паттерна, повышающее его надёжность',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объёмное подтверждение',
          description:
            'Увеличение торговых объёмов при пробое линии шеи, подтверждающее истинность разворота',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
