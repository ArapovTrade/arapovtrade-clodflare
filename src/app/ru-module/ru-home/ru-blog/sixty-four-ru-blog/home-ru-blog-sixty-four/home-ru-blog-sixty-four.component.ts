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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-ru-blog-sixty-four',
  templateUrl: './home-ru-blog-sixty-four.component.html',
  styleUrl: './home-ru-blog-sixty-four.component.scss',
})
export class HomeRuBlogSixtyFourComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
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
      'Торговая стратегия в трейдинге — практические примеры для начинающих',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговая стратегия в трейдинге — что это такое, из чего состоит и почему важна для новичков. Примеры реальных сделок с разбором точек входа и выхода.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });
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
          headline: 'Стратегия трейдинга для новичков',
          description:
            'Узнайте, как построить торговую стратегию в трейдинге: правила входа и выхода, управление рисками, примеры систем для новичков и профи.',
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
            '@id': 'https://arapov.trade/ru/freestudying/practic',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/prakticuk.jpg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Примеры сделок',
          keywords: 'торговая стратегия',
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
      inLanguage: 'ru',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое торговая стратегия?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговая стратегия это заранее разработанный набор чётких правил, регулирующих действия трейдера на всех этапах: от входа в сделку до выхода. Она устраняет импровизацию, эмоциональные колебания и субъективность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему трейдинг без стратегии приводит к убыткам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Без рабочей стратегии трейдинг превращается в азартную игру, где шансы резко против вас. Комиссии, спред, эмоции и несдержанный риск работают в минус, поэтому подавляющее большинство трейдеров без системы теряют депозит.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое правило 3:1 в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Правило 3:1 означает, что на каждый доллар риска потенциальная прибыль должна составлять минимум 3 доллара. Расстояние до цели в пунктах должно быть в 3 раза больше, чем расстояние до стоп-лосса.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ложный пробой уровня?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложный пробой это попытка поднять или опустить цену за уровень поддержки или сопротивления, которая не получает продолжения. Часто происходит на повышенных объёмах и используется Smart Money для набора позиций и сбора ликвидности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой WinRate считается рабочим для торговой системы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При работе с уровнями нормальным считается WinRate около 60-65%, то есть примерно 63 прибыльные сделки из 100. Сам по себе он ничего не гарантирует: важна связка с правилом 3:1 и контролем риска на дистанции.',
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
      inLanguage: 'ru',
      name: 'Как найти точку входа по торговой системе',
      description:
        'Пошаговый алгоритм определения точки входа в сделку на продажу от уровня сопротивления по правилам Price Action и Smart Money.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Определить уровень',
          text: 'Провести диапазон сопротивления по старшему таймфрейму (×4) и отметить его как зону интереса.',
        },
        {
          '@type': 'HowToStep',
          name: 'Дождаться пин-бар',
          text: 'В диапазоне уровня дождаться пин-бар как первый признак слабости покупателей и дефицита спроса.',
        },
        {
          '@type': 'HowToStep',
          name: 'Идентифицировать ложный пробой',
          text: 'Распознать попытку пробить уровень на повышенном объёме, которая не получает продолжения и собирает ликвидность.',
        },
        {
          '@type': 'HowToStep',
          name: 'Войти на медвежьем поглощении',
          text: 'Открыть сделку в продажу при пробое минимума бара ложного пробоя по паттерну медвежье поглощение.',
        },
        {
          '@type': 'HowToStep',
          name: 'Выставить стоп-лосс',
          text: 'Поставить защитный ордер за макушку бара ложного пробоя плюс пара пунктов на комиссию биржи или брокера.',
        },
        {
          '@type': 'HowToStep',
          name: 'Определить цель и проверить 3:1',
          text: 'Цель ставится на противоположный импульсный уровень; сделка берётся только если потенциальная прибыль минимум втрое превышает риск.',
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
      '@id': 'https://arapov.trade/ru/freestudying/practic#terms',
      inLanguage: 'ru',
      name: 'Термины торговой стратегии',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торговая стратегия',
          description:
            'Заранее разработанный набор чётких правил входа, выхода и контроля риска, заменяющий импровизацию и эмоции логикой и статистикой.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Попытка вывести цену за уровень поддержки или сопротивления без продолжения движения, часто на повышенном объёме.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежье поглощение',
          description:
            'Паттерн Price Action, указывающий на преобладание продавцов; сигнал входа в продажу при пробое минимума бара ложного пробоя.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Правило 3:1',
          description:
            'Условие, при котором на каждый доллар риска закладывается минимум 3 доллара потенциальной прибыли.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'WinRate',
          description:
            'Доля прибыльных сделок в торговой системе; при работе с уровнями обычно около 60-65%.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Profit Factor',
          description:
            'Отношение суммарной прибыли к суммарному убытку; минимально достаточным считается 1.8-2 с учётом комиссий.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Maximal DrawDown',
          description:
            'Максимальная просадка депозита за период; стоп-лосс ограничивает её глубину, но не отменяет.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мани-менеджмент',
          description:
            'Управление капиталом: какой процент депозита использовать в сделке и как переносить риск из сделки в сделку.',
          inDefinedTermSet:
            'https://arapov.trade/ru/freestudying/practic#terms',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
