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
  selector: 'app-home-ru-blog-seventy-nine',
  templateUrl: './home-ru-blog-seventy-nine.component.html',
  styleUrl: './home-ru-blog-seventy-nine.component.scss',
})
export class HomeRuBlogSeventyNineComponent {
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
      'Психология усреднения в трейдинге: ловушка для начинающих | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Психология усреднения в трейдинге: почему эта стратегия опасна, какие психологические ловушки заставляют трейдеров усреднять и как избежать слива депозита.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychologyofaveraging.webp',
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
          headline: 'Психология усреднения в трейдинге: ловушка для начинающих',
          description:
            'Психология усреднения в трейдинге: почему эта стратегия опасна и как избежать слива депозита.',
          image:
            'https://arapov.trade/assets/img/content/psychologyofaveraging.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/psychologyofaveraging',
          },
          articleSection: 'Обучение трейдингу',
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
          name: 'Что такое усреднение в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усреднение — это докупка актива при падении цены для снижения средней цены входа. Трейдер надеется, что при развороте рынка сможет выйти с меньшими убытками или прибылью.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему усреднение опасно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усреднение увеличивает объём позиции и потенциальные убытки. Рынок может падать дольше, чем у трейдера хватит капитала, что приводит к полной потере депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие психологические причины толкают на усреднение?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные причины: страх признать ошибку, надежда на разворот, иллюзия контроля, желание отыграться и эффект невозвратных затрат.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как избежать усреднения?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте стоп-лоссы, ограничивайте риск на сделку до 1-2%, следуйте торговому плану и принимайте убытки как часть трейдинга.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что делать вместо усреднения?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фиксируйте убытки по стоп-лоссу, торгуйте по тренду, ведите торговый дневник и ищите новые точки входа вместо наращивания убыточных позиций.',
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
      name: 'Как избавиться от привычки усредняться',
      description:
        'Пошаговый план преодоления психологической ловушки усреднения в трейдинге.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Примите убытки как норму',
          text: 'Осознайте, что убыточные сделки — часть трейдинга. Фиксация небольшого убытка лучше наращивания позиции в надежде на разворот.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Установите стоп-лосс',
          text: 'Перед входом определите уровень выхода при убытке и не переносите его. Стоп-лосс защищает от катастрофических потерь.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ограничьте риск на сделку',
          text: 'Рискуйте не более 1-2% депозита на одну сделку. Это исключает необходимость усреднения для спасения позиции.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ведите торговый дневник',
          text: 'Записывайте все сделки и эмоции. Анализ выявит паттерны, толкающие на усреднение, и поможет их устранить.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Торгуйте по тренду',
          text: 'Следуйте направлению рынка вместо попыток ловить развороты. Это снижает вероятность попадания в глубокие просадки.',
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
      name: 'Глоссарий терминов усреднения',
      description: 'Ключевые термины психологии трейдинга и управления рисками',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Усреднение',
          description:
            'Докупка актива при падении цены для снижения средней цены входа',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description: 'Снижение стоимости торгового счёта от максимума',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Ордер автоматического закрытия позиции при достижении заданного убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-колл',
          description:
            'Принудительное закрытие позиций при недостатке средств на счёте',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аверсия к потерям',
          description:
            'Психологическая склонность избегать потерь сильнее, чем стремиться к прибыли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Иллюзия контроля',
          description:
            'Ложное ощущение влияния на исход событий через свои действия',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Эффект невозвратных затрат',
          description:
            'Склонность продолжать действие из-за уже вложенных ресурсов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description: 'Система управления рисками в торговле',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Документ с правилами входа, выхода и управления капиталом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Эмоциональное состояние, ведущее к импульсивным решениям',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
