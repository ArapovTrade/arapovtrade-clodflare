import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-eighty-seven',
  templateUrl: './home-uk-blog-eighty-seven.component.html',
  styleUrl: './home-uk-blog-eighty-seven.component.scss',
})
export class HomeUkBlogEightySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'Копітрейдинг: як заробляти на копіюванні угод | Посібник 2025',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Копітрейдинг: як автоматично копіювати угоди професійних трейдерів. Платформи, налаштування, ризики та стратегії пасивного заробітку на фінансових ринках.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
          headline: 'Копітрейдинг: автоматичне копіювання угод професіоналів',
          description:
            'Дізнайтеся, як працює копітрейдинг, які платформи обрати та як налаштувати систему для пасивного заробітку на криптовалютах, форекс та акціях.',
          image: 'https://arapov.trade/assets/img/content/copytrading.png',

          datePublished: '2025-06-04T00:00:00Z',
          dateModified: '2026-06-04T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          wordCount: 1400,
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
          name: 'Що таке копітрейдинг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Копітрейдинг — це технологія автоматичного відтворення торгових операцій досвідченого трейдера на вашому рахунку. Ви обираєте майстра за статистикою, підключаєтесь до його стратегії, і система копіює всі угоди пропорційно вашому капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які платформи підходять для копітрейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для форекс популярні eToro та ZuluTrade, для криптовалют — Bybit, Binance та OKX. Вибір залежить від ринку, комісій та мінімального депозиту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки можна заробити?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Реалістичні очікування: 5-15% на місяць у стабільних трейдерів. Висока дохідність понад 50% зазвичай супроводжується відповідними ризиками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ризики копітрейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ризики: збиткові періоди трейдера, небезпечні стратегії типу мартингейлу, прослизання на новинах. Важливо диверсифікувати та встановлювати ліміти втрат.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим копітрейдинг відрізняється від довірчого управління?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При копітрейдингу гроші залишаються на вашому рахунку, ви контролюєте капітал. При довірчому управлінні ви передаєте кошти керуючому.',
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
      name: 'Як почати копітрейдинг',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть платформу',
          text: 'Зареєструйтесь на платформі з функцією копітрейдингу',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте трейдерів',
          text: 'Вивчіть статистику: дохідність, просадка, стиль торгівлі',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Налаштуйте параметри',
          text: 'Вкажіть суму, ліміти втрат, режим роботи',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Запустіть копіювання',
          text: 'Підключіться до обраного трейдера',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Моніторте результати',
          text: 'Перевіряйте статистику щотижня, коригуйте налаштування',
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
      name: 'Глосарій копітрейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Копітрейдинг',
          description:
            'Автоматичне копіювання торгових операцій професійного трейдера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лід-трейдер',
          description: 'Професіонал, угоди якого копіюють інші учасники',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description: 'Максимальне зниження балансу від пікового значення',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Slippage',
          description: 'Різниця між очікуваною та фактичною ціною виконання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Performance Fee',
          description: 'Комісія трейдеру у відсотках від прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мартингейл',
          description:
            'Ризикована стратегія подвоєння ставки після кожного збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дзеркальна торгівля',
          description:
            'Повне копіювання торгової системи включно з ризик-менеджментом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соціальний трейдинг',
          description: 'Платформа для обміну ідеями між трейдерами',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
