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
  selector: 'app-home-ru-blog-eighty-four',
  templateUrl: './home-ru-blog-eighty-four.component.html',
  styleUrl: './home-ru-blog-eighty-four.component.scss',
})
export class HomeRuBlogEightyFourComponent {
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
      'Паттерн Поглощение: как определить разворот тренда',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по свечному паттерну Поглощение. Изучите бычье и медвежье поглощение для определения разворота тренда и точек входа в рынок.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/engulfing.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Поглощение: Bullish и Bearish | ArapovTrade',
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
          headline: 'Паттерн Поглощение: как определить разворот тренда',
          description:
            'Полное руководство по свечному паттерну Поглощение. Изучите бычье и медвежье поглощение для определения разворота тренда и точек входа в рынок.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/engulfing',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/engulfing.webp',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'паттерн поглощение',
            'бычье поглощение',
            'медвежье поглощение',
            'свечной анализ',
            'разворот тренда',
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
          name: 'Что такое паттерн Поглощение?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Паттерн Поглощение — это разворотная свечная модель, где вторая свеча полностью перекрывает тело предыдущей. Бычье поглощение сигнализирует о развороте вверх после нисходящего тренда, медвежье — о развороте вниз после восходящего.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить истинное поглощение от ложного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинное поглощение формируется на ключевых уровнях поддержки или сопротивления и сопровождается ростом объёма торгов. Размер второй свечи значительно превышает первую, а дополнительные индикаторы (RSI, MACD) подтверждают разворот.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах работает паттерн Поглощение?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Паттерн работает на всех таймфреймах, но наиболее надёжные сигналы появляются на H1, H4, D1 и выше. На младших таймфреймах (M1, M5) больше рыночного шума и ложных сигналов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где устанавливать стоп-лосс при торговле по поглощению?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для бычьего поглощения стоп-лосс размещается ниже минимума второй свечи. Для медвежьего поглощения — выше максимума второй свечи. Рекомендуется использовать ATR для расчёта безопасного расстояния.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы подтверждают паттерн Поглощение?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI показывает выход из зон перекупленности или перепроданности, MACD — дивергенцию или пересечение нулевой линии, объёмы — всплеск активности на второй свече. Совпадение нескольких факторов усиливает сигнал.',
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
      name: 'Как торговать по паттерну Поглощение',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите тренд',
          text: 'Идентифицируйте текущий тренд на рынке. Бычье поглощение ищите в конце нисходящего тренда, медвежье — в конце восходящего.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите ключевой уровень',
          text: 'Определите ближайшие уровни поддержки и сопротивления. Паттерн, сформированный на ключевом уровне, имеет большую надёжность.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь формирования паттерна',
          text: 'Убедитесь, что вторая свеча полностью поглощает тело первой. Не входите до закрытия второй свечи.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите сигнал',
          text: 'Проверьте объём торгов — он должен вырасти на второй свече. Используйте RSI или MACD для дополнительного подтверждения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс и тейк-профит',
          text: 'Разместите стоп-лосс за экстремумом второй свечи. Рассчитайте тейк-профит с соотношением риска к прибыли минимум 1:2.',
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
      name: 'Термины свечного анализа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн Поглощение',
          description:
            'Разворотная свечная модель, где вторая свеча полностью перекрывает тело предыдущей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бычье поглощение',
          description:
            'Паттерн разворота вверх, формирующийся после нисходящего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежье поглощение',
          description:
            'Паттерн разворота вниз, формирующийся после восходящего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тело свечи',
          description: 'Расстояние между ценой открытия и закрытия периода',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Разворотный паттерн',
          description:
            'Графическая модель, сигнализирующая о смене направления тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Подтверждение объёмом',
          description:
            'Рост торговой активности, усиливающий достоверность сигнала',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный сигнал',
          description: 'Паттерн, не приводящий к ожидаемому движению цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свечной анализ',
          description: 'Метод технического анализа на основе японских свечей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Индикатор среднего истинного диапазона для оценки волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward',
          description: 'Соотношение потенциального риска к ожидаемой прибыли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
