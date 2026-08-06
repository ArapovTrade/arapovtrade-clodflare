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
  selector: 'app-home-ru-twenty-two',
  templateUrl: './home-ru-twenty-two.component.html',
  styleUrl: './home-ru-twenty-two.component.scss',
})
export class HomeRuTwentyTwoComponent implements OnInit {
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
      'Экономические факторы в трейдинге | Влияние на валютные курсы'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по экономическим факторам, влияющим на валютные курсы. Узнайте о роли центральных банков, макроэкономических показателях, инфляции и рынках сырья.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicfactors.webp',
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
          headline: 'Экономические факторы и их влияние на валютные курсы',
          description:
            'Полное руководство по экономическим факторам, влияющим на валютные курсы. Узнайте о роли центральных банков, макроэкономических показателях, инфляции и рынках сырья.',
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
          image: 'https://arapov.trade/assets/img/content/economicfactors.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/econimicfactors',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'экономические факторы',
            'валютные курсы',
            'центральные банки',
            'процентные ставки',
            'инфляция',
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
          name: 'Как процентные ставки влияют на валютный курс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Повышение процентной ставки центральным банком делает валюту более привлекательной для инвесторов, так как увеличивает доходность активов в этой валюте. Это стимулирует приток капитала и укрепляет курс. Снижение ставки оказывает противоположный эффект — валюта ослабевает.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие макроэкономические показатели важны для валютного рынка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключевые показатели включают ВВП (рост экономики), уровень инфляции (CPI, PPI), данные по рынку труда (безработица, Non-Farm Payrolls), торговый баланс и индекс деловой активности PMI. Эти данные формируют ожидания относительно монетарной политики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как цены на нефть влияют на валюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рост цен на нефть укрепляет валюты стран-экспортёров (CAD, RUB, NOK), так как увеличивает их экспортные доходы. Для стран-импортёров (JPY, INR) рост нефтяных цен создаёт давление на валюту из-за увеличения импортных расходов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое количественное смягчение и как оно влияет на курс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Количественное смягчение (QE) — это программа центрального банка по скупке активов для увеличения денежной массы и стимулирования экономики. QE обычно ослабляет валюту, так как увеличивает её предложение на рынке и снижает процентные ставки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как геополитические события влияют на валютные курсы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Политическая нестабильность, конфликты, санкции и торговые войны создают неопределённость на рынках. Инвесторы переводят капитал в защитные активы (USD, CHF, JPY, золото), что укрепляет эти валюты и ослабляет валюты затронутых стран.',
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
      name: 'Как анализировать экономические факторы для торговли валютами',
      description:
        'Пошаговое руководство по фундаментальному анализу валютного рынка',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Мониторинг экономического календаря',
          text: 'Отслеживайте расписание публикации ключевых экономических данных: решения по ставкам, данные по инфляции, ВВП, занятости. Планируйте торговлю с учётом этих событий.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализ политики центральных банков',
          text: 'Изучайте заявления и протоколы заседаний центральных банков. Определяйте направление монетарной политики: ужесточение или смягчение.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оценка макроэкономических показателей',
          text: 'Сравнивайте фактические данные с прогнозами аналитиков. Значительные отклонения от ожиданий вызывают сильные движения на рынке.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Учёт межрыночных связей',
          text: 'Анализируйте корреляции между валютами, сырьевыми рынками и фондовыми индексами. Понимание этих связей улучшает качество прогнозов.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Формирование торговых решений',
          text: 'Интегрируйте фундаментальный анализ с техническим. Используйте экономические данные для определения направления, а технический анализ — для точек входа.',
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
      name: 'Терминология экономических факторов',
      description: 'Основные термины фундаментального анализа валютного рынка',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Процентная ставка',
          description:
            'Базовая ставка центрального банка, определяющая стоимость заимствований в экономике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Количественное смягчение',
          description:
            'Программа центрального банка по скупке активов для увеличения денежной массы',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Инфляция',
          description:
            'Рост общего уровня цен на товары и услуги, снижающий покупательную способность валюты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовой внутренний продукт — показатель общей стоимости товаров и услуг, произведённых в стране',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Farm Payrolls',
          description:
            'Количество новых рабочих мест в несельскохозяйственном секторе США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый баланс',
          description:
            'Разница между экспортом и импортом товаров и услуг страны',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Индекс потребительских цен',
          description:
            'CPI — показатель изменения цен на потребительские товары и услуги',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PMI',
          description:
            'Индекс деловой активности, отражающий настроения в производственном секторе',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Денежная масса',
          description: 'Общий объём денежных средств в обращении в экономике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Защитный актив',
          description:
            'Актив, в который инвесторы переводят капитал в периоды неопределённости',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
