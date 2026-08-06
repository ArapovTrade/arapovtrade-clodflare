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
  selector: 'app-home-ru-blog-onehundred-three',
  templateUrl: './home-ru-blog-onehundred-three.component.html',
  styleUrl: './home-ru-blog-onehundred-three.component.scss',
})
export class HomeRuBlogOnehundredThreeComponent implements OnInit {
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
      'Индикатор Ишимоку | Полное руководство по облаку'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Индикатор Ишимоку (Ichimoku Kinko Hyo): полное руководство. Облако Кумо, линии Tenkan, Kijun, Chikou. Стратегии и сигналы.',
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
            '@id': 'https://arapov.trade/ru/freestudying/ichimoku',
          },
          headline: 'Индикатор Ишимоку | Полное руководство по облаку',
          description:
            'Индикатор Ишимоку (Ichimoku Kinko Hyo): полное руководство. Облако Кумо, линии Tenkan, Kijun, Chikou. Стратегии и сигналы.',
          image: 'https://arapov.trade/assets/img/content/ichimoku1.png',
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
          datePublished: '2025-06-28T00:00:00+02:00',
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
          name: 'Что такое Ichimoku?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ichimoku Kinko Hyo — комплексный индикатор, показывающий тренд, импульс, поддержку/сопротивление одним взглядом. Разработан японским журналистом Гоичи Хосода в 1960-х.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое облако Кумо?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кумо — заштрихованная область между Senkou Span A и B. Выступает зоной поддержки/сопротивления. Толстое облако — сильная зона, тонкое — слабая.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить тренд по Ишимоку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Цена выше облака — восходящий тренд. Ниже облака — нисходящий. Внутри облака — неопределённость, боковик.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое сигнал TK Cross?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пересечение Tenkan Sen и Kijun Sen. Бычий — Tenkan пересекает Kijun снизу вверх. Медвежий — сверху вниз. Сила зависит от положения относительно облака.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие настройки Ишимоку стандартные?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартные: 9, 26, 52. Основаны на японской торговой неделе. Для криптовалют и форекса используют адаптированные: 10, 30, 60 или 20, 60, 120.',
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
      name: 'Как торговать по индикатору Ишимоку',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите тренд',
          text: 'Оцените положение цены относительно облака Кумо: выше облака — восходящий тренд, ниже — нисходящий.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Дождитесь сигнала TK Cross',
          text: 'Ищите пересечение линий Tenkan Sen и Kijun Sen в направлении тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Подтвердите Chikou Span',
          text: 'Убедитесь, что Chikou Span находится выше/ниже цены 26 периодов назад, подтверждая импульс.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Оцените облако',
          text: 'Проверьте толщину и цвет будущего облака для определения силы тренда и зон поддержки/сопротивления.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс',
          text: 'Разместите стоп-лосс за противоположной границей облака или за линией Kijun Sen.',
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
      name: 'Глоссарий терминов Ишимоку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ichimoku Kinko Hyo',
          description:
            'Комплексный индикатор технического анализа, показывающий тренд, импульс и уровни поддержки/сопротивления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tenkan Sen',
          description:
            'Быстрая линия разворота, среднее значение максимума и минимума за 9 периодов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kijun Sen',
          description:
            'Базовая линия, среднее значение за 26 периодов, выступает динамической поддержкой/сопротивлением.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Senkou Span A',
          description:
            'Первая опережающая линия, формирует одну границу облака Кумо.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Senkou Span B',
          description:
            'Вторая опережающая линия, формирует вторую границу облака Кумо.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Chikou Span',
          description:
            'Запаздывающая линия, текущая цена закрытия, сдвинутая на 26 периодов назад.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Облако Кумо',
          description:
            'Заштрихованная область между Senkou Span A и B, визуализирующая зону поддержки или сопротивления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TK Cross',
          description:
            'Торговый сигнал, возникающий при пересечении линий Tenkan Sen и Kijun Sen.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
