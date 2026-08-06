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
  selector: 'app-home-ru-blog-eighty-eight',
  templateUrl: './home-ru-blog-eighty-eight.component.html',
  styleUrl: './home-ru-blog-eighty-eight.component.scss',
})
export class HomeRuBlogEightyEightComponent implements OnInit {
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
      'TradingView: полное руководство по платформе | Arapov.trade',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'TradingView: полное руководство по платформе для трейдеров. Узнайте, как использовать графики, индикаторы, Pine Script и социальные функции для анализа рынков.',
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
            'https://arapov.trade/ru/freestudying/tradingview-platform#article',
          headline:
            'TradingView: полное руководство по платформе для трейдеров',
          description:
            'Подробное руководство по использованию TradingView: графики, индикаторы, Pine Script, социальные функции и интеграция с брокерами.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingview_1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/ru#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tradingview-platform',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'TradingView',
            'ТрейдингВью',
            'технический анализ',
            'индикаторы',
            'Pine Script',
          ],
          wordCount: 1480,
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingview-platform#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое TradingView?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TradingView — это облачная платформа для построения графиков, технического анализа и обмена торговыми идеями. Платформа предоставляет доступ к данным бирж в реальном времени, сотням индикаторов и социальному сообществу трейдеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли пользоваться TradingView бесплатно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, базовая версия TradingView бесплатна и включает доступ к графикам, основным индикаторам, вотчлисту и публикации идей. Платные тарифы снимают ограничения на количество индикаторов, алертов и графиков.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Pine Script?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pine Script — это язык программирования TradingView для создания пользовательских индикаторов и торговых стратегий. Он позволяет автоматизировать анализ и проводить бэктестинг стратегий на исторических данных.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать через TradingView?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, TradingView интегрирован с более чем 50 брокерами. Вы можете размещать ордера прямо с графика, не покидая платформу. Также доступен режим бумажной торговли для практики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие рынки доступны на TradingView?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TradingView предоставляет данные по акциям, форексу, криптовалютам, фьючерсам, индексам, облигациям и товарным рынкам. Доступно более 100 000 торговых инструментов с различных бирж мира.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingview-platform#howto',
      name: 'Как начать работу с TradingView',
      description:
        'Пошаговое руководство по началу работы на платформе TradingView',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зарегистрируйтесь на платформе',
          text: 'Перейдите на сайт TradingView и создайте аккаунт через email или социальные сети. Подтвердите email для полного доступа к функциям.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Изучите интерфейс',
          text: 'Ознакомьтесь с основными зонами: панель инструментов, боковая панель рисования, вотчлист и центральная область графика.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Выберите инструмент и таймфрейм',
          text: 'Используйте поиск для выбора актива (акции, валюты, крипто). Настройте подходящий временной интервал для анализа.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Добавьте индикаторы',
          text: 'Нажмите кнопку индикаторов и выберите нужные из библиотеки. Настройте параметры под свою торговую стратегию.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Настройте алерты',
          text: 'Создайте уведомления о достижении ценой определённых уровней. Выберите способ доставки: push, email или webhook.',
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
      '@id': 'https://arapov.trade/ru/freestudying/tradingview-platform#terms',
      name: 'Термины TradingView',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'TradingView',
          description:
            'Облачная платформа для технического анализа, построения графиков и обмена торговыми идеями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pine Script',
          description:
            'Язык программирования TradingView для создания пользовательских индикаторов и стратегий.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скринер',
          description:
            'Инструмент фильтрации активов по заданным критериям: техническим, фундаментальным или объёмным.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Алерт',
          description:
            'Уведомление о наступлении заданного условия: достижении цены, пересечении индикаторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вотчлист',
          description:
            'Список отслеживаемых активов с быстрым доступом к графикам и котировкам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бэктестинг',
          description:
            'Проверка торговой стратегии на исторических данных для оценки её эффективности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Paper Trading',
          description:
            'Режим виртуальной торговли без реальных денег для практики и тестирования стратегий.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Индикатор, отображающий распределение объёма торгов по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Heikin Ashi',
          description:
            'Тип свечей с усреднёнными значениями для сглаживания рыночного шума.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Webhook',
          description:
            'HTTP-запрос для автоматической отправки данных алерта во внешние сервисы.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
