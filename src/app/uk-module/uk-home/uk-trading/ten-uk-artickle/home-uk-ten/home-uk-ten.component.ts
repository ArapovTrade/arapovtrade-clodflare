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
  selector: 'app-home-uk-ten',
  templateUrl: './home-uk-ten.component.html',
  styleUrl: './home-uk-ten.component.scss',
})
export class HomeUkTenComponent implements OnInit {
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
      'Позиції в трейдингу: довгі, короткі та перенесення через ніч | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повне керівництво з позицій у трейдингу: довгі та короткі угоди, дата валютування, свопи та перенесення позицій. Як керувати ризиками та обирати стратегію.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-13' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/currencyPosition.webp',
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
            'Позиції в трейдингу: довгі, короткі та перенесення через ніч',
          description:
            'Повне керівництво з позицій у трейдингу: довгі та короткі угоди, дата валютування, свопи та перенесення позицій.',
          image: 'https://arapov.trade/assets/img/content/position1.png',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
          },
          mainEntityOfPage:
            'https://arapov.trade/uk/freestudying/currencyposition',
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
          name: 'Що таке довга позиція?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Довга позиція — це купівля активу з розрахунком на зростання його вартості. Трейдер купує дешевше та продає дорожче.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює коротка позиція?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Коротка позиція — це продаж позиченого активу з розрахунком на падіння ціни. Трейдер бере актив у брокера, продає, потім викуповує дешевше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке своп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Своп — плата за перенесення позиції через ніч, що залежить від різниці процентних ставок валют у парі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає дата валютування?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дата валютування — день завершення розрахунків за угодою. На Форекс схема T+2 означає розрахунки через два робочі дні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які типи позицій існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні типи: спекулятивні, хеджуючі, інвестиційні та арбітражні позиції.',
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
      name: 'Як відкрити та керувати торговою позицією',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте напрямок ринку',
          text: 'Проаналізуйте тренд за допомогою технічного аналізу.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть тип позиції',
          text: 'Визначтеся зі стратегією: спекулятивна, інвестиційна чи хеджуюча.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розрахуйте розмір позиції',
          text: 'Не ризикуйте більше 1-2% депозиту на одну угоду.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Встановіть захисні ордери',
          text: 'Розмістіть стоп-лосс та тейк-профіт.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Враховуйте свопи',
          text: 'Розрахуйте свопи заздалегідь при плануванні довгострокових угод.',
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
      name: 'Термінологія позицій',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Довга позиція',
          description: 'Купівля активу з розрахунком на зростання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коротка позиція',
          description: 'Продаж позиченого активу з розрахунком на падіння',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description: 'Плата за перенесення позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дата валютування',
          description: 'День завершення розрахунків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перенесення позиції',
          description: 'Продовження незакритої позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description: 'Захист портфеля від несприятливих змін цін',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description: 'Позикові кошти для збільшення розміру позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description: 'Ордер автоматичного закриття збиткової позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description: 'Ордер автоматичної фіксації прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спотова угода',
          description: 'Угода з розрахунками T+2',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
