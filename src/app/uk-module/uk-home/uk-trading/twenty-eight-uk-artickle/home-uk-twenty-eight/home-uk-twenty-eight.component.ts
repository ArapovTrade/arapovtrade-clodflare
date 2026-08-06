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
  selector: 'app-home-uk-twenty-eight',
  templateUrl: './home-uk-twenty-eight.component.html',
  styleUrl: './home-uk-twenty-eight.component.scss',
})
export class HomeUkTwentyEightComponent implements OnInit {
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
      'Цінові фігури в трейдингу: повний посібник з графічних патернів',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Детальний посібник з цінових фігур технічного аналізу. Вивчіть патерни розвороту та продовження тренду для прибуткової торгівлі.',
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
            'Цінові фігури в трейдингу: повний посібник з графічних патернів',
          description:
            'Детальний посібник з цінових фігур технічного аналізу. Вивчіть патерни розвороту та продовження тренду для прибуткової торгівлі.',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/keypricepattern',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/keypraicepattern.webp',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'цінові фігури',
            'графічні патерни',
            'технічний аналіз',
            'розворотні фігури',
            'фігури продовження',
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
          name: 'Що таке цінові фігури в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цінові фігури — це графічні формації на цінових графіках, що повторюються та відображають психологію учасників ринку. Вони допомагають прогнозувати ймовірний напрямок руху ціни після завершення формування патерну.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які бувають типи цінових фігур?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цінові фігури поділяються на дві основні категорії: фігури розвороту (голова і плечі, подвійна вершина, подвійне дно, клин) та фігури продовження тренду (прапор, вимпел, трикутник). Кожен тип сигналізує про різні ринкові сценарії.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити надійність цінової фігури?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Надійність фігури підвищується при підтвердженні обсягами: пробій на високому обсязі більш достовірний. Також важливо дочекатися повного формування патерну та використовувати додаткові інструменти — індикатори, рівні підтримки та опору.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах працюють цінові фігури?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цінові фігури працюють на всіх таймфреймах — від хвилинних до місячних. Однак фігури на старших таймфреймах (денний, тижневий) вважаються надійнішими та генерують значущіші сигнали.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому цінові фігури іноді не відпрацьовують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Фігури можуть не відпрацьовувати через зовнішні фактори: несподівані новини, маніпуляції великих гравців, низьку ліквідність. Також можлива суб'єктивна помилка в ідентифікації патерну. Тому важливо використовувати стоп-лоси та керувати ризиками.",
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
      name: 'Як торгувати за ціновими фігурами',
      description:
        'Покрокова інструкція з використання графічних патернів для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте поточний тренд',
          text: 'Перед пошуком фігур визначте напрямок основного тренду за допомогою ковзних середніх або трендових ліній. Фігури продовження шукайте в тренді, розворотні — на його завершенні.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ідентифікуйте фігуру, що формується',
          text: 'Спостерігайте за графіком та виявляйте характерні обриси патернів: симетричні піки для голови і плечей, паралельні лінії для прапора, діапазон, що звужується, для трикутника.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся завершення формування',
          text: 'Не входьте в ринок передчасно. Дочекайтеся повного формування фігури та пробою ключового рівня — лінії шиї, межі каналу або сторони трикутника.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть сигнал обсягом',
          text: 'Перевірте, чи супроводжується пробій зростанням обсягу торгів. Високий обсяг підтверджує істинність пробою та підвищує ймовірність відпрацювання фігури.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп-лосс та тейк-профіт',
          text: 'Розмістіть стоп-лосс за протилежною межею фігури. Ціль по прибутку розрахуйте на основі висоти патерну, відкладеної від точки пробою.',
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
      name: 'Терміни графічних патернів',
      description:
        "Глосарій ключових термінів, пов'язаних із ціновими фігурами",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Цінова фігура',
          description:
            'Графічна формація на ціновому графіку, що повторюється та дозволяє прогнозувати рух ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фігура розвороту',
          description:
            'Патерн, що сигналізує про ймовірну зміну напрямку поточного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фігура продовження',
          description:
            'Патерн, що вказує на тимчасову паузу перед продовженням поточного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Голова і плечі',
          description:
            'Розворотна фігура з трьох піків, де центральний вище бокових',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прапор',
          description:
            'Фігура продовження у вигляді похилого каналу після імпульсного руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вимпел',
          description:
            'Фігура продовження у вигляді трикутника, що звужується, після імпульсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трикутник',
          description:
            'Патерн консолідації з ціновим діапазоном, що звужується',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Подвійна вершина',
          description:
            'Розворотна фігура з двох послідовних піків на одному рівні',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія шиї',
          description:
            "Горизонтальний рівень, що з'єднує мінімуми між піками у фігурі голова і плечі",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій',
          description:
            'Вихід ціни за межу фігури, що підтверджує активацію патерну',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
