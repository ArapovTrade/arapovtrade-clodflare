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
  selector: 'app-home-ru-fourty-two',
  templateUrl: './home-ru-fourty-two.component.html',
  styleUrl: './home-ru-fourty-two.component.scss',
})
export class HomeRuFourtyTwoComponent implements OnInit {
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
      'Таймфреймы в трейдинге: полное руководство по выбору временного интервала | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Как выбрать таймфрейм для торговли. Узнайте о видах таймфреймов, мульти-таймфрейм анализе и какой временной интервал подойдёт именно вам.',
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
            'Таймфреймы в трейдинге: полное руководство по выбору временного интервала',
          description:
            'Как выбрать таймфрейм для торговли. Узнайте о видах таймфреймов, мульти-таймфрейм анализе и какой временной интервал подойдёт именно вам.',
          image: 'https://arapov.trade/assets/img/content/timeframes1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
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
            '@id': 'https://arapov.trade/ru/freestudying/timeframes',
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
          name: 'Что такое таймфрейм простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Таймфрейм — это временной интервал, за который формируется одна свеча или бар на графике. Например, на H1 каждая свеча показывает движение цены за один час, на D1 — за сутки.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каком таймфрейме лучше торговать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим трейдерам рекомендуется использовать H1 или H4. Эти таймфреймы дают достаточно времени для анализа, содержат меньше рыночного шума и формируют более надёжные сигналы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему нельзя торговать только на одном таймфрейме?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Один таймфрейм показывает лишь часть картины. Старший таймфрейм определяет глобальный тренд, средний — зоны интереса, младший — точки входа. Комбинирование даёт полное понимание рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой таймфрейм лучше для скальпинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скальперы используют M1, M5 и M15. Эти интервалы позволяют ловить короткие импульсы и совершать множество сделок за день. Однако требуют быстрой реакции и высокой концентрации.',
          },
        },
        {
          '@type': 'Question',
          name: 'Влияет ли волатильность на выбор таймфрейма?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, напрямую. При высокой волатильности младшие таймфреймы дают больше возможностей, но и больше риска. При низкой волатильности лучше переходить на старшие интервалы для получения надёжных сигналов.',
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
      name: 'Как выбрать оптимальный таймфрейм',
      description:
        'Пошаговое руководство по подбору временного интервала для торговли',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите стиль торговли',
          text: 'Решите, как часто вы хотите совершать сделки. Скальпинг требует M1-M15, свинг-трейдинг — H4-D1, инвестирование — W1-MN.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените доступное время',
          text: 'Если можете следить за рынком весь день — подойдут младшие таймфреймы. При ограниченном времени выбирайте H4 или D1.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Учтите волатильность актива',
          text: 'Криптовалюты волатильны — эффективны M15-H1. Фондовый рынок стабильнее — лучше H4-D1.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Протестируйте на демо-счёте',
          text: 'Торгуйте минимум 2-4 недели на выбранном таймфрейме, чтобы понять его особенности и подходит ли он вам.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Внедрите мульти-таймфрейм анализ',
          text: 'Используйте старший таймфрейм для тренда, средний для зон, младший для входа. Это повысит точность сделок.',
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
      name: 'Глоссарий терминов таймфреймов',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал формирования одной свечи или бара на ценовом графике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description:
            'Стиль торговли с множеством коротких сделок на младших таймфреймах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Среднесрочная торговля с удержанием позиций от нескольких дней до недель',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мульти-таймфрейм анализ',
          description:
            'Метод анализа рынка с использованием нескольких временных интервалов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный шум',
          description:
            'Хаотичные ценовые колебания, не отражающие реальный тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Индикатор среднего истинного диапазона для измерения волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговая сессия',
          description:
            'Период активной работы определённого финансового центра',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Интрадей',
          description:
            'Внутридневная торговля с закрытием всех позиций до конца сессии',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Позиционный трейдинг',
          description:
            'Долгосрочная торговля с удержанием позиций от недель до месяцев',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Объём торгов и способность быстро купить или продать актив без значительного влияния на цену',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
