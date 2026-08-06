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
  selector: 'app-home-ru-twenty-three',
  templateUrl: './home-ru-twenty-three.component.html',
  styleUrl: './home-ru-twenty-three.component.scss',
})
export class HomeRuTwentyThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Мировые фондовые индексы: полный обзор | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте о ключевых мировых фондовых индексах: S&P 500, Dow Jones, NASDAQ, DAX, FTSE 100, Nikkei 225. Как они работают и влияют на рынки.',
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Мировые фондовые индексы: полный обзор и влияние на рынки',
          description:
            'Подробный обзор ключевых мировых фондовых индексов. Американские, европейские и азиатские индексы, их структура, особенности и влияние на глобальные рынки.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/worldstockindicates',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/worldstockindicates.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Фондовый рынок',
          keywords:
            'фондовые индексы, S&P 500, Dow Jones, NASDAQ, DAX, FTSE 100',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое фондовый индекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фондовый индекс — это средневзвешенный показатель стоимости акций, входящих в его состав. Он отражает состояние определённой группы компаний или сектора экономики и позволяет оценивать общую динамику рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой индекс считается главным индикатором экономики США?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'S&P 500 считается наиболее объективным индикатором экономики США, так как включает 500 крупнейших корпораций из всех ключевых секторов: технологий, здравоохранения, финансов, потребительских товаров и других отраслей.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается Dow Jones от S&P 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dow Jones включает только 30 крупнейших компаний и является ценовзвешенным индексом (компании с более высокой ценой акции имеют больший вес). S&P 500 включает 500 компаний и взвешивается по рыночной капитализации, что делает его более репрезентативным.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой индекс отражает технологический сектор?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NASDAQ-100 фокусируется на акциях высокотехнологичных компаний, включая Apple, Amazon, Google, Microsoft, Tesla и другие инновационные корпорации. Это основной индикатор технологического и инновационного сектора.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как фондовые индексы влияют на рынки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фондовые индексы служат барометром экономики и влияют на настроения инвесторов. Рост индексов сигнализирует об оптимизме и привлекает капитал, падение — о негативных ожиданиях. Индексы также влияют на валютные курсы и товарные рынки.',
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
      '@id': 'https://arapov.trade/ru/freestudying/worldstockindicates#howto',
      name: 'Как анализировать мировые фондовые индексы',
      description: 'Пошаговое руководство по анализу и использованию глобальных фондовых индексов в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите структуру основных индексов',
          text: 'Ознакомьтесь с составом ключевых индексов: S&P 500 (500 крупнейших компаний США), Dow Jones (30 голубых фишек), NASDAQ (технологический сектор), DAX (40 немецких компаний), FTSE 100 (британские компании), Nikkei 225 (японские компании).',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поймите методы взвешивания',
          text: 'Различайте рыночную капитализацию (S&P 500, DAX) и ценовое взвешивание (Dow Jones). Разные методы по-разному отражают влияние отдельных компаний на индекс.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Следите за макроэкономическими показателями',
          text: 'Анализируйте ВВП, инфляцию, процентные ставки и занятость для каждого региона. Эти факторы напрямую влияют на движение региональных индексов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проанализируйте корреляции между индексами',
          text: 'Отследите, как движутся американские индексы во время открытия азиатских и европейских рынков. Обычно они движутся в одном направлении, но могут развиваться расхождения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте индексы в торговой стратегии',
          text: 'Применяйте индексы как инструмент подтверждения тренда и оценки общего рыночного настроения. Торгуйте индивидуальные акции с учётом направления движения индекса.',
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
      name: 'Глоссарий фондовых индексов',
      description:
        'Основные термины и определения, связанные с мировыми фондовыми индексами',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фондовый индекс',
          description:
            'Статистический показатель, отражающий изменение стоимости группы ценных бумаг, объединённых по определённому признаку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'S&P 500',
          description:
            'Американский фондовый индекс, включающий 500 крупнейших публичных компаний США, взвешенных по рыночной капитализации.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dow Jones Industrial Average',
          description:
            'Один из старейших американских индексов, включающий 30 крупнейших промышленных корпораций США.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NASDAQ-100',
          description:
            'Индекс, отслеживающий 100 крупнейших нефинансовых компаний, торгующихся на бирже NASDAQ, преимущественно технологического сектора.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DAX',
          description:
            'Немецкий фондовый индекс, включающий 40 крупнейших компаний Германии, торгующихся на Франкфуртской бирже.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FTSE 100',
          description:
            'Британский фондовый индекс 100 крупнейших компаний, торгующихся на Лондонской фондовой бирже.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Nikkei 225',
          description:
            'Японский фондовый индекс, включающий 225 крупнейших компаний, торгующихся на Токийской фондовой бирже.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CAC 40',
          description:
            'Французский фондовый индекс 40 крупнейших компаний по рыночной капитализации на бирже Euronext Paris.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночная капитализация',
          description:
            'Общая стоимость всех выпущенных акций компании, рассчитываемая как цена акции умноженная на количество акций в обращении.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ценовзвешенный индекс',
          description:
            'Тип индекса, в котором вес компании определяется ценой её акции, а не рыночной капитализацией.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
