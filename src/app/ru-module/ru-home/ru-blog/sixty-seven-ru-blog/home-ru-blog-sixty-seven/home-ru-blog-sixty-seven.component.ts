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
  selector: 'app-home-ru-blog-sixty-seven',
  templateUrl: './home-ru-blog-sixty-seven.component.html',
  styleUrl: './home-ru-blog-sixty-seven.component.scss',
})
export class HomeRuBlogSixtySevenComponent {
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
      'Объёмный анализ трендов: практическое руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как использовать объёмы для анализа рыночных трендов. Фазы тренда, индикаторы объёма, выявление ложных пробоев и стратегии Smart Money.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trendvolumeanalysis.webp',
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
          '@id':
            'https://arapov.trade/ru/freestudying/trendvolumeanalysis#article',
          headline: 'Объёмный анализ трендов: практическое руководство',
          description:
            'Узнайте, как использовать объёмы для анализа рыночных трендов. Фазы тренда, индикаторы объёма, выявление ложных пробоев и стратегии Smart Money.',
          image:
            'https://arapov.trade/assets/img/content/trendvolumeanalysis2.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage:
            'https://arapov.trade/ru/freestudying/trendvolumeanalysis',
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
          name: 'Что такое объёмный анализ в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объёмный анализ — это методика оценки рыночной активности на основе количества исполненных ордеров. Он позволяет определить истинность ценовых движений, выявить зоны ликвидности и понять намерения крупных участников рынка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как объёмы подтверждают силу тренда?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сильный тренд сопровождается ростом объёмов при движении в его направлении и снижением на коррекциях. Если цена растёт на падающих объёмах — тренд ослабевает и возможен разворот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выявить ложный пробой с помощью объёмов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинный пробой сопровождается резким ростом объёмов и продолжением движения. Ложный пробой происходит на низких объёмах с быстрым возвратом цены в диапазон — это манипуляция маркет-мейкеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы используются для анализа объёмов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные инструменты: Volume Profile для распределения по уровням, Delta Volume для баланса покупок/продаж, Footprint Charts для кластерного анализа, VWAP для средневзвешенной цены, OBV для накопленного объёма.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Point of Control (POC)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POC — это ценовой уровень с максимальным объёмом торгов за период. Он служит зоной притяжения цены и часто выступает динамической поддержкой или сопротивлением.',
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
      name: 'Как анализировать тренды с помощью объёмов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите текущую фазу тренда',
          text: 'Оцените, находится ли рынок в накоплении, импульсе, распределении или коррекции. Каждая фаза имеет характерное поведение объёмов.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте Volume Profile',
          text: 'Найдите зоны с высоким объёмом (HVN) и низким объёмом (LVN). POC показывает уровень справедливой цены, от которого часто начинаются движения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцените Delta Volume',
          text: 'Сравните объём агрессивных покупок и продаж. Положительная дельта на росте подтверждает силу покупателей.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проверьте объём на пробоях',
          text: 'Истинный пробой уровня сопровождается резким ростом объёма. Низкий объём на пробое — сигнал возможной ловушки.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ищите дивергенции цены и объёма',
          text: 'Если цена обновляет максимумы, а объёмы снижаются — тренд ослабевает. Это опережающий сигнал возможного разворота.',
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
      name: 'Глоссарий объёмного анализа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Объёмный анализ',
          description:
            'Методика оценки рыночной активности на основе количества исполненных сделок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Индикатор, отображающий распределение объёмов по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control (POC)',
          description:
            'Ценовой уровень с максимальным объёмом торгов за период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description:
            'Разница между агрессивными покупками и продажами за период.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description:
            'Кластерные графики, показывающие распределение объёмов внутри свечей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description:
            'Средневзвешенная по объёму цена актива за торговую сессию.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OBV',
          description:
            'Индикатор накопленного объёма, учитывающий направление цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за уровень с быстрым возвратом обратно.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопления',
          description:
            'Период скрытого формирования позиций крупными участниками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные институциональные участники рынка с информационным преимуществом.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
