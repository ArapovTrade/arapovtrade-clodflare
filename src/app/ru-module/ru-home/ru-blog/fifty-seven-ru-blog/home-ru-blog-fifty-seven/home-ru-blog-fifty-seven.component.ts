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
  selector: 'app-home-ru-blog-fifty-seven',
  templateUrl: './home-ru-blog-fifty-seven.component.html',
  styleUrl: './home-ru-blog-fifty-seven.component.scss',
})
export class HomeRuBlogFiftySevenComponent implements OnInit {
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
      'Индикатор VWAP: средневзвешенная по объёму | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое VWAP, как считается средневзвешенная по объёму цена, зачем её используют институционалы и как применять во внутридневной торговле.',
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
          headline: 'VWAP в трейдинге: средневзвешенная цена и её применение',
          description:
            'Что такое VWAP, как считается средневзвешенная по объёму цена, зачем её используют институционалы и как применять во внутридневной торговле.',
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
            '@id': 'https://arapov.trade/ru/freestudying/vwap-indicator',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/vwap1.jpg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords: 'vwap',
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
          name: 'Что показывает VWAP простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Среднюю цену за день с поправкой на объём: по какой цене реально прошла основная масса сделок с открытия сессии. Цена выше неё значит покупатели в среднем платили дороже средней, ниже значит дешевле.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем VWAP отличается от скользящей средней?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скользящая средняя считает только цены и придаёт им равный или экспоненциальный вес. VWAP добавляет объём: бары, где торговали активнее, весят больше. Поэтому VWAP точнее отражает, где реально была масса участников.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках и таймфреймах работает VWAP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Классически это внутридневной инструмент: считается с открытия сессии и обнуляется ежедневно, поэтому лучше всего раскрывается на акциях и фьючерсах с чётким объёмом. Есть и привязанный VWAP от выбранной точки, он расширяет применение на более длинные горизонты.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать только по VWAP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VWAP это ориентир, а не готовая система. По моему опыту в одиночку он слабоват, ведь это всё же средняя по прошлым сделкам. Я подтверждаю его реальным объёмом и уровнями, и тогда от него есть толк.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем Anchored VWAP отличается от обычного VWAP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обычный VWAP считается с открытия сессии и каждый день обнуляется, поэтому он внутридневной. Anchored VWAP привязывается к выбранной точке (свинг-минимум, новость, открытие недели) и не сбрасывается, поэтому подходит для свинга на старших таймфреймах. Логика та же, меняется только точка отсчёта.',
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
      '@id': 'https://arapov.trade/ru/freestudying/vwap-indicator#howto',
      name: 'Как разобраться и применять: VWAP в трейдинге: средневзвешенная цена и её применение',
      description:
        'Пошаговый разбор темы и её практическое применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Что такое VWAP (объёмно-взвешенная цена) — определение',
          text: 'VWAP — это средневзвешенная по объёму цена, то есть сумма произведений типичной цены каждого бара на его объём, делённая на суммарный объём с начала сессии.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'VWAP на разных рынках: акции, фьючерсы и крипта',
          text: 'VWAP придумали для биржевого рынка с понятным торговым днём, и это важно держать в голове.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Как институционалы используют VWAP при входе в позицию',
          text: 'Вот тут и кроется причина, почему VWAP вообще работает как уровень.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'VWAP как уровень поддержки и сопротивления в течение дня',
          text: 'Чтение здесь несложное.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Как добавить VWAP и какие настройки выбрать',
          text: 'Считать VWAP руками не нужно, его рисует терминал.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Anchored VWAP: привязка к событию вместо дневного сброса',
          text: 'Anchored VWAP считается не с открытия дня, а от выбранной точки и не сбрасывается, поэтому годится для свинга на старших таймфреймах.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'VWAP и объёмный анализ: совместное применение',
          text: 'Здесь VWAP раскрывается лучше всего.',
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
          name: 'VWAP',
          description:
            'VWAP это средневзвешенная по объёму цена, то есть сумма произведений типичной цены каждого бара на его объём, делённая на суммарный объём с начала сессии.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Anchored VWAP',
          description:
            'Anchored VWAP это VWAP, привязанный не к открытию сессии, а к выбранной точке (свинг, новость, открытие периода), который не обнуляется каждый день и потому подходит для свинга на старших таймфреймах.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
