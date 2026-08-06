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
  selector: 'app-home-ru-thirty-eight',
  templateUrl: './home-ru-thirty-eight.component.html',
  styleUrl: './home-ru-thirty-eight.component.scss',
})
export class HomeRuThirtyEightComponent implements OnInit {
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
      'Управление капиталом в трейдинге | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по управлению капиталом в трейдинге. Риск-менеджмент, мани-менеджмент, стратегии защиты депозита и приумножения прибыли для начинающих трейдеров.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/capitalmanagement.webp',
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
            'Управление капиталом в трейдинге: риск-менеджмент и мани-менеджмент',
          description:
            'Полное руководство по управлению капиталом в трейдинге. Риск-менеджмент, мани-менеджмент, стратегии защиты депозита и приумножения прибыли для начинающих трейдеров.',
          image:
            'https://arapov.trade/assets/img/content/capitalmanagement1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/capitalmanagement',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1650,
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
          name: 'Что такое риск-менеджмент в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Риск-менеджмент — это система методов защиты торгового капитала от потерь. Включает ограничение риска на сделку (1-2% депозита), использование стоп-лоссов, контроль просадки и диверсификацию активов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается риск-менеджмент от мани-менеджмента?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Риск-менеджмент фокусируется на защите капитала от убытков, а мани-менеджмент — на эффективном использовании средств для максимизации прибыли. Первый отвечает за выживание, второй — за рост депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой процент депозита можно рисковать в одной сделке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальный риск на одну сделку составляет 1-2% от торгового капитала. При депозите $10000 максимальный убыток на сделку не должен превышать $100-200. Это позволяет пережить серию убыточных сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое соотношение риска к прибыли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Соотношение риска к прибыли (Risk/Reward Ratio) показывает отношение потенциального убытка к ожидаемой прибыли. Минимально приемлемое значение — 1:2, то есть прибыль должна вдвое превышать возможный убыток.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать размер позиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Размер позиции рассчитывается по формуле: Объём = Риск в деньгах / (Стоп-лосс в пунктах × Цена пункта). При депозите $10000, риске 2% ($200) и стоп-лоссе 50 пунктов объём составит 0.4 лота.',
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
      name: 'Как построить систему управления капиталом',
      description:
        'Пошаговое руководство по созданию эффективной системы риск-менеджмента и мани-менеджмента в трейдинге',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите допустимый риск',
          text: 'Установите максимальный процент депозита, который готовы потерять в одной сделке. Рекомендуемое значение — 1-2%. Также определите дневной и недельный лимит убытков.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Рассчитайте размер позиции',
          text: 'Используйте формулу расчёта объёма на основе расстояния до стоп-лосса и допустимого риска в деньгах. Адаптируйте размер позиции к волатильности рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Установите стоп-лосс и тейк-профит',
          text: 'Размещайте защитные ордера до входа в сделку. Соотношение риска к прибыли должно быть минимум 1:2. Используйте технические уровни для определения точек выхода.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Диверсифицируйте портфель',
          text: 'Распределите капитал между различными инструментами и стратегиями. Не концентрируйте весь депозит в одном активе или направлении.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведите статистику и анализируйте',
          text: 'Записывайте все сделки в торговый журнал. Регулярно анализируйте результаты, выявляйте слабые места и корректируйте систему управления капиталом.',
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
      name: 'Термины управления капиталом',
      description:
        'Ключевые понятия риск-менеджмента и мани-менеджмента в трейдинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система методов защиты торгового капитала от убытков через ограничение рисков и использование защитных инструментов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мани-менеджмент',
          description:
            'Стратегическое управление капиталом для оптимизации доходности и эффективного распределения средств',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Снижение торгового счёта от максимального значения до текущего минимума, выражается в процентах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'Соотношение потенциального убытка к ожидаемой прибыли в сделке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Размер позиции',
          description:
            'Объём торговой сделки, рассчитанный на основе допустимого риска и расстояния до стоп-лосса',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение капитала между различными активами для снижения общего риска портфеля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, автоматически следующий за ценой на заданном расстоянии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Реинвестирование',
          description:
            'Использование полученной прибыли для увеличения торгового капитала и объёма позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм увеличения торгового объёма за счёт заёмных средств брокера',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
