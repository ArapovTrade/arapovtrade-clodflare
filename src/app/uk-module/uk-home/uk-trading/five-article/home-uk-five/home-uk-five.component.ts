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
  selector: 'app-home-uk-five',
  templateUrl: './home-uk-five.component.html',
  styleUrl: './home-uk-five.component.scss',
})
export class HomeUkFiveComponent implements OnInit {
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
      'Деривативи: види похідних інструментів та їх застосування | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Деривативи: повний посібник з похідних фінансових інструментів. Ф`ючерси, опціони, свопи, CFD — види, застосування, ризики та стратегії торгівлі.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/dericativessBebPack.webp',
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
          headline: 'Деривативи: види похідних інструментів та їх застосування',
          description:
            "Повний посібник з деривативів: ф'ючерси, опціони, свопи, CFD — види, застосування та ризики.",
          image: 'https://arapov.trade/assets/img/content/derivatives1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/derivatives',
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
          name: 'Що таке деривативи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Деривативи — фінансові контракти, вартість яких залежить від ціни базового активу. До них належать ф'ючерси, опціони, свопи, форварди та CFD.",
          },
        },
        {
          '@type': 'Question',
          name: 'Для чого використовуються деривативи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні застосування: хеджування ризиків, спекуляція на русі цін, арбітраж між ринками та підвищення ліквідності активів.',
          },
        },
        {
          '@type': 'Question',
          name: "Чим ф'ючерси відрізняються від опціонів?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ф'ючерси зобов'язують обидві сторони здійснити угоду у встановлену дату. Опціони дають право, але не зобов'язання на купівлю або продаж активу.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які ризики несуть деривативи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ризики: використання кредитного плеча збільшує потенційні збитки, волатильність ринку, ризик контрагента на позабіржовому ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як почати торгувати деривативами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вивчіть основи інструментів, оберіть надійного брокера, визначте стратегію та почніть з демо-рахунку для практики без ризику.',
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
      name: 'Як почати торгувати деривативами',
      description:
        'Покрокове керівництво для початку роботи з похідними фінансовими інструментами.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи',
          text: "Розберіться з поняттями ф'ючерсів, опціонів, маржі та левериджу. Вивчіть літературу та пройдіть навчальні курси.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть брокера',
          text: 'Знайдіть надійного брокера з доступом до потрібних бірж. Зверніть увагу на комісії та мінімальний депозит.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначте стратегію',
          text: 'Вирішіть, чи будете хеджувати ризики чи спекулювати. Встановіть правила управління капіталом.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Тестуйте стратегії без ризику реальних грошей. Освойте торгову платформу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з малого',
          text: 'Відкрийте реальний рахунок з мінімальним депозитом. Торгуйте невеликими позиціями, збільшуючи обсяги з досвідом.',
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
      name: 'Глосарій деривативів',
      description: 'Ключові терміни ринку похідних інструментів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Дериватив',
          description:
            'Фінансовий контракт, вартість якого залежить від базового активу',
        },
        {
          '@type': 'DefinedTerm',
          name: "Ф'ючерс",
          description:
            'Стандартизований біржовий контракт на купівлю або продаж активу в майбутньому',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Опціон',
          description:
            'Контракт, що дає право купити або продати актив за встановленою ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description: 'Угода про обмін фінансовими потоками між сторонами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Форвард',
          description:
            'Позабіржовий контракт на поставку активу в майбутньому за узгодженою ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CFD',
          description: 'Контракт на різницю цін без фізичної поставки активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description:
            'Захист від ринкових ризиків за допомогою фінансових інструментів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Застава, що вноситься для відкриття позиції з кредитним плечем',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Експірація',
          description: 'Дата закінчення терміну дії контракту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Страйк',
          description: 'Ціна виконання опціону',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
