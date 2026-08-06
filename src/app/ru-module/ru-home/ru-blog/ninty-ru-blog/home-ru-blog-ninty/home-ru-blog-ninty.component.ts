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
  selector: 'app-home-ru-blog-ninty',
  templateUrl: './home-ru-blog-ninty.component.html',
  styleUrl: './home-ru-blog-ninty.component.scss',
})
export class HomeRuBlogNintyComponent implements OnInit {
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
    this.titleService.setTitle(
      'Метод Мартингейла в трейдинге: стратегия управления капиталом | Игорь Арапов.',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Метод Мартингейла в трейдинге: полный разбор стратегии удвоения позиций, её применение на Форекс и криптовалютах, расчёт рисков и практические примеры.',
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
            'https://arapov.trade/ru/freestudying/metodmartingejla#article',
          headline:
            'Метод Мартингейла в трейдинге: стратегия управления капиталом',
          description:
            'Полный разбор стратегии удвоения позиций, её применение на Форекс и криптовалютах, расчёт рисков.',
          image: 'https://arapov.trade/assets/img/content/martingale1.jpg',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Pair Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/metodmartingejla',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'метод Мартингейла',
            'стратегия Мартингейла',
            'управление капиталом',
          ],
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
      '@id': 'https://arapov.trade/ru/freestudying/metodmartingejla#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое метод Мартингейла простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стратегия управления капиталом с удвоением позиции после каждого убытка для компенсации потерь одной прибыльной сделкой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему Мартингейл опасен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Экспоненциальный рост позиций при серии убытков может привести к полной потере депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Работает ли Мартингейл на Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технически да, но требует большого депозита и строгого риск-менеджмента.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой депозит нужен для Мартингейла?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Депозит должен выдерживать 8-10 последовательных убыточных сделок с удвоением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Есть ли альтернативы Мартингейлу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да: арифметическая прогрессия, анти-Мартингейл, ограниченный Мартингейл с лимитом удвоений.',
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
      '@id': 'https://arapov.trade/ru/freestudying/metodmartingejla#howto',
      name: 'Как безопасно применять Мартингейл',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Рассчитайте депозит',
          text: 'Определите капитал для 8-10 убыточных сделок подряд.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Установите лимит',
          text: 'Ограничьте удвоения до 4-5.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Торгуйте по тренду',
          text: 'Открывайте сделки по направлению основного движения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Используйте арифметику',
          text: 'Увеличивайте объём на 30-50% вместо удвоения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Тестируйте на демо',
          text: 'Проведите 100 сделок перед реальной торговлей.',
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
      '@id': 'https://arapov.trade/ru/freestudying/metodmartingejla#terms',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Метод Мартингейла',
          description: 'Стратегия удвоения позиции после убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Геометрическая прогрессия',
          description: 'Последовательность с умножением на коэффициент',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Арифметическая прогрессия',
          description: 'Последовательность с постоянной разностью',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description: 'Снижение капитала от максимума',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description: 'Управление торговыми рисками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лот',
          description: 'Единица объёма позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description: 'Защитный ордер от убытков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description: 'Ордер фиксации прибыли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description: 'Изменчивость цены актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Анти-Мартингейл',
          description: 'Удвоение после прибыльных сделок',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
