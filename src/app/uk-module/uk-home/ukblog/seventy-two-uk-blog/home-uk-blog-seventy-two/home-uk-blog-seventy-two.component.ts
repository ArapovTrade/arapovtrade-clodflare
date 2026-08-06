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
  selector: 'app-home-uk-blog-seventy-two',
  templateUrl: './home-uk-blog-seventy-two.component.html',
  styleUrl: './home-uk-blog-seventy-two.component.scss',
})
export class HomeUkBlogSeventyTwoComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Економічний календар: як використовувати в трейдингу'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з використання економічного календаря. Вивчіть ключові події, стратегії торгівлі на новинах та типові помилки трейдерів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economiccalendar.png',
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Економічний календар: як використовувати в трейдингу',
          description:
            'Повний посібник з використання економічного календаря. Вивчіть ключові події, стратегії торгівлі на новинах та типові помилки трейдерів.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/economiccalendar.png',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/economiccalendar',
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
          name: 'Що таке економічний календар?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Економічний календар — це інструмент, що містить розклад публікації важливих макроекономічних даних, рішень центробанків та корпоративних звітів. Він допомагає трейдерам планувати угоди та управляти ризиками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які події найважливіші в календарі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найважливіші події: рішення центральних банків щодо ставок, дані по ВВП, інфляція (CPI), звіти про зайнятість (NFP), корпоративні звіти великих компаній та геополітичні події.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати на новинах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Існує кілька стратегій: торгівля до новини на очікуваннях, вхід після публікації за напрямком імпульсу, торгівля на відкаті після початкового руху, лов хибних пробоїв.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому важливо враховувати прогноз і факт?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ринок реагує не на абсолютні значення, а на відхилення від прогнозу. Перевищення очікувань зазвичай позитивне для активу, недобір — негативне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які помилки допускають при торгівлі на новинах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типові помилки: вхід одразу після публікації без підтвердження, занадто вузький стоп-лосс, ігнорування розширення спредів, відсутність торгового плану.',
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
      name: 'Як використовувати економічний календар',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть розклад подій',
          text: 'Відкрийте економічний календар та визначте ключові події на тиждень: рішення щодо ставок, дані про зайнятість, ВВП, інфляція.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть ступінь важливості',
          text: 'Події маркуються за рівнем впливу. Зосередьтеся на високозначущих публікаціях, що викликають максимальну волатильність.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Вивчіть прогнози аналітиків',
          text: 'Порівняйте прогнозні значення з попередніми. Розуміння очікувань ринку допомагає передбачити напрямок реакції.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Сплануйте торгівлю',
          text: 'Вирішіть: торгувати до новини, після публікації чи уникати періоду волатильності. Підготуйте сценарії для різних результатів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте ризиками',
          text: 'Встановіть стоп-лосс з урахуванням розширення спредів. Зменшіть розмір позиції перед важливими релізами.',
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
      name: 'Терміни економічного календаря',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Економічний календар',
          description:
            'Розклад публікації важливих економічних показників та подій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — звіт про зайнятість у несільськогосподарському секторі США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прогноз',
          description:
            'Очікуване значення показника на основі консенсусу аналітиків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фактичне значення',
          description: 'Реальні дані, опубліковані в момент виходу звіту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ступінь важливості',
          description: 'Рівень впливу події на ринок (низька, середня, висока)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгівля на новинах',
          description:
            'Стратегія входу в позиції на основі економічних публікацій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проковзування',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розширення спреду',
          description:
            'Збільшення різниці між ціною купівлі та продажу в періоди волатильності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Корпоративна звітність',
          description: 'Квартальні та річні фінансові звіти компаній',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
