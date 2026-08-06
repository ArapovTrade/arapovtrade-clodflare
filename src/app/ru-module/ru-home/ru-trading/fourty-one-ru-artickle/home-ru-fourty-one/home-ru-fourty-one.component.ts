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
  selector: 'app-home-ru-fourty-one',
  templateUrl: './home-ru-fourty-one.component.html',
  styleUrl: './home-ru-fourty-one.component.scss',
})
export class HomeRuFourtyOneComponent implements OnInit {
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
      'Торговый план трейдера: как составить | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговый план трейдера: как составить эффективную систему правил для стабильной прибыли. Структура плана, управление рисками, психология и ведение журнала сделок.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingplan.webp',
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
          headline: 'Торговый план трейдера: как составить эффективную систему',
          description:
            'Торговый план трейдера: как составить эффективную систему правил для стабильной прибыли. Структура плана, управление рисками, психология и ведение журнала сделок.',
          image: 'https://arapov.trade/assets/img/content/tradingplan1.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tradingplan',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1313,
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
          name: 'Что должен включать торговый план?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговый план включает выбор инструментов и таймфреймов, критерии входа и выхода из позиций, правила управления рисками, расписание торговли и психологические установки для контроля эмоций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой процент депозита можно рисковать в одной сделке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуемый риск на одну сделку составляет от 0.5% до 2% от депозита. При капитале в 10 000 единиц максимальный риск одной позиции не должен превышать 200 единиц.',
          },
        },
        {
          '@type': 'Question',
          name: 'Зачем вести торговый журнал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговый журнал позволяет анализировать результаты, выявлять повторяющиеся ошибки и совершенствовать стратегию на основе реальных данных. Он показывает объективную статистику эффективности торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как часто нужно пересматривать торговый план?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендуется пересматривать план раз в квартал на основе накопленной статистики. Изменения вносятся после анализа минимум 50-100 сделок, а не после каждой убыточной серии.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие типичные ошибки при составлении торгового плана?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типичные ошибки: чрезмерная сложность с множеством индикаторов, нереалистичные цели по прибыли, отсутствие конкретных критериев входа и выхода, игнорирование управления рисками.',
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
      name: 'Как составить эффективный торговый план',
      description:
        'Пошаговое руководство по созданию торгового плана для стабильной прибыли',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите инструменты и таймфреймы',
          text: 'Выберите рынки для торговли и предпочтительные временные интервалы. Концентрация на ограниченном числе активов позволяет глубже изучить их поведение.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Установите критерии входа',
          text: 'Опишите конкретные условия для открытия сделки: пробой уровня, сигнал индикатора, формирование паттерна. Каждый критерий должен быть измеримым.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Пропишите правила управления рисками',
          text: 'Определите максимальный риск на сделку (1-2% депозита), дневной лимит убытков и минимальное соотношение риска к прибыли.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Создайте систему ведения журнала',
          text: 'Фиксируйте каждую сделку с детализацией: точки входа и выхода, причины решения, эмоциональное состояние и результат.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Протестируйте план на демо-счёте',
          text: 'Торгуйте по плану минимум месяц на демо-счёте. Переходите к реальным деньгам только после достижения стабильных результатов.',
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
      name: 'Термины трейдинга: торговый план',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Персональный свод правил, определяющий все аспекты работы трейдера на финансовых рынках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления капиталом, ограничивающая потенциальные убытки на сделку и за период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер для автоматической фиксации прибыли при достижении целевого уровня цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый журнал',
          description:
            'Записи всех сделок с детализацией для анализа и улучшения торговой стратегии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Винрейт',
          description:
            'Процент прибыльных сделок от общего количества совершённых сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Снижение капитала от максимального значения до минимального за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал, используемый для анализа графика цены актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'Соотношение потенциального убытка к потенциальной прибыли в сделке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Учебный торговый счёт с виртуальными деньгами для тестирования стратегий без риска',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
