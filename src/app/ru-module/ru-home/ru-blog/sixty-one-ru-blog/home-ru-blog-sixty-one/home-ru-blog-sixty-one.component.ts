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
  selector: 'app-home-ru-blog-sixty-one',
  templateUrl: './home-ru-blog-sixty-one.component.html',
  styleUrl: './home-ru-blog-sixty-one.component.scss',
})
export class HomeRuBlogSixtyOneComponent {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Smart Money Concepts: Полное Руководство по SMC | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money Concepts (SMC) — полное руководство по торговле на стороне институциональных участников. Order Blocks, Fair Value Gaps, ликвидность и стратегии входа.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-12-14' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneyconceptsguide.webp',
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
            '@id':
              'https://arapov.trade/ru/freestudying/smartmoneyconceptsguide',
          },
          headline:
            'Smart Money Concepts: полный гайд по стратегии умных денег',
          description:
            'Детальный разбор концепции Smart Money. Как крупные игроки манипулируют ценой, захват ликвидности, объемный анализ.',
          image:
            'https://arapov.trade/assets/img/content/smartmoneyconceptsguide.webp',
          datePublished: '2025-01-15T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          inLanguage: 'ru',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/logo.png',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Smart Money и Захват Ликвидности | Обучение Трейдингу от А до Я',
            description:
              'Smart Money и захват ликвидности: полное руководство по стратегиям крупных игроков. Игорь Арапов показывает на живом примере фьючерса золота, как работает объемный анализ, стратегия Smart Money и почему профессиональные трейдеры манипулируют ценой перед разворотом рынка.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/nmDR1GUPoQg/maxresdefault.jpg',
              'https://img.youtube.com/vi/nmDR1GUPoQg/hqdefault.jpg',
            ],
            uploadDate: '2025-06-14T00:00:00+02:00',
            duration: 'PT37M3S',
            contentUrl: 'https://www.youtube.com/watch?v=nmDR1GUPoQg',
            embedUrl: 'https://www.youtube.com/embed/nmDR1GUPoQg',
            inLanguage: 'ru',
            keywords:
              'Smart Money, захват ликвидности, объемный анализ, смарт мани, трейдинг',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Концепция Smart Money: кто такие умные деньги на бирже',
                startOffset: 170,
                endOffset: 492,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=170',
              },
              {
                '@type': 'Clip',
                name: 'Композитный оператор: кто такие Smart Money',
                startOffset: 492,
                endOffset: 547,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=492',
              },
              {
                '@type': 'Clip',
                name: 'Уровни поддержки и сопротивления: как их правильно определять',
                startOffset: 547,
                endOffset: 656,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=547',
              },
              {
                '@type': 'Clip',
                name: 'Как увидеть Smart Money на графике через объемный анализ',
                startOffset: 656,
                endOffset: 1803,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=656',
              },
              {
                '@type': 'Clip',
                name: 'Захват ликвидности: логика ложного накола и манипуляций',
                startOffset: 1803,
                endOffset: 1888,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=1803',
              },
              {
                '@type': 'Clip',
                name: 'Основа работы любого финансового рынка: спрос и предложение',
                startOffset: 1888,
                endOffset: 2035,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=1888',
              },
              {
                '@type': 'Clip',
                name: 'Механика ложного накола: как профессионалы собирают стопы',
                startOffset: 2035,
                endOffset: 2140,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=2035',
              },
              {
                '@type': 'Clip',
                name: 'Дефицит ликвидности на рынке: почему это важно',
                startOffset: 2140,
                endOffset: 2223,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=2140',
              },
            ],
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneyconceptsguide#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Smart Money Concepts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money Concepts (SMC) — это методология анализа финансовых рынков, основанная на понимании действий институциональных участников: банков, хедж-фондов и маркет-мейкеров. Концепция раскрывает механику формирования цены через анализ ликвидности, рыночной структуры и поведения крупного капитала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Order Block в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Order Block — это ценовая зона на графике, где институциональные участники открывали или закрывали значительные позиции перед сильным рыночным движением. Бычий Order Block формируется последней медвежьей свечой перед ростом, медвежий — последней бычьей свечой перед падением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить Fair Value Gap?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap (FVG) — это зона дисбаланса цены, возникающая при резком импульсном движении. Бычий FVG образуется, когда минимум первой свечи выше максимума третьей свечи в восходящем движении. Цена стремится заполнить этот разрыв.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем SMC отличается от классического теханализа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Классический теханализ использует индикаторы (RSI, MACD), которые запаздывают относительно цены. SMC анализирует текущую динамику цены и объёмов в реальном времени, фокусируясь на механике ликвидности и действиях институционалов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как управлять рисками при торговле по SMC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лоссы размещаются за уровнями ликвидности, а не в очевидных местах. Оптимальный риск — 1-2% от депозита на сделку. Используйте частичное закрытие позиций, перевод стопа в безубыток и трейлинг-стоп.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/smartmoneyconceptsguide#howto',
      name: 'Как торговать по Smart Money Concepts',
      description:
        'Пошаговое руководство по применению SMC в торговле на финансовых рынках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализ рыночной структуры',
          text: 'Определите текущую фазу рынка: тренд или консолидация. Идентифицируйте Break of Structure (BOS) и Change of Character (CHoCH) для понимания направления движения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определение зон ликвидности',
          text: 'Найдите области скопления стоп-лоссов: локальные максимумы/минимумы, границы консолидации, очевидные уровни поддержки и сопротивления.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Идентификация Order Blocks и FVG',
          text: 'Отметьте Order Blocks — последние противоположные свечи перед импульсом. Найдите Fair Value Gaps — незаполненные разрывы цены между свечами.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ожидание ретеста и подтверждения',
          text: 'Дождитесь возврата цены в зону Order Block или FVG. Подтвердите вход свечными паттернами (пин-бар, поглощение) или увеличением объёмов.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управление позицией и рисками',
          text: 'Разместите стоп-лосс за уровнем ликвидности. Фиксируйте частичную прибыль на ключевых уровнях. Переводите стоп в безубыток при движении в вашу сторону.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/smartmoneyconceptsguide#glossary',
      name: 'Глоссарий терминов Smart Money Concepts',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money Concepts',
          description:
            'Методология анализа рынка, основанная на понимании действий институциональных участников и механики ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Ценовая зона, где институционалы открывали или закрывали значительные позиции перед сильным движением',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Зона дисбаланса цены, возникающая при резком импульсном движении без достаточного количества встречных ордеров',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break of Structure',
          description:
            'Пробой значимого экстремума, подтверждающий смену тренда или продолжение импульса',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Change of Character',
          description:
            'Первые признаки возможного разворота направления движения цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Grab',
          description:
            'Целенаправленное движение цены в зону стоп-лоссов с последующим разворотом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Sweep',
          description:
            'Тактика выбивания стопов розничных трейдеров перед движением в противоположную сторону',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Институционалы',
          description:
            'Крупные участники рынка: банки, хедж-фонды, маркет-мейкеры и профессиональные управляющие активами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона ликвидности',
          description:
            'Область скопления ордеров, где институционалы собирают ликвидность для открытия позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возврат цены к пробитому уровню или зоне для подтверждения смены роли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
