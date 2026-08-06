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
  selector: 'app-home-uk-twenty-five',
  templateUrl: './home-uk-twenty-five.component.html',
  styleUrl: './home-uk-twenty-five.component.scss',
})
export class HomeUkTwentyFiveComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Економічні показники зростання: що впливає на фінансові ринки',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з ключових економічних показників. Вивчіть ВВП, PMI, процентні ставки та їхній вплив на валютні курси та інвестиції.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/keyeconomicgrowth.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
            'Економічні показники зростання: що впливає на фінансові ринки',
          description:
            'Повний посібник з ключових економічних показників. Вивчіть ВВП, PMI, процентні ставки та їхній вплив на валютні курси та інвестиції.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/keyeconomicgrowth1.png',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/keyeconomicgrowth',
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Що таке ВВП і чому він важливий?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ВВП (валовий внутрішній продукт) вимірює загальний обсяг товарів і послуг, вироблених у країні за період. Зростання ВВП вказує на здорову економіку, зміцнює національну валюту та приваблює інвесторів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як індекс PMI впливає на ринки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PMI вище 50 сигналізує про зростання ділової активності, що зміцнює валюту країни. PMI нижче 50 вказує на скорочення активності та може викликати послаблення валюти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому рішення центральних банків важливі для трейдерів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Центральні банки встановлюють процентні ставки. Підвищення ставок приваблює капітал і зміцнює валюту, зниження — стимулює економіку, але послаблює валюту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що показує індекс споживчих цін (CPI)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CPI вимірює рівень інфляції — зростання цін на товари та послуги. Висока інфляція може призвести до підвищення ставок центробанком та впливає на валютні курси.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як використовувати економічний календар?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Економічний календар показує дати публікації важливих показників. Трейдери використовують його для планування угод та управління ризиками в періоди волатильності.',
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
      name: 'Як аналізувати економічні показники',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть економічний календар',
          text: 'Визначте дати публікації ключових показників: ВВП, інфляція, зайнятість, рішення центробанків.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Порівняйте прогноз із фактом',
          text: 'Аналізуйте різницю між прогнозними та фактичними значеннями. Перевищення прогнозу зазвичай позитивне для валюти.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцініть тренд показника',
          text: 'Дивіться на динаміку: зростає показник чи падає протягом кількох періодів. Тренд важливіший за окреме значення.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Враховуйте взаємозв'язки",
          text: 'Аналізуйте показники в комплексі. Наприклад, зростання ВВП при низькій інфляції — позитивний сценарій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Слідкуйте за реакцією ринку',
          text: 'Спостерігайте, як ринок реагує на публікації. Іноді хороші дані викликають падіння, якщо очікування були ще вищими.',
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
      name: 'Терміни макроекономіки',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовий внутрішній продукт — загальна вартість товарів і послуг, вироблених у країні',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PMI',
          description:
            'Індекс ділової активності, що відображає стан виробничого та сервісного секторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інфляція',
          description:
            'Зростання загального рівня цін, що знижує купівельну спроможність валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CPI',
          description:
            'Індекс споживчих цін, що вимірює зміну вартості кошика товарів і послуг',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентна ставка',
          description:
            'Ставка центрального банку, що визначає вартість запозичень в економіці',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Центральний банк',
          description: 'Регулятор грошово-кредитної політики країни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Економічний календар',
          description: 'Розклад публікації важливих економічних показників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — звіт про зайнятість у несільськогосподарському секторі США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рецесія',
          description:
            'Економічний спад, що характеризується зниженням ВВП два квартали поспіль',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Випереджальні індикатори',
          description:
            'Показники, що прогнозують майбутні зміни економічної активності',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
