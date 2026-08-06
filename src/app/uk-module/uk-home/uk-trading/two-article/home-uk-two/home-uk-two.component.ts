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
import { Title, Meta } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-uk-two',
  templateUrl: './home-uk-two.component.html',
  styleUrl: './home-uk-two.component.scss',
})
export class HomeUkTwoComponent implements OnInit {
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
      'Словник термінів фінансового ринку: повний довідник для трейдерів | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Детальний словник термінів фінансового ринку для початківців. Основи фондового та валютного ринку, технічний та фундаментальний аналіз, торгові стратегії.',
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
            'Словник термінів фінансового ринку: повний довідник для трейдерів',
          description:
            'Детальний словник термінів фінансового ринку для початківців. Основи фондового та валютного ринку, технічний та фундаментальний аналіз, торгові стратегії.',
          image: 'https://arapov.trade/assets/img/content/osnovirinka1.webp',
          datePublished: '2026-03-15T00:00:00Z',
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
            '@id': 'https://arapov.trade/uk/freestudying/marketbasics',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1520,
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
          name: 'Що таке фінансовий ринок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фінансовий ринок — це глобальна система, де учасники обмінюють капітал через різноманітні інструменти: акції, облігації, валюти, криптовалюти та деривативи. Щоденний обсяг транзакцій сягає трильйонів доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється фондовий ринок від Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фондовий ринок призначений для торгівлі цінними паперами (акціями, облігаціями, ETF) на регульованих біржах. Форекс — децентралізований валютний ринок із цілодобовою торгівлею валютними парами та щоденним оборотом понад 6 трильйонів доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке кредитне плече в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кредитне плече дозволяє керувати сумою, що перевищує депозит трейдера. Наприклад, плече 1:100 означає контроль над 100000 доларами при депозиті в 1000. Плече збільшує як потенційний прибуток, так і можливі збитки.',
          },
        },
        {
          '@type': 'Question',
          name: 'У чому різниця між технічним та фундаментальним аналізом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технічний аналіз вивчає історичні дані про ціну та обсяг для прогнозування рухів. Фундаментальний аналіз оцінює справедливу вартість активу на основі економічних показників, фінансової звітності та макроекономічних факторів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яку стратегію обрати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендується свінг-трейдинг або позиційна торгівля. Ці стратегії вимагають менше часу біля екрану, дозволяють приймати зважені рішення та знижують вплив емоцій. Дейтрейдинг та скальпінг вимагають досвіду та високої психологічної стійкості.',
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
      name: 'Як почати вивчення фінансових ринків',
      description:
        'Покрокове керівництво для початківців з освоєння термінології та основ фінансових ринків',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть базову термінологію',
          text: 'Опануйте ключові терміни фондового та валютного ринку: акції, облігації, валютні пари, спред, лот, кредитне плече. Розуміння термінології — фундамент для подальшого навчання.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть сегмент ринку',
          text: 'Визначтесь із напрямком: фондовий ринок, Форекс, криптовалюти чи товарний ринок. Кожен сегмент має свої особливості, ризики та можливості.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Освойте методи аналізу',
          text: 'Вивчіть основи технічного аналізу (графіки, індикатори, патерни) та фундаментального аналізу (економічні показники, корпоративна звітність). Комбінація методів дає кращі результати.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Відкрийте демо-рахунок у брокера та відпрацьовуйте навички без ризику реальних коштів. Ведіть торговий журнал, аналізуйте угоди та вдосконалюйте підхід.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Розробіть систему управління ризиками',
          text: 'Створіть правила управління капіталом: обмежте ризик на угоду (1-2% депозиту), використовуйте стоп-лоси, диверсифікуйте портфель. Дисципліна — ключ до довгострокового успіху.',
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
      name: 'Словник термінів фінансового ринку',
      description: 'Основні терміни та поняття для трейдерів та інвесторів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Акція',
          description:
            'Цінний папір, що представляє частку власності в компанії та надає право на частину прибутку через дивіденди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Облігація',
          description:
            "Борговий інструмент, за яким емітент зобов'язується виплатити тримачу номінальну вартість плюс відсотковий дохід",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) та продажу (Bid) фінансового інструмента',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Механізм, що дозволяє керувати сумою, яка перевищує власний депозит трейдера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Ордер, що автоматично закриває позицію при досягненні встановленого рівня збитків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь зміни ціни активу за певний період, вимірюється у відсотках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися або купуватися без значної зміни ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description:
            'Плата за перенесення відкритої позиції на наступний торговий день, залежить від різниці процентних ставок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Індекс відносної сили — технічний індикатор для визначення перекупленості або перепроданості активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом постійного виставлення заявок на купівлю та продаж',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
