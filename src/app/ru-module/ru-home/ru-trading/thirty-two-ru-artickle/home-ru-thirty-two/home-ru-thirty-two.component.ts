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
  selector: 'app-home-ru-thirty-two',
  templateUrl: './home-ru-thirty-two.component.html',
  styleUrl: './home-ru-thirty-two.component.scss',
})
export class HomeRuThirtyTwoComponent implements OnInit {
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
      'Стоп-ордер в трейдинге: полное руководство по защите капитала | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стоп-ордер в трейдинге — полное руководство по использованию защитных ордеров для управления рисками на криптовалютном, фондовом рынке и Форекс',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoporder.webp',
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
          headline:
            'Стоп-ордер в трейдинге: полное руководство по защите капитала',
          description:
            'Детальный разбор стоп-ордеров: виды, стратегии установки, типичные ошибки и профессиональные методы защиты депозита на разных рынках',
          image: 'https://arapov.trade/assets/img/content/stoporder.png',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/stoporder',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: '1650',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чем стоп-лосс отличается от стоп-лимита?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс после активации превращается в рыночный ордер и исполняется по текущей цене, гарантируя закрытие позиции. Стоп-лимит превращается в лимитный ордер с заданной ценой, что защищает от проскальзывания, но не гарантирует исполнение при резких движениях рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каком расстоянии устанавливать стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальное расстояние зависит от волатильности актива. Используйте индикатор ATR: для большинства активов стоп-лосс размещают на расстоянии 1.5-2 значений ATR от точки входа. На криптовалютном рынке допустимо увеличение до 2.5-3 ATR из-за высокой волатильности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему мой стоп-лосс срабатывает слишком часто?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Частое срабатывание обычно связано с размещением стопа слишком близко к цене входа или на очевидных уровнях (круглые числа, локальные минимумы). Решение: размещайте стоп за ключевыми уровнями поддержки с учётом волатильности, избегайте круглых цен.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда лучше использовать трейлинг-стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейлинг-стоп эффективен в трендовых движениях, когда цена уверенно движется в вашу сторону. Не используйте его в боковике или при высокой волатильности — частые откаты будут преждевременно закрывать позиции. Оптимальный шаг: 3-5% для акций, 5-7% для криптовалют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать без стоп-ордеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговля без стопов — это игнорирование базового риск-менеджмента. Даже опытные трейдеры используют защитные ордера. Единственное исключение — долгосрочные инвесторы с горизонтом в несколько лет, но и они применяют ментальные стопы для пересмотра позиций.',
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
      name: 'Как правильно установить стоп-ордер',
      description:
        'Пошаговое руководство по установке защитного стоп-ордера для минимизации рисков в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите уровень риска',
          text: 'Рассчитайте максимально допустимый убыток на сделку. Стандартная рекомендация — не более 1-2% от депозита. Это определит допустимое расстояние до стопа.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте волатильность',
          text: 'Используйте индикатор ATR для определения среднего диапазона движения цены. Стоп должен находиться за пределами нормального рыночного шума.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Найдите технический уровень',
          text: 'Определите ближайший уровень поддержки (для длинной позиции) или сопротивления (для короткой). Стоп размещается за этим уровнем.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Добавьте буфер',
          text: 'Отступите от технического уровня на 0.5-1% цены актива, чтобы избежать срабатывания на ложных пробоях и сборе ликвидности.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Выберите тип ордера и установите',
          text: 'Для ликвидных активов используйте стоп-лосс, для менее ликвидных — стоп-лимит. Введите стоп-цену в терминале и подтвердите ордер.',
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
      name: 'Глоссарий терминов стоп-ордеров',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ордер',
          description:
            'Торговый приказ, который активируется при достижении заданной цены и автоматически исполняет сделку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия убыточной позиции при достижении определённого уровня цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лимит',
          description:
            'Комбинированный ордер, который активируется как стоп, но исполняется как лимитный по заданной или лучшей цене',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-ордер, автоматически следующий за ценой на заданном расстоянии при движении в прибыльную сторону',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой ценой исполнения ордера и фактической ценой из-за рыночной волатильности или низкой ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор среднего истинного диапазона, показывающий волатильность актива за период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Buy-Stop',
          description:
            'Ордер на покупку, активирующийся при пробое цены вверх выше установленного уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sell-Stop',
          description:
            'Ордер на продажу, активирующийся при падении цены ниже установленного уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OCO-ордер',
          description:
            'One-Cancels-Other — связка из двух ордеров, где исполнение одного автоматически отменяет другой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сбор ликвидности',
          description:
            'Целенаправленное движение цены к скоплению стоп-ордеров для их активации перед разворотом рынка',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
