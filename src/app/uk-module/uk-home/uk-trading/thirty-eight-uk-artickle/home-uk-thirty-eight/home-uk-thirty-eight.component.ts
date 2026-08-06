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
  selector: 'app-home-uk-thirty-eight',
  templateUrl: './home-uk-thirty-eight.component.html',
  styleUrl: './home-uk-thirty-eight.component.scss',
})
export class HomeUkThirtyEightComponent implements OnInit {
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
      'Управління капіталом у трейдингу: ризик-менеджмент та мані-менеджмент | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з управління капіталом у трейдингу. Ризик-менеджмент, мані-менеджмент, стратегії захисту депозиту та примноження прибутку для початківців.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/capitalmanagement.webp',
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
            'Управління капіталом у трейдингу: ризик-менеджмент та мані-менеджмент',
          description:
            'Повний посібник з управління капіталом у трейдингу. Ризик-менеджмент, мані-менеджмент, стратегії захисту депозиту та примноження прибутку для початківців.',
          image:
            'https://arapov.trade/assets/img/content/capitalmanagement1.jpg',
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
            '@id': 'https://arapov.trade/uk/freestudying/capitalmanagement',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1620,
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
          name: 'Що таке ризик-менеджмент у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ризик-менеджмент — це система методів захисту торгового капіталу від втрат. Включає обмеження ризику на угоду (1-2% депозиту), використання стоп-лосів, контроль просадки та диверсифікацію активів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється ризик-менеджмент від мані-менеджменту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ризик-менеджмент фокусується на захисті капіталу від збитків, а мані-менеджмент — на ефективному використанні коштів для максимізації прибутку. Перший відповідає за виживання, другий — за зростання депозиту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який відсоток депозиту можна ризикувати в одній угоді?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальний ризик на одну угоду становить 1-2% від торгового капіталу. При депозиті $10000 максимальний збиток на угоду не повинен перевищувати $100-200. Це дозволяє пережити серію збиткових угод.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке співвідношення ризику до прибутку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Співвідношення ризику до прибутку (Risk/Reward Ratio) показує відношення потенційного збитку до очікуваного прибутку. Мінімально прийнятне значення — 1:2, тобто прибуток має вдвічі перевищувати можливий збиток.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати розмір позиції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розмір позиції розраховується за формулою: Обсяг = Ризик у грошах / (Стоп-лос у пунктах × Ціна пункту). При депозиті $10000, ризику 2% ($200) та стоп-лосі 50 пунктів обсяг складе 0.4 лота.',
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
      name: 'Як побудувати систему управління капіталом',
      description:
        'Покрокове керівництво зі створення ефективної системи ризик-менеджменту та мані-менеджменту в трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте допустимий ризик',
          text: 'Встановіть максимальний відсоток депозиту, який готові втратити в одній угоді. Рекомендоване значення — 1-2%. Також визначте денний та тижневий ліміт збитків.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розрахуйте розмір позиції',
          text: 'Використовуйте формулу розрахунку обсягу на основі відстані до стоп-лосу та допустимого ризику в грошах. Адаптуйте розмір позиції до волатильності ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Встановіть стоп-лос та тейк-профіт',
          text: 'Розміщуйте захисні ордери до входу в угоду. Співвідношення ризику до прибутку має бути мінімум 1:2. Використовуйте технічні рівні для визначення точок виходу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Диверсифікуйте портфель',
          text: 'Розподіліть капітал між різними інструментами та стратегіями. Не концентруйте весь депозит в одному активі чи напрямку.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведіть статистику та аналізуйте',
          text: 'Записуйте всі угоди в торговий журнал. Регулярно аналізуйте результати, виявляйте слабкі місця та коригуйте систему управління капіталом.',
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
      name: 'Терміни управління капіталом',
      description:
        'Ключові поняття ризик-менеджменту та мані-менеджменту в трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система методів захисту торгового капіталу від збитків через обмеження ризиків та використання захисних інструментів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мані-менеджмент',
          description:
            'Стратегічне управління капіталом для оптимізації дохідності та ефективного розподілу коштів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Зниження торгового рахунку від максимального значення до поточного мінімуму, виражається у відсотках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'Співвідношення потенційного збитку до очікуваного прибутку в угоді',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розмір позиції',
          description:
            'Обсяг торгової угоди, розрахований на основі допустимого ризику та відстані до стоп-лосу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description:
            'Розподіл капіталу між різними активами для зниження загального ризику портфеля',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-лос, що автоматично слідує за ціною на заданій відстані',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Реінвестування',
          description:
            'Використання отриманого прибутку для збільшення торгового капіталу та обсягу позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Механізм збільшення торгового обсягу за рахунок позикових коштів брокера',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
