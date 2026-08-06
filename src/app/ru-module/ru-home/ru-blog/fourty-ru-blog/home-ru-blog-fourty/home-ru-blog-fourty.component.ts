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
  selector: 'app-home-ru-blog-fourty',
  templateUrl: './home-ru-blog-fourty.component.html',
  styleUrl: './home-ru-blog-fourty.component.scss',
})
export class HomeRuBlogFourtyComponent implements OnInit {
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
      'Управление сделкой: вход, сопровождение, выход | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как управлять сделкой после входа: перенос в безубыток, частичная фиксация, трейлинг-стоп и дисциплина выхода по плану, а не по эмоциям.',
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
            'Управление сделкой в трейдинге: тейк-профит, безубыток, трейлинг и хедж',
          description:
            'Как управлять сделкой после входа: перенос в безубыток, частичная фиксация, трейлинг-стоп и дисциплина выхода по плану, а не по эмоциям.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/trade-management',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trade-management.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Риск-менеджмент',
          keywords:
            'управление сделкой, тейк-профит, безубыток, трейлинг-стоп, хеджирование, фиксация прибыли, перенос стопа, выход из сделки',
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
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
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
          name: 'Что такое управление сделкой в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это всё, что вы делаете с позицией после входа: где фиксируете прибыль тейк-профитом, когда переносите стоп в безубыток, как ведёте прибыль трейлинг-стопом. По сути это управление собственными жадностью и страхом на выходе, потому что план там решает больше, чем сам вход.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где правильно ставить тейк-профит?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'От структуры рынка, а не от желаемой суммы. Логичная цель это ближайший сильный уровень, до которого цена дойдёт с большой вероятностью: чуть ниже сопротивления в лонге и чуть выше поддержки в шорте. Сначала смотрите, докуда реально может дойти цена, и только потом считаете, устраивает ли вас такая прибыль.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда переносить стоп в безубыток?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'После того как цена прошла заметный путь в вашу сторону и закрепилась за уровнем на объёме. До этого момента перенос рано: обычный технический откат заденет стоп в точке входа и выбьет вас из позиции, которая потом отработала бы в плюс.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем опасен ранний безубыток?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп, переведённый в ноль слишком рано, цепляет рыночный шум и выносит вас из сделки до того, как она отработала. Цена уходит к цели уже без вас. Получается, что, защищая прибыль, трейдер режет её собственный источник.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как настроить дистанцию трейлинг-стопа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'От волатильности инструмента и структуры движения, а не случайным числом пунктов. Дистанция должна вмещать обычные откаты, но не возвращать рынку лишнее. Слишком тесная выбивает из сделки на ровном месте, слишком широкая отдаёт большую часть прибыли. Во флэте трейлинг чаще вредит, он хорош в выраженном тренде.',
          },
        },
        {
          '@type': 'Question',
          name: 'Нужно ли хеджирование новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В моём опыте нет. Главную задачу хеджа, ограничить убыток, проще и дешевле решает обычный стоп-лосс. Хедж держит две встречные позиции, добавляет спред, комиссии и риск запутаться. Новичку надёжнее освоить защиту стопом и риск один-два процента на сделку.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trade-management#howto',
      name: 'Как управлять открытой сделкой: тейк, безубыток, трейлинг, хедж',
      description:
        'Пошаговый разбор управления позицией после входа: фиксация прибыли, перенос стопа в безубыток, ведение прибыли трейлингом и роль хеджирования',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что управление сделкой начинается после входа',
          text: 'Управление сделкой это всё, что трейдер делает с позицией после входа, чтобы защитить и забрать прибыль по плану, а не на эмоциях.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ставьте тейк-профит от уровней, а не от желаемой суммы',
          text: 'Тейк-профит ставят от структуры рынка, от ближайшего сильного уровня, до которого цена дойдёт с большой вероятностью.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Считайте тейк в связке со стопом',
          text: 'Сам по себе тейк ничего не решает, важно его отношение к риску по стопу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Переносите стоп в безубыток после подтверждения движения',
          text: 'Стоп в безубыток переносят только после того, как цена прошла путь и закрепилась за уровнем на объёме.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Настраивайте трейлинг-стоп от волатильности',
          text: 'Дистанцию трейлинг-стопа задают от волатильности инструмента и структуры движения, а не случайным числом пунктов.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Не усложняйте защиту хеджем, если хватает стопа',
          text: 'Новичку хеджирование не нужно, его задачу проще и дешевле решает обычный стоп-лосс.',
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
      name: 'Глоссарий терминов статьи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Управление сделкой',
          description:
            'Это всё, что трейдер делает с позицией после входа, чтобы защитить и забрать прибыль по плану, а не на эмоциях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Это отложенный ордер, который автоматически закрывает позицию с прибылью, как только цена достигает заранее заданного трейдером уровня.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Безубыток',
          description:
            'Это перенос стоп-лосса на уровень цены открытия позиции, после которого сделка перестаёт нести риск убытка и в худшем случае закрывается в ноль.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджирование',
          description:
            'Это снижение риска по основной позиции за счёт открытия противоположной или связанной сделки, которая приносит прибыль, когда основная уходит в убыток.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
