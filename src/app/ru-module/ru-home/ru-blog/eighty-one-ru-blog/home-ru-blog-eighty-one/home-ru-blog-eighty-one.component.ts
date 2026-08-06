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
  selector: 'app-home-ru-blog-eighty-one',
  templateUrl: './home-ru-blog-eighty-one.component.html',
  styleUrl: './home-ru-blog-eighty-one.component.scss',
})
export class HomeRuBlogEightyOneComponent {
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
      'Паттерн Треугольник в трейдинге: полное руководство | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Паттерн треугольник в трейдинге: полное руководство по торговле. Узнайте, как распознавать восходящий, нисходящий и симметричный треугольники для успешной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/trianglefigure.webp',
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
          '@id': 'https://arapov.trade/ru/freestudying/trianglefigure#article',
          headline:
            'Паттерн Треугольник в трейдинге: полное руководство по торговле',
          description:
            'Подробное руководство по паттерну треугольник в техническом анализе. Восходящий, нисходящий и симметричный треугольники: идентификация, торговые стратегии и управление рисками.',
          image: 'https://arapov.trade/assets/img/content/triangle1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@id': 'https://arapov.trade/#organization',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/trianglefigure',
          },
          articleSection: 'Технический анализ',
          keywords: [
            'паттерн треугольник',
            'технический анализ',
            'восходящий треугольник',
            'нисходящий треугольник',
            'симметричный треугольник',
            'торговые стратегии',
          ],
          wordCount: 1305,
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
      '@id': 'https://arapov.trade/ru/freestudying/trianglefigure#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое паттерн треугольник в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Паттерн треугольник — это графическая формация технического анализа, которая образуется при сужении ценового диапазона между линиями поддержки и сопротивления. Данный паттерн сигнализирует о консолидации рынка перед потенциальным пробоем в одном из направлений.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие виды треугольников существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В техническом анализе выделяют три основных типа треугольников: восходящий треугольник (бычий сигнал с горизонтальным сопротивлением), нисходящий треугольник (медвежий сигнал с горизонтальной поддержкой) и симметричный треугольник (нейтральный паттерн с равновесием сил).',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать паттерн треугольник?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговля треугольником предполагает вход в позицию после подтверждённого пробоя одной из границ формации. Стоп-лосс размещается за противоположной границей, а цель по прибыли рассчитывается по высоте треугольника, отложенной от точки пробоя.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как избежать ложных пробоев треугольника?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для фильтрации ложных пробоев необходимо: дождаться закрытия свечи за границей паттерна, подтвердить пробой ростом объёмов торгов, использовать дополнительные индикаторы (RSI, MACD) и применять процентные фильтры для исключения незначительных выходов за границы.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких таймфреймах лучше торговать треугольники?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее надёжные сигналы треугольник даёт на средних и старших таймфреймах — от часового до дневного графика. Формации на недельных графиках приводят к наиболее значительным движениям, но требуют терпения. Младшие таймфреймы дают больше ложных сигналов.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trianglefigure#howto',
      name: 'Как торговать паттерн треугольник',
      description:
        'Пошаговое руководство по торговле паттерном треугольник в техническом анализе',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Идентификация паттерна',
          text: 'Найдите на графике сужающийся ценовой диапазон с минимум четырьмя точками касания границ. Определите тип треугольника: восходящий, нисходящий или симметричный.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализ объёмов',
          text: 'Убедитесь, что объёмы торгов снижаются по мере формирования треугольника. Это подтверждает достоверность паттерна и накопление энергии для пробоя.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ожидание пробоя',
          text: 'Дождитесь пробоя одной из границ треугольника с закрытием свечи за пределами формации. Подтвердите пробой увеличением объёмов торгов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Открытие позиции',
          text: 'Войдите в позицию в направлении пробоя. Установите стоп-лосс за противоположной границей треугольника или последним локальным экстремумом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Фиксация прибыли',
          text: 'Рассчитайте целевой уровень по высоте треугольника. Рассмотрите частичную фиксацию прибыли на промежуточных уровнях для снижения рисков.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trianglefigure#terms',
      name: 'Глоссарий терминов паттерна треугольник',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Восходящий треугольник',
          description:
            'Бычий паттерн технического анализа с горизонтальным уровнем сопротивления и восходящей линией поддержки, указывающий на вероятный пробой вверх.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нисходящий треугольник',
          description:
            'Медвежий паттерн с горизонтальной линией поддержки и нисходящей линией сопротивления, сигнализирующий о возможном пробое вниз.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Симметричный треугольник',
          description:
            'Нейтральный паттерн с одновременным сближением обеих трендовых линий, отражающий равновесие рыночных сил с непредсказуемым направлением пробоя.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой',
          description:
            'Выход цены за пределы границы треугольника с закреплением за её пределами, сигнализирующий о начале нового направленного движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Временный выход цены за границу треугольника с последующим возвратом внутрь формации, не приводящий к развитию направленного движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консолидация',
          description:
            'Период бокового движения цены в сужающемся диапазоне, характеризующийся снижением волатильности и объёмов торгов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Возврат цены к пробитому уровню для его тестирования в качестве новой поддержки или сопротивления после пробоя.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Высота треугольника',
          description:
            'Расстояние между верхней и нижней границами формации в её основании, используемое для расчёта целевого уровня движения после пробоя.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
