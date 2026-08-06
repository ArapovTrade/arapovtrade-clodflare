import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-ru-blog-onehundred-eleven',
  templateUrl: './home-ru-blog-onehundred-eleven.component.html',
  styleUrl: './home-ru-blog-onehundred-eleven.component.scss'
})
export class HomeRuBlogOnehundredElevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
    // this.setHowToSchema();
    this.setGlossarySchema();

    this.titleService.setTitle(
      'Почему на обвале биткоина выбивает стопы | Arapov.trade',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Каскадные ликвидации, маржин-колл и снятие ликвидности на обвале биткоина: почему выбивает стопы и сливаются депозиты, кого вылетает первым и как защитить счёт.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-11' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-11' });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
 

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
 

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
          '@id': 'https://arapov.trade/ru/freestudying/bitcoin-crash-stops#article',
          headline:
            'Почему на обвале биткоина выбивает стопы | Arapov.trade',
          description:
            'Каскадные ликвидации, маржин-колл и снятие ликвидности на обвале биткоина: почему выбивает стопы и сливаются депозиты, кого вылетает первым и как защитить счёт.',
          image: 'https://arapov.trade/assets/img/content/bitcoin-crash-stops.png',
          datePublished: '2026-06-11T00:00:00Z',
          dateModified: '2026-06-11T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/bitcoin-crash-stops',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'бинарные опционы',
            'торговля опционами',
            'Call Put опционы',
            'риски трейдинга',
            'экспирация',
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
      '@id': 'https://arapov.trade/ru/freestudying/binarnyeopciony#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Почему на падении биткоина массово выбивает стопы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перед разворотом цену часто специально проливают за уровень, где стоят стопы толпы, чтобы собрать эти заявки. Плюс на плече просадка быстро доходит до принудительного закрытия. В итоге стопы выбивает массово, а потом рынок нередко разворачивается.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое маржин-колл и ликвидация простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржин-колл это сигнал, что залога не хватает для удержания позиции, и нужно пополнить счёт или сократить объём. Ликвидация это принудительное закрытие позиции, при котором обеспечение сгорает. Чем больше плечо, тем ближе оба события.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему стоп выбивает, а потом цена идёт в мою сторону?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это снятие ликвидности: рынок ныряет за очевидный уровень, собирает стопы толпы и разворачивается. Поэтому стоп прячут чуть дальше уровня, а не вплотную к нему, куда целятся все.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой риск держать, чтобы пережить обвал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Распространённый ориентир это 1-2 процента депозита на сделку и минимальное плечо. При таком риске даже резкое падение и серия стопов подряд не обнуляют счёт. Точную цифру подбирают под свой депозит.',
          },
        },
        {
          '@type': 'Question',
          name: 'Стоит ли усредняться, когда биткоин падает?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усреднение против падающего тренда опасно: добор в минус превращает небольшой убыток в большой, а на плече ведёт к ликвидации. Надёжнее зафиксировать стоп и дождаться реакции цены на уровне, а не откупать каждый минус.',
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
      '@id': 'https://arapov.trade/ru/freestudying/binarnyeopciony#howto',
      name: 'Как начать торговать бинарными опционами',
      description:
        'Пошаговое руководство для начинающих трейдеров бинарных опционов',
      totalTime: 'PT30M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '10-100',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите основы и риски',
          text: 'Прежде чем вкладывать деньги, разберитесь в механике бинарных опционов, их рисках и особенностях. Поймите, что это высокорискованный инструмент с негативным математическим ожиданием.',
          url: 'https://arapov.trade/ru/freestudying/binarnyeopciony#basics',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите надёжного брокера',
          text: 'Проверьте наличие лицензии, репутацию брокера, отзывы реальных трейдеров. Избегайте компаний с агрессивной рекламой и обещаниями гарантированного заработка.',
          url: 'https://arapov.trade/ru/freestudying/binarnyeopciony#broker',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Потренируйтесь на демо-счёте',
          text: 'Большинство брокеров предлагают демо-счёт с виртуальными деньгами. Используйте его для отработки стратегии и понимания интерфейса платформы.',
          url: 'https://arapov.trade/ru/freestudying/binarnyeopciony#demo',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разработайте торговую стратегию',
          text: 'Определите правила входа в сделку, выбор времени экспирации, размер ставки. Никогда не торгуйте наугад — это превращает трейдинг в азартную игру.',
          url: 'https://arapov.trade/ru/freestudying/binarnyeopciony#strategy',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с минимальных сумм',
          text: 'При переходе на реальный счёт начинайте с минимальных ставок. Не рискуйте более 1-2% депозита на одну сделку. Контролируйте эмоции и строго следуйте плану.',
          url: 'https://arapov.trade/ru/freestudying/binarnyeopciony#start',
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
      '@id': 'https://arapov.trade/ru/freestudying/binarnyeopciony#terms',
      name: 'Термины бинарных опционов',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Бинарный опцион',
          description:
            'Финансовый контракт с двумя возможными исходами: фиксированная прибыль при верном прогнозе или потеря ставки при неверном',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Экспирация',
          description:
            'Момент времени, когда бинарный опцион закрывается и определяется результат сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Call опцион',
          description: 'Ставка на повышение цены актива к моменту экспирации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Put опцион',
          description: 'Ставка на понижение цены актива к моменту экспирации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'One Touch',
          description:
            'Тип опциона, где нужно предсказать касание ценой определённого уровня до экспирации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Доходность опциона',
          description:
            'Процент прибыли от суммы ставки при успешном прогнозе, обычно 60-90%',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Страйк-цена',
          description:
            'Цена актива в момент открытия опциона, относительно которой определяется результат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'В деньгах (ITM)',
          description:
            'Состояние опциона, когда прогноз оказался верным и трейдер получает прибыль',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вне денег (OTM)',
          description:
            'Состояние опциона, когда прогноз не оправдался и трейдер теряет ставку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Турбо-опцион',
          description:
            'Сверхкраткосрочный опцион со временем экспирации от 30 секунд до 5 минут',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}

