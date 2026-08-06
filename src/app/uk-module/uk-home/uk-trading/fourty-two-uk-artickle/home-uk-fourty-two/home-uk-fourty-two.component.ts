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
  selector: 'app-home-uk-fourty-two',
  templateUrl: './home-uk-fourty-two.component.html',
  styleUrl: './home-uk-fourty-two.component.scss',
})
export class HomeUkFourtyTwoComponent implements OnInit {
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
      'Таймфрейми в трейдингу: як обрати часовий інтервал для торгівлі | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як обрати таймфрейм для торгівлі. Дізнайтеся про види таймфреймів, мульти-таймфрейм аналіз та який часовий інтервал підійде саме вам.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
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
            'Таймфрейми в трейдингу: як обрати часовий інтервал для торгівлі',
          description:
            'Як обрати таймфрейм для торгівлі. Дізнайтеся про види таймфреймів, мульти-таймфрейм аналіз та який часовий інтервал підійде саме вам.',
          image: 'https://arapov.trade/assets/img/content/timeframes1.webp',
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
            '@id': 'https://arapov.trade/uk/freestudying/timeframes',
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
          name: 'Що таке таймфрейм простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Таймфрейм — це часовий інтервал, за який формується одна свічка або бар на графіку. Наприклад, на H1 кожна свічка показує рух ціни за одну годину, на D1 — за добу.',
          },
        },
        {
          '@type': 'Question',
          name: 'На якому таймфреймі краще торгувати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендується використовувати H1 або H4. Ці таймфрейми дають достатньо часу для аналізу, містять менше ринкового шуму та формують надійніші сигнали.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому не можна торгувати лише на одному таймфреймі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Один таймфрейм показує лише частину картини. Старший визначає глобальний тренд, середній — зони інтересу, молодший — точки входу. Комбінування дає повне розуміння ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який таймфрейм найкращий для скальпінгу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальпери використовують M1, M5 та M15. Ці інтервали дозволяють ловити короткі імпульси та здійснювати багато угод за день, але вимагають швидкої реакції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як волатильність впливає на вибір таймфрейму?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При високій волатильності молодші таймфрейми дають більше можливостей, але й більше ризику. При низькій волатильності краще переходити на старші інтервали для отримання надійних сигналів.',
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
      name: 'Як обрати оптимальний таймфрейм',
      description:
        'Покрокова інструкція з підбору часового інтервалу для торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте стиль торгівлі',
          text: 'Вирішіть, як часто хочете здійснювати угоди. Скальпінг потребує M1-M15, свінг-трейдинг — H4-D1, інвестування — W1-MN.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть доступний час',
          text: 'Якщо можете слідкувати за ринком цілий день — підійдуть молодші таймфрейми. При обмеженому часі обирайте H4 або D1.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Врахуйте волатильність активу',
          text: 'Криптовалюти волатильні — ефективні M15-H1. Фондовий ринок стабільніший — краще H4-D1.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Протестуйте на демо-рахунку',
          text: 'Торгуйте мінімум 2-4 тижні на обраному таймфреймі, щоб зрозуміти його особливості.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Впровадьте мульти-таймфрейм аналіз',
          text: 'Використовуйте старший таймфрейм для тренду, середній для зон, молодший для входу.',
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
      name: 'Словник термінів таймфреймів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Часовий інтервал формування однієї свічки або бару на ціновому графіку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стиль торгівлі з безліччю коротких угод на молодших таймфреймах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Середньострокова торгівля з утриманням позицій від кількох днів до тижнів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мульти-таймфрейм аналіз',
          description:
            'Метод аналізу ринку з використанням кількох часових інтервалів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ринковий шум',
          description:
            'Хаотичні цінові коливання, що не відображають реальний тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Індикатор середнього істинного діапазону для вимірювання волатильності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова сесія',
          description: 'Період активної роботи певного фінансового центру',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інтрадей',
          description:
            'Внутрішньоденна торгівля із закриттям усіх позицій до кінця сесії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Позиційний трейдинг',
          description:
            'Довгострокова торгівля з утриманням позицій від тижнів до місяців',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Обсяг торгів та здатність швидко купити або продати актив без значного впливу на ціну',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
