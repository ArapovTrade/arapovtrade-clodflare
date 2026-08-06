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
  selector: 'app-home-ru-blog-thirty-one',
  templateUrl: './home-ru-blog-thirty-one.component.html',
  styleUrl: './home-ru-blog-thirty-one.component.scss',
})
export class HomeRuBlogThirtyOneComponent implements OnInit {
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
      'Рынок Forex: как работает и как торговать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое рынок Forex, кто его участники, как устроены валютные пары и торговые сессии и с чего начать торговлю валютой.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

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
          headline: 'Форекс для новичка: рынок, позиции, плечо и сессии',
          description:
            'Что такое рынок Forex, кто его участники, как устроены валютные пары и торговые сессии и с чего начать торговлю валютой.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/forex-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ForexMarket.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Форекс',
          keywords:
            'форекс, валютный рынок, лонг, шорт, своп, кредитное плечо, валютный риск, кэрри-трейд, торговые сессии, индекс доллара, DXY',
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
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
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
          name: 'Что такое Forex простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это международный рынок обмена валют, где торгуют парами вроде евро к доллару. Крупнейший и самый ликвидный рынок мира с оборотом в триллионы долларов в день, но децентрализованный: единой биржи нет, поэтому честного централизованного объёма по валюте тоже нет.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем длинная позиция отличается от короткой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лонг это покупка в расчёте на рост: купить дешевле, продать дороже. Шорт это продажа в расчёте на падение, когда инструмент берут в долг у брокера и откупают дешевле. В лонге убыток ограничен вложенным, а в шорте при сильном росте теоретически не ограничен сверху.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое своп за перенос позиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это начисление за удержание позиции через ночь, считается от разницы процентных ставок двух валют пары. Бывает отрицательным, когда вы платите, и положительным, когда получаете. В среду своп обычно тройной за выходные, а дейтрейдер его не платит вовсе.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какое плечо безопасно для новичка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вопрос не в размере плеча, а в риске на сделку. Разумно держать риск около одного-двух процентов депозита и уже под него подбирать объём. Под надзором ЕС розничному трейдеру дают примерно 1:30, в США до 1:50, а офшорные брокеры завлекают плечом 1:100 и выше, которое сжигает счёт быстрее всего.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда лучше всего торговать на форексе?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В окно пересечения европейской и американской сессий, когда Лондон ещё работает, а Нью-Йорк уже открылся. В этот момент участников и ликвидности в рынке больше всего, отсюда и самые сильные движения. Тонкий азиатский рынок, ночь и предпраздничные дни чаще дают шум, чем понятное движение.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое индекс доллара DXY и зачем он трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это одно число, показывающее силу доллара против корзины из шести валют, тяжелее всего в ней евро. Поскольку доллар есть в большинстве пар, индекс подсказывает вероятное направление: сначала смотрят силу доллара по DXY, а конкретный вход ищут уже на графике пары по уровню и реакции цены.',
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
      '@id': 'https://arapov.trade/ru/freestudying/forex-guide#howto',
      name: 'Как разобраться в рынке Forex с нуля',
      description:
        'Пошаговый путь новичка: устройство рынка, позиции, плечо и риск, сессии и индекс доллара',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите устройство рынка Forex',
          text: 'Forex это децентрализованный рынок обмена валют без единой биржи, поэтому честного централизованного объёма по валюте нет, и читать её удобнее по уровням и индексу доллара.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь с лонгом, шортом и свопом',
          text: 'Лонг это ставка на рост, шорт на падение через продажу взятого в долг, а за перенос позиции через ночь начисляется своп от разницы ставок.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Возьмите под контроль плечо и риск',
          text: 'Плечо одинаково множит прибыль и убыток, поэтому сначала считают риск в один-два процента на сделку, ставят стоп и только потом подбирают объём.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Учитывайте кэрри-трейд и его ловушку',
          text: 'Кэрри-трейд приносит доход от разницы ставок через своп, но это не пассивная рента, а ставка с плечом на стабильность курса.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Торгуйте в нужное окно сессий',
          text: 'Объём и движение максимальны на пересечении Лондона и Нью-Йорка, а тонкий азиатский рынок и праздники лучше переждать.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте рынок через индекс доллара',
          text: 'Индекс доллара задаёт вероятное направление по большинству пар, а конкретный вход ищут на графике пары по уровню и реакции цены.',
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
      name: 'Глоссарий терминов статьи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пункт',
          description:
            'Минимальный шаг котировки на форексе, обычно четвёртый знак после запятой; в пунктах измеряют движение цены и величину риска.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Forex',
          description:
            'Международный рынок обмена валют, где одни валюты покупают за другие; торгуют не отдельными валютами, а парами, например евро к доллару.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Длинная позиция',
          description:
            'Покупка актива в расчёте на рост цены: купить дешевле, чтобы потом продать дороже.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Короткая позиция',
          description:
            'Продажа актива в расчёте на падение: продать дороже взятый в долг инструмент, а откупить обратно дешевле, забрав разницу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Предоставленные брокером заёмные средства, позволяющие управлять позицией во много раз больше собственного депозита, внеся лишь небольшой залог.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютный риск',
          description:
            'Вероятность понести убыток из-за неблагоприятного сдвига валютного курса против открытой позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кэрри-трейд',
          description:
            'Стратегия, при которой трейдер занимает в валюте с низкой процентной ставкой и вкладывает в валюту с высокой, зарабатывая на разнице ставок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговая сессия форекс',
          description:
            'Период активной работы финансового центра определённого региона, через который проходит основной поток валютных операций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Индекс доллара',
          description:
            'Показатель силы доллара США относительно корзины из шести основных мировых валют, по которому судят, укрепляется доллар или слабеет.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
