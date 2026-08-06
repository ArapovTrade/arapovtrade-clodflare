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
  selector: 'app-home-ru-three',
  templateUrl: './home-ru-three.component.html',
  styleUrl: './home-ru-three.component.scss',
})
export class HomeRuThreeComponent implements OnInit {
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
      'Что такое биржа: виды, функции и участники торгов | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по биржам: фондовые, товарные, валютные и фьючерсные площадки. Как работает биржа, кто её участники и почему она важна для экономики.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/znakomstvosbirgey.webp',
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
          headline: 'Что такое биржа: виды, функции и участники торгов',
          description:
            'Полное руководство по биржам: фондовые, товарные, валютные и фьючерсные площадки. Как работает биржа, кто её участники и почему она важна для экономики.',
          image: 'https://arapov.trade/assets/img/content/2article1pic.jpg',
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
            '@id': 'https://arapov.trade/ru/freestudying/exchange',
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
          name: 'Что такое биржа простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржа — это организованная площадка для торговли различными активами: акциями, валютами, товарами, фьючерсами. Она обеспечивает прозрачность сделок, формирование справедливых цен и защиту интересов участников.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие виды бирж существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные виды: фондовые биржи (акции, облигации), товарные (нефть, золото, зерно), валютные (обмен валют) и фьючерсные (производные инструменты). Каждая специализируется на определённых активах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кто является участниками биржи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные участники: брокеры (посредники), инвесторы (долгосрочные вложения), спекулянты (краткосрочная торговля), хеджеры (защита от рисков), маркет-мейкеры (обеспечение ликвидности) и регуляторы (надзор).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как начать торговать на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для начала торговли нужно: выбрать надёжного брокера, открыть торговый счёт, изучить основы анализа рынка, начать с демо-счёта для практики и постепенно переходить к реальным сделкам с небольшими суммами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему биржи важны для экономики?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржи обеспечивают ликвидность рынков, формируют справедливые цены, позволяют компаниям привлекать капитал, а инвесторам — вкладывать средства. Они являются фундаментом современной финансовой системы.',
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
      name: 'Как начать торговать на бирже',
      description: 'Пошаговое руководство для начинающих трейдеров',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Выберите брокера',
          text: 'Изучите рейтинги брокеров, сравните комиссии, условия торговли и доступные инструменты. Выберите лицензированного брокера с хорошей репутацией.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Откройте торговый счёт',
          text: 'Пройдите процедуру регистрации, подтвердите личность и пополните счёт минимальной суммой для начала торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Изучите основы анализа',
          text: 'Освойте базовые концепции технического и фундаментального анализа, научитесь читать графики и понимать рыночные индикаторы.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Отрабатывайте стратегии на виртуальных деньгах, чтобы понять механику торговли без риска реальных потерь.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с малых сумм',
          text: 'Переходите к реальной торговле постепенно, рискуя только теми средствами, потерю которых можете позволить.',
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
      name: 'Биржевая терминология',
      description: 'Ключевые понятия биржевой торговли',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Биржа',
          description:
            'Организованная площадка для торговли финансовыми инструментами и товарами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фондовая биржа',
          description:
            'Площадка для торговли ценными бумагами — акциями и облигациями',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Товарная биржа',
          description:
            'Площадка для торговли сырьевыми товарами: нефтью, металлами, зерном',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Брокер',
          description:
            'Посредник между трейдером и биржей, исполняющий торговые приказы',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник, обеспечивающий ликвидность путём постоянного выставления заявок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность быстро купить или продать актив без существенного влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Клиринг',
          description:
            'Процесс взаиморасчётов и гарантирования исполнения сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Разница между ценой покупки и продажи актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'IPO',
          description: 'Первичное публичное размещение акций компании на бирже',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description:
            'Страхование рисков с помощью производных финансовых инструментов',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
