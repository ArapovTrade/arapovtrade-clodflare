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
  selector: 'app-home-ru-thirty-one',
  templateUrl: './home-ru-thirty-one.component.html',
  styleUrl: './home-ru-thirty-one.component.scss',
})
export class HomeRuThirtyOneComponent implements OnInit {
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
      'Рыночный ордер: механизм работы и применение в трейдинге | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как работает рыночный ордер. Механизм исполнения, преимущества и риски, проскальзывание, применение в торговых стратегиях.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketorder.webp',
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
          headline: 'Рыночный ордер: механизм работы и применение в трейдинге',
          description:
            'Узнайте, как работает рыночный ордер. Механизм исполнения, преимущества и риски, проскальзывание, применение в торговых стратегиях.',
          image: 'https://arapov.trade/assets/img/content/marketorder.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: { '@id': 'https://arapov.trade/ru#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/marketorder',
          },
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
          name: 'Что такое рыночный ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рыночный ордер — это торговый приказ на немедленную покупку или продажу актива по лучшей доступной цене. Исполняется мгновенно при наличии ликвидности в стакане.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое проскальзывание?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Проскальзывание — это разница между ожидаемой и фактической ценой исполнения ордера. Возникает при недостаточной ликвидности или высокой волатильности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда лучше использовать рыночный ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рыночный ордер оптимален при торговле высоколиквидными активами, когда важна скорость исполнения — скальпинг, торговля на новостях, пробой уровней.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем рыночный ордер отличается от лимитного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рыночный ордер исполняется немедленно по текущей цене, лимитный — только при достижении указанной цены. Рыночный гарантирует исполнение, лимитный — цену.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски у рыночного ордера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные риски: проскальзывание на низколиквидных рынках, исполнение по невыгодной цене при высокой волатильности, повышенные комиссии на некоторых биржах.',
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
      name: 'Как безопасно использовать рыночный ордер',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Проверьте ликвидность',
          text: 'Убедитесь, что в стакане достаточный объём заявок для исполнения вашего ордера без значительного проскальзывания.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените спред',
          text: 'Проверьте разницу между ценой покупки и продажи. Широкий спред увеличивает издержки.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Избегайте высокой волатильности',
          text: 'Не используйте рыночные ордера сразу после новостей или при аномальных движениях цены.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разделяйте крупные ордера',
          text: 'При больших объёмах разбейте ордер на части для минимизации влияния на рынок.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте защитные ордера',
          text: 'Комбинируйте рыночные ордера со стоп-лоссами для ограничения потенциальных убытков.',
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
      name: 'Глоссарий биржевых ордеров',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный ордер',
          description:
            'Торговый приказ на немедленное исполнение по лучшей доступной цене.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между лучшей ценой покупки (bid) и продажи (ask).',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стакан ордеров',
          description: 'Список активных заявок на покупку и продажу актива.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка исполнять крупные ордера без значительного влияния на цену.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-тейкер',
          description:
            'Трейдер, забирающий ликвидность из стакана рыночными ордерами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник, предоставляющий ликвидность через лимитные ордера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лимитный ордер',
          description:
            'Заявка на покупку или продажу по указанной или лучшей цене.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid price',
          description:
            'Лучшая цена, по которой покупатели готовы приобрести актив.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask price',
          description: 'Лучшая цена, по которой продавцы готовы продать актив.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
