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
  selector: 'app-home-ru-blog-seventy-four',
  templateUrl: './home-ru-blog-seventy-four.component.html',
  styleUrl: './home-ru-blog-seventy-four.component.scss',
})
export class HomeRuBlogSeventyFourComponent {
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
      'Глобальный фундаментальный анализ валютных рынков | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Глобальный фундаментальный анализ валютных рынков: процентные ставки, инфляция, ВВП, рынок труда и политика центральных банков. Практическое руководство для трейдеров.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/globalfundamentalanalysis.webp',
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
          headline: 'Глобальный фундаментальный анализ валютных рынков',
          description:
            'Глобальный фундаментальный анализ валютных рынков: процентные ставки, инфляция, ВВП, рынок труда и политика центральных банков. Практическое руководство для трейдеров.',
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
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/ru/freestudying/globalfundamentalanalysis',
          },
          image:
            'https://arapov.trade/assets/img/content/globalfundamentalanalysis1.png',
          articleSection: 'Обучение трейдингу',
          keywords: [
            'фундаментальный анализ',
            'валютный рынок',
            'процентные ставки',
            'инфляция',
            'центральные банки',
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
          name: 'Что такое фундаментальный анализ валютных рынков?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальный анализ валютных рынков — это метод оценки стоимости валют на основе изучения макроэкономических показателей: процентных ставок, инфляции, ВВП, уровня безработицы и политики центральных банков. В отличие от технического анализа, фундаментальный изучает причины изменения курсов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как процентные ставки влияют на курс валюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Повышение процентных ставок делает валюту привлекательнее для инвесторов, так как депозиты и облигации приносят больший доход. Это увеличивает спрос на валюту и укрепляет её курс. Снижение ставок оказывает обратный эффект — валюта ослабевает.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему инфляция важна для валютного трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Высокая инфляция снижает покупательную способность валюты и её привлекательность для инвесторов. Центральные банки реагируют на инфляцию изменением ставок, что напрямую влияет на валютный курс. Трейдеры отслеживают CPI и PPI для прогнозирования действий регуляторов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие данные о занятости влияют на валютный рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключевой отчёт — Non-Farm Payrolls (NFP) в США. Также важны уровень безработицы, средняя почасовая зарплата и число заявок на пособие по безработице. Сильный рынок труда укрепляет валюту, слабый — ослабляет.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговый баланс влияет на курс национальной валюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Положительный торговый баланс (экспорт превышает импорт) создаёт спрос на национальную валюту со стороны иностранных покупателей, укрепляя её. Дефицит торгового баланса ослабляет валюту, так как стране требуется больше иностранной валюты для оплаты импорта.',
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
      name: 'Как применять фундаментальный анализ валютных рынков',
      description:
        'Пошаговое руководство по использованию макроэкономических данных для принятия торговых решений на валютном рынке',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите экономический календарь',
          text: 'Отслеживайте расписание публикаций ключевых макроэкономических показателей: решения по ставкам, данные по инфляции, ВВП, NFP. Планируйте торговлю с учётом этих событий.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализируйте расхождения прогнозов и фактов',
          text: 'Сравнивайте фактические данные с консенсус-прогнозами аналитиков. Сильные расхождения вызывают резкие движения валют. Превышение ожиданий обычно укрепляет валюту.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Отслеживайте политику центральных банков',
          text: 'Изучайте протоколы заседаний ФРС, ЕЦБ, Банка Англии. Риторика регуляторов (ястребиная или голубиная) сигнализирует о будущих изменениях ставок и направлении валюты.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Комбинируйте с техническим анализом',
          text: 'Используйте фундаментальный анализ для определения направления тренда, а технический — для точек входа и выхода. Это повышает качество торговых решений.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оценивайте межрыночные корреляции',
          text: 'Изучайте связи между валютами, товарами и облигациями. Например, рост цен на нефть часто укрепляет канадский доллар, а снижение доходности облигаций ослабляет валюту.',
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
      name: 'Термины фундаментального анализа валютных рынков',
      description:
        'Глоссарий ключевых понятий глобального фундаментального анализа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Метод оценки стоимости валюты на основе макроэкономических показателей, политических событий и экономического состояния страны',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентная ставка',
          description:
            'Ставка, по которой центральный банк кредитует коммерческие банки. Ключевой инструмент денежно-кредитной политики, влияющий на курс валюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Инфляция',
          description:
            'Устойчивый рост общего уровня цен на товары и услуги, снижающий покупательную способность валюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП (валовой внутренний продукт)',
          description:
            'Совокупная стоимость всех товаров и услуг, произведённых в стране за определённый период. Основной индикатор экономического роста',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Farm Payrolls (NFP)',
          description:
            'Ежемесячный отчёт о количестве занятых в несельскохозяйственном секторе США. Важнейший индикатор состояния рынка труда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CPI (индекс потребительских цен)',
          description:
            'Показатель, измеряющий изменение цен на корзину потребительских товаров и услуг. Основной индикатор инфляции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Carry Trade',
          description:
            'Стратегия, при которой трейдер занимает валюту с низкой ставкой и инвестирует в валюту с высокой ставкой для получения разницы в доходности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый баланс',
          description:
            'Разница между экспортом и импортом страны. Положительный баланс укрепляет валюту, отрицательный — ослабляет',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Количественное смягчение (QE)',
          description:
            'Нестандартная монетарная политика, при которой центральный банк покупает активы для увеличения денежной массы и стимулирования экономики',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Платёжный баланс',
          description:
            'Статистический отчёт, отражающий все экономические операции страны с остальным миром за определённый период',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
