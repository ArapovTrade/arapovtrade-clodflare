import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-ru-blog-ninty-nine',
  templateUrl: './home-ru-blog-ninty-nine.component.html',
  styleUrl: './home-ru-blog-ninty-nine.component.scss',
})
export class HomeRuBlogNintyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
    this.titleService.setTitle(
      'Индикатор MACD | Полное руководство по торговле',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Индикатор MACD: полное руководство по торговле. Настройки, сигналы, дивергенции, стратегии использования гистограммы и сигнальной линии.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
            '@id': 'https://arapov.trade/ru/freestudying/macdindicator',
          },
          headline:
            'Индикатор MACD: Полное руководство по схождению-расхождению скользящих средних',
          description:
            'Индикатор MACD: полное руководство по торговле. Настройки, сигналы, дивергенции, стратегии использования гистограммы и сигнальной линии.',
          image: 'https://arapov.trade/assets/img/content/macdindicator1.jpg',
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
          datePublished: '2025-06-16T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Что такое индикатор MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD (Moving Average Convergence Divergence) — это трендовый индикатор-осциллятор, показывающий соотношение между двумя экспоненциальными скользящими средними. Разработан Джеральдом Аппелем в 1979 году для определения силы и направления тренда.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие стандартные настройки MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Классические настройки MACD: быстрая EMA — 12 периодов, медленная EMA — 26 периодов, сигнальная линия — 9 периодов. Эти параметры подходят для большинства рынков и таймфреймов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать по сигналам MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные сигналы MACD: пересечение линии MACD и сигнальной линии (покупка при пересечении снизу вверх, продажа — сверху вниз), пересечение нулевой линии, дивергенции между ценой и индикатором.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что показывает гистограмма MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Гистограмма MACD отображает разницу между линией MACD и сигнальной линией. Растущая гистограмма указывает на усиление импульса, убывающая — на его ослабление. Смена цвета предупреждает о возможном развороте.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем MACD отличается от RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD — трендовый индикатор, лучше работающий в направленных движениях. RSI — осциллятор, эффективный в боковых рынках. MACD показывает направление и силу тренда, RSI — зоны перекупленности и перепроданности.',
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
      name: 'Как использовать индикатор MACD в торговле',
      description:
        'Пошаговое руководство по применению MACD для поиска торговых сигналов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Добавьте MACD на график',
          text: 'Откройте торговую платформу, выберите MACD из списка индикаторов. Стандартные настройки: 12, 26, 9. Индикатор отобразится под графиком цены.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите текущий тренд',
          text: 'Посмотрите на положение линии MACD относительно нулевой линии. Выше нуля — бычий тренд, ниже — медвежий. Это определяет приоритетное направление торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ищите пересечения линий',
          text: 'Следите за пересечением линии MACD и сигнальной линии. Пересечение снизу вверх — сигнал на покупку, сверху вниз — на продажу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализируйте гистограмму',
          text: 'Наблюдайте за высотой столбцов гистограммы. Уменьшение столбцов предупреждает об ослаблении импульса и возможном развороте или коррекции.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Проверьте наличие дивергенций',
          text: 'Сравните направление ценовых экстремумов с экстремумами MACD. Расхождение указывает на ослабление тренда. Дождитесь подтверждения перед входом в сделку.',
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
      name: 'Терминология индикатора MACD',
      description:
        'Ключевые понятия для понимания индикатора схождения-расхождения скользящих средних',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'MACD',
          description:
            'Moving Average Convergence Divergence — индикатор, измеряющий схождение и расхождение скользящих средних',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Линия MACD',
          description:
            'Разница между быстрой (12) и медленной (26) экспоненциальными скользящими средними',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сигнальная линия',
          description:
            '9-периодная EMA от линии MACD, используется для генерации торговых сигналов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гистограмма MACD',
          description:
            'Визуальное отображение разницы между линией MACD и сигнальной линией',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нулевая линия',
          description:
            'Центральная линия индикатора, разделяющая бычью и медвежью территории',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Схождение',
          description:
            'Сближение скользящих средних, указывающее на замедление тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Расхождение',
          description:
            'Удаление скользящих средних друг от друга, указывающее на усиление тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция MACD',
          description:
            'Расхождение между направлением цены и индикатора, сигнализирующее о возможном развороте',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
