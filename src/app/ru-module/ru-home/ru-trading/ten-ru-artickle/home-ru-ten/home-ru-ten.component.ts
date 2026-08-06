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
  selector: 'app-home-ru-ten',
  templateUrl: './home-ru-ten.component.html',
  styleUrl: './home-ru-ten.component.scss',
})
export class HomeRuTenComponent implements OnInit {
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
      'Позиции в трейдинге: длинные, короткие и перенос через ночь | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Полное руководство по позициям в трейдинге: длинные и короткие сделки, дата валютирования, свопы и перенос позиций. Как управлять рисками и выбирать стратегию.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-13' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/currencyPosition.webp',
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
            'Позиции в трейдинге: длинные, короткие и перенос через ночь',
          description:
            'Полное руководство по позициям в трейдинге: длинные и короткие сделки, дата валютирования, свопы и перенос позиций. Как управлять рисками и выбирать стратегию.',
          image: 'https://arapov.trade/assets/img/content/position1.png',
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
            '@id': 'https://arapov.trade/ru/freestudying/currencyposition',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1550,
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое длинная позиция в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Длинная позиция (лонг) — это покупка актива с расчётом на рост его стоимости. Трейдер покупает дешевле и продаёт дороже, зарабатывая на разнице цен.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает короткая позиция?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Короткая позиция (шорт) — это продажа заёмного актива с расчётом на падение цены. Трейдер берёт актив в долг у брокера, продаёт его, затем выкупает дешевле и возвращает брокеру.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое своп в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Своп — это плата за перенос позиции через ночь, зависящая от разницы процентных ставок валют в паре. Своп может быть положительным (начисляется) или отрицательным (списывается).',
          },
        },
        {
          '@type': 'Question',
          name: 'Что означает дата валютирования?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дата валютирования — это день, когда стороны сделки обязаны завершить расчёты. На Форекс стандартная схема T+2 означает расчёты через два рабочих дня после заключения сделки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие типы позиций существуют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные типы: спекулятивные (краткосрочный заработок), хеджирующие (защита от рисков), инвестиционные (долгосрочный рост) и арбитражные (заработок на разнице цен между рынками).',
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
      name: 'Как открыть и управлять торговой позицией',
      description: 'Пошаговое руководство по работе с позициями в трейдинге',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите направление рынка',
          text: 'Проанализируйте тренд с помощью технического анализа. Восходящий тренд подходит для длинных позиций, нисходящий — для коротких.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите тип позиции',
          text: 'Определитесь со стратегией: спекулятивная для краткосрочной торговли, инвестиционная для долгосрочного удержания или хеджирующая для защиты портфеля.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Рассчитайте размер позиции',
          text: 'Определите объём сделки исходя из правил риск-менеджмента. Не рискуйте более 1-2% депозита на одну сделку.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите защитные ордера',
          text: 'Разместите стоп-лосс для ограничения убытков и тейк-профит для фиксации прибыли. Это защитит капитал от резких движений.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Учитывайте свопы при переносе',
          text: 'Если планируете удерживать позицию дольше дня, рассчитайте свопы заранее. Они могут существенно влиять на итоговую прибыль.',
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
      name: 'Терминология позиций в трейдинге',
      description: 'Ключевые понятия работы с позициями',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Длинная позиция',
          description: 'Покупка актива с расчётом на рост его стоимости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Короткая позиция',
          description: 'Продажа заёмного актива с расчётом на падение цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description: 'Плата за перенос позиции через ночь',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дата валютирования',
          description: 'День завершения расчётов по сделке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спотовая сделка',
          description: 'Сделка с расчётами T+2',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перенос позиции',
          description: 'Продление незакрытой позиции на следующий день',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description: 'Защита портфеля от неблагоприятных изменений цен',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description: 'Заёмные средства для увеличения размера позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description: 'Ордер автоматического закрытия убыточной позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description: 'Ордер автоматической фиксации прибыли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
