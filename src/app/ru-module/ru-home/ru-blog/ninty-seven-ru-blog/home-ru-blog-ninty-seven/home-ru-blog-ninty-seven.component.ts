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
  selector: 'app-home-ru-blog-ninty-seven',
  templateUrl: './home-ru-blog-ninty-seven.component.html',
  styleUrl: './home-ru-blog-ninty-seven.component.scss',
})
export class HomeRuBlogNintySevenComponent implements OnInit {
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
      'Индикатор RSI | Полное руководство по индексу относительной силы',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Индикатор RSI (Relative Strength Index): полное руководство по использованию в трейдинге. Настройки, стратегии, сигналы перекупленности и перепроданности.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/rsiindicator',
          },
          headline:
            'Индикатор RSI: полное руководство по индексу относительной силы',
          description:
            'Индикатор RSI (Relative Strength Index): полное руководство по использованию в трейдинге. Настройки, стратегии, сигналы перекупленности и перепроданности.',
          image: 'https://arapov.trade/assets/img/content/oiltrading1.jpg',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-10T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Что такое индикатор RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI (Relative Strength Index) — это технический осциллятор, измеряющий скорость и величину ценовых изменений по шкале от 0 до 100. Разработан Уэллсом Уайлдером в 1978 году для определения перекупленности и перепроданности актива.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие значения RSI указывают на перекупленность и перепроданность?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Классические уровни: RSI выше 70 сигнализирует о перекупленности (потенциал снижения), RSI ниже 30 — о перепроданности (потенциал роста). В сильных трендах используют уровни 80/20.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое дивергенция RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дивергенция — расхождение между направлением цены и индикатора RSI. Бычья дивергенция (цена падает, RSI растёт) предвещает разворот вверх. Медвежья дивергенция (цена растёт, RSI падает) сигнализирует о возможном снижении.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой период RSI лучше использовать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартный период — 14. Для краткосрочной торговли используют 7-9, для долгосрочной — 21-25. Меньший период даёт больше сигналов, но увеличивает количество ложных.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать только по RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не рекомендуется. RSI эффективнее в сочетании с другими инструментами: уровнями поддержки/сопротивления, объёмным анализом, паттернами Price Action. Комплексный подход повышает точность входов.',
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
      name: 'Как использовать индикатор RSI в трейдинге',
      description:
        'Пошаговое руководство по применению RSI для поиска торговых сигналов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Добавьте RSI на график',
          text: 'Откройте торговую платформу, выберите индикатор RSI из списка осцилляторов и примените к графику. Стандартные настройки: период 14, уровни 70/30.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите текущий тренд',
          text: 'Проанализируйте старший таймфрейм для понимания направления рынка. RSI работает эффективнее, когда сигналы совпадают с основным трендом.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ищите зоны экстремумов',
          text: 'Отмечайте моменты, когда RSI входит в зоны перекупленности (выше 70) или перепроданности (ниже 30). Это потенциальные области разворота.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проверьте наличие дивергенции',
          text: 'Сравните направление ценовых экстремумов с экстремумами RSI. Расхождение указывает на ослабление импульса и возможный разворот.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Дождитесь подтверждения',
          text: 'Не входите по первому сигналу RSI. Подтвердите вход через пробой уровня, свечной паттерн или объёмный всплеск. Установите стоп-лосс и тейк-профит.',
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
      name: 'Терминология индикатора RSI',
      description: 'Ключевые понятия для понимания индекса относительной силы',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — осциллятор, измеряющий относительную силу бычьих и медвежьих движений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перекупленность',
          description:
            'Состояние рынка, когда цена выросла слишком быстро и возможна коррекция вниз (RSI выше 70)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перепроданность',
          description:
            'Состояние рынка, когда цена упала слишком быстро и возможен отскок вверх (RSI ниже 30)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между направлением движения цены и индикатора, сигнализирующее об ослаблении тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осциллятор',
          description:
            'Класс индикаторов, колеблющихся в определённом диапазоне и показывающих импульс движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Период RSI',
          description:
            'Количество свечей, используемых для расчёта индикатора (стандартное значение — 14)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Failure Swing',
          description:
            'Паттерн разворота RSI без достижения экстремальных зон, подтверждающий смену тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Центральная линия',
          description:
            'Уровень 50 на шкале RSI, разделяющий бычью и медвежью территорию',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
