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
  selector: 'app-home-ru-blog-sixty-three',
  templateUrl: './home-ru-blog-sixty-three.component.html',
  styleUrl: './home-ru-blog-sixty-three.component.scss',
})
export class HomeRuBlogSixtyThreeComponent {
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
      'Smart Money: манипуляции рынком и контроль толпы | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, как Smart Money манипулируют рынком и контролируют толпу. Методы институционалов: ложные пробои, выбивание стопов, новостные манипуляции. Практические советы для трейдеров.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneycontrol.png',
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
          '@id':
            'https://arapov.trade/ru/freestudying/smartmoneycontrol#article',
          headline: 'Smart Money: манипуляции рынком и контроль толпы',
          description:
            'Полное руководство по методам манипуляции рынком крупными институциональными игроками. Узнайте механизмы создания ложных пробоев, выбивания стопов и формирования трендов.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneycontrol1.webp',
            width: 1200,
            height: 630,
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/smartmoneycontrol',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'манипуляции рынком',
            'институциональные трейдеры',
            'ложные пробои',
            'выбивание стопов',
          ],
          wordCount: 1384,
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneycontrol#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Кто такие Smart Money в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — это крупные институциональные участники рынка: инвестиционные банки, хедж-фонды, маркет-мейкеры и алгоритмические торговые системы. Они обладают значительными финансовыми ресурсами, передовыми технологиями и доступом к информации, недоступной розничным трейдерам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как Smart Money манипулируют рынком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Институционалы используют несколько методов: создание ложных пробоев технических уровней, выбивание стоп-ордеров розничных трейдеров, манипуляция через новости и формирование искусственного рыночного настроения через СМИ и социальные сети.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ложный пробой и как его распознать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложный пробой — это кратковременный выход цены за ключевой технический уровень с последующим быстрым возвратом. Распознать его можно по отсутствию подтверждающего объёма, быстрому возврату за уровень и несоответствию движения общему рыночному контексту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защититься от манипуляций Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для защиты следует анализировать объёмы перед входом в сделку, избегать торговли во время выхода важных новостей, использовать ретесты уровней вместо входа на пробой и контролировать эмоции, не поддаваясь панике или эйфории.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему розничные трейдеры всегда запаздывают?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розничные трейдеры реагируют на уже сложившиеся движения, а не на их предпосылки. Они входят в рынок после публикаций в СМИ, когда Smart Money уже готовятся к выходу. Эмоциональные решения приводят к покупкам на максимумах и продажам на минимумах.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneycontrol#howto',
      name: 'Как торговать вместе со Smart Money',
      description:
        'Пошаговое руководство по определению действий институциональных игроков и торговле на их стороне',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализ объёмов',
          text: 'Изучите соотношение цены и объёма. Рост объёмов подтверждает направление движения, падение объёмов на фоне ценового движения сигнализирует о возможном развороте.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определение зон ликвидности',
          text: 'Найдите уровни скопления стоп-ордеров и зоны повышенного интереса. Smart Money используют эти зоны для набора и распределения позиций.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Распознавание фаз рынка',
          text: 'Определите текущую фазу рынка: накопление, импульс, распределение или коррекция. Входите в сделки в фазе накопления, а не на пике импульса.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ожидание подтверждения',
          text: 'Не входите сразу после пробоя уровня. Дождитесь закрепления цены, ретеста уровня и подтверждения от объёма.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Контроль эмоций',
          text: 'Действуйте против толпы в моменты массовой эйфории или паники. Сохраняйте рациональный подход и следуйте торговому плану.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneycontrol#glossary',
      name: 'Глоссарий терминов Smart Money',
      description: 'Ключевые термины концепции Smart Money в трейдинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные институциональные участники рынка, включая банки, хедж-фонды и маркет-мейкеров, обладающие значительными ресурсами и информационным преимуществом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за ключевой технический уровень с последующим быстрым возвратом, используемый для сбора ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Выбивание стопов',
          description:
            'Целенаправленное движение цены в зоны скопления стоп-ордеров для их активации и получения ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Наличие достаточного количества ордеров на покупку и продажу, позволяющих исполнять сделки без значительного влияния на цену.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопления',
          description:
            'Период бокового движения цены, когда крупные игроки постепенно набирают позиции перед началом трендового движения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза распределения',
          description:
            'Период, когда институционалы закрывают позиции, передавая их розничным трейдерам перед разворотом тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём одновременного выставления заявок на покупку и продажу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Зона на графике, где крупные игроки набирали или распределяли позиции, часто выступающая уровнем поддержки или сопротивления.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Ценовой дисбаланс, возникающий при импульсном движении, куда цена часто возвращается для заполнения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Стратегия крупных игроков по целенаправленному движению цены в зоны скопления стоп-приказов для их активации.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
