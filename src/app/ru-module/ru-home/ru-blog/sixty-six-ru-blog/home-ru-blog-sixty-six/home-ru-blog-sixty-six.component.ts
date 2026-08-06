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
  selector: 'app-home-ru-blog-sixty-six',
  templateUrl: './home-ru-blog-sixty-six.component.html',
  styleUrl: './home-ru-blog-sixty-six.component.scss',
})
export class HomeRuBlogSixtySixComponent {
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
      'Объёмный Анализ в Трейдинге: Уровни Объёма и Точки Входа | Игорь Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Объёмный анализ в трейдинге: как находить уровни максимального объёма, использовать Volume Profile и POC для точных входов. Полное руководство с примерами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/peakvolumelevels.webp',
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
            'https://arapov.trade/ru/freestudying/peakvolumelevels#article',
          headline: 'Объёмный Анализ в Трейдинге: Уровни Объёма и Точки Входа',
          description:
            'Объёмный анализ в трейдинге: как находить уровни максимального объёма, использовать Volume Profile и POC для точных входов.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/peakvolumelevels1.png',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2024-01-15T10:00:00+00:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/peakvolumelevels',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'объёмный анализ',
            'уровни объёма',
            'Volume Profile',
            'POC',
            'Point of Control',
            'трейдинг',
            'Smart Money',
          ],
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
      '@id': 'https://arapov.trade/ru/freestudying/peakvolumelevels#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое объёмный анализ в трейдинге простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объёмный анализ — это метод изучения торговой активности на рынке через количество совершённых сделок. Он показывает, где крупные игроки покупали и продавали актив, помогая найти сильные уровни поддержки и сопротивления. В отличие от обычного технического анализа, объёмный анализ раскрывает реальный интерес участников рынка к определённым ценовым зонам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем Volume Profile отличается от обычного индикатора объёма?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обычный индикатор объёма показывает количество сделок за период времени (свечу), а Volume Profile распределяет объём по ценовым уровням. Это позволяет увидеть, на каких именно ценах происходила наибольшая торговая активность. Volume Profile помогает находить уровни, где сосредоточена ликвидность крупных игроков.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить Point of Control (POC) на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POC — это ценовой уровень с максимальным объёмом торгов за выбранный период. В большинстве торговых платформ с Volume Profile он отображается автоматически как горизонтальная линия или выделенная зона. POC показывает справедливую цену актива, к которой рынок стремится вернуться.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли использовать объёмный анализ на криптовалютном рынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, объёмный анализ отлично работает на криптовалютных биржах. Платформы вроде Binance и Bybit предоставляют данные об объёмах, которые можно анализировать через Volume Profile и Footprint Charts. Принципы работы объёмного анализа универсальны для любого ликвидного рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой таймфрейм лучше использовать для объёмного анализа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выбор таймфрейма зависит от стиля торговли. Для внутридневной торговли подходят 5-минутные и 15-минутные графики. Для свинг-трейдинга — часовые и 4-часовые. Уровни объёма на дневном и недельном графиках имеют наибольшую значимость и используются как ключевые ориентиры.',
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
      '@id': 'https://arapov.trade/ru/freestudying/peakvolumelevels#howto',
      name: 'Как анализировать уровни объёма в трейдинге',
      description:
        'Пошаговое руководство по использованию объёмного анализа для поиска точек входа',
      image: 'https://arapov.trade/assets/img/content/peakvolumelevels3.png',
      totalTime: 'PT30M',
      tool: [
        { '@type': 'HowToTool', name: 'Торговая платформа с Volume Profile' },
        { '@type': 'HowToTool', name: 'TradingView или аналог' },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Добавьте Volume Profile на график',
          text: 'Откройте торговую платформу и добавьте индикатор Volume Profile. Выберите период анализа — дневной, недельный или сессионный профиль.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels1.png',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите Point of Control (POC)',
          text: 'Найдите уровень с максимальным объёмом торгов — это Point of Control. Он показывает справедливую цену актива.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels2.webp',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Выделите Value Area (зону стоимости)',
          text: 'Определите границы Value Area — зону, где прошло 70% объёма торгов. VAH — сопротивление, VAL — поддержка.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализируйте реакцию цены на уровни',
          text: 'Наблюдайте, как цена реагирует на POC и границы Value Area. Отскок подтверждает уровень.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Планируйте точки входа и выхода',
          text: 'Входите на отскоках от POC или при пробое границ Value Area. Ставьте стоп-лосс за ближайшим объёмным уровнем.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels3.png',
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
      '@id': 'https://arapov.trade/ru/freestudying/peakvolumelevels#glossary',
      name: 'Глоссарий объёмного анализа',
      description: 'Основные термины объёмного анализа для трейдеров',
      inLanguage: 'ru',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Индикатор распределения торгового объёма по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control (POC)',
          description:
            'Ценовой уровень с максимальным объёмом торгов за период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area',
          description: 'Ценовой диапазон, где прошло 70% торгового объёма.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area High (VAH)',
          description: 'Верхняя граница зоны стоимости, уровень сопротивления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area Low (VAL)',
          description: 'Нижняя граница зоны стоимости, уровень поддержки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description: 'Разница между объёмом покупок и продаж.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description: 'Кластерные графики распределения объёмов внутри свечи.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description: 'Крупные институциональные участники рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description: 'Метод анализа распределения времени и объёма по ценам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description: 'Скопление ордеров на определённом ценовом уровне.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
