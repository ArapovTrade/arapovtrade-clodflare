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
  selector: 'app-home-ru-blog-eighty-nine',
  templateUrl: './home-ru-blog-eighty-nine.component.html',
  styleUrl: './home-ru-blog-eighty-nine.component.scss',
})
export class HomeRuBlogEightyNineComponent implements OnInit {
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
    this.setHowToSchema();
    this.setGlossarySchema();

    this.titleService.setTitle(
      'Доминация биткоина (BTC.D): что это и как использовать в торговле | Игорь Арапов',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Доминация биткоина (BTC.D): что это такое, как рассчитывается, история изменений и влияние на альткоины. Полный гид для трейдеров.',
    });

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
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
          '@id':
            'https://arapov.trade/ru/freestudying/bitcoin-domination#article',
          headline:
            'Доминация биткоина (BTC.D): что это и как использовать в торговле',
          description:
            'Доминация биткоина (BTC.D): что это такое, как рассчитывается, история изменений и влияние на альткоины. Полный гид для трейдеров.',
          image:
            'https://arapov.trade/assets/img/content/bitcoin_dominance_1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

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
            '@id': 'https://arapov.trade/ru/freestudying/bitcoin-domination',
          },
          articleSection: 'Криптовалюты',
          keywords: [
            'доминация биткоина',
            'BTC.D',
            'альтсезон',
            'капитализация криптовалют',
            'переток капитала',
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
      '@id': 'https://arapov.trade/ru/freestudying/bitcoin-domination#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое доминация биткоина простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Доминация биткоина (BTC.D) — это процент, показывающий какую долю от общей капитализации всего крипторынка занимает биткоин. Например, при доминации 60% это означает, что из всех денег, вложенных в криптовалюты, 60% находится в биткоине, а 40% — во всех остальных монетах вместе взятых.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что означает падение доминации биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Падение доминации биткоина сигнализирует о перетоке капитала из BTC в альткоины. Это часто происходит в периоды «альтсезона», когда инвесторы фиксируют прибыль в биткоине и вкладывают средства в альтернативные криптовалюты в поисках более высокой доходности.',
          },
        },
        {
          '@type': 'Question',
          name: 'При какой доминации начинается альтсезон?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Исторически альтсезон часто начинается при падении BTC.D ниже 45-48%. Однако это не жёсткое правило — важно учитывать общий тренд доминации, объёмы торгов и макроэкономические факторы. Сильное падение BTC.D за короткий период — более надёжный сигнал, чем абсолютное значение.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где смотреть график доминации биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'График BTC.D доступен на TradingView (тикер BTC.D), CoinMarketCap и CoinGecko в разделе глобальных графиков, а также на аналитических платформах Glassnode и CryptoQuant с расширенными метриками. TradingView позволяет накладывать индикаторы и настраивать оповещения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему растёт доминация биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рост доминации происходит когда инвесторы переводят средства из альткоинов в биткоин. Причины: общая неопределённость на рынке, крупные падения альтов, институциональные покупки BTC, запуск биткоин-ETF или негативные новости в секторе альткоинов. BTC воспринимается как «тихая гавань» криптовалютного мира.',
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
      '@id': 'https://arapov.trade/ru/freestudying/bitcoin-domination#howto',
      name: 'Как использовать доминацию биткоина в торговле',
      description:
        'Практическое руководство по анализу BTC.D для принятия торговых решений',
      totalTime: 'PT15M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Откройте график BTC.D',
          text: 'Зайдите на TradingView и введите тикер BTC.D. Выберите дневной или недельный таймфрейм для анализа среднесрочных трендов.',
          url: 'https://arapov.trade/ru/freestudying/bitcoin-domination#chart',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите ключевые уровни',
          text: 'Отметьте исторические уровни поддержки и сопротивления: 40%, 45%, 50%, 55%, 60%. Эти зоны часто служат точками разворота.',
          url: 'https://arapov.trade/ru/freestudying/bitcoin-domination#levels',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Добавьте индикаторы',
          text: 'Наложите RSI и скользящие средние для подтверждения тренда. Дивергенции на RSI часто предшествуют развороту доминации.',
          url: 'https://arapov.trade/ru/freestudying/bitcoin-domination#indicators',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Сопоставьте с ценой BTC',
          text: 'Сравните график BTC.D с графиком BTC/USD. Рост цены BTC при падающей доминации — сильный сигнал для альтсезона.',
          url: 'https://arapov.trade/ru/freestudying/bitcoin-domination#correlation',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Примите торговое решение',
          text: 'При падении BTC.D ниже ключевых уровней рассмотрите увеличение позиций в альткоинах. При росте — сократите экспозицию в альтах и увеличьте долю BTC.',
          url: 'https://arapov.trade/ru/freestudying/bitcoin-domination#decision',
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
      '@id': 'https://arapov.trade/ru/freestudying/bitcoin-domination#terms',
      name: 'Термины криптовалютного рынка',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Доминация биткоина (BTC.D)',
          description:
            'Процентная доля рыночной капитализации биткоина от общей капитализации всего криптовалютного рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночная капитализация',
          description:
            'Общая стоимость всех монет криптовалюты в обращении, рассчитанная как цена умноженная на количество монет',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альтсезон',
          description:
            'Период на крипторынке, когда альткоины показывают опережающий рост по сравнению с биткоином',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альткоины',
          description:
            'Все криптовалюты кроме биткоина, включая Ethereum, Solana, XRP и тысячи других проектов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Переток капитала',
          description:
            'Движение инвестиционных средств между различными активами или секторами рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TOTAL',
          description:
            'Общая рыночная капитализация всех криптовалют, отображаемая на TradingView',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TOTAL2',
          description:
            'Общая капитализация криптовалют за исключением биткоина',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптозима',
          description:
            'Продолжительный период падения цен на криптовалютном рынке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ICO',
          description:
            'Initial Coin Offering — первичное размещение токенов для привлечения инвестиций в криптопроекты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентрализованные финансы — экосистема финансовых приложений на блокчейне без посредников',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
