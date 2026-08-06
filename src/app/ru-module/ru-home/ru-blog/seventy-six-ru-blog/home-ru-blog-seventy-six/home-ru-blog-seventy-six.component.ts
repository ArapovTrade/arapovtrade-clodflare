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
  selector: 'app-home-ru-blog-seventy-six',
  templateUrl: './home-ru-blog-seventy-six.component.html',
  styleUrl: './home-ru-blog-seventy-six.component.scss',
})
export class HomeRuBlogSeventySixComponent {
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
      'Метод Ганна в трейдинге: инструменты и принципы торговли | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по методам Уильяма Ганна: линии, веер, сетка, квадрат 9. Принципы анализа рынка, временные циклы и правила успешной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
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
          headline: 'Метод Ганна в трейдинге: инструменты и принципы торговли',
          description:
            'Полное руководство по методам Уильяма Ганна: линии, веер, сетка, квадрат 9. Принципы анализа рынка, временные циклы и правила успешной торговли.',
          image: 'https://arapov.trade/assets/img/content/uljamgann1.jpg',
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
            '@id': 'https://arapov.trade/ru/freestudying/williamgannpsychology',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1550,
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
          name: 'Кто такой Уильям Ганн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Уильям Делберт Ганн (1878-1955) — легендарный американский трейдер и аналитик, разработавший уникальную систему прогнозирования рынков на основе математики, геометрии и временных циклов. Его методы до сих пор используются трейдерами по всему миру.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое линия Ганна 1x1?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Линия Ганна 1x1 — это трендовая линия под углом 45°, которая символизирует равновесие между ценой и временем. Если цена выше линии — тренд восходящий, ниже — нисходящий. Это базовый инструмент в методологии Ганна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает веер Ганна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Веер Ганна — набор линий под разными углами (1x1, 2x1, 1x2 и др.), проведённых из одной точки. Линии служат динамическими уровнями поддержки и сопротивления. При пробое одной линии цена обычно движется к следующей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое квадрат 9 Ганна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Квадрат 9 — числовая матрица, где числа расположены по спирали. Используется для определения ключевых ценовых уровней и точек разворота. Считается одним из самых сложных, но точных инструментов Ганна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Актуальны ли методы Ганна сегодня?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, методы Ганна остаются актуальными. Они основаны на фундаментальных принципах соотношения цены и времени, которые не меняются. Многие профессиональные трейдеры используют инструменты Ганна в сочетании с современными методами анализа.',
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
      name: 'Как применять методы Ганна в трейдинге',
      description:
        'Пошаговое руководство по использованию инструментов Уильяма Ганна для анализа рынка',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите значимые экстремумы',
          text: 'Найдите на графике важные максимумы и минимумы, которые станут отправными точками для построения инструментов Ганна.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Постройте линии и веер Ганна',
          text: 'Проведите линию 1x1 под углом 45° от выбранной точки. Добавьте дополнительные линии веера для определения уровней поддержки и сопротивления.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Примените сетку Ганна',
          text: 'Наложите сетку на график для выявления временных и ценовых пропорций. Определите зоны потенциальных разворотов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализируйте временные циклы',
          text: 'Изучите повторяющиеся паттерны и циклы рынка. Используйте исторические данные для прогнозирования будущих движений.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Комбинируйте с другими методами',
          text: 'Сочетайте инструменты Ганна с классическим техническим анализом, уровнями Фибоначчи и объёмным анализом для повышения точности.',
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
      name: 'Термины методологии Ганна',
      description: 'Ключевые понятия и инструменты теории Уильяма Ганна',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Линия Ганна',
          description:
            'Трендовая линия под углом 45°, символизирующая равновесие между ценой и временем',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Веер Ганна',
          description:
            'Набор линий под разными углами, служащих динамическими уровнями поддержки и сопротивления',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сетка Ганна',
          description:
            'Инструмент, разделяющий график на равные интервалы по времени и цене',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коробка Ганна',
          description:
            'Геометрическая фигура для определения зон консолидации и временных циклов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Квадрат 9',
          description:
            'Числовая матрица со спиральным расположением чисел для определения ключевых уровней',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Угол 1x1',
          description:
            'Базовый угол 45°, показывающий равномерное движение цены относительно времени',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Временные циклы',
          description:
            'Повторяющиеся периоды рыночной активности, используемые для прогнозирования',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пропорции цены и времени',
          description:
            'Соотношение между ценовыми движениями и временными интервалами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Геометрия рынка',
          description:
            'Применение геометрических форм для анализа ценовых движений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Углы Ганна',
          description:
            'Система углов для определения силы тренда и ключевых уровней',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
