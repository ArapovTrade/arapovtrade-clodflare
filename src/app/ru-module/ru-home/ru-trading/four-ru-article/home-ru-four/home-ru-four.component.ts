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
  selector: 'app-home-ru-four',
  templateUrl: './home-ru-four.component.html',
  styleUrl: './home-ru-four.component.scss',
})
export class HomeRuFourComponent implements OnInit {
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
    this.titleService.setTitle('Биржевые и внебиржевые рынки | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Биржевой и внебиржевой рынки: ключевые отличия, преимущества и недостатки. Как выбрать площадку для торговли акциями, валютами и деривативами.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/exchangemarkets.webp',
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
          headline: 'Биржевые и внебиржевые рынки: ключевые отличия',
          description:
            'Биржевой и внебиржевой рынки: структура, регулирование, ликвидность и выбор площадки для торговли.',
          image: 'https://arapov.trade/assets/img/content/otcvsexchange.webp',
          author: { '@id': 'https://arapov.trade/ru#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          wordCount: 1350,
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
          name: 'Что такое биржевой рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржевой рынок — это централизованная платформа для торговли стандартизированными финансовыми инструментами под контролем регулирующих органов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое внебиржевой рынок (OTC)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Внебиржевой рынок — децентрализованная система, где сделки заключаются напрямую между участниками без единой торговой площадки.',
          },
        },
        {
          '@type': 'Question',
          name: 'В чём главное отличие биржи от OTC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биржа предлагает централизацию, стандартизацию и регулирование, OTC — гибкость, индивидуальные условия и меньший контроль.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой рынок лучше для новичка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для новичков рекомендуется биржевой рынок благодаря прозрачности, защите инвесторов и высокой ликвидности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие активы торгуются на OTC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На OTC торгуются валюты (Форекс), криптовалюты, деривативы (свопы, форварды) и акции компаний без биржевого листинга.',
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
      name: 'Как выбрать между биржей и OTC',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите цели',
          text: 'Инвестиции требуют биржи, спекуляции возможны на обоих рынках.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените опыт',
          text: 'Новичкам подходит биржа, профессионалам — OTC.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Выберите активы',
          text: 'Акции крупных компаний — биржа, экзотические инструменты — OTC.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Учтите риски',
          text: 'OTC несёт риск контрагента, биржа защищена клирингом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Проверьте ликвидность',
          text: 'Для быстрых сделок нужна высокая ликвидность биржи.',
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
      name: 'Термины: биржевые и внебиржевые рынки',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Биржевой рынок',
          description: 'Централизованная торговая площадка с регулированием',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Внебиржевой рынок',
          description:
            'Децентрализованная система прямых сделок между участниками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OTC',
          description: 'Over-the-Counter — внебиржевой рынок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description: 'Способность быстро купить или продать актив',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Листинг',
          description: 'Включение ценной бумаги в список торгуемых на бирже',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Клиринг',
          description:
            'Гарантия исполнения сделок через центрального контрагента',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Деривативы',
          description: 'Производные финансовые инструменты',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Форекс',
          description: 'Международный валютный рынок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фьючерс',
          description: 'Стандартизированный контракт на поставку актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description: 'Внебиржевой контракт на обмен платежами',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
