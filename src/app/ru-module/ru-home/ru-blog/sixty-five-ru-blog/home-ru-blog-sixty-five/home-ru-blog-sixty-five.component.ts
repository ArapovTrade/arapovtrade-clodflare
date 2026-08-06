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
  selector: 'app-home-ru-blog-sixty-five',
  templateUrl: './home-ru-blog-sixty-five.component.html',
  styleUrl: './home-ru-blog-sixty-five.component.scss',
})
export class HomeRuBlogSixtyFiveComponent {
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
      'Биржевой Стакан и Лента Принтов: Как Читать Order Book | Игорь Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Биржевой стакан и лента принтов: полное руководство по анализу Order Book и Time & Sales. Как читать глубину рынка, находить крупных игроков и избегать манипуляций.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneystockorderbook.png',
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
          '@id': 'https://arapov.trade/ru/freestudying/stockorderbook#article',
          headline:
            'Биржевой Стакан и Лента Принтов: Как Читать Order Book и Time & Sales',
          description:
            'Полное руководство по анализу биржевого стакана и ленты принтов для определения намерений крупных игроков.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stockorderbook1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/ru#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/stockorderbook',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'биржевой стакан',
            'Order Book',
            'лента принтов',
            'Time and Sales',
            'глубина рынка',
          ],
          inLanguage: 'ru',
          isAccessibleForFree: true,
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
      '@id': 'https://arapov.trade/ru/freestudying/stockorderbook#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое биржевой стакан простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржевой стакан (Order Book) — это таблица всех активных лимитных заявок на покупку и продажу актива. Заявки на покупку (Bid) расположены ниже текущей цены, заявки на продажу (Ask) — выше. Стакан показывает, сколько контрактов готовы купить или продать на каждом ценовом уровне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем лента принтов отличается от биржевого стакана?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржевой стакан показывает ожидающие исполнения лимитные заявки — намерения участников. Лента принтов (Time & Sales) показывает уже совершённые сделки — реальные действия. Стакан отвечает на вопрос «кто готов торговать», лента — «кто уже торгует».',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое спуфинг в биржевом стакане?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спуфинг — это манипулятивная тактика, при которой крупные игроки выставляют большие лимитные заявки без намерения их исполнять. Цель — создать иллюзию спроса или предложения, спровоцировать движение цены, а затем быстро отменить заявки. Спуфинг запрещён на регулируемых рынках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое айсберг-ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Айсберг-ордер (Iceberg Order) — это скрытая лимитная заявка, которая разбивается на множество мелких частей. В стакане видна только малая часть, а полный объём скрыт. Это позволяет крупным игрокам входить в позицию незаметно, не привлекая внимание и не двигая цену против себя.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить манипуляцию в стакане?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Признаки манипуляции: крупные заявки внезапно исчезают перед исполнением, ордера появляются и отменяются с высокой частотой, объём в стакане не соответствует реальным сделкам в ленте принтов. Сравнение стакана с лентой помогает отфильтровать ложные сигналы.',
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
      '@id': 'https://arapov.trade/ru/freestudying/stockorderbook#howto',
      name: 'Как анализировать биржевой стакан и ленту принтов',
      description:
        'Пошаговое руководство по чтению Order Book и Time & Sales для поиска точек входа',
      image: 'https://arapov.trade/assets/img/content/stockorderbook3.png',
      totalTime: 'PT25M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Откройте биржевой стакан',
          text: 'Настройте отображение Order Book на вашей торговой платформе. Выберите нужную глубину — обычно 10-20 уровней достаточно для анализа.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите крупные заявки',
          text: 'Найдите уровни с аномально высоким объёмом заявок. Это потенциальные зоны поддержки (крупные Bid) или сопротивления (крупные Ask).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Откройте ленту принтов',
          text: 'Добавьте окно Time & Sales рядом со стаканом. Настройте фильтр для отображения только крупных сделок.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Сравните стакан и ленту',
          text: 'Проверьте, исполняются ли крупные заявки из стакана. Если заявки стоят, но сделки не проходят — возможна манипуляция.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ищите паттерны активности',
          text: 'Следите за поглощением (absorption), айсберг-ордерами и кластерами крупных сделок. Это сигналы присутствия институциональных игроков.',
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
      '@id': 'https://arapov.trade/ru/freestudying/stockorderbook#glossary',
      name: 'Глоссарий биржевого стакана',
      inLanguage: 'ru',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Order Book',
          description:
            'Биржевой стакан — таблица активных лимитных заявок на покупку и продажу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Time & Sales',
          description:
            'Лента принтов — поток данных об исполненных рыночных сделках в реальном времени.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid',
          description:
            'Лимитная заявка на покупку, расположенная ниже текущей рыночной цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask',
          description:
            'Лимитная заявка на продажу, расположенная выше текущей рыночной цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spread',
          description:
            'Спред — разница между лучшей ценой покупки (Bid) и продажи (Ask).',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Depth',
          description:
            'Глубина рынка — количество заявок на разных ценовых уровнях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Spoofing',
          description:
            'Спуфинг — манипулятивная тактика с фиктивными заявками для создания ложного спроса.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Iceberg Order',
          description:
            'Айсберг-ордер — скрытая заявка, разбитая на мелкие части для маскировки объёма.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Absorption',
          description:
            'Поглощение — ситуация, когда лимитные ордера поглощают рыночные без движения цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity',
          description:
            'Ликвидность — объём заявок, доступных для исполнения на определённом уровне цены.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
