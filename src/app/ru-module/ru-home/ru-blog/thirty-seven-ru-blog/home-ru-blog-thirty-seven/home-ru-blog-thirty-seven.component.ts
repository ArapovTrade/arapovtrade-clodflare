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
  selector: 'app-home-ru-blog-thirty-seven',
  templateUrl: './home-ru-blog-thirty-seven.component.html',
  styleUrl: './home-ru-blog-thirty-seven.component.scss',
})
export class HomeRuBlogThirtySevenComponent implements OnInit {
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
      'Торговые платформы и брокер: как выбрать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как выбрать брокера и торговую платформу: регуляция, комиссии, исполнение ордеров и на что смотреть новичку, чтобы не попасть на кухню.',
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
          headline: 'Платформы, инструменты и брокер: с чего начинает трейдер',
          description:
            'Как выбрать брокера и торговую платформу: регуляция, комиссии, исполнение ордеров и на что смотреть новичку, чтобы не попасть на кухню.',
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
            '@id': 'https://arapov.trade/ru/freestudying/platforms-broker',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/platforms-broker.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для начинающих',
          keywords:
            'торговая платформа, торговый терминал, TradingView, демосчёт, брокер, как выбрать брокера',
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
          name: 'Какую торговую платформу выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Логичный старт это TradingView. Бесплатного тарифа достаточно, всё открывается в браузере, графики наглядные, а тренировочный демосчёт встроен сразу. Программа, забитая функциями, новичка только сбивает: на старте довольно чистого графика с объёмом и кнопки ордера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое TradingView и чем он полезен трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это браузерная платформа для графиков и анализа рынков: котировки акций, валют, крипты и фьючерсов, инструменты рисования и индикаторы. Удобна тем, что всё собрано в одном окне, начать можно бесплатно без установки, а свою разметку и уровни легко сохранить и вернуться к ним позже.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать в TradingView бесплатно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, через демосчёт, его ещё называют paper trading. Это тренировочный счёт с реальными котировками и виртуальными деньгами, доступен на любом тарифе, включая бесплатный, и не требует карты. На счёте лежит 100 000 виртуальных долларов, а баланс при желании сбрасывается.',
          },
        },
        {
          '@type': 'Question',
          name: 'Кто такой брокер и чем он отличается от биржи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Брокер это лицензированная фирма-посредник: она передаёт ваши заявки на биржу и удерживает за это комиссию. Биржа же это сама торговая площадка, место встречи покупателей и продавцов. Счёт открывается именно у брокера, ведь в одиночку частный трейдер на биржу не попадает.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое кухня в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кухня это имитация брокера: сделки клиента наружу не выводятся, а остаются внутри компании, которой выгоден его проигрыш. Выдают её запредельное плечо, бонусы за пополнение, настойчивые звонки и обещания быстрых денег. Простое правило: чем громче гарантии дохода, тем внимательнее проверяйте лицензию и порядок вывода.',
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
      '@id': 'https://arapov.trade/ru/freestudying/platforms-broker#howto',
      name: 'Как собрать связку для торговли: платформа, демосчёт, брокер',
      description:
        'Пошаговый разбор того, что нужно новичку для старта: терминал для анализа, демосчёт для тренировки и регулируемый брокер для вывода сделок на рынок',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь, что такое торговый терминал и зачем он нужен',
          text: 'Торговый терминал это приложение, дающее доступ к биржевым торгам: в нём график, набор аналитических инструментов и кнопка для сделки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Освойте TradingView как основную платформу',
          text: 'TradingView это бесплатная браузерная платформа, на которой удобно читать график, наносить уровни и тренироваться на встроенном демосчёте.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Настройте график под объём и обкатайте систему на демосчёте',
          text: 'Уберите лишние индикаторы, оставьте бары, уровни и объём внизу, а метод проверьте на демосчёте с виртуальными деньгами.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Выберите брокера по регуляции, а не по комиссиям',
          text: 'У надёжного брокера есть лицензия признанного регулятора и раздельное хранение средств, и только потом имеют значение комиссии и вывод.',
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
          name: 'Торговый терминал',
          description:
            'Приложение, дающее доступ к биржевым торгам: в нём график, набор аналитических инструментов и кнопка для покупки или продажи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TradingView',
          description:
            'Онлайн-платформа в браузере для графиков и анализа рынков, которая собирает в одном окне котировки акций, валют, криптовалют и фьючерсов вместе с инструментами рисования и индикаторами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Брокер',
          description:
            'Лицензированный посредник, через которого трейдер получает доступ к биржевым торгам и совершает сделки, а брокер за это берёт комиссию.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
