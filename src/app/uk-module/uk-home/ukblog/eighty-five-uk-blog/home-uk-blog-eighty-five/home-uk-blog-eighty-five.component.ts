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
  selector: 'app-home-uk-blog-eighty-five',
  templateUrl: './home-uk-blog-eighty-five.component.html',
  styleUrl: './home-uk-blog-eighty-five.component.scss',
})
export class HomeUkBlogEightyFiveComponent {
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
      'Подвійна вершина і Подвійне дно у трейдингу | Розворотні патерни',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з торгівлі патернами Подвійна вершина і Подвійне дно. Дізнайтеся, як розпізнавати розворотні фігури, визначати точки входу та управляти ризиками.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-22' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/doubletopandbottom.png',
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
            'Подвійна вершина і Подвійне дно — розворотні патерни у трейдингу',
          description:
            'Повний посібник з торгівлі патернами Подвійна вершина і Подвійне дно. Дізнайтеся, як розпізнавати розворотні фігури, визначати точки входу та управляти ризиками.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
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
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/reasonfordepositeloose.png',
            width: 1200,
            height: 630,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/doubletopandbottom',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'подвійна вершина',
            'подвійне дно',
            'розворотні патерни',
            'лінія шиї',
            'технічний аналіз',
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
          name: 'Що таке патерн Подвійна вершина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Подвійна вершина — це розворотний патерн, що формується після висхідного тренду. Він складається з двох послідовних максимумів приблизно на одному рівні з проміжним відкатом. Пробій лінії шиї вниз підтверджує розворот та сигналізує про початок низхідного руху.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке патерн Подвійне дно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Подвійне дно — це розворотний патерн, що з'являється після низхідного тренду. Він складається з двох послідовних мінімумів приблизно на одному рівні з проміжним відскоком вгору. Пробій лінії шиї вгору підтверджує розворот та сигналізує про початок висхідного руху.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити лінію шиї в цих патернах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лінія шиї проводиться через локальний мінімум між двома вершинами (для подвійної вершини) або через локальний максимум між двома мінімумами (для подвійного дна). Пробій цієї лінії є ключовим сигналом для входу в угоду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати ціль руху після пробою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімальна ціль розраховується шляхом проекції висоти патерну від точки пробою лінії шиї. Висота патерну — це відстань від вершини (або дна) до лінії шиї. Додаткові цілі визначаються за рівнями підтримки та опору.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори допомагають підтвердити патерн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для підтвердження використовуються обсяги (зростання при пробої лінії шиї), RSI (дивергенція на другому екстремумі), MACD (перетин ліній у напрямку розвороту). Свічкові патерни на другому екстремумі також посилюють сигнал.',
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
      name: 'Як торгувати патерни Подвійна вершина і Подвійне дно',
      description: 'Покрокова інструкція з торгівлі розворотними патернами',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікація тренду',
          text: 'Переконайтеся, що перед формуванням патерну присутній виражений тренд — висхідний для подвійної вершини або низхідний для подвійного дна.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розпізнавання формації',
          text: 'Визначте два послідовних екстремуми приблизно на одному рівні з проміжним відкатом. Проведіть лінію шиї через точку між екстремумами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Очікування пробою',
          text: 'Дочекайтеся впевненого пробою лінії шиї із закриттям свічки за її межами. Переконайтеся у зростанні обсягів при пробої.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердження сигналу',
          text: 'Використовуйте додаткові індикатори: дивергенцію RSI, сигнали MACD, свічкові патерни. Можливий вхід на ретесті лінії шиї після пробою.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управління позицією',
          text: 'Встановіть стоп-лосс за другим екстремумом патерну. Розрахуйте ціль як проекцію висоти фігури від точки пробою.',
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
      name: 'Термінологія патернів Подвійна вершина і Подвійне дно',
      description: 'Основні терміни торгівлі розворотними патернами',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Подвійна вершина',
          description:
            'Розворотний патерн з двома послідовними максимумами на одному рівні, що сигналізує про закінчення висхідного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Подвійне дно',
          description:
            'Розворотний патерн з двома послідовними мінімумами на одному рівні, що сигналізує про закінчення низхідного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія шиї',
          description:
            'Горизонтальний рівень, проведений через точку між двома екстремумами патерну, пробій якого підтверджує розворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розворотний патерн',
          description:
            'Графічна модель, що сигналізує про ймовірне закінчення поточного тренду та початок протилежного руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест лінії шиї',
          description:
            'Повернення ціни до пробитої лінії шиї для її тестування перед продовженням руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розходження між рухом ціни та показаннями індикатора, що часто передвіщає розворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проекція висоти',
          description:
            'Метод розрахунку цільового рівня шляхом відкладання висоти патерну від точки пробою',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за лінію шиї з подальшим поверненням, що не підтверджує розворот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Симетрія екстремумів',
          description:
            'Відповідність рівнів двох вершин або двох мінімумів патерну, що підвищує його надійність',
        },
        {
          '@type': 'DefinedTerm',
          name: "Об'ємне підтвердження",
          description:
            'Збільшення торгових обсягів при пробої лінії шиї, що підтверджує істинність розвороту',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
