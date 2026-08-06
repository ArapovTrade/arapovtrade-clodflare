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
  selector: 'app-home-ru-twenty-one',
  templateUrl: './home-ru-twenty-one.component.html',
  styleUrl: './home-ru-twenty-one.component.scss',
})
export class HomeRuTwentyOneComponent implements OnInit {
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
      'Как проводить анализ рынка FOREX | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как проводить анализ рынка FOREX: экономические факторы, влияние новостей, работа со слухами, циклы рынка и психология трейдинга для принятия прибыльных решений.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-19' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketanalysis.webp',
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
          headline: 'Как проводить анализ рынка FOREX',
          description:
            'Комплексное руководство по анализу валютного рынка: экономические факторы, новости, слухи и психология трейдинга',
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
          datePublished: '2025-06-15T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/marketanalysisforex',
          },
          image: 'https://arapov.trade/assets/img/content/marketanalysis.webp',
          articleSection: 'Обучение трейдингу',
          keywords:
            'анализ рынка FOREX, фундаментальный анализ, экономические показатели, торговля на новостях, психология трейдинга',
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
          name: 'Какие экономические показатели наиболее важны для анализа FOREX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключевые показатели включают решения по процентным ставкам центральных банков, данные по инфляции (CPI), уровень безработицы, ВВП и торговый баланс. Эти метрики напрямую влияют на привлекательность валюты для инвесторов и определяют долгосрочные тренды.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как новости влияют на валютный рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новости вызывают волатильность в зависимости от расхождения фактических данных с ожиданиями рынка. Плановые события (заседания ЦБ, публикация отчётов) формируют тренды, а неожиданные новости (кризисы, катастрофы) создают резкие краткосрочные движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Стоит ли торговать на слухах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговля на слухах высокорискованна, так как информация может не подтвердиться. Профессионалы используют слухи как дополнительный индикатор настроений рынка, но не как основу для принятия решений. Обязательно применяйте жёсткий риск-менеджмент.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как контролировать эмоции при торговле?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Составьте торговый план и строго следуйте ему. Используйте заранее определённые стоп-лоссы и тейк-профиты. Ведите торговый дневник для анализа ошибок. Делайте перерывы для предотвращения переутомления и импульсивных решений.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой таймфрейм лучше для анализа фундаментальных факторов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальный анализ наиболее эффективен на дневных и недельных графиках, где экономические факторы формируют устойчивые тренды. Для краткосрочной торговли на новостях используются интервалы от M15 до H1 в сочетании с техническим анализом.',
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
      name: 'Как проводить комплексный анализ рынка FOREX',
      description:
        'Пошаговое руководство по анализу валютного рынка для принятия торговых решений',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите экономический календарь',
          text: 'Определите ключевые события недели: заседания центральных банков, публикации данных по инфляции, занятости и ВВП. Отметьте время выхода новостей и ожидаемые значения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте макроэкономический фон',
          text: 'Оцените текущее состояние экономик стран, валюты которых вы торгуете. Сравните темпы роста, уровень инфляции и направление монетарной политики.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Учтите геополитические факторы',
          text: 'Отслеживайте политические события, санкции, торговые войны и международные конфликты, которые могут повлиять на валютные курсы.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Оцените рыночные настроения',
          text: 'Используйте индикаторы настроений, позиционирование трейдеров и анализ потоков капитала для понимания текущего баланса спроса и предложения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Интегрируйте с техническим анализом',
          text: 'Совместите фундаментальные выводы с техническими уровнями поддержки и сопротивления для определения оптимальных точек входа и выхода.',
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
      name: 'Глоссарий анализа рынка FOREX',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Метод оценки валют на основе экономических, политических и социальных факторов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентная ставка',
          description:
            'Ключевой инструмент монетарной политики центрального банка, влияющий на привлекательность валюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Инфляция',
          description:
            'Рост общего уровня цен, снижающий покупательную способность валюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовой внутренний продукт — показатель общего объёма экономической активности страны',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Экономический календарь',
          description:
            'Расписание публикации важных экономических данных и событий',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Монетарная политика',
          description:
            'Действия центрального банка по регулированию денежной массы и процентных ставок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночные настроения',
          description:
            'Общее отношение участников рынка к активу или рынку в целом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Геополитический риск',
          description:
            'Риск влияния политических событий и конфликтов на финансовые рынки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Корреляция валют',
          description:
            'Статистическая взаимосвязь между движениями различных валютных пар',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
