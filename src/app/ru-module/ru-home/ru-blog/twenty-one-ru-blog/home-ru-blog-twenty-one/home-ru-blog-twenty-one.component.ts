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
  selector: 'app-home-ru-blog-twenty-one',
  templateUrl: './home-ru-blog-twenty-one.component.html',
  styleUrl: './home-ru-blog-twenty-one.component.scss',
})
export class HomeRuBlogTwentyOneComponent implements OnInit {
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
      'Solana (SOL): гайд по криптовалюте | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое Solana, как устроен блокчейн SOL, его экосистема DeFi и NFT, преимущества скорости и риски для трейдеров и инвесторов.',
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
          headline: 'Solana (SOL) в трейдинге: анализ и особенности',
          description:
            'Что такое Solana, как устроен блокчейн SOL, его экосистема DeFi и NFT, преимущества скорости и риски для трейдеров и инвесторов.',
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
            '@id': 'https://arapov.trade/ru/freestudying/solana-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/sol1.jpg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюта',
          keywords: 'solana',
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
          name: 'Что такое Solana простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это быстрый блокчейн и его токен SOL, запущенный в 2020 году. Сеть делает ставку на высокую скорость и дешёвые комиссии, поэтому на ней много DeFi-приложений, NFT и мемкоинов. Для трейдера SOL это крупный, но очень волатильный актив.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем Solana отличается от Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Solana быстрее и дешевле в комиссиях, но к надёжности её сети есть вопросы из-за прошлых сбоев. Ethereum медленнее и дороже, зато считается более устоявшимся и децентрализованным. Это разные ставки: производительность против надёжности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как анализировать SOL для торговли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Я читаю его по структуре рынка и ключевым уровням, а не по индикаторам. Хорошо работают круглые психологические отметки. Реальный объём смотрю по фьючерсам CME, потому что объёму нерегулируемых криптобирж доверять нельзя.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем опасна торговля Solana?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Высокой волатильностью: SOL валится сильнее рынка на падении. Плюс история сбоев сети и тонкая ликвидность в моменты паники. Поэтому позицию стоит держать небольшой и закладывать риск заранее, а не лезть на хайпе.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Proof of History в Solana?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это криптографические часы Solana: механизм, который проставляет транзакциям метки времени и заранее выстраивает их по порядку, ещё до согласования между валидаторами. Поверх Proof of Stake это позволяет обрабатывать тысячи транзакций в секунду с очень низкой комиссией. Обратная сторона этой гонки за скоростью это нагрузочные сбои, из-за которых сеть несколько раз останавливалась.',
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
      '@id': 'https://arapov.trade/ru/freestudying/solana-guide#howto',
      name: 'Как разобраться и применять: Solana (SOL) в трейдинге: анализ и особенности',
      description:
        'Пошаговый разбор темы и её практическое применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Что такое Solana и чем она отличается от Ethereum',
          text: 'Solana — это высокоскоростной блокчейн и его токен SOL, запущенные в 2020 году командой Анатолия Яковенко, бывшего инженера Qualcomm.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Что под капотом Solana: Proof of History, скорость и плата за неё',
          text: 'Скорость Solana обеспечивает Proof of History поверх Proof of Stake: тысячи TPS и дешёвые комиссии, но та же гонка за скоростью это причина сбоев сети.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Экономика Solana: на чём держится активность сети',
          text: 'Значительная часть активности и комиссий Solana держалась на мемкоинах.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'SOL в 2026: цена, ETF со стейкингом и апгрейды сети',
          text: 'Свежая картина помогает не покупать вслепую.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Технический анализ SOL: уровни и структура рынка',
          text: 'Никакой особой магии SOL не требует, его читают теми же глазами, что фьючерс или золото.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Риски торговли Solana: волатильность и ликвидность',
          text: 'Тут важно трезво понимать, во что лезешь.',
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
          name: 'Solana',
          description:
            'Solana это высокоскоростной блокчейн и его токен SOL, запущенные в 2020 году командой Анатолия Яковенко, бывшего инженера Qualcomm.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof of History',
          description:
            'Proof of History это механизм Solana, который проставляет транзакциям метки времени и выстраивает их по порядку ещё до согласования между валидаторами; поверх Proof of Stake это даёт высокую скорость сети.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
