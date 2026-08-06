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
  selector: 'app-home-ru-twenty',
  templateUrl: './home-ru-twenty.component.html',
  styleUrl: './home-ru-twenty.component.scss',
})
export class HomeRuTwentyComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Market Profile: анализ спроса и предложения по методу Стейдлмайера | ArapovTrade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Освойте Market Profile — метод анализа рынка Питера Стейдлмайера. POC, Value Area, зоны ликвидности и практические стратегии для трейдинга.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-27' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/steidlmayeranalysis.png',
    });

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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
            'Market Profile: анализ спроса и предложения по методу Стейдлмайера',
          description:
            'Освойте Market Profile — метод анализа рынка Питера Стейдлмайера. POC, Value Area, зоны ликвидности и практические стратегии для трейдинга.',
          image:
            'https://arapov.trade/assets/img/content/steidlmayeranalysis2.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
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
          name: 'Что такое Market Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market Profile — это метод анализа рынка, разработанный Питером Стейдлмайером, который визуализирует распределение объёмов по ценовым уровням. Инструмент показывает зоны концентрации торговой активности и помогает определить справедливую стоимость актива.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Point of Control (POC)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POC — это ценовой уровень с максимальным объёмом торгов за период. Он указывает на зону наибольшего согласия между покупателями и продавцами и часто выступает сильной поддержкой или сопротивлением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что означает Value Area?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Value Area — это диапазон цен, охватывающий примерно 70% всего объёма торгов за сессию. Эта зона показывает, где участники рынка считают цену справедливой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличаются HVN и LVN?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'HVN (High Volume Nodes) — зоны с высокой концентрацией объёма, где цена склонна к консолидации. LVN (Low Volume Nodes) — участки с низким объёмом, через которые цена проходит быстро, часто указывая на потенциальные пробои.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках применяется Market Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market Profile универсален и применяется на фьючерсных, фондовых, валютных и криптовалютных рынках. Особенно эффективен на высоколиквидных инструментах с достаточным объёмом торгов.',
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
      name: 'Как анализировать рынок с помощью Market Profile',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите POC и Value Area',
          text: 'Найдите уровень максимального объёма (POC) и границы Value Area (VAH и VAL). Эти уровни служат ключевыми ориентирами для торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Идентифицируйте HVN и LVN',
          text: 'Отметьте зоны высокого объёма (HVN) как потенциальные поддержки/сопротивления и зоны низкого объёма (LVN) как области ускорения цены.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцените положение цены относительно VA',
          text: 'Цена выше VAH указывает на силу покупателей, ниже VAL — на доминирование продавцов. Внутри VA — рынок в равновесии.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Отслеживайте смещение POC',
          text: 'Движение POC вверх подтверждает бычий тренд, вниз — медвежий. Стабильный POC указывает на консолидацию.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Комбинируйте с другими методами',
          text: 'Используйте Market Profile вместе с Delta Volume, футпринт-чартами или свечными паттернами для повышения точности сигналов.',
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
      name: 'Глоссарий Market Profile',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Метод анализа рынка, визуализирующий распределение объёмов по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control (POC)',
          description:
            'Ценовой уровень с максимальным объёмом торгов за период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area',
          description:
            'Диапазон цен, охватывающий около 70% объёма торгов за сессию.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area High (VAH)',
          description: 'Верхняя граница зоны справедливой стоимости.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area Low (VAL)',
          description: 'Нижняя граница зоны справедливой стоимости.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'High Volume Node (HVN)',
          description: 'Зона с высокой концентрацией торгового объёма.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Low Volume Node (LVN)',
          description:
            'Зона с низким объёмом торгов, через которую цена проходит быстро.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Initial Balance',
          description: 'Ценовой диапазон первого часа торговой сессии.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TPO',
          description:
            'Time Price Opportunity — единица измерения времени на ценовом уровне.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Питер Стейдлмайер',
          description:
            'Трейдер, разработавший концепцию Market Profile в 1980-х годах.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
