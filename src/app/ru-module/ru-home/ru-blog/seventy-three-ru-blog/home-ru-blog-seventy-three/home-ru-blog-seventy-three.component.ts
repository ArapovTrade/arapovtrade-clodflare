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
  selector: 'app-home-ru-blog-seventy-three',
  templateUrl: './home-ru-blog-seventy-three.component.html',
  styleUrl: './home-ru-blog-seventy-three.component.scss',
})
export class HomeRuBlogSeventyThreeComponent {
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
      'Макроэкономические показатели в трейдинге | Фундаментальный анализ',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по макроэкономическим показателям для трейдеров. Узнайте, как ВВП, инфляция, процентные ставки и занятость влияют на финансовые рынки.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-16' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/macroeconomicindicators.webp',
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
            'Макроэкономические показатели и их влияние на финансовые рынки',
          description:
            'Полное руководство по макроэкономическим показателям для трейдеров. Узнайте, как ВВП, инфляция, процентные ставки и занятость влияют на финансовые рынки.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          image: [
            'https://arapov.trade/assets/redesignArapovTrade/img/macroeconomicindicators.webp',
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2024-06-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/ru/freestudying/macroeconomicindicators',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'макроэкономические показатели',
            'ВВП',
            'инфляция',
            'процентные ставки',
            'фундаментальный анализ',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое макроэкономические показатели?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Макроэкономические показатели — это статистические данные, отражающие состояние и динамику экономики страны или региона. К ключевым показателям относятся ВВП, инфляция, уровень безработицы, торговый баланс и индексы деловой активности. Они составляют основу фундаментального анализа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как ВВП влияет на финансовые рынки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рост ВВП выше прогнозов укрепляет национальную валюту и поддерживает фондовый рынок, сигнализируя о здоровой экономике. Замедление роста или падение ВВП может спровоцировать рецессионные ожидания, снижение фондовых индексов и отток капитала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему инфляция важна для трейдеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Инфляция определяет покупательную способность валюты и влияет на решения центральных банков по процентным ставкам. Высокая инфляция обычно ведёт к повышению ставок, что укрепляет валюту, но может негативно сказаться на фондовом рынке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Non-Farm Payrolls и почему это важно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Non-Farm Payrolls (NFP) — ежемесячный отчёт о количестве созданных рабочих мест в несельскохозяйственном секторе США. Это один из наиболее влиятельных экономических релизов, вызывающий высокую волатильность на валютном и фондовом рынках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как использовать экономический календарь в торговле?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Экономический календарь помогает планировать торговлю с учётом предстоящих публикаций важных данных. Трейдеры отслеживают время выхода показателей, сравнивают прогнозы с фактическими значениями и используют волатильность после релизов для открытия позиций.',
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
      name: 'Как анализировать макроэкономические показатели для торговли',
      description:
        'Пошаговое руководство по использованию макроэкономических данных в трейдинге',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучение экономического календаря',
          text: 'Отслеживайте расписание публикации ключевых показателей: ВВП, инфляция, занятость, решения по ставкам. Отмечайте события высокой важности.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализ консенсус-прогнозов',
          text: 'Изучайте прогнозы аналитиков перед публикацией данных. Рыночная реакция зависит от отклонения фактических значений от ожиданий.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оценка исторической динамики',
          text: 'Сравнивайте текущие данные с предыдущими значениями. Выявляйте тренды — последовательное улучшение или ухудшение показателей.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Определение межрыночных связей',
          text: 'Анализируйте влияние показателей на разные классы активов: валюты, акции, облигации, сырьё. Учитывайте корреляции между рынками.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Формирование торговой стратегии',
          text: 'Интегрируйте макроэкономический анализ с техническим. Используйте фундаментальные данные для определения направления, технический анализ — для точек входа.',
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
      name: 'Терминология макроэкономических показателей',
      description: 'Основные термины фундаментального анализа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовой внутренний продукт — общая стоимость товаров и услуг, произведённых в стране за период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CPI',
          description:
            'Индекс потребительских цен — показатель изменения стоимости потребительской корзины',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PPI',
          description:
            'Индекс цен производителей — показатель инфляции на уровне оптовых цен',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — число рабочих мест в несельскохозяйственном секторе США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PMI',
          description:
            'Индекс деловой активности — показатель настроений в производственном и сервисном секторах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентная ставка',
          description:
            'Базовая ставка центрального банка, определяющая стоимость заимствований',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый баланс',
          description:
            'Разница между экспортом и импортом товаров и услуг страны',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Индекс потребительского доверия',
          description:
            'Показатель уверенности потребителей в экономических перспективах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Денежная масса',
          description:
            'Общий объём денежных средств в обращении в экономике (M1, M2, M3)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VIX',
          description:
            'Индекс волатильности — показатель ожидаемой волатильности фондового рынка',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
