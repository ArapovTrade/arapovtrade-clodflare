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
  selector: 'app-home-uk-twenty-one',
  templateUrl: './home-uk-twenty-one.component.html',
  styleUrl: './home-uk-twenty-one.component.scss',
})
export class HomeUkTwentyOneComponent implements OnInit {
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
      'Як проводити аналіз ринку FOREX | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як проводити аналіз ринку FOREX: економічні фактори, вплив новин, робота з чутками, цикли ринку та психологія трейдингу для прийняття прибуткових рішень.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-19' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketanalysis.webp',
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
          headline: 'Як проводити аналіз ринку FOREX',
          description:
            'Комплексне керівництво з аналізу валютного ринку: економічні фактори, новини, чутки та психологія трейдингу',
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
          datePublished: '2024-06-15T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/marketanalysisforex',
          },
          image: 'https://arapov.trade/assets/img/content/marketanalysis.webp',
          articleSection: 'Навчання трейдингу',
          keywords:
            'аналіз ринку FOREX, фундаментальний аналіз, економічні показники, торгівля на новинах, психологія трейдингу',
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
          name: 'Які економічні показники найважливіші для аналізу FOREX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові показники включають рішення щодо процентних ставок центральних банків, дані по інфляції (CPI), рівень безробіття, ВВП та торговий баланс. Ці метрики напряму впливають на привабливість валюти для інвесторів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як новини впливають на валютний ринок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новини викликають волатильність залежно від розходження фактичних даних з очікуваннями ринку. Планові події формують тренди, а несподівані новини створюють різкі короткострокові рухи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи варто торгувати на чутках?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгівля на чутках високоризикована, оскільки інформація може не підтвердитися. Професіонали використовують чутки як додатковий індикатор настроїв ринку, але не як основу для прийняття рішень.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як контролювати емоції при торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Складіть торговий план та суворо дотримуйтесь його. Використовуйте заздалегідь визначені стоп-лоси та тейк-профіти. Ведіть торговий щоденник для аналізу помилок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який таймфрейм кращий для аналізу фундаментальних факторів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальний аналіз найефективніший на денних та тижневих графіках, де економічні фактори формують стійкі тренди. Для короткострокової торгівлі використовуються інтервали від M15 до H1.',
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
      name: 'Як проводити комплексний аналіз ринку FOREX',
      description:
        'Покрокове керівництво з аналізу валютного ринку для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть економічний календар',
          text: 'Визначте ключові події тижня: засідання центральних банків, публікації даних по інфляції, зайнятості та ВВП.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте макроекономічний фон',
          text: 'Оцініть поточний стан економік країн, валюти яких ви торгуєте. Порівняйте темпи зростання та напрямок монетарної політики.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Врахуйте геополітичні фактори',
          text: 'Відстежуйте політичні події, санкції, торгові війни та міжнародні конфлікти.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Оцініть ринкові настрої',
          text: 'Використовуйте індикатори настроїв та аналіз потоків капіталу для розуміння балансу попиту та пропозиції.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Інтегруйте з технічним аналізом',
          text: 'Поєднайте фундаментальні висновки з технічними рівнями для визначення точок входу та виходу.',
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
      name: 'Глосарій аналізу ринку FOREX',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод оцінки валют на основі економічних, політичних та соціальних факторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентна ставка',
          description:
            'Ключовий інструмент монетарної політики центрального банку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інфляція',
          description:
            'Зростання загального рівня цін, що знижує купівельну спроможність валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовий внутрішній продукт — показник загального обсягу економічної активності країни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Економічний календар',
          description: 'Розклад публікації важливих економічних даних та подій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Монетарна політика',
          description:
            'Дії центрального банку з регулювання грошової маси та процентних ставок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ринкові настрої',
          description:
            'Загальне ставлення учасників ринку до активу або ринку в цілому',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Геополітичний ризик',
          description:
            'Ризик впливу політичних подій та конфліктів на фінансові ринки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кореляція валют',
          description:
            "Статистичний взаємозв'язок між рухами різних валютних пар",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
