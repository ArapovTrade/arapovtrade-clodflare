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
  selector: 'app-home-ru-twenty-four',
  templateUrl: './home-ru-twenty-four.component.html',
  styleUrl: './home-ru-twenty-four.component.scss',
})
export class HomeRuTwentyFourComponent implements OnInit {
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
      'Уровни Фибоначчи в трейдинге: полное руководство | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как использовать уровни Фибоначчи в трейдинге. Коррекция, расширение, золотое сечение — построение, стратегии и практические примеры.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicstate.webp',
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
          headline:
            'Уровни Фибоначчи в трейдинге: полное руководство по применению',
          description:
            'Подробное руководство по уровням Фибоначчи. Коррекционные уровни (23.6%, 38.2%, 50%, 61.8%, 78.6%), расширения, стратегии торговли и практические примеры на реальных рынках.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/fibonaccilevels',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/economicstate.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'уровни Фибоначчи, коррекция, расширение, золотое сечение, трейдинг',
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
          name: 'Что такое уровни Фибоначчи в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Уровни Фибоначчи — это инструмент технического анализа, основанный на математической последовательности чисел Фибоначчи. Ключевые уровни (23.6%, 38.2%, 50%, 61.8%, 78.6%) используются для определения зон поддержки и сопротивления, прогнозирования глубины коррекций и поиска точек входа в рынок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой уровень Фибоначчи самый важный?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Уровень 61.8%, известный как золотое сечение, считается наиболее значимым. Он часто выступает сильной зоной поддержки или сопротивления. Также важны уровни 50% (психологический) и 38.2% (первая значимая коррекция). Выбор уровня зависит от силы тренда и рыночного контекста.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как правильно построить уровни Фибоначчи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для построения уровней Фибоначчи выберите значимые экстремумы — локальный максимум и минимум ценового движения. В восходящем тренде протяните инструмент от минимума к максимуму, в нисходящем — от максимума к минимуму. Платформа автоматически рассчитает и отобразит коррекционные уровни.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое расширения Фибоначчи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Расширения Фибоначчи используются для определения целей движения цены после пробоя ключевых уровней. Основные уровни расширения: 127.2% (первая цель), 161.8% (ключевая цель для фиксации прибыли), 261.8% и 423.6% (для высоковолатильных рынков). Они помогают устанавливать тейк-профиты.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему уровни Фибоначчи работают?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Уровни Фибоначчи работают благодаря массовому использованию трейдерами, что создаёт эффект самоисполняющегося пророчества. Многие участники рынка размещают ордера на этих уровнях, усиливая их значимость. Также числа Фибоначчи отражают естественные пропорции, встречающиеся в природе и рыночных структурах.',
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
      name: 'Как торговать по уровням Фибоначчи',
      description:
        'Пошаговое руководство по применению уровней Фибоначчи для прибыльной торговли на финансовых рынках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите тренд и значимые экстремумы',
          text: 'Найдите чёткий импульсный движение на графике. Определите локальный минимум и максимум этого движения. Для восходящего тренда это будет swing low и swing high, для нисходящего — наоборот.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Постройте уровни коррекции Фибоначчи',
          text: 'Выберите инструмент Fibonacci Retracement на торговой платформе. В восходящем тренде протяните линию от минимума к максимуму. Платформа автоматически отобразит уровни 23.6%, 38.2%, 50%, 61.8% и 78.6%.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь коррекции к ключевому уровню',
          text: 'Наблюдайте за откатом цены к уровням Фибоначчи. Наиболее значимые зоны для входа — 38.2%, 50% и 61.8%. Уровень 61.8% (золотое сечение) считается оптимальным для входа в направлении тренда.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите сигнал дополнительными инструментами',
          text: 'Ищите подтверждение: свечные паттерны (пин-бар, поглощение), совпадение с горизонтальными уровнями или скользящими средними, сигналы индикаторов RSI или MACD. Кластер нескольких факторов усиливает сигнал.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Установите стоп-лосс и цель прибыли',
          text: 'Разместите стоп-лосс за уровнем 78.6% или за локальным экстремумом. Используйте уровни расширения Фибоначчи (161.8%, 261.8%) для определения целей прибыли. Соотношение риска к прибыли должно быть минимум 1:2.',
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
      name: 'Глоссарий терминов уровней Фибоначчи',
      description:
        'Основные термины и определения, связанные с уровнями Фибоначчи в техническом анализе',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Последовательность Фибоначчи',
          description:
            'Математическая последовательность чисел (0, 1, 1, 2, 3, 5, 8, 13...), где каждое число является суммой двух предыдущих. Соотношения между числами формируют ключевые уровни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Золотое сечение (61.8%)',
          description:
            'Ключевой уровень коррекции Фибоначчи, получаемый делением числа на следующее в последовательности. Считается наиболее значимым уровнем поддержки и сопротивления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коррекция Фибоначчи (Retracement)',
          description:
            'Инструмент для определения потенциальных уровней отката цены после импульсного движения. Основные уровни: 23.6%, 38.2%, 50%, 61.8%, 78.6%.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Расширение Фибоначчи (Extension)',
          description:
            'Инструмент для прогнозирования целей движения цены после пробоя. Основные уровни: 127.2%, 161.8%, 261.8%, 423.6%.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень 38.2%',
          description:
            'Первый значимый уровень коррекции, часто используемый для входа в сильных трендах. Неглубокий откат указывает на силу основного движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень 50%',
          description:
            'Психологически важный уровень, хотя не является частью последовательности Фибоначчи. Цена часто откатывается на половину предыдущего движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень 78.6%',
          description:
            'Глубокий уровень коррекции, после которого высока вероятность разворота тренда. Используется для размещения стоп-лоссов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кластер уровней',
          description:
            'Зона, где несколько технических уровней совпадают (Фибоначчи, горизонтальные уровни, скользящие средние), усиливая значимость данной области.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульсное движение',
          description:
            'Сильное направленное движение цены, от которого строятся уровни Фибоначчи для определения потенциальных зон коррекции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой уровня',
          description:
            'Ситуация, когда цена временно пробивает уровень Фибоначчи, но затем возвращается, создавая ловушку для трейдеров.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
