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
  selector: 'app-home-ru-blog-fourty-two',
  templateUrl: './home-ru-blog-fourty-two.component.html',
  styleUrl: './home-ru-blog-fourty-two.component.scss',
})
export class HomeRuBlogFourtyTwoComponent implements OnInit {
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
      'Стили трейдинга: скальпинг, дейтрейдинг, свинг | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стили трейдинга простыми словами: скальпинг, внутридневная, свинг и позиционная торговля. Чем отличаются и кому какой стиль подходит.',
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
            'Стили торговли: скальпинг, дейтрейдинг и свинг — что выбрать новичку',
          description:
            'Стили трейдинга простыми словами: скальпинг, внутридневная, свинг и позиционная торговля. Чем отличаются и кому какой стиль подходит.',
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
            '@id': 'https://arapov.trade/ru/freestudying/trading-styles',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trading-styles.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для начинающих',
          keywords:
            'стили торговли, скальпинг, дейтрейдинг, внутридневная торговля, свинг-трейдинг, какой стиль выбрать новичку',
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
          name: 'Какой стиль торговли выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту спокойнее начать со среднесрочного свинга. Решения принимаются без спешки, не нужно весь день сидеть у экрана, а эмоций меньше. Быстрый темп бьёт по ещё не закреплённой дисциплине, и новичок легко скатывается в импульсивную торговлю. К дейтрейдингу и тем более скальпингу разумнее прийти уже подготовленным.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем скальпинг отличается от дейтрейдинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Темпом и размером движения. Скальпер сидит на секундах и минутах и делает десятки сделок ради микродвижений в пунктах. Дейтрейдер держит сделку часами, ловит движение покрупнее и совершает от одной до нескольких сделок в день, но к закрытию выходит из всех позиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое свинг-трейдинг простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это стиль, при котором позицию держат от нескольких дней до нескольких недель и забирают целый размах движения, а не каждое мелкое колебание. Работают на старших таймфреймах, чаще на дневном и четырёхчасовом графике, где видна картина, а не шум. Стиль спокойный и подходит занятым людям, но требует терпения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему комиссия так опасна при скальпинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что комиссия и спред сидят в каждой сделке, а на мелком движении забирают огромную долю прибыли, вплоть до половины. Помножьте на десятки сделок в день, и математическое ожидание уходит в минус. Без издержек шансы были бы примерно 50 на 50, но именно они чаще всего и сливают счёт скальпера.',
          },
        },
        {
          '@type': 'Question',
          name: 'В чём главный плюс дейтрейдинга?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В отсутствии ночных рисков: раз все позиции закрываются к концу дня, трейдера не задевают ночные разрывы цены и новости, выходящие, пока рынок закрыт. Минус же это высокая нагрузка на внимание и психику, потому что решения приходится принимать быстро и часто в течение всего дня.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем позиционная торговля отличается от свинга и инвестиций?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Горизонтом и опорой. Свинг это дни и недели на техническом анализе, а позиционная торговля это месяцы и годы прежде всего на фундаментале. От инвестиций её отличает активность: позиционный трейдер выходит, когда ломается идея сделки, а не держит актив бессрочно. Времени она требует меньше всех стилей, но надолго замораживает капитал.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trading-styles#howto',
      name: 'Как выбрать стиль торговли под себя',
      description:
        'Пошаговый разбор стилей торговли по горизонту сделки и нагрузке: скальпинг, дейтрейдинг и свинг, и какой подходит новичку',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь, какие бывают стили торговли',
          text: 'Стили различаются прежде всего горизонтом сделки: от секунд в скальпинге до недель в свинге.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поймите, почему скальпинг съедает комиссия',
          text: 'На мелком движении фиксированная комиссия и спред забирают огромную долю прибыли и смещают математическое ожидание в минус.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Сравните дейтрейдинг и свинг по нагрузке и времени',
          text: 'Дейтрейдинг закрывает день без ночных рисков, но грузит психику, а свинг спокойнее и экономит время, но требует терпения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Выберите стиль под себя, начав со спокойного',
          text: 'Новичку спокойнее стартовать со среднесрочного свинга и прийти к быстрому темпу уже с отработанной дисциплиной.',
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
          name: 'Скальпинг',
          description:
            'Стиль торговли, при котором сделка живёт секунды или минуты, а трейдер забирает совсем мелкое движение цены в пунктах, совершая за день десятки, а то и сотни сделок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дейтрейдинг',
          description:
            'Стиль внутридневной торговли, при котором трейдер открывает и закрывает все позиции в течение одного торгового дня, не оставляя их на ночь.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Стиль торговли, при котором трейдер удерживает позиции от нескольких дней до нескольких недель, стремясь забрать среднесрочное движение рынка от одного разворота до другого.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'позиционная торговля',
          description:
            'Стиль торговли с удержанием позиций от нескольких месяцев до нескольких лет, опирающийся прежде всего на фундаментал и требующий минимум времени у экрана.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'алготрейдинг',
          description:
            'Торговля по правилам, зашитым в программу, которая исполняет сделки автоматически; определяется не горизонтом сделки, а способом исполнения.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
