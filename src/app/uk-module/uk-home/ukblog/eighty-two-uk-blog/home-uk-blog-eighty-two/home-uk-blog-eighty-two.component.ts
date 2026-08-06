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
  selector: 'app-home-uk-blog-eighty-two',
  templateUrl: './home-uk-blog-eighty-two.component.html',
  styleUrl: './home-uk-blog-eighty-two.component.scss',
})
export class HomeUkBlogEightyTwoComponent {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Патерни Прапор і Вимпел у трейдингу | Фігури продовження тренду'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з торгівлі патернами Прапор і Вимпел. Дізнайтеся, як розпізнавати фігури продовження тренду, визначати точки входу та виставляти стоп-лосс і тейк-профіт.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/flagandpennant.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Прапор і вимпел: Як правильно торгувати після імпульсу?',
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          headline: 'Патерни Прапор і Вимпел у трейдингу — повний посібник',
          description:
            'Повний посібник з торгівлі патернами Прапор і Вимпел. Дізнайтеся, як розпізнавати фігури продовження тренду, визначати точки входу та виставляти стоп-лосс і тейк-профіт.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          image: [
            'https://arapov.trade/assets/img/content/flagandpennant.webp',
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/flagandpennant',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'патерн прапор',
            'патерн вимпел',
            'фігури продовження',
            'технічний аналіз',
            'пробій',
          ],
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
          name: 'Що таке патерни Прапор і Вимпел?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Прапор і Вимпел — це класичні фігури продовження тренду, що формуються після сильного імпульсного руху. Прапор має вигляд похилого прямокутного каналу, а Вимпел — симетричного трикутника, що звужується. Обидві моделі сигналізують про паузу в тренді перед його продовженням.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити Прапор від Вимпела на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Прапор формує паралельний канал з нахилом проти основного тренду, тоді як Вимпел утворює симетричний трикутник зі збіжними лініями. Прапор зазвичай має тривалішу фазу консолідації, а Вимпел характеризується швидким звуженням цінового діапазону.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити справжній пробій патерну?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Справжній пробій підтверджується збільшенням торгових обсягів, закриттям свічки за межами фігури та відсутністю швидкого повернення ціни в патерн. Додаткове підтвердження дають індикатори RSI, MACD та ковзні середні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати ціль по прибутку для патернів Прапор і Вимпел?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цільовий рівень розраховується методом древка: висота імпульсного руху перед формуванням патерну відкладається від точки пробою у напрямку тренду. Додаткові цілі визначаються за рівнями Фібоначчі 161.8% та 261.8%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де розміщувати стоп-лосс при торгівлі Прапором і Вимпелом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При бичачих патернах стоп-лосс розміщується нижче нижньої межі фігури або під останнім локальним мінімумом. При ведмежих — вище верхньої межі або останнього максимуму. Рекомендується враховувати волатильність за допомогою індикатора ATR.',
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
      name: 'Як торгувати патерни Прапор і Вимпел',
      description:
        'Покрокова інструкція з торгівлі фігурами продовження тренду',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікація імпульсу',
          text: 'Знайдіть сильний спрямований рух ціни (древко), що передує формуванню патерну. Цей рух визначає контекст тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розпізнавання фігури',
          text: 'Визначте тип патерну: Прапор формує похилий канал проти тренду, Вимпел — симетричний трикутник, що звужується. Зверніть увагу на зниження обсягів у фазі консолідації.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Очікування пробою',
          text: 'Дочекайтеся виходу ціни за межі патерну у напрямку основного тренду. Переконайтеся, що пробій супроводжується зростанням обсягів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердження сигналу',
          text: 'Перевірте закриття свічки за межами фігури. Використовуйте індикатори RSI, MACD для додаткового підтвердження напрямку руху.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вхід та управління позицією',
          text: 'Увійдіть в угоду після підтвердження пробою. Встановіть стоп-лосс за межею патерну та тейк-профіт на рівні, що дорівнює висоті древка від точки пробою.',
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
      name: 'Термінологія патернів Прапор і Вимпел',
      description: 'Основні терміни торгівлі фігурами продовження тренду',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Патерн Прапор',
          description:
            'Фігура продовження тренду у вигляді похилого прямокутного каналу після імпульсного руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Патерн Вимпел',
          description:
            'Фігура продовження тренду у вигляді симетричного трикутника, що звужується, після імпульсного руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Древко',
          description:
            'Імпульсний рух ціни, що передує формуванню патерну Прапор або Вимпел',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза консолідації',
          description:
            'Період тимчасової паузи в русі ціни, під час якого формується тіло патерну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій патерну',
          description: 'Вихід ціни за межі фігури у напрямку основного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за межі патерну з подальшим поверненням всередину фігури',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Метод древка',
          description:
            'Спосіб розрахунку цільового рівня прибутку шляхом проекції висоти імпульсного руху від точки пробою',
        },
        {
          '@type': 'DefinedTerm',
          name: "Об'ємне підтвердження",
          description:
            'Збільшення торгових обсягів при пробої, що підтверджує істинність руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фігура продовження',
          description:
            'Графічний патерн, що сигналізує про паузу в тренді з подальшим продовженням руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — індикатор середнього істинного діапазону для оцінки волатильності',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
