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
  selector: 'app-home-uk-fourty',
  templateUrl: './home-uk-fourty.component.html',
  styleUrl: './home-uk-fourty.component.scss',
})
export class HomeUkFourtyComponent implements OnInit {
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
      'Помилки трейдерів-початківців: як уникнути втрат | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Помилки трейдерів-початківців — повний посібник. Дізнайтеся типові промахи новачків на фінансових ринках та як їх уникнути для успішної торгівлі.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/beginnermistakes.webp',
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
          headline: 'Помилки трейдерів-початківців: як уникнути втрат',
          description:
            'Повний посібник по типових помилках новачків у трейдингу. Розбір причин збитків та практичні рекомендації для успішної торгівлі.',
          image:
            'https://arapov.trade/assets/img/content/beginnermistakes.webp',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/beginnermistakes',
          },
          articleSection: 'Трейдинг для початківців',
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
          name: 'Яка головна помилка трейдерів-початківців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Головна помилка — відсутність системи управління ризиками. Новачки часто ризикують занадто великою частиною депозиту в одній угоді, використовують надмірне кредитне плече та не встановлюють стоп-лоси. Це призводить до швидкої втрати капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки можна ризикувати в одній угоді?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Професійні трейдери рекомендують ризикувати не більше 1-2% від депозиту в одній угоді. При депозиті 1000 доларів максимальний збиток по угоді не повинен перевищувати 10-20 доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому емоції заважають торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх змушує закривати прибуткові угоди занадто рано, а жадібність — утримувати збиткові позиції в надії на розворот. Бажання відігратися після втрат штовхає на необдумані рішення та збільшення ризику.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібен торговий журнал новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Торговий журнал — обов'язковий інструмент для розвитку. Записуючи кожну угоду з причинами входу, результатом та емоціями, ви виявляєте свої слабкі сторони та помилки, що повторюються.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як обрати відповідний таймфрейм?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вибір таймфрейму залежить від вашого графіку та темпераменту. Для активної торгівлі підходять M15-H1, для спокійного підходу — H4-D1. Новачкам рекомендується починати зі старших таймфреймів.',
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
      name: 'Як уникнути типових помилок трейдера-початківця',
      description:
        'Покрокова інструкція з формування правильних торгових звичок',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи ринку',
          text: 'Присвятіть кілька місяців вивченню технічного та фундаментального аналізу перед початком реальної торгівлі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Впровадьте ризик-менеджмент',
          text: 'Встановіть правило не ризикувати більше 1-2% депозиту в одній угоді. Завжди використовуйте стоп-лоси.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Контролюйте емоції',
          text: 'Розробіть торговий план і суворо дотримуйтесь його. Робіть перерви після збиткових угод.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ведіть торговий журнал',
          text: 'Записуйте кожну угоду: актив, точки входу і виходу, причину входу та результат.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Тестуйте стратегії на демо-рахунку мінімум 2-3 місяці перед переходом до реальної торгівлі.',
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
      name: 'Глосарій термінів трейдингу: помилки початківців',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система правил управління капіталом, що визначає максимальний ризик на угоду та методи захисту депозиту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції при досягненні заданого рівня ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Інструмент, що дозволяє управляти позицією, яка перевищує розмір депозиту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Надмірна торгова активність з великою кількістю угод, що часто призводить до виснаження та збільшення витрат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Документ з правилами входу і виходу з угод та принципами управління ризиками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description: 'Часовий інтервал відображення цінових даних на графіку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description:
            'Вимога брокера про поповнення рахунку при зниженні маржі нижче допустимого рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вінрейт',
          description:
            'Відсоток прибуткових угод від загальної кількості здійснених торгових операцій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тільт',
          description:
            'Емоційний стан після збитків, що призводить до імпульсивних рішень',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description:
            'Розподіл капіталу між різними активами для зниження загального ризику портфеля',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
