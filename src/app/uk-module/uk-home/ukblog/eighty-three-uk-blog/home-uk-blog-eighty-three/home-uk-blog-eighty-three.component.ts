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
  selector: 'app-home-uk-blog-eighty-three',
  templateUrl: './home-uk-blog-eighty-three.component.html',
  styleUrl: './home-uk-blog-eighty-three.component.scss',
})
export class HomeUkBlogEightyThreeComponent {
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

    this.titleService.setTitle('Чашка з ручкою: торгуємо пробої');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Патерн Чашка з ручкою: повне керівництво з торгівлі. Як розпізнати фігуру, точки входу, стоп-лос, цільові рівні та типові помилки трейдерів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-21' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cupandhandle.png',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Патерн Чашка з ручкою в трейдингу | Arapov.trade',
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
          headline: 'Патерн Чашка з ручкою в трейдингу',
          description:
            'Повне керівництво з торгівлі патерну Чашка з ручкою: розпізнавання, точки входу, управління ризиками',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2024-06-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cupandhandle',
          },
          image: 'https://arapov.trade/assets/img/content/cupandhandle.png',
          articleSection: 'Навчання трейдингу',
          keywords:
            'чашка з ручкою, патерн, технічний аналіз, фігура продовження, трейдинг, пробій',
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
          name: 'Що являє собою патерн Чашка з ручкою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чашка з ручкою — це фігура продовження висхідного тренду, що складається з двох елементів: закругленої основи (чашки), яка утворюється після корекції, та невеликої консолідації (ручки) перед пробоєм угору. Патерн сигналізує про накопичення позицій великими гравцями.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах краще торгувати цю фігуру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найнадійніші сигнали формуються на таймфреймах H1 та вище. На молодших інтервалах (M5-M15) патерн частіше дає хибні пробої через ринковий шум. Денні та тижневі графіки показують найвищу точність відпрацювання.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити цільовий рівень прибутку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімальна ціль розраховується шляхом вимірювання глибини чашки від дна до рівня опору. Ця величина відкладається вгору від точки пробою. Додатково враховуються найближчі рівні опору на старших таймфреймах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де розміщувати стоп-лос при торгівлі цього патерну?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Консервативний стоп-лос встановлюється нижче мінімуму ручки. При підвищеній волатильності або слабкості тренду стоп розміщується нижче дна чашки. Важливо враховувати середній діапазон волатильності активу (ATR).',
          },
        },
        {
          '@type': 'Question',
          name: 'Які помилки найчастіше допускають трейдери?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні помилки: передчасний вхід до підтвердженого пробою, ігнорування обсягів, торгівля фігур з неправильною формою (V-подібне дно замість закругленого), встановлення занадто вузького стоп-лосу та відсутність ризик-менеджменту.',
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
      name: 'Як торгувати патерн Чашка з ручкою',
      description: 'Покрокове керівництво з торгівлі фігури продовження тренду',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Ідентифікуйте патерн',
          text: 'Знайдіть на графіку закруглену основу після висхідного руху. Переконайтеся, що форма чашки плавна, без різких V-подібних рухів.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дочекайтеся формування ручки',
          text: 'Після відновлення ціни до рівня попереднього максимуму має сформуватися невелика консолідація у вигляді низхідного каналу або прапора.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Підтвердіть пробій',
          text: 'Дочекайтеся закриття свічки вище рівня опору. Переконайтеся, що пробій супроводжується зростанням торгових обсягів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Встановіть стоп-лос',
          text: 'Розмістіть захисний ордер нижче мінімуму ручки або нижче дна чашки залежно від волатильності активу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Визначте цілі та керуйте позицією',
          text: 'Розрахуйте мінімальну ціль за глибиною чашки. Розгляньте часткову фіксацію прибутку на проміжних рівнях.',
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
      name: 'Глосарій патерну Чашка з ручкою',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Чашка',
          description:
            'Закруглена основа патерну, що формується в результаті плавної корекції та подальшого відновлення ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ручка',
          description:
            'Зона консолідації після формування чашки, що являє собою невеликий низхідний канал перед пробоєм',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Патерн продовження',
          description:
            'Графічна модель, що сигналізує про ймовірне продовження поточного тренду після періоду консолідації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій',
          description:
            'Вихід ціни за межі ключового рівня опору із закріпленням вище нього',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за рівень з подальшим поверненням назад',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Обсяг торгів',
          description:
            'Кількість здійснених угод за період, що використовується для підтвердження сили цінового руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Глибина чашки',
          description:
            'Відстань від краю чашки до її дна, що використовується для розрахунку цільового рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до пробитого рівня для його тестування як підтримки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Індикатор середнього істинного діапазону, що показує волатильність активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-лос, що автоматично слідує за ціною для захисту накопиченого прибутку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
