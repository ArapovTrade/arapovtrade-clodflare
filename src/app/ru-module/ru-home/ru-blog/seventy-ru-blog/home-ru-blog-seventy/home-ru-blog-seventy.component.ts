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
  selector: 'app-home-ru-blog-seventy',
  templateUrl: './home-ru-blog-seventy.component.html',
  styleUrl: './home-ru-blog-seventy.component.scss',
})
export class HomeRuBlogSeventyComponent {
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
      'Метод Вайкоффа: анализ объемов и рыночных циклов | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Метод Вайкоффа — анализ рыночных фаз, объемов и поведения крупных игроков для понимания структуры рынка и поиска точек входа',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-13' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/wyckoffsvolumeconcept.webp',
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
          headline: 'Метод Вайкоффа: анализ объемов и рыночных циклов',
          description:
            'Концепция Ричарда Вайкоффа: фазы рынка, анализ спроса и предложения, паттерны ложных пробоев и практическое применение',
          image: 'https://arapov.trade/assets/img/content/Wyckoff.jpg',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Что такое метод Вайкоффа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Метод Вайкоффа — это подход к анализу рынка через призму спроса и предложения, объемов и поведения крупных игроков. Он выделяет четыре фазы рынка: накопление, рост, распределение, падение.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Спринг в методе Вайкоффа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спринг — это ложный пробой уровня поддержки, когда цена кратковременно опускается ниже уровня, собирает стоп-ордера и резко разворачивается вверх. Сигнал к покупке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Аптраст?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Аптраст — ложный пробой сопротивления. Цена кратковременно пробивает уровень вверх, заманивает покупателей, затем резко падает. Сигнал к продаже.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как определить фазу накопления?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Накопление характеризуется боковым движением после падения, постепенным ростом объемов, появлением Спринга и последующим пробоем сопротивления на высоком объеме.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему метод Вайкоффа актуален сегодня?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Принципы спроса и предложения не изменились. Крупные игроки по-прежнему манипулируют ликвидностью, создают ложные пробои и накапливают позиции перед трендами.',
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
      name: 'Как торговать по методу Вайкоффа',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите фазу рынка',
          text: 'Накопление, рост, распределение или падение. Это определяет направление торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите ключевые точки',
          text: 'SC, AR, ST, LPS, SOS — эти точки показывают структуру фазы и готовность к движению.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Анализируйте объемы',
          text: 'Рост объемов на пробое подтверждает движение. Низкие объемы на тесте — сигнал продолжения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ищите Спринг или Аптраст',
          text: 'Ложные пробои — лучшие точки входа с коротким стопом и высоким потенциалом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Входите после подтверждения',
          text: 'Дождитесь возврата цены и подтверждения объемом перед открытием позиции.',
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
      name: 'Терминология метода Вайкоффа',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Накопление',
          description:
            'Фаза бокового движения после падения, где крупные игроки собирают позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Распределение',
          description:
            'Фаза бокового движения после роста, где крупные игроки фиксируют прибыль',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спринг',
          description: 'Ложный пробой поддержки с последующим разворотом вверх',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аптраст',
          description:
            'Ложный пробой сопротивления с последующим разворотом вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SC',
          description:
            'Selling Climax — кульминация продаж, резкое падение на высоком объеме',
        },
        {
          '@type': 'DefinedTerm',
          name: 'AR',
          description:
            'Automatic Rally — автоматический отскок после кульминации продаж',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ST',
          description:
            'Secondary Test — вторичный тест минимума для подтверждения поддержки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'LPS',
          description:
            'Last Point of Support — последняя точка поддержки перед ростом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SOS',
          description:
            'Sign of Strength — признак силы, пробой сопротивления на объеме',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные институциональные игроки, формирующие рыночные тренды',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
