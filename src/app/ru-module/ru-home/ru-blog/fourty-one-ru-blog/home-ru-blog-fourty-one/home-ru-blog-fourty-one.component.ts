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
  selector: 'app-home-ru-blog-fourty-one',
  templateUrl: './home-ru-blog-fourty-one.component.html',
  styleUrl: './home-ru-blog-fourty-one.component.scss',
})
export class HomeRuBlogFourtyOneComponent implements OnInit {
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
      'Трейдинг для начинающих: с чего начать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг для начинающих с нуля: как устроены рынки, какие нужны навыки, первые шаги и типичные ошибки новичков. Гайд от Arapov.trade.',
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

    if (index == 0) {
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
          headline: 'Трейдинг с нуля для новичка: с чего начать в 2026 году',
          description:
            'Трейдинг для начинающих с нуля: как устроены рынки, какие нужны навыки, первые шаги и типичные ошибки новичков. Гайд от Arapov.trade.',
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
            '@id': 'https://arapov.trade/ru/freestudying/trading-for-beginners',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingbasics.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для начинающих',
          keywords:
            'трейдинг для начинающих, трейдинг с нуля, лонг и шорт, демо-счёт, ошибки новичков',
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
          name: 'Что такое трейдинг простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это способ зарабатывать на движении цены: берёте актив дешевле, отдаёте дороже, либо наоборот в шорт. От инвестиций отличается сроком, тут минуты и недели, а не годы. И это ремесло с порогом входа, где прибыль проявляется лишь на длинной череде сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'С чего начать трейдинг новичку в 2026 году?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сначала теория и выбор метода, затем тренировка на демо до ровного плюса на серии, потом брокер под регуляцией и только следом небольшой живой счёт со стопом и скромным риском. На старте важнее всего не гнать и не ставить помногу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем лонг отличается от шорта?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лонг это покупка с расчётом на рост цены, шорт это продажа взятого взаймы актива с расчётом на падение. Шорт сложнее и опаснее для новичка: убыток в нём теоретически не ограничен сверху, потому что цена вверх может идти сколько угодно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько сделок из ста бывает убыточными?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минусовые сделки есть и у рабочей системы, грубо тридцать из ста, и это норма. Опаснее разброс: красные входы умеют идти чередой по пять-десять подряд, и на большом риске такая полоса выжигает счёт, хотя по дистанции вы были бы в плюсе.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени нужно, чтобы стать стабильным трейдером?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не недели, а годы практики. Сам метод берётся за пару-тройку месяцев, труднее наработать выдержку: держаться правил, не задирать риск и не мстить рынку. Ускоряют дорогу практик и журнал сделок, а не гора просмотренных видео.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли быстро разбогатеть на трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет. Это профессия, а не касса быстрых денег: доход приходит через учёбу, дисциплину и время, а охотники за лёгким обычно его и теряют. Прибыльная торговля скучна на вид, это повтор одних и тех же шагов по правилам.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trading-for-beginners#howto',
      name: 'Как начать трейдинг с нуля новичку',
      description:
        'Пошаговый путь начинающего трейдера: от понимания основ до перехода на реальный счёт',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Что такое трейдинг простыми словами',
          text: 'Трейдинг — это работа с финансовыми активами: их покупают и продают, чтобы заработать на движении цены.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Стоит ли вообще идти в трейдинг и кому он не подходит',
          text: 'Прежде чем учиться как, честно ответьте себе на вопрос стоит ли.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Лонг и шорт: как зарабатывают на росте и на падении',
          text: 'Заработать в трейдинге можно в обе стороны, и это первое, что стоит уложить в голове.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Какой метод выбрать новичку: почему я смотрю объём, а не индикаторы',
          text: 'Метод это то, на что вы смотрите, когда решаете, покупать или продавать.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Что торговать новичку: один инструмент вместо десяти',
          text: 'Самая частая ошибка на старте по части выбора это распыление: новичок одновременно смотрит акции, крипту, валюту и десяток монет и не успевает понять ни один рынок.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Как начать торговать на бирже: пошаговый путь',
          text: 'Дорогу новичка я делю на ступени, и важнее тут не темп, а очерёдность.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Сколько денег нужно для старта и какая доходность реальна',
          text: 'Вопрос с какой суммы заходить новичок задаёт первым, хотя на старте он не главный.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Как устроена одна сделка: вход, стоп и точка выхода',
          text: 'Раз речь дошла до реального счёта, разберём, из чего вообще состоит одна сделка, потому что новичок думает обычно только про вход, а решает остальное.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Демо-счёт: чему он реально учит, а чему нет',
          text: 'Демо это инструмент, который хвалят все, но мало кто честно говорит о его границах.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Главные ошибки новичков, из-за которых теряют депозит',
          text: 'Год за годом картина потерь одна: рынок почти не виноват, источник сидит в самом человеке.',
        },
        {
          '@type': 'HowToStep',
          position: 11,
          name: 'Самообучение трейдингу: дорожная карта и дневник сделок',
          text: 'Освоить торговлю в одиночку реально, я живое тому подтверждение, и качественных бесплатных материалов сейчас кратно больше, чем досталось когда-то мне.',
        },
        {
          '@type': 'HowToStep',
          position: 12,
          name: 'Что отличает успешного трейдера и сколько занимает путь',
          text: 'От ответа ждут какого-то секрета или чудо-стратегии.',
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
          name: 'Трейдинг',
          description:
            'Покупка и продажа финансовых активов с целью заработать на изменении их цены на коротком горизонте.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лонг',
          description:
            'Длинная позиция: покупка актива с расчётом на рост его цены и заработок на этом росте.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шорт',
          description:
            'Короткая позиция: продажа взятого взаймы актива с расчётом выкупить его дешевле после падения цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Демо-счёт',
          description:
            'Тренировочный счёт с виртуальными деньгами и реальными котировками, на котором отрабатывают торговлю без риска для капитала.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Усреднение убытка',
          description:
            'Долив к убыточной позиции вместо закрытия по стопу в надежде отыграться, из-за чего трейдер увеличивает риск и потери.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
