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
  selector: 'app-home-ru-blog-fourty-seven',
  templateUrl: './home-ru-blog-fourty-seven.component.html',
  styleUrl: './home-ru-blog-fourty-seven.component.scss',
})
export class HomeRuBlogFourtySevenComponent implements OnInit {
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
      'Индикатор MACD: сигналы и дивергенции | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Индикатор MACD: настройки, сигнальная линия и гистограмма, пересечения и дивергенции. Как читать сигналы и не попадать на ложные.',
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
            'Индикатор MACD в трейдинге: почему он работает хуже ожиданий',
          description:
            'Индикатор MACD: настройки, сигнальная линия и гистограмма, пересечения и дивергенции. Как читать сигналы и не попадать на ложные.',
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
            '@id': 'https://arapov.trade/ru/freestudying/macd-indicator',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/macdindicator.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords: 'macd',
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
          name: 'Как работает индикатор MACD простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MACD сравнивает быструю и медленную скользящие средние. Когда быстрая обгоняет медленную, линия растёт, когда отстаёт, падает. Пересечение линии MACD и сигнальной линии считают сигналом на покупку или продажу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие настройки MACD стандартные?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Классические параметры это 12, 26 и 9. Их предложил автор индикатора. Меньшие периоды делают MACD чувствительнее и шумнее, большие сглаживают сигналы. Новичку нет смысла гнаться за особой настройкой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему MACD даёт ложные сигналы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что он считается из прошлых цен и потому запаздывает. На развороте и во флете он часто рисует пересечение уже после движения, и сигнал оказывается ложным. Это свойство формулы, а не ошибка настройки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что лучше использовать вместо MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту перевес даёт работа с уровнями спроса и предложения, объёмами и price action. Эти инструменты показывают причину движения, а не его след, и MACD при таком подходе нужен максимум для фона.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое дивергенция MACD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это расхождение между ценой и индикатором. Медвежья дивергенция когда цена обновляет максимум, а MACD нет, намекая на ослабление роста; бычья когда цена обновляет минимум, а MACD нет. Её считают одним из самых полезных сигналов, потому что она появляется до разворота, но и она не гарантия: без подтверждения объёмом и уровнем я по ней не вхожу.',
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
      '@id': 'https://arapov.trade/ru/freestudying/macd-indicator#howto',
      name: 'Как разобраться и применять: Индикатор MACD в трейдинге: почему он работает хуже ожиданий',
      description:
        'Пошаговый разбор темы и её практическое применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Что такое индикатор MACD и как он рассчитывается',
          text: 'MACD — это индикатор схождения и расхождения скользящих средних, который показывает разницу между быстрой и медленной средними.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Сигналы MACD: пересечение линий, гистограмма, ноль и дивергенция',
          text: 'Четыре базовых сигнала: пересечение линии MACD и сигнальной, гистограмма, пересечение нуля и дивергенция между ценой и индикатором.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Настройки MACD: 12, 26, 9 и стоит ли их крутить',
          text: 'Стандартные параметры MACD это 12, 26 и 9: быстрая средняя по 12 барам, медленная по 26, сигнальная по 9.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'MACD и таймфрейм: где он шумит, а где спокойнее',
          text: 'Один и тот же MACD на минутке и на дневке ведёт себя как два разных индикатора.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'MACD и стохастик: парадокс противоречивых сигналов',
          text: 'Дальше из моей практики, и это моя позиция.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Почему MACD запаздывает и что эффективнее использовать',
          text: 'Причина запаздывания в самой конструкции.',
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
          name: 'MACD',
          description:
            'MACD это индикатор схождения и расхождения скользящих средних, который показывает разницу между быстрой и медленной средними.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'гистограмма MACD',
          description:
            'Гистограмма MACD это разница между линией MACD и сигнальной линией: растущие столбики показывают усиление импульса, сжимающиеся его ослабление.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'дивергенция MACD',
          description:
            'Дивергенция MACD это расхождение между ценой и индикатором: цена обновляет экстремум, а MACD нет, что считают ранним намёком на ослабление импульса.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
