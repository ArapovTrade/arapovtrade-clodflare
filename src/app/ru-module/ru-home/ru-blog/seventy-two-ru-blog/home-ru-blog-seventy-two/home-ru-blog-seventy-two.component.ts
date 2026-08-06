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
  selector: 'app-home-ru-blog-seventy-two',
  templateUrl: './home-ru-blog-seventy-two.component.html',
  styleUrl: './home-ru-blog-seventy-two.component.scss',
})
export class HomeRuBlogSeventyTwoComponent {
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
      'Экономический календарь: как использовать в трейдинге',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по использованию экономического календаря. Изучите ключевые события, стратегии торговли на новостях и типичные ошибки трейдеров.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-15' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economiccalendar.png',
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
          headline: 'Экономический календарь: как использовать в трейдинге',
          description:
            'Полное руководство по использованию экономического календаря. Изучите ключевые события, стратегии торговли на новостях и типичные ошибки трейдеров.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/economiccalendar',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/economiccalendar.png',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'экономический календарь',
            'торговля на новостях',
            'NFP',
            'решения ФРС',
            'волатильность',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое экономический календарь?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Экономический календарь — это инструмент, содержащий расписание публикации важных макроэкономических данных, решений центробанков и корпоративных отчётов. Он помогает трейдерам планировать сделки и управлять рисками.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие события наиболее важны в календаре?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее важные события: решения центральных банков по ставкам, данные по ВВП, инфляция (CPI), отчёты о занятости (NFP), корпоративные отчёты крупных компаний и геополитические события.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать на новостях?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Существует несколько стратегий: торговля до новости на ожиданиях, вход после публикации по направлению импульса, торговля на откате после первоначального движения, ловля ложных пробоев.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему важно учитывать прогноз и факт?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рынок реагирует не на абсолютные значения, а на отклонение от прогноза. Превышение ожиданий обычно позитивно для актива, недобор — негативно. Сильные отклонения вызывают максимальную волатильность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие ошибки допускают при торговле на новостях?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Типичные ошибки: вход сразу после публикации без подтверждения, слишком узкий стоп-лосс, игнорирование расширения спредов, отсутствие торгового плана, эмоциональные решения.',
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
      name: 'Как использовать экономический календарь',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите расписание событий',
          text: 'Откройте экономический календарь и определите ключевые события на неделю: решения по ставкам, данные о занятости, ВВП, инфляция.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцените степень важности',
          text: 'События маркируются по уровню влияния. Сосредоточьтесь на высокозначимых публикациях, вызывающих максимальную волатильность.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Изучите прогнозы аналитиков',
          text: 'Сравните прогнозные значения с предыдущими. Понимание ожиданий рынка помогает предсказать направление реакции.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Спланируйте торговлю',
          text: 'Решите: торговать до новости, после публикации или избегать периода волатильности. Подготовьте сценарии для разных исходов.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте рисками',
          text: 'Установите стоп-лосс с учётом расширения спредов. Уменьшите размер позиции перед важными релизами. Будьте готовы к проскальзыванию.',
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
      name: 'Термины экономического календаря',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Экономический календарь',
          description:
            'Расписание публикации важных экономических показателей и событий',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — отчёт о занятости в несельскохозяйственном секторе США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прогноз',
          description:
            'Ожидаемое значение показателя на основе консенсуса аналитиков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фактическое значение',
          description: 'Реальные данные, опубликованные в момент выхода отчёта',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Степень важности',
          description:
            'Уровень влияния события на рынок (низкая, средняя, высокая)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговля на новостях',
          description:
            'Стратегия входа в позиции на основе экономических публикаций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Расширение спреда',
          description:
            'Увеличение разницы между ценой покупки и продажи в периоды волатильности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Корпоративная отчётность',
          description: 'Квартальные и годовые финансовые отчёты компаний',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
