import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-home-uk-blog-eighty-four',
  templateUrl: './home-uk-blog-eighty-four.component.html',
  styleUrl: './home-uk-blog-eighty-four.component.scss',
})
export class HomeUkBlogEightyFourComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private meta: Meta,
    private titleService: Title,
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
      'Патерн Поглинання: як визначити розворот тренду',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник зі свічкового патерну Поглинання. Вивчіть бичаче та ведмеже поглинання для визначення розвороту тренду та точок входу в ринок.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/engulfing.webp',
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
          headline: 'Патерн Поглинання: як визначити розворот тренду',
          description:
            'Повний посібник зі свічкового патерну Поглинання. Вивчіть бичаче та ведмеже поглинання для визначення розвороту тренду та точок входу в ринок.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/engulfing.webp',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/engulfing',
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
          name: 'Що таке патерн Поглинання?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Патерн Поглинання — це розворотна свічкова модель, де друга свічка повністю перекриває тіло попередньої. Бичаче поглинання сигналізує про розворот угору після низхідного тренду, ведмеже — про розворот униз після висхідного.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити справжнє поглинання від хибного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Справжнє поглинання формується на ключових рівнях підтримки або опору та супроводжується зростанням обсягу торгів. Розмір другої свічки значно перевищує першу, а додаткові індикатори (RSI, MACD) підтверджують розворот.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах працює патерн Поглинання?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Патерн працює на всіх таймфреймах, але найнадійніші сигнали з'являються на H1, H4, D1 та вище. На молодших таймфреймах (M1, M5) більше ринкового шуму та хибних сигналів.",
          },
        },
        {
          '@type': 'Question',
          name: 'Де встановлювати стоп-лосс при торгівлі за поглинанням?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для бичачого поглинання стоп-лосс розміщується нижче мінімуму другої свічки. Для ведмежого поглинання — вище максимуму другої свічки. Рекомендується використовувати ATR для розрахунку безпечної відстані.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори підтверджують патерн Поглинання?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI показує вихід із зон перекупленості або перепроданості, MACD — дивергенцію або перетин нульової лінії, обсяги — сплеск активності на другій свічці.',
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
      name: 'Як торгувати за патерном Поглинання',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тренд',
          text: 'Ідентифікуйте поточний тренд на ринку. Бичаче поглинання шукайте в кінці низхідного тренду, ведмеже — в кінці висхідного.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть ключовий рівень',
          text: 'Визначте найближчі рівні підтримки та опору. Патерн, сформований на ключовому рівні, має більшу надійність.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся формування патерну',
          text: 'Переконайтеся, що друга свічка повністю поглинає тіло першої. Не входьте до закриття другої свічки.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть сигнал',
          text: 'Перевірте обсяг торгів — він має зрости на другій свічці. Використовуйте RSI або MACD для додаткового підтвердження.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп-лосс та тейк-профіт',
          text: 'Розмістіть стоп-лосс за екстремумом другої свічки. Розрахуйте тейк-профіт зі співвідношенням ризику до прибутку мінімум 1:2.',
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
      name: 'Терміни свічкового аналізу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Патерн Поглинання',
          description:
            'Розворотна свічкова модель, де друга свічка повністю перекриває тіло попередньої',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бичаче поглинання',
          description:
            'Патерн розвороту вгору, що формується після низхідного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмеже поглинання',
          description:
            'Патерн розвороту вниз, що формується після висхідного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тіло свічки',
          description: 'Відстань між ціною відкриття та закриття періоду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розворотний патерн',
          description:
            'Графічна модель, що сигналізує про зміну напрямку тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Підтвердження обсягом',
          description:
            'Зростання торгової активності, що посилює достовірність сигналу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний сигнал',
          description: 'Патерн, що не призводить до очікуваного руху ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свічковий аналіз',
          description: 'Метод технічного аналізу на основі японських свічок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Індикатор середнього істинного діапазону для оцінки волатильності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward',
          description:
            'Співвідношення потенційного ризику до очікуваного прибутку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
