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
  selector: 'app-home-ru-blog-onehundred-two',
  templateUrl: './home-ru-blog-onehundred-two.component.html',
  styleUrl: './home-ru-blog-onehundred-two.component.scss',
})
export class HomeRuBlogOnehundredTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
    this.titleService.setTitle(
      'Полосы Боллинджера | Полное руководство по индикатору'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Полосы Боллинджера: полное руководство по индикатору. Настройки, стратегии торговли, сжатие и расширение полос, пробои и отскоки.',
    });
     this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
     
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/bollingerbands',
          },
          headline: 'Полосы Боллинджера: Полное руководство по торговле',
          description:
            'Полосы Боллинджера: полное руководство по индикатору. Настройки, стратегии торговли, сжатие и расширение полос, пробои и отскоки.',
          image: 'https://arapov.trade/assets/img/content/bollingerbands1.jpg',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-25T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',

          inLanguage: 'ru',
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
      '@id': 'https://arapov.trade/ru#person',
       name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Ігор Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Что такое полосы Боллинджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Полосы Боллинджера — это индикатор волатильности, состоящий из трёх линий: средней (SMA 20), верхней и нижней полос, расположенных на расстоянии двух стандартных отклонений от средней. Разработан Джоном Боллинджером в 1980-х годах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие стандартные настройки полос Боллинджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартные настройки: период SMA — 20, множитель стандартного отклонения — 2. Для краткосрочной торговли используют период 10, для долгосрочной — 50. Множитель 2.5-3 для более редких сигналов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что означает сжатие полос Боллинджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сжатие (Squeeze) происходит, когда полосы сужаются до минимальных значений, указывая на низкую волатильность. Это сигнал о предстоящем сильном движении цены, хотя направление пробоя заранее неизвестно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать отскоки от полос Боллинджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В боковом рынке цена отскакивает от верхней и нижней полос. Покупка при касании нижней полосы с подтверждением, продажа при касании верхней. Стоп-лосс за пределами полосы, цель — средняя линия или противоположная полоса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли использовать полосы Боллинджера как уровни поддержки и сопротивления?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, полосы выступают динамическими уровнями поддержки и сопротивления. Средняя линия часто служит поддержкой в восходящем тренде и сопротивлением в нисходящем. Однако в сильных трендах цена может двигаться вдоль полосы.',
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
      name: 'Как использовать полосы Боллинджера в торговле',
      description:
        'Пошаговое руководство по применению полос Боллинджера для поиска торговых сигналов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Добавьте индикатор на график',
          text: 'Откройте торговую платформу, выберите Bollinger Bands из списка индикаторов. Стандартные настройки: период 20, отклонение 2. Индикатор отобразится поверх графика цены.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите текущий режим рынка',
          text: 'Оцените ширину полос: широкие полосы указывают на высокую волатильность и тренд, узкие — на консолидацию. Это определяет выбор стратегии торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ищите сжатие полос',
          text: 'Отслеживайте моменты сужения полос до минимума. Сжатие предшествует сильному движению. Подготовьтесь к входу в направлении пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализируйте касания полос',
          text: 'Наблюдайте за поведением цены при касании верхней или нижней полосы. В боковике — это зоны разворота, в тренде — возможные точки продолжения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте среднюю линию',
          text: 'Средняя линия (SMA 20) служит динамической поддержкой/сопротивлением. Откаты к средней в тренде — потенциальные точки входа. Пробой средней — сигнал смены настроения.',
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
      name: 'Терминология полос Боллинджера',
      description: 'Ключевые понятия для понимания индикатора Bollinger Bands',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Полосы Боллинджера',
          description:
            'Индикатор волатильности, состоящий из средней линии и двух полос на расстоянии стандартных отклонений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Средняя полоса',
          description:
            'Простая скользящая средняя (обычно 20-периодная), центральная линия индикатора',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Верхняя полоса',
          description:
            'Средняя линия плюс два стандартных отклонения, зона потенциальной перекупленности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нижняя полоса',
          description:
            'Средняя линия минус два стандартных отклонения, зона потенциальной перепроданности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сжатие (Squeeze)',
          description:
            'Сужение полос, указывающее на низкую волатильность и предстоящее сильное движение',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Расширение полос',
          description:
            'Увеличение расстояния между полосами при росте волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прогулка по полосе',
          description:
            'Движение цены вдоль верхней или нижней полосы в сильном тренде',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стандартное отклонение',
          description:
            'Статистическая мера разброса цен относительно среднего значения',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
