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
  selector: 'app-home-ru-blog-ninty-four',
  templateUrl: './home-ru-blog-ninty-four.component.html',
  styleUrl: './home-ru-blog-ninty-four.component.scss',
})
export class HomeRuBlogNintyFourComponent implements OnInit {
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
      'Что такое спред в трейдинге: виды, расчёт и стратегии оптимизации | Игорь Арапов',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Спред в трейдинге — разница между ценой покупки и продажи актива. Узнайте виды спредов, факторы влияния и стратегии минимизации торговых издержек на Форекс.',
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
          '@id': 'https://arapov.trade/ru/freestudying/spread#article',
          headline:
            'Что такое спред в трейдинге: виды, расчёт и стратегии оптимизации',
          description:
            'Полное руководство по спреду в трейдинге. Разбираем типы спредов, факторы влияния на размер и практические методы снижения торговых издержек.',
          image: 'https://arapov.trade/assets/img/content/spread3.png',
          datePublished: '2026-03-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/ru/freestudying/spread',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'спред',
            'bid ask',
            'торговые издержки',
            'форекс',
            'трейдинг',
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
      '@id': 'https://arapov.trade/ru/freestudying/spread#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое спред в трейдинге простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спред — это разница между ценой покупки (Ask) и ценой продажи (Bid) финансового инструмента. Фактически это комиссия за совершение сделки, которая автоматически списывается при открытии позиции.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой спред лучше: фиксированный или плавающий?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фиксированный спред подходит новичкам и торговым роботам благодаря предсказуемости. Плавающий спред выгоднее для опытных трейдеров, умеющих выбирать оптимальное время для торговли с минимальными издержками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему спред расширяется во время новостей?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При выходе важных экономических данных волатильность резко возрастает. Маркетмейкеры расширяют спреды для защиты от рисков, связанных с непредсказуемыми ценовыми движениями в эти моменты.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как минимизировать влияние спреда на прибыль?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгуйте во время максимальной ликвидности, используйте лимитные ордера, выбирайте брокера с конкурентными спредами и участвуйте в рибейт-программах для возврата части издержек.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких инструментах самые низкие спреды?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимальные спреды на основных валютных парах Форекс: EUR/USD, GBP/USD, USD/JPY. На фондовом рынке — акции с высокой капитализацией. На крипторынке — Bitcoin и Ethereum на крупных биржах.',
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
      '@id': 'https://arapov.trade/ru/freestudying/spread#howto',
      name: 'Как снизить торговые издержки на спреде',
      description:
        'Пошаговое руководство по минимизации влияния спреда на результаты торговли',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Сравните брокеров',
          text: 'Проанализируйте спреды нескольких брокеров на интересующих инструментах. Сравнивайте средние значения, а не только минимальные.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите оптимальное время',
          text: 'Торгуйте во время пересечения европейской и американской сессий, когда ликвидность максимальна, а спреды минимальны.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Используйте лимитные ордера',
          text: 'Вместо рыночных ордеров применяйте лимитные для контроля цены входа и снижения влияния спреда.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подключите рибейт-программу',
          text: 'Зарегистрируйтесь в программе лояльности брокера или рибейт-сервисе для возврата части торговых издержек.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Избегайте торговли на новостях',
          text: 'Отслеживайте экономический календарь и не открывайте позиции непосредственно перед выходом важных данных.',
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
      '@id': 'https://arapov.trade/ru/freestudying/spread#glossary',
      name: 'Глоссарий терминов по спреду',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и ценой продажи (Bid) финансового инструмента',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid',
          description:
            'Цена спроса — максимальная цена, по которой покупатели готовы приобрести актив',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask',
          description:
            'Цена предложения — минимальная цена, по которой продавцы согласны продать актив',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фиксированный спред',
          description:
            'Спред с неизменным значением независимо от рыночных условий',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Плавающий спред',
          description:
            'Спред, динамически изменяющийся в зависимости от ликвидности и волатильности рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рибейт',
          description:
            'Возврат части спреда или комиссии трейдеру за совершённые сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркетмейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём постоянной котировки цен покупки и продажи',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN-брокер',
          description:
            'Брокер с прямым доступом к межбанковской ликвидности через электронную коммуникационную сеть',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пункт (пипс)',
          description:
            'Минимальное изменение цены валютной пары, обычно четвёртый знак после запятой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться по цене, близкой к рыночной',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
