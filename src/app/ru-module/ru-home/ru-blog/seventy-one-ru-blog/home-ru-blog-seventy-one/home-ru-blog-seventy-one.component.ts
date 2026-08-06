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
  selector: 'app-home-ru-blog-seventy-one',
  templateUrl: './home-ru-blog-seventy-one.component.html',
  styleUrl: './home-ru-blog-seventy-one.component.scss',
})
export class HomeRuBlogSeventyOneComponent {
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
      'Торговля на новостях в трейдинге | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговля на новостях: как минимизировать риски? Советы от ArapovTrade по стратегиям и волатильности.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-14' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/newstrading.webp',
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
        const content = JSON.parse(script.textContent || '');
        const schemaType = Array.isArray(content['@graph'])
          ? content['@graph'][0]?.['@type']
          : content['@type'];

        const shouldRemove = typesToRemove.some(
          (type) =>
            schemaType === type ||
            (Array.isArray(schemaType) && schemaType.includes(type)),
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
            '@id': 'https://arapov.trade/ru/freestudying/newstrading',
          },
          headline: 'Торговля на новостях в трейдинге',
          description:
            'Комплексное руководство по новостному трейдингу: стратегии, инструменты анализа, управление рисками',
          image: 'https://arapov.trade/assets/img/content/newstrading1.png',
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
          datePublished: '2025-01-10T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          articleSection: 'Обучение трейдингу',
          keywords:
            'торговля на новостях, новостной трейдинг, экономический календарь, волатильность, NFP, процентные ставки',
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
          name: 'Какие новости сильнее всего влияют на рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наибольшее влияние оказывают решения центральных банков по процентным ставкам, данные по занятости (NFP), показатели инфляции и ВВП. Неожиданные геополитические события также вызывают мощные движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда лучше входить в рынок — до или после новости?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Консервативный подход предполагает вход после стабилизации первоначальной реакции — через 5-15 минут после публикации. Это снижает риск ложных движений и расширенных спредов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему расширяются спреды во время новостей?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В момент публикации ликвидность падает, так как маркет-мейкеры снижают объёмы из-за неопределённости. Брокеры расширяют спреды для компенсации рисков исполнения ордеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защитить позицию при торговле на новостях?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте стоп-лоссы с учётом повышенной волатильности, уменьшайте размер позиции, избегайте высокого кредитного плеча и заранее определяйте уровни выхода из сделки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли автоматизировать торговлю на новостях?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, существуют алгоритмические системы для новостного трейдинга. Однако они требуют быстрого соединения с биржей, качественных данных и тщательного тестирования стратегий.',
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
      name: 'Как торговать на новостях',
      description: 'Пошаговое руководство по новостному трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите экономический календарь',
          text: 'Определите важные события недели, их время выхода и ожидаемое влияние на рынок. Отметьте релизы с высокой волатильностью.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте прогнозы',
          text: 'Сравните консенсус-прогнозы аналитиков с предыдущими значениями. Оцените потенциальную реакцию рынка на различные сценарии.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определите ключевые уровни',
          text: 'Отметьте на графике уровни поддержки и сопротивления, которые цена может пробить или от которых отскочить после выхода новости.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Дождитесь стабилизации',
          text: 'После публикации подождите 5-15 минут, пока рынок определит направление. Избегайте входа в первые секунды хаотичного движения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте рисками',
          text: 'Используйте уменьшенный размер позиции, установите стоп-лосс с учётом волатильности и заранее определите цели по прибыли.',
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
      name: 'Глоссарий торговли на новостях',
      description: 'Ключевые понятия новостного трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Новостной трейдинг',
          description:
            'Стратегия торговли, основанная на реакции рынка на экономические и корпоративные новости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Экономический календарь',
          description:
            'Расписание публикации макроэкономических данных и важных событий',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — отчёт о занятости в несельскохозяйственном секторе США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Разница между ценой покупки и продажи актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гэп',
          description:
            'Ценовой разрыв между закрытием и открытием торговой сессии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор среднего истинного диапазона волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консенсус-прогноз',
          description:
            'Усреднённое ожидание аналитиков относительно экономического показателя',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description: 'Открытие противоположных позиций для снижения рисков',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
