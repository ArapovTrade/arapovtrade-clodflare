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
  selector: 'app-home-uk-eight',
  templateUrl: './home-uk-eight.component.html',
  styleUrl: './home-uk-eight.component.scss',
})
export class HomeUkEightComponent implements OnInit {
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
      'Валюти та котирування у трейдингу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Валюти та котирування у трейдингу: як формуються курси, які фактори впливають на рух валютних пар. Повний посібник для початківців.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-11' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/currencies.webp',
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
          headline: 'Валюти та котирування: повний посібник по валютному ринку',
          description:
            'Дізнайтеся, як формуються валютні курси, які фактори впливають на котирування та як почати торгувати на валютному ринку Форекс.',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          image: 'https://arapov.trade/assets/img/content/kursyvaljut.jpg',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/currenciesandquotes',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1313,
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
          name: 'Що таке валютне котирування?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Валютне котирування — це ціна однієї валюти, виражена в одиницях іншої валюти. Наприклад, котирування EUR/USD = 1.0900 означає, що один євро коштує 1.0900 долара США.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які фактори впливають на курс валют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На курс валют впливають: процентні ставки центральних банків, економічні показники (ВВП, інфляція, безробіття), геополітичні події, торговельний баланс країни та ринкові настрої учасників.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняються основні та екзотичні валютні пари?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні пари включають долар США та валюти найбільших економік (EUR/USD, USD/JPY), мають високу ліквідність та низькі спреди. Екзотичні пари містять валюти країн, що розвиваються, характеризуються високою волатильністю та широкими спредами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли краще торгувати на валютному ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найбільша волатильність спостерігається при перетині європейської та американської сесій. Для торгівлі парами з єною оптимальна азійська сесія, для EUR та GBP — європейська сесія.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як управляти ризиками у валютній торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні правила: ризикувати не більше 1-2% депозиту на угоду, завжди використовувати стоп-лоси, уникати надмірного кредитного плеча та диверсифікувати торгівлю по кількох валютних парах.',
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
      name: 'Як почати торгувати на валютному ринку',
      description:
        'Покрокова інструкція для початківців трейдерів по входу на валютний ринок Форекс',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи валютного ринку',
          text: 'Розберіться в поняттях валютних пар, котирувань, спредів та факторах, що впливають на курси валют.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Відкрийте демо-рахунок',
          text: 'Почніть практику на демо-рахунку без ризику втрати реальних грошей. Освойте торгову платформу та протестуйте стратегії.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розробіть торговий план',
          text: 'Створіть план з правилами входу та виходу з угод, визначте допустимий рівень ризику та цільовий прибуток.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Почніть з мінімальних обсягів',
          text: 'При переході на реальний рахунок починайте з мінімальних позицій, поступово збільшуючи обсяг зі зростанням досвіду.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведіть торговий журнал',
          text: 'Записуйте всі угоди, аналізуйте результати та коригуйте стратегію на основі отриманого досвіду.',
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
      name: 'Терміни валютного ринку',
      description:
        'Глосарій ключових термінів валютної торгівлі та ринку Форекс',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Валютна пара',
          description:
            'Співвідношення двох валют, що показує вартість базової валюти в одиницях валюти котирування',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Котирування',
          description: 'Ціна однієї валюти, виражена в одиницях іншої валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) та ціною продажу (Bid) валютної пари',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Крос-курс',
          description:
            'Валютна пара, що не містить долар США, наприклад EUR/JPY або GBP/CHF',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Інструмент, що дозволяє торгувати сумами, які перевищують власний капітал трейдера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність швидко купити або продати актив без суттєвого впливу на його ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова сесія',
          description:
            'Період активної торгівлі на певному регіональному ринку (азійська, європейська, американська)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютна інтервенція',
          description:
            'Пряме втручання центрального банку у валютний ринок для корекції курсу національної валюти',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
