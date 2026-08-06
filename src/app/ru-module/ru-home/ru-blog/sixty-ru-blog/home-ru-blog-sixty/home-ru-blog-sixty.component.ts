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
  selector: 'app-home-ru-blog-sixty',
  templateUrl: './home-ru-blog-sixty.component.html',
  styleUrl: './home-ru-blog-sixty.component.scss',
})
export class HomeRuBlogSixtyComponent implements OnInit {
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
      'Индикаторы в трейдинге: виды и применение | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Индикаторы в трейдинге: трендовые, осцилляторы и объёмные. Как они работают, что показывают и почему индикатор не сигнал сам по себе.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
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
            'Индикаторы в трейдинге: какие работают, почему запаздывают и что вместо них',
          description:
            'Индикаторы в трейдинге: трендовые, осцилляторы и объёмные. Как они работают, что показывают и почему индикатор не сигнал сам по себе.',
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
            '@id': 'https://arapov.trade/ru/freestudying/trading-indicators',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trading-indicators.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'торговые индикаторы, стохастик, MACD, RSI, дивергенция, осциллятор, объёмный анализ',
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
          name: 'Почему индикаторы в трейдинге запаздывают?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что любой индикатор считается из уже закрытых свечей, то есть из прошлых цен. Он по своей природе показывает то, что рынок уже сделал, а не то, что будет. Запаздывание это не дефект настройки, а свойство самого инструмента, и его потолок это описание прошлого.',
          },
        },
        {
          '@type': 'Question',
          name: 'Работают ли сигналы стохастика, MACD и скользящих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На первых сделках пересечения часто кажутся рабочими, но на дистанции в сотни сделок результат у них примерно как у монетки: устойчивого перевеса нет, а спред и комиссия медленно подтачивают депозит. Я не строю на них вход, а смотрю на уровень и объём.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое дивергенция простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это расхождение между ценой и индикатором: цена обновляет экстремум, а индикатор уже нет. Бычья появляется на падении и намекает на разворот вверх, медвежья зеркальна. Но это только намёк на слабость импульса, а не готовая точка входа.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему дивергенция на индикаторе часто обманывает?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что на индикаторе она запаздывает и в сильном тренде даёт серию ложных сигналов: цена спокойно идёт дальше и выбивает ранних покупателей. Честнее смотреть расхождение цены и объёма, а решение принимать по сильному уровню и разворотной свече.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие индикаторы реально полезны?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту полезны объёмные индикаторы и измерители волатильности вроде ATR, потому что они показывают причину движения, а не след цены. Запаздывающие осцилляторы как генератор сигналов я в своей торговле не использую, оставил только объём.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trading-indicators#howto',
      name: 'Как относиться к торговым индикаторам',
      description:
        'Пошаговый разбор того, как устроены индикаторы, почему они запаздывают и что использовать вместо их сигналов',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что индикатор считается из прошлых цен и запаздывает',
          text: 'Торговый индикатор это формула, которая берёт прошлые цены и объёмы и превращает их в линию или цифру на графике.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проверьте сигналы стохастика, MACD и скользящих на дистанции',
          text: 'На первых сделках пересечения кажутся рабочими, но на дистанции их результат близок к монетке.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Разберитесь, что такое дивергенция и что она показывает',
          text: 'Дивергенция это расхождение между ценой и индикатором, намёк на ослабление текущего импульса.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Не торгуйте дивергенцию вслепую, ждите уровень и объём',
          text: 'На индикаторе дивергенция запаздывает, поэтому решение принимают по сильному уровню и подтверждению объёмом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Опирайтесь на объём и волатильность, а не на сигналы осцилляторов',
          text: 'Реальную пользу приносят объёмные индикаторы и измерители волатильности, потому что они показывают причину, а не след цены.',
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
          name: 'Торговый индикатор',
          description:
            'Формула, которая берёт прошлые цены и объёмы за выбранный период и превращает их в линию, гистограмму или цифру на графике.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осциллятор',
          description:
            'Тип индикатора, который меряет не саму цену, а скорость её изменения и ищет крайние состояния перекупленности и перепроданности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между движением цены и показаниями индикатора, когда цена обновляет экстремум, а индикатор этот экстремум уже не подтверждает.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
