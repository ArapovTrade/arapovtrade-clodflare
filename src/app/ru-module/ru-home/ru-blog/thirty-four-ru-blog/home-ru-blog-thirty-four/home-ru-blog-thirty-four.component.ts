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
  selector: 'app-home-ru-blog-thirty-four',
  templateUrl: './home-ru-blog-thirty-four.component.html',
  styleUrl: './home-ru-blog-thirty-four.component.scss',
})
export class HomeRuBlogThirtyFourComponent implements OnInit {
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

    this.titleService.setTitle('Виды ордеров на бирже | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Виды ордеров на бирже: рыночный, лимитный, стоп и стоп-лимитный. Чем отличаются, когда применять и как они исполняются.',
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
          headline: 'Ордера на бирже: все типы заявок и как их применять',
          description:
            'Виды ордеров на бирже: рыночный, лимитный, стоп и стоп-лимитный. Чем отличаются, когда применять и как они исполняются.',
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
            '@id': 'https://arapov.trade/ru/freestudying/order-types',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ordertypes.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Биржа',
          keywords:
            'ордера, виды ордеров, рыночный ордер, лимитный ордер, стоп-ордер, стоп-лимит, стоп-лосс, трейлинг-стоп, айсберг, алгоритмические ордера',
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
          name: 'Чем рыночный ордер отличается от лимитного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рыночный исполняется мгновенно по любой доступной цене, вы получаете скорость, но платите спред и возможное проскальзывание. Лимитный исполняется только по вашей цене или лучше и даёт контроль, зато его исполнение не гарантировано: цена может до него и не дойти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое стоп-ордер и как он двигает цену?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это отложенная заявка, которая спит до своего уровня, а на касании стоп-цены превращается в рыночную. Когда срабатывает скопление таких ордеров, все они разом выливаются в рынок и толкают цену дальше в ту же сторону, поэтому зоны стопов служат топливом для резких движений.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое стоп-лосс и где его ставить?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это защитный ордер, который сам закрывает позицию на заранее посчитанном убытке. Ставят его не на круглом числе и не вплотную к входу, а за структурным уровнем с запасом, там, где сценарий сделки считается сломанным, и уже от него считают объём при риске около одного-двух процентов депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем стоп-лимит отличается от стоп-маркета?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-маркет на срабатывании становится рыночным и исполняется всегда, но по доступной цене, иногда с проскальзыванием. Стоп-лимит ставит лимитную заявку и контролирует цену, но может не исполниться, если рынок проскочит её. Коротко: один гарантирует выход, другой цену.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему рынок выбивает мой стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чаще всего потому, что он стоит в очевидном месте, где скапливаются стопы толпы, под круглым числом или прямо за явным уровнем. Там лежит ликвидность, и цену иногда специально проталкивают туда ложным проколом. Стоп с запасом за уровнем снижает шанс попасть под такой вынос.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое айсберг-ордер и как читать крупного игрока?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Айсберг это крупная заявка, нарезанная на видимые порции, у которой в стакане торчит лишь верхушка, а основной объём скрыт. Стакан можно подделать, а объём фиксирует уже исполненные сделки, поэтому крупного капитала надёжнее искать по всплеску объёма без движения цены на сильном уровне.',
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
      '@id': 'https://arapov.trade/ru/freestudying/order-types#howto',
      name: 'Как разобраться в типах биржевых ордеров',
      description:
        'Пошаговый разбор всех видов заявок: от рыночного и лимитного до стоп-лосса, трейлинг-стопа и скрытых ордеров крупного капитала',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь, что такое ордер и какие они бывают',
          text: 'Ордер это команда брокеру купить или продать актив на заданных условиях: рыночный исполняется сразу, лимитный по вашей цене, стоп срабатывает по триггеру.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Сравните рыночный и лимитный ордер',
          text: 'Рыночный даёт скорость ценой проскальзывания и сам двигает цену на объёме, а лимитный даёт контроль цены, и именно им работает крупный капитал.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Освойте стоп-ордер и стоп-лимит',
          text: 'Стоп-ордер спит до уровня и становится рыночным, а стоп-лимит контролирует цену, но рискует не исполниться в резком движении.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ставьте стоп-лосс за структурным уровнем',
          text: 'Защитный стоп ставят за структурным уровнем с запасом и от него считают объём при риске около одного-двух процентов депозита.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Не отдавайте стоп туда, где его держит толпа',
          text: 'Стопы толпы скапливаются за очевидными уровнями и становятся ликвидностью для крупного капитала, поэтому свой стоп прячут с запасом.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте крупного капитала по объёму, а не по стакану',
          text: 'Айсберг и алгоритмические заявки прячут реальный размер в стакане, но объём подделать нельзя, поэтому крупного ищут по всплеску объёма на уровне.',
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
          name: 'Ордер',
          description:
            'Заявка брокеру на покупку или продажу актива по определённым правилам; от вида ордера зависит цена и скорость исполнения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный ордер',
          description:
            'Распоряжение брокеру немедленно купить или продать актив по лучшей доступной в данный момент цене.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ордер',
          description:
            'Отложенная заявка с заданной стоп-ценой, которая до срабатывания спит, а на касании уровня превращается в рыночный ордер.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лимит ордер',
          description:
            'Отложенная заявка из двух цен: стоп-цена включает ордер, а лимит-цена выставляет лимитную заявку, исполняемую только по вашей цене или лучше.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, который автоматически закрывает позицию при достижении ценой заранее установленного уровня убытка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Подвижный стоп-лосс, который подтягивается следом за ценой по мере движения сделки в плюс и защищает уже набранную прибыль.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Айсберг-ордер',
          description:
            'Крупная биржевая заявка, разложенная на череду мелких, у которой в стакане видна лишь малая доля, а основной объём укрыт.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Алгоритмические ордера',
          description:
            'Крупные заявки, которые исполняются по заданному алгоритму и режутся на части, чтобы купить или продать большой объём, не показав рынку настоящий размер.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
