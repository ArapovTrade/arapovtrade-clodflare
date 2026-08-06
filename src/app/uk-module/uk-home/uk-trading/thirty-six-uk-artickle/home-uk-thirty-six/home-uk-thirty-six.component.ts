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
  selector: 'app-home-uk-thirty-six',
  templateUrl: './home-uk-thirty-six.component.html',
  styleUrl: './home-uk-thirty-six.component.scss',
})
export class HomeUkThirtySixComponent implements OnInit {
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
      'Хибні пробої рівнів: тактика великого капіталу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Хибні пробої рівнів у трейдингу: як великий капітал маніпулює ринком, методи розпізнавання та стратегії торгівлі проти маніпуляцій Smart Money',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-05' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/falsebreakouts.webp',
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
          headline: 'Хибні пробої рівнів: тактика великого капіталу',
          description:
            'Повний посібник з хибних пробоїв: як великий капітал маніпулює ринком, методи ідентифікації маніпуляцій та практичні стратегії торгівлі',
          image: 'https://arapov.trade/assets/img/content/falsebreakouts1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/falsebreakouts',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'хибний пробій',
            'fake breakout',
            'Smart Money',
            'маніпуляції ринку',
            'збір ліквідності',
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
          name: 'Що таке хибний пробій у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Хибний пробій — це тимчасовий вихід ціни за значущий рівень підтримки або опору з подальшим швидким поверненням у вихідний діапазон. Такий рух створює ілюзію початку нового тренду, провокуючи трейдерів на вхід у збиткові позиції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому Smart Money створюють хибні пробої?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Інституційні гравці використовують хибні пробої для збору ліквідності (стоп-ордерів роздрібних трейдерів), створення емоційного тиску на ринок та отримання вигідних цін для входу у великі позиції перед основним рухом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити хибний пробій від справжнього?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові ознаки хибного пробою: відсутність зростання обсягів при пробої, швидке повернення ціни в діапазон протягом 5-10 свічок, формування розворотних свічкових патернів, дивергенції на індикаторах та відсутність закріплення за рівнем.',
          },
        },
        {
          '@type': 'Question',
          name: 'В яких ринкових умовах частіше відбуваються хибні пробої?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Хибні пробої найбільш імовірні перед публікацією важливих новин, під час сесійних переходів між торговими майданчиками, у періоди тривалої консолідації, а також під час свят та експірації деривативів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати проти хибних пробоїв?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні стратегії: очікування підтвердження пробою та ретесту рівня, вхід у протилежному напрямку після ідентифікації маніпуляції, аналіз обсягів та свічкових патернів для підтвердження, використання коротких стоп-наказів за екстремумом хибного руху.',
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
      name: 'Як ідентифікувати та торгувати хибні пробої',
      description:
        'Покрокове керівництво з розпізнавання маніпуляцій великого капіталу та використання хибних пробоїв у торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте ключові рівні',
          text: 'Позначте на графіку значущі рівні підтримки та опору, де концентруються стоп-ордери більшості трейдерів. Це потенційні зони для маніпуляцій Smart Money.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Аналізуйте обсяги при пробої',
          text: "Спостерігайте за обсягами торгів у момент пробою рівня. Справжній пробій супроводжується значним зростанням обсягів. Відсутність об'ємного підтвердження вказує на потенційну маніпуляцію.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся реакції ціни',
          text: 'Не входьте в ринок одразу після пробою. Дочекайтеся закриття свічки за рівнем та поспостерігайте за поведінкою ціни. Швидке повернення в діапазон сигналізує про хибний пробій.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Використовуйте підтверджуючі сигнали',
          text: 'Шукайте розворотні свічкові патерни (пін-бари, поглинання), дивергенції на індикаторах RSI або MACD, а також ознаки відторгнення ціною нової зони у вигляді довгих тіней свічок.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Увійдіть у позицію з контролем ризику',
          text: 'Після підтвердження хибного пробою відкрийте позицію в напрямку повернення ціни. Розмістіть стоп-наказ за екстремумом хибного руху та використовуйте часткову фіксацію прибутку.',
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
      name: 'Глосарій термінів з хибних пробоїв',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Тимчасовий вихід ціни за значущий рівень підтримки або опору з подальшим швидким поверненням у вихідний діапазон',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Інституційні гравці та великий капітал, здатний впливати на рух ціни та використовувати маніпуляції для отримання вигідних позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Сукупність стоп-ордерів та відкладених заявок учасників ринку, яку великий капітал використовує для входу та виходу з позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Збір ліквідності',
          description:
            'Процес вибивання стоп-ордерів роздрібних трейдерів великим капіталом для накопичення обсягу перед напрямленим рухом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-хантинг',
          description:
            'Цілеспрямований рух ціни до зон концентрації захисних наказів для їх спрацювання та подальшого розвороту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест рівня',
          description:
            'Повернення ціни до пробитого рівня для перевірки його трансформації з опору в підтримку або навпаки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульсний пробій',
          description:
            'Різкий вихід ціни за рівень з миттєвим поверненням, характерний для маніпуляцій під час новин',
        },
        {
          '@type': 'DefinedTerm',
          name: "Об'ємний аналіз",
          description:
            'Метод оцінки справжності цінових рухів через аналіз торгових обсягів та їх розподілу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розбіжність між напрямком руху ціни та показниками технічних індикаторів, що вказує на ослаблення імпульсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона консолідації',
          description:
            'Горизонтальний діапазон руху ціни, де відбувається накопичення або розподіл позицій великими гравцями',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
