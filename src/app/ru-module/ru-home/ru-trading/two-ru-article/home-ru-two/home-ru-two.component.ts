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
  selector: 'app-home-ru-two',
  templateUrl: './home-ru-two.component.html',
  styleUrl: './home-ru-two.component.scss',
})
export class HomeRuTwoComponent implements OnInit {
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
      'Словарь терминов финансового рынка: полное руководство для трейдеров | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Подробный словарь терминов финансового рынка для начинающих трейдеров. Основы фондового и валютного рынка, технический и фундаментальный анализ, стратегии торговли.',
    });
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
          headline:
            'Словарь терминов финансового рынка: полное руководство для трейдеров',
          description:
            'Подробный словарь терминов финансового рынка для начинающих трейдеров. Основы фондового и валютного рынка, технический и фундаментальный анализ, стратегии торговли.',
          image: 'https://arapov.trade/assets/img/content/osnovirinka1.webp',
          datePublished: '2026-03-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/ru/freestudying/marketbasics',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1530,
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
          name: 'Что такое финансовый рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Финансовый рынок — это глобальная экосистема, где участники обменивают капитал через различные инструменты: акции, облигации, валюты, криптовалюты и деривативы. Ежедневный объём транзакций достигает триллионов долларов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается фондовый рынок от Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фондовый рынок предназначен для торговли ценными бумагами (акциями, облигациями, ETF) на регулируемых биржах. Форекс — децентрализованный валютный рынок с круглосуточной торговлей валютными парами и ежедневным оборотом свыше 6 триллионов долларов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое кредитное плечо в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кредитное плечо позволяет управлять суммой, превышающей депозит трейдера. Например, плечо 1:100 означает контроль над 100000 долларами при депозите в 1000. Плечо увеличивает как потенциальную прибыль, так и возможные убытки.',
          },
        },
        {
          '@type': 'Question',
          name: 'В чём разница между техническим и фундаментальным анализом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технический анализ изучает исторические данные о цене и объёме для прогнозирования движений. Фундаментальный анализ оценивает справедливую стоимость актива на основе экономических показателей, финансовой отчётности и макроэкономических факторов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какую стратегию выбрать начинающему трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим рекомендуется свинг-трейдинг или позиционная торговля. Эти стратегии требуют меньше времени у экрана, позволяют принимать взвешенные решения и снижают влияние эмоций. Дейтрейдинг и скальпинг требуют опыта и высокой психологической устойчивости.',
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
      name: 'Как начать изучение финансовых рынков',
      description:
        'Пошаговое руководство для начинающих трейдеров по освоению терминологии и основ финансовых рынков',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите базовую терминологию',
          text: 'Освойте ключевые термины фондового и валютного рынка: акции, облигации, валютные пары, спред, лот, кредитное плечо. Понимание терминологии — фундамент для дальнейшего обучения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите сегмент рынка',
          text: 'Определитесь с направлением: фондовый рынок, Форекс, криптовалюты или товарный рынок. Каждый сегмент имеет свои особенности, риски и возможности.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Освойте методы анализа',
          text: 'Изучите основы технического анализа (графики, индикаторы, паттерны) и фундаментального анализа (экономические показатели, корпоративная отчётность). Комбинация методов даёт лучшие результаты.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Откройте демо-счёт у брокера и отрабатывайте навыки без риска реальных средств. Ведите торговый журнал, анализируйте сделки и совершенствуйте подход.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Разработайте систему управления рисками',
          text: 'Создайте правила управления капиталом: ограничьте риск на сделку (1-2% депозита), используйте стоп-лоссы, диверсифицируйте портфель. Дисциплина — ключ к долгосрочному успеху.',
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
      name: 'Словарь терминов финансового рынка',
      description: 'Основные термины и понятия для трейдеров и инвесторов',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Акция',
          description:
            'Ценная бумага, представляющая долю собственности в компании и дающая право на часть прибыли через дивиденды',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Облигация',
          description:
            'Долговой инструмент, по которому эмитент обязуется выплатить держателю номинальную стоимость плюс процентный доход',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и продажи (Bid) финансового инструмента',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Механизм, позволяющий управлять суммой, превышающей собственный депозит трейдера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Ордер, автоматически закрывающий позицию при достижении установленного уровня убытков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменения цены актива за определённый период, измеряется в процентах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться или покупаться без значительного изменения цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description:
            'Плата за перенос открытой позиции на следующий торговый день, зависит от разницы процентных ставок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Индекс относительной силы — технический индикатор для определения перекупленности или перепроданности актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём постоянного выставления заявок на покупку и продажу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
