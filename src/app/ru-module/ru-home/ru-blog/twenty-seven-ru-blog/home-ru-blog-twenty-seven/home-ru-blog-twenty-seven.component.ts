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
  selector: 'app-home-ru-blog-twenty-seven',
  templateUrl: './home-ru-blog-twenty-seven.component.html',
  styleUrl: './home-ru-blog-twenty-seven.component.scss',
})
export class HomeRuBlogTwentySevenComponent implements OnInit {
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
      'Торговля активами: золото, нефть, индексы | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как торговать золотом, нефтью и фондовыми индексами: фундаментальные драйверы, особенности инструментов и подходы к анализу.',
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
            'Торговля активами: золото, нефть и фондовые индексы по объёму и уровням',
          description:
            'Как торговать золотом, нефтью и фондовыми индексами: фундаментальные драйверы, особенности инструментов и подходы к анализу.',
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
            '@id': 'https://arapov.trade/ru/freestudying/assets-trading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/goldtrading1.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Фундаментальный анализ',
          keywords:
            'торговля активами, торговля золотом, торговля нефтью, фондовые индексы, S&P 500',
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
          name: 'Что такое XAU/USD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так обозначают цену тройской унции золота в долларах США, главный тикер золотого рынка. Доступен он почти круглые сутки пять дней в неделю, а золото издавна служит убежищем для капитала в смутные времена.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем WTI отличается от Brent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WTI это лёгкая малосернистая нефть США с поставкой в Кушинге на бирже NYMEX. Brent добывают в Северном море и торгуют на ICE, это мировой ориентир, к которому привязаны около двух третей контрактов; стоит он обычно чуть выше WTI, а разрыв между ними зовут спредом Brent-WTI.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое фондовый индекс простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так называют корзину акций группы компаний, чью динамику передаёт одна цифра. Не приходится следить за сотней бумаг по отдельности: индекс сразу показывает, растёт рынок или падает, потому его и зовут барометром экономики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем NASDAQ отличается от S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У NASDAQ сильный технологический перекос и почти нет финансового сектора, оттого он подвижнее. S&P 500 устроен шире, держит пятьсот крупнейших компаний из всех отраслей и считается по капитализации, что делает его ровнее как индикатор.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой риск держать на волатильных активах вроде золота и нефти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ниже привычного. Золото и нефть ходят рывками, ход в несколько процентов за день для них норма, поэтому на сделку я отвожу около половины процента депозита и ставлю стоп с запасом под колебания; чересчур тесный стоп на таком активе вылетает на обычном шуме.',
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
      '@id': 'https://arapov.trade/ru/freestudying/assets-trading#howto',
      name: 'Как подходить к торговле золотом, нефтью и индексами',
      description:
        'Разбор торговли волатильными активами: инструменты, различия марок и индексов и единый подход через объём и уровни',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь в золоте XAU/USD и его драйверах',
          text: 'XAU/USD это цена тройской унции золота в долларах, защитный актив, который сильнее всего реагирует на политику ФРС и реальные ставки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поймите инструменты нефти и разницу WTI и Brent',
          text: 'Нефть торгуют фьючерсами CL на WTI на NYMEX и Brent на ICE, а разницу между марками называют спредом Brent-WTI.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Разберитесь, как устроены и как торгуются фондовые индексы',
          text: 'Фондовый индекс это корзина акций, которую торгуют через ETF и фьючерсы, а способ взвешивания определяет, кто двигает индекс сильнее.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Применяйте единый метод и пониженный риск на волатильных активах',
          text: 'Золото, нефть и индексы я читаю одинаково, по объёму и уровням, а риск из-за волатильности держу ниже обычного.',
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
          name: 'XAU/USD',
          description:
            'Котировка одной тройской унции золота в долларах США, основной инструмент для торговли золотом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред Brent-WTI',
          description:
            'Разница в цене между эталонными марками нефти Brent и WTI, отражающая региональные дисбалансы спроса и предложения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фондовый индекс',
          description:
            'Средневзвешенный показатель стоимости акций входящих в его состав компаний, отражающий динамику рынка одним числом.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
