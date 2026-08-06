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
  selector: 'app-home-ru-fourty-four',
  templateUrl: './home-ru-fourty-four.component.html',
  styleUrl: './home-ru-fourty-four.component.scss',
})
export class HomeRuFourtyFourComponent implements OnInit {
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
      'Айсберг ордера в трейдинге: как крупные игроки скрывают свои позиции | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Узнайте, что такое айсберг ордера (Iceberg Orders), как банки и хедж-фонды используют скрытые заявки для маскировки крупных позиций и как обнаружить их на графике.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/icebergorders.png',
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
          '@id': 'https://arapov.trade/ru/freestudying/icebergorders#article',
          headline:
            'Айсберг ордера в трейдинге: как крупные игроки скрывают свои позиции',
          description:
            'Узнайте, что такое айсберг ордера (Iceberg Orders), как банки и хедж-фонды используют скрытые заявки для маскировки крупных позиций и как обнаружить их на графике.',
          image: 'https://arapov.trade/assets/img/content/icebergorders1.png',
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
            '@id': 'https://arapov.trade/ru/freestudying/icebergorders',
          },
          articleSection: 'Обучение трейдингу',
          keywords:
            'айсберг ордер, iceberg order, скрытые ордера, Smart Money, маркет-мейкер, ликвидность',
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
      '@id': 'https://arapov.trade/ru/freestudying/icebergorders#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое айсберг ордер?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Айсберг ордер — это специальный тип лимитной заявки, при котором в биржевом стакане отображается лишь малая часть общего объёма. Основная масса ордера остаётся скрытой и исполняется постепенно по мере срабатывания видимой части. Этот инструмент используется институциональными игроками для маскировки крупных позиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Зачем банки используют скрытые ордера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Крупные финансовые институты используют айсберг ордера для минимизации влияния на рыночную цену при исполнении масштабных заявок. Прямое размещение крупного ордера вызвало бы резкое движение цены против позиции. Скрытые заявки позволяют накапливать или распределять позиции постепенно, сохраняя анонимность.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как обнаружить айсберг ордер на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Признаки айсберг ордера: цена удерживается на определённом уровне несмотря на значительный объём торгов; в стакане постоянно появляются новые заявки взамен исполненных; кластерный анализ показывает повторяющиеся сделки на одном ценовом уровне. Используйте Footprint Charts и анализ ордер-флоу для подтверждения.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках используются айсберг ордера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Айсберг ордера применяются на всех крупных финансовых рынках: фондовых биржах NYSE и NASDAQ, валютном рынке Forex, криптовалютных платформах Binance, Kraken и OKX. Везде, где крупные игроки работают с большими объёмами, скрытые заявки становятся необходимым инструментом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать с учётом скрытых ордеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Определите уровни, где цена стабильно удерживается при высоком объёме — это потенциальные зоны скрытых ордеров. Входите в сделки в направлении крупного игрока после подтверждения. Избегайте торговли против очевидных зон накопления. Используйте анализ стакана ордеров и кластерные графики для подтверждения.',
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
      '@id': 'https://arapov.trade/ru/freestudying/icebergorders#howto',
      name: 'Как обнаружить и использовать айсберг ордера в торговле',
      description:
        'Пошаговое руководство по выявлению скрытых институциональных заявок и их применению в торговых стратегиях',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализируйте биржевой стакан',
          text: 'Наблюдайте за динамикой лимитных заявок. Если на определённом уровне постоянно появляются новые ордера взамен исполненных, это признак айсберг ордера.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Используйте кластерный анализ',
          text: 'Footprint Charts показывают распределение объёма внутри свечей. Повторяющиеся сделки на одном уровне указывают на скрытую институциональную активность.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Отслеживайте поведение цены',
          text: 'Если цена удерживается на уровне несмотря на значительное давление покупателей или продавцов, вероятно присутствие скрытого ордера, поглощающего ликвидность.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Подтвердите анализом объёма',
          text: 'Несоответствие между объёмом торгов и движением цены — ключевой индикатор. Высокий объём без пробоя уровня сигнализирует о скрытых заявках.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Торгуйте в направлении крупного игрока',
          text: 'После подтверждения скрытого ордера входите в сделку в направлении институционального капитала. Размещайте стоп-лосс за уровнем скрытой поддержки или сопротивления.',
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
      '@id': 'https://arapov.trade/ru/freestudying/icebergorders#glossary',
      name: 'Глоссарий терминов по скрытым ордерам',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Айсберг ордер',
          description:
            'Тип лимитной заявки, при котором в стакане отображается только часть общего объёма, а остальное исполняется скрыто.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скрытая ликвидность',
          description:
            'Объём заявок, не отображающийся в публичном биржевом стакане, используемый институциональными игроками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Институциональные участники рынка с крупным капиталом — банки, хедж-фонды, маркет-мейкеры.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Биржевой стакан',
          description:
            'Таблица лимитных заявок на покупку и продажу, отображающая текущую глубину рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Chart',
          description:
            'Кластерный график, показывающий распределение объёма торгов внутри каждой свечи по ценовым уровням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера из-за движения рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём постоянного выставления заявок на покупку и продажу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ордер-флоу',
          description:
            'Анализ потока торговых заявок для определения действий крупных участников рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лимитный ордер',
          description:
            'Заявка на покупку или продажу по указанной цене или лучше, ожидающая исполнения в стакане.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Накопление позиции',
          description:
            'Постепенный набор крупной позиции институциональным игроком без существенного влияния на цену.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
