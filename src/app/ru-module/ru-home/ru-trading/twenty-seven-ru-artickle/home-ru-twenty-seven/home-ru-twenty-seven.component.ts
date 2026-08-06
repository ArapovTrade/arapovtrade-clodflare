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
  selector: 'app-home-ru-twenty-seven',
  templateUrl: './home-ru-twenty-seven.component.html',
  styleUrl: './home-ru-twenty-seven.component.scss',
})
export class HomeRuTwentySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Технический анализ: виды графиков и тренды | Arapov.trade'
    );
     this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по техническому анализу: виды графиков (бары, японские свечи, линейный), типы трендов и уровни поддержки/сопротивления для трейдинга.',
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Технический анализ: виды графиков и тренды',
          description:
            'Полное руководство по техническому анализу: виды графиков, типы трендов и уровни поддержки/сопротивления для профессионального трейдинга',
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
          datePublished: '2025-05-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/technicalmarketcharts',
          },
          image:
            'https://arapov.trade/assets/img/content/technicalmarketcharts.webp',
          articleSection: 'Обучение трейдингу',
          keywords:
            'технический анализ, виды графиков, японские свечи, бары, линейный график, тренды, поддержка и сопротивление',
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
          name: 'Какой вид графика лучше всего подходит для начинающих трейдеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для начинающих трейдеров оптимальным выбором являются японские свечи. Они наглядно показывают соотношение сил между покупателями и продавцами, легко читаются благодаря цветовой индикации и позволяют быстро оценить рыночные настроения за любой период.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить смену тренда на рынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Смена тренда определяется по нескольким признакам: пробой ключевого уровня поддержки или сопротивления, формирование разворотных свечных паттернов, дивергенция с индикаторами объёма и изменение структуры максимумов/минимумов. Важно дождаться подтверждения, а не торговать первый сигнал.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличаются уровни поддержки от уровней сопротивления?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Уровень поддержки — это ценовая зона, где спрос превышает предложение и цена склонна отскакивать вверх. Уровень сопротивления — зона, где предложение превышает спрос и цена склонна откатываться вниз. При пробое уровни меняют свою роль: поддержка становится сопротивлением и наоборот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать во время бокового тренда (флэта)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговля во флэте возможна, но требует особого подхода. Трейдеры покупают у нижней границы диапазона и продают у верхней, используя короткие стоп-лоссы. Однако основная прибыль делается на пробое диапазона, поэтому многие предпочитают ждать выхода цены из флэта.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой таймфрейм выбрать для анализа графиков?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выбор таймфрейма зависит от стиля торговли. Скальперы работают на M1-M15, внутридневные трейдеры — на M15-H1, свинг-трейдеры — на H4-D1, позиционные трейдеры — на D1-W1. Рекомендуется анализировать несколько таймфреймов: старший для определения тренда, младший для поиска точки входа.',
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
      name: 'Как проводить технический анализ рынка',
      description:
        'Пошаговое руководство по анализу рыночных графиков для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите подходящий тип графика',
          text: 'Определите, какой вид графика соответствует вашему стилю торговли. Японские свечи подходят для большинства стратегий, бары — для детального анализа, линейный график — для общей оценки тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите текущий тренд',
          text: 'Проанализируйте структуру максимумов и минимумов. Восходящий тренд — последовательно повышающиеся минимумы, нисходящий — последовательно понижающиеся максимумы, боковой — цена движется в горизонтальном диапазоне.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Постройте уровни поддержки и сопротивления',
          text: 'Отметьте на графике ключевые уровни, от которых цена ранее разворачивалась. Соедините минимумы для определения поддержки и максимумы для определения сопротивления. Чем больше касаний, тем сильнее уровень.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проанализируйте свечные паттерны',
          text: 'Изучите формирующиеся свечные модели вблизи ключевых уровней. Разворотные паттерны сигнализируют о возможной смене направления, паттерны продолжения — о сохранении текущего тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Примите торговое решение',
          text: 'На основе совокупности факторов — направления тренда, положения цены относительно уровней и свечных сигналов — примите решение о входе в сделку с обязательным определением точки стоп-лосса и тейк-профита.',
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
      name: 'Глоссарий технического анализа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Японские свечи',
          description:
            'Вид графика, отображающий открытие, закрытие, максимум и минимум цены за период с помощью цветных прямоугольников',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бар',
          description:
            'Графический элемент, показывающий ценовой диапазон периода с отметками открытия и закрытия на вертикальной линии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Восходящий тренд',
          description:
            'Рыночное состояние с последовательно повышающимися минимумами и максимумами, указывающее на преобладание покупателей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нисходящий тренд',
          description:
            'Рыночное состояние с последовательно понижающимися максимумами и минимумами, указывающее на преобладание продавцов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флэт',
          description:
            'Боковое движение цены в горизонтальном диапазоне без выраженного направления',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки',
          description:
            'Ценовая зона, где спрос превышает предложение, вызывая отскок цены вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень сопротивления',
          description:
            'Ценовая зона, где предложение превышает спрос, ограничивая рост цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал, представленный одной свечой или баром на графике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой уровня',
          description:
            'Закрепление цены выше сопротивления или ниже поддержки, сигнализирующее о продолжении движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ценовой канал',
          description:
            'Две параллельные линии тренда, между которыми движется цена актива',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
