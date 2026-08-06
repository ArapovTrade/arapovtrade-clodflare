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
  selector: 'app-home-uk-thirteen',
  templateUrl: './home-uk-thirteen.component.html',
  styleUrl: './home-uk-thirteen.component.scss',
})
export class HomeUkThirteenComponent implements OnInit {
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
      'Валютний ризик: як захистити капітал від коливань курсу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Валютний ризик у трейдингу та інвестиціях. Дізнайтеся про методи хеджування, вплив центральних банків та стратегії захисту від курсових втрат.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/riskCurrencyExchange.webp',
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
          headline: 'Валютний ризик: як захистити капітал від коливань курсу',
          description:
            'Валютний ризик у трейдингу та інвестиціях. Методи хеджування та стратегії захисту.',
          image:
            'https://arapov.trade/assets/img/content/riskCurrencyExchange1.webp',
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
          name: 'Що означає валютний ризик для звичайного інвестора?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Валютний ризик — це загроза втратити частину коштів через зміну курсу. Якщо ви тримаєте заощадження в доларах, а гривня зміцнюється — ваша купівельна спроможність зменшується при конвертації.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які інструменти хеджування доступні приватним особам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Приватні інвестори можуть використовувати валютні депозити в різних валютах, ETF-фонди з валютним хеджуванням та форвардні контракти. Найпростіший метод — диверсифікація між кількома валютами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому курс гривні такий волатильний?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Волатильність гривні визначається залежністю від експорту сировини, геополітичною ситуацією, рівнем резервів НБУ, інфляційними очікуваннями та загальним станом економіки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як НБУ впливає на курс гривні?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Національний банк використовує валютні інтервенції, зміну облікової ставки, курсові обмеження та комунікацію з ринком.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи варто тримати всі заощадження в одній валюті?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Концентрація в одній валюті створює надмірний ризик. Оптимальна стратегія — розподіл між 3-4 валютами.',
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
      name: 'Як побудувати захист від валютного ризику',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте експозицію',
          text: "Порахуйте частину активів, прив'язану до іноземних валют.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть валютну корзину',
          text: 'Розподіліть кошти: 30-40% долар, 20-30% євро, 20% гривня.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Встановіть правила ребалансування',
          text: 'Типовий поріг — зміна частки на 5-10 відсоткових пунктів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Використовуйте природне хеджування',
          text: 'Якщо маєте доходи в іноземній валюті, мати витрати в тій самій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Моніторте макроіндикатори',
          text: 'Слідкуйте за рішеннями НБУ, інфляцією, торговим балансом.',
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
      name: 'Словник термінів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Валютний ризик',
          description: 'Ймовірність втрат внаслідок зміни курсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description: 'Стратегія захисту через похідні інструменти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Форвард',
          description: 'Угода про обмін за фіксованим курсом у майбутньому',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description: 'Позикові кошти для збільшення позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description: 'Ордер на закриття при заданому збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description: 'Вимога поповнити рахунок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Мінливість ціни за період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description: 'Розподіл активів для зниження ризику',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інтервенція',
          description: 'Купівля-продаж валюти центробанком',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Девальвація',
          description: 'Зниження курсу національної валюти',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
