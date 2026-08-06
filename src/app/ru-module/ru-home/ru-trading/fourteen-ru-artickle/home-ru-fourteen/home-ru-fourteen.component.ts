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
  selector: 'app-home-ru-fourteen',
  templateUrl: './home-ru-fourteen.component.html',
  styleUrl: './home-ru-fourteen.component.scss',
})
export class HomeRuFourteenComponent implements OnInit {
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
      'Риск кредитного плеча на Форекс: почему трейдеры теряют деньги | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Риски кредитного плеча на Форекс: почему 70% трейдеров теряют деньги. Математика убытков, психология торговли, стратегии снижения рисков при использовании leverage.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/forexLeverageRisk.webp',
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
            'Риск кредитного плеча на Форекс: почему трейдеры теряют деньги',
          description:
            'Риски кредитного плеча на Форекс: почему 70% трейдеров теряют деньги. Математика убытков, психология торговли, стратегии снижения рисков при использовании leverage.',
          image:
            'https://arapov.trade/assets/img/content/forexLeverageRisk1.webp',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-25T00:00:00Z',
        dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/forexleveragerisk',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1382,
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
          name: 'Какое кредитное плечо безопасно для начинающих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим трейдерам рекомендуется использовать плечо не выше 1:10. Это позволяет совершать ошибки обучения без катастрофических последствий для депозита. Увеличение плеча оправдано только после демонстрации стабильной прибыльности на протяжении нескольких месяцев торговли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему большинство трейдеров теряют деньги при использовании высокого плеча?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Главная причина — асимметрия восприятия риска. Трейдеры фокусируются на потенциальной прибыли и игнорируют равновероятный убыток. При плече 1:100 движение цены на 1% против позиции обнуляет депозит, а такие колебания происходят на рынке ежедневно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое маржин-колл и как его избежать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржин-колл — принудительное закрытие позиций брокером при падении свободных средств ниже определённого уровня. Чтобы его избежать, используйте не более 20-30% доступной маржи, устанавливайте стоп-лоссы и выбирайте умеренное кредитное плечо.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как правильно рассчитать размер позиции при торговле с плечом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Применяйте правило одного процента: убыток по любой позиции не должен превышать 1% от депозита. Рассчитайте расстояние до стоп-лосса в пунктах, затем определите объём позиции так, чтобы при срабатывании стопа потеря составила не более 1% капитала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие скрытые издержки связаны с высоким кредитным плечом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Высокое плечо увеличивает спреды и свопы пропорционально объёму позиции. При плече 1:100 спред в 2 пункта на позиции 100 000 долларов составляет 20 долларов. Также возрастает риск проскальзывания во время высокой волатильности рынка.',
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
      name: 'Как безопасно использовать кредитное плечо на Форекс',
      description:
        'Пошаговое руководство по управлению рисками при торговле с кредитным плечом',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Начните с демо-счёта',
          text: 'Откройте демо-счёт с плечом 1:10 и торгуйте минимум три месяца, ведя подробный журнал сделок. Анализируйте результаты еженедельно.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ограничьте риск на сделку',
          text: 'Применяйте правило одного процента: убыток по любой позиции не должен превышать 1% от депозита. Устанавливайте стоп-лосс на каждой сделке.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Диверсифицируйте позиции',
          text: 'Распределяйте капитал между несколькими инструментами, учитывая корреляцию валютных пар. Избегайте концентрации в связанных активах.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Контролируйте маржу',
          text: 'Используйте не более 20-30% доступной маржи. Следите за уровнем свободных средств в терминале и сокращайте позиции при приближении к критическим значениям.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Увеличивайте плечо постепенно',
          text: 'Повышайте уровень плеча не более чем на 10 пунктов за квартал при условии стабильной прибыльности. Возвращайтесь к меньшим значениям при серии убытков.',
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
      name: 'Термины трейдинга: кредитное плечо и риски',
      description:
        'Глоссарий терминов, связанных с кредитным плечом и управлением рисками на Форекс',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Инструмент, позволяющий трейдеру оперировать суммой, многократно превышающей депозит, за счёт заёмных средств брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-колл',
          description:
            'Принудительное закрытие позиций брокером при падении свободных средств на счёте ниже минимально допустимого уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Залоговая сумма, блокируемая брокером при открытии позиции с использованием кредитного плеча',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description:
            'Комиссия за перенос открытой позиции через ночь, зависящая от разницы процентных ставок валютных пар',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки и продажи актива, составляющая доход брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Исполнение ордера по цене, отличающейся от запланированной, из-за высокой волатильности или недостаточной ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Состояние эмоционального срыва трейдера после серии неудач, приводящее к импульсивным решениям и нарушению торговой стратегии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор, показывающий средний диапазон движения цены за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период времени, измеряемая в процентах или пунктах',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
