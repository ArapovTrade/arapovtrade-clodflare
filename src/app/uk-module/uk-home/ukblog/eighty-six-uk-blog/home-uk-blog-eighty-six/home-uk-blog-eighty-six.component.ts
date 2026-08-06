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
  selector: 'app-home-uk-blog-eighty-six',
  templateUrl: './home-uk-blog-eighty-six.component.html',
  styleUrl: './home-uk-blog-eighty-six.component.scss',
})
export class HomeUkBlogEightySixComponent {
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
      'Патерн 123 у трейдингу: повний посібник | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як торгувати патерн 123. Формування точок 1-2-3, сигнали входу, стоп-лосс, тейк-профіт та поширені помилки трейдерів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-23' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/pattern-1-2-3.png',
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
          headline: 'Патерн 123 у трейдингу: повний посібник з торгівлі',
          description:
            'Детальний посібник з патерну 123. Формування моделі, точки входу та виходу, встановлення стоп-лосса та тейк-профіту, типові помилки трейдерів.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-11T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/pattern-1-2-3',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/pattern-1-2-3.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords: 'патерн 123, фігура 123, розворот тренду, пробій рівня',
          inLanguage: 'uk',
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
          name: 'Що таке патерн 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Патерн 123 — універсальна модель технічного аналізу, що складається з трьох послідовних точок: локальний екстремум (точка 1), рівень корекції (точка 2) та зона потенційного розвороту (точка 3). Пробій рівня точки 2 слугує головним торговим сигналом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли відкривати угоду за патерном 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальний вхід — після підтвердженого пробою рівня точки 2 зі збільшенням обсягів. Консервативний підхід передбачає очікування закриття свічки за рівнем, агресивний — вхід при торканні рівня. Найкраща можливість — ретест точки 2 після пробою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де встановлювати стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс встановлюється за точкою 3: нижче точки 3 для покупок, вище точки 3 для продажів. Також можна використовувати індикатор ATR для розрахунку адаптивного стопа з урахуванням волатильності або динамічний трейлінг-стоп.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати ціль по прибутку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тейк-профіт визначається декількома способами: найближчий рівень підтримки/опору, проекція висоти патерну (відстань від точки 1 до точки 2 відкладається від точки пробою), або часткове закриття з трейлінг-стопом.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах працює патерн 123?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Патерн 123 працює на будь-яких таймфреймах від M1 до D1 і вище. Найнадійніші сигнали з'являються на старших часових інтервалах (H1, H4, D1). На молодших таймфреймах патерн підходить для скальпінгу, на старших — для середньострокової торгівлі.",
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
      name: 'Як торгувати патерн 123',
      description:
        'Покроковий посібник з торгівлі розворотним патерном 123 на фінансових ринках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікуйте точку 1',
          text: 'Знайдіть локальний екстремум після трендового руху: максимум при низхідному тренді або мінімум при висхідному. Це перша точка патерну, що позначає потенційне завершення поточного імпульсу.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте точку 2',
          text: 'Після точки 1 ціна здійснює корекцію, формуючи точку 2 — важливий рівень підтримки або опору. Цей рівень стане ключовим для визначення моменту входу в угоду.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся формування точки 3',
          text: 'Ціна робить ще один рух, але не оновлює екстремум точки 1. Точка 3 формується між точками 1 та 2. Наявність розворотних свічкових патернів на точці 3 посилює сигнал.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Увійдіть в угоду при пробої точки 2',
          text: 'Відкрийте позицію після закриття свічки за рівнем точки 2 з підтвердженням збільшенням обсягів. Для зниження ризику дочекайтеся ретесту пробитого рівня.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп-лосс та тейк-профіт',
          text: 'Розмістіть стоп-лосс за точкою 3. Визначте тейк-профіт на найближчому рівні або використовуючи проекцію висоти патерну. Розгляньте часткове закриття позиції з трейлінг-стопом.',
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
      name: 'Глосарій термінів патерну 123',
      description:
        "Основні терміни та визначення, пов'язані з розворотним патерном 123",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Патерн 123',
          description:
            'Універсальна модель технічного аналізу з трьох точок, що сигналізує про розворот або продовження тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка 1',
          description:
            'Локальний екстремум ціни — максимум при низхідному тренді або мінімум при висхідному, що позначає початок патерну.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка 2',
          description:
            'Рівень корекції після точки 1, що формує ключовий рівень підтримки або опору. Пробій цього рівня — головний торговий сигнал.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Точка 3',
          description:
            'Зона потенційного розвороту, що не оновлює екстремум точки 1, підтверджуючи послаблення поточного тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій рівня',
          description:
            'Момент, коли ціна долає рівень точки 2, підтверджуючи зміну тренду та даючи сигнал на відкриття позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до пробитого рівня точки 2 для тестування його в новій якості — підтримки або опору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Ситуація, коли ціна пробиває рівень точки 2, але потім повертається назад, не підтверджуючи розворот.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консервативний вхід',
          description:
            'Метод входу в угоду після закриття свічки за рівнем точки 2 з підтвердженням обсягами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Агресивний вхід',
          description:
            'Метод входу в угоду при торканні рівня точки 2 без очікування підтвердження закриттям свічки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-лосс, що переміщується слідом за рухом ціни, захищаючи накопичений прибуток.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
