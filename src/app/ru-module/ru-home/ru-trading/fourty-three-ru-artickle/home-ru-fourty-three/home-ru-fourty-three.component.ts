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
  selector: 'app-home-ru-fourty-three',
  templateUrl: './home-ru-fourty-three.component.html',
  styleUrl: './home-ru-fourty-three.component.scss',
})
export class HomeRuFourtyThreeComponent implements OnInit {
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
      'Пулы ликвидности в трейдинге: полное руководство для трейдеров | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, что такое пулы ликвидности в трейдинге, как Smart Money используют ликвидность для манипуляций и как защитить свой депозит от охоты за стопами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-06' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/liquiditypools.png',
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
          '@id': 'https://arapov.trade/ru/freestudying/liquiditypools#article',
          headline:
            'Пулы ликвидности в трейдинге: полное руководство для трейдеров',
          description:
            'Узнайте, что такое пулы ликвидности в трейдинге, как Smart Money используют ликвидность для манипуляций и как защитить свой депозит от охоты за стопами.',
          image: 'https://arapov.trade/assets/img/content/liquiditypools1.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/liquiditypools',
          },
          articleSection: 'Обучение трейдингу',
          keywords:
            'пулы ликвидности, Smart Money, стоп хантинг, манипуляции рынком, объёмный анализ, трейдинг для начинающих',
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
      '@id': 'https://arapov.trade/ru/freestudying/liquiditypools#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое пулы ликвидности в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пулы ликвидности — это области на ценовом графике, где сконцентрировано значительное количество торговых ордеров. Эти зоны формируются вокруг ключевых уровней поддержки и сопротивления, психологических отметок и локальных экстремумов. Крупные институциональные игроки используют пулы ликвидности для накопления и распределения позиций без существенного влияния на рыночную цену.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как Smart Money используют ликвидность?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — институциональные игроки и маркет-мейкеры — используют ликвидность для исполнения крупных ордеров. Они намеренно двигают цену к зонам скопления стоп-лоссов розничных трейдеров, активируют эти ордера и используют полученную ликвидность для входа в собственные позиции по выгодным ценам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое стоп хантинг и как от него защититься?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп хантинг — это целенаправленное движение цены к зонам скопления стоп-ордеров для их активации. Для защиты рекомендуется размещать стоп-лоссы за истинными уровнями ликвидности, а не за очевидными локальными экстремумами. Также полезно анализировать объёмы перед пробоем уровня и дожидаться подтверждения движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие инструменты помогают находить пулы ликвидности?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для поиска пулов ликвидности трейдеры используют кластерный анализ объёмов, стакан ордеров, Footprint Charts и анализ ордер-флоу. Эти инструменты позволяют видеть скрытые крупные заявки, определять зоны накопления объёмов и отслеживать действия институциональных игроков в режиме реального времени.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему цена часто разворачивается после сбора ликвидности?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'После сбора ликвидности крупные игроки получают необходимый объём для открытия или закрытия своих позиций. Когда цель достигнута, давление на цену прекращается, и рынок возвращается к справедливой стоимости. Именно поэтому ложные пробои уровней часто предшествуют сильным разворотным движениям.',
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
      '@id': 'https://arapov.trade/ru/freestudying/liquiditypools#howto',
      name: 'Как находить и использовать пулы ликвидности в торговле',
      description:
        'Пошаговое руководство по идентификации зон ликвидности и их применению в торговых стратегиях',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите ключевые уровни',
          text: 'Найдите на графике значимые уровни поддержки и сопротивления, локальные максимумы и минимумы, а также психологические ценовые отметки. Эти области обычно привлекают наибольшее количество торговых ордеров.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проанализируйте объёмы',
          text: 'Используйте индикаторы объёма и кластерный анализ для определения зон с высокой концентрацией ордеров. Обратите внимание на аномальные всплески объёма вблизи ключевых уровней.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Отслеживайте поведение цены',
          text: 'Наблюдайте за реакцией цены при подходе к зонам ликвидности. Резкие движения с последующим разворотом часто указывают на сбор ликвидности крупными игроками.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Дождитесь подтверждения',
          text: 'Не входите в сделку сразу после пробоя уровня. Дождитесь ретеста зоны ликвидности и подтверждающих сигналов от объёма перед открытием позиции.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте рисками',
          text: 'Размещайте стоп-лоссы за истинными уровнями ликвидности, учитывая возможные манипуляции. Используйте частичное закрытие позиций для снижения рисков.',
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
      '@id': 'https://arapov.trade/ru/freestudying/liquiditypools#glossary',
      name: 'Глоссарий терминов по ликвидности в трейдинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пул ликвидности',
          description:
            'Область на графике с высокой концентрацией торговых ордеров, где крупные игроки накапливают или распределяют позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Институциональные участники рынка — банки, хедж-фонды и маркет-мейкеры, обладающие значительным капиталом и информационным преимуществом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп хантинг',
          description:
            'Целенаправленное движение цены к зонам скопления стоп-ордеров для их активации и сбора ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордер-флоу',
          description:
            'Анализ потока торговых заявок, позволяющий отслеживать действия крупных участников рынка в реальном времени.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Ценовой разрыв, образованный импульсным движением, где отсутствует баланс между спросом и предложением.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Имбаланс',
          description:
            'Дисбаланс между покупателями и продавцами, приводящий к направленному движению цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём постоянного выставления заявок на покупку и продажу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой ценой исполнения ордера и фактической ценой, возникающая при недостаточной ликвидности.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Chart',
          description:
            'Тип графика, отображающий объём торгов внутри каждой свечи с разбивкой по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за ключевой уровень с последующим возвратом, используемый для сбора ликвидности.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
