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
  selector: 'app-home-ru-blog-thirteen',
  templateUrl: './home-ru-blog-thirteen.component.html',
  styleUrl: './home-ru-blog-thirteen.component.scss',
})
export class HomeRuBlogThirteenComponent implements OnInit {
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
      'Бессрочные фьючерсы и маржинальная торговля в крипте | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое бессрочные фьючерсы, кредитное плечо и маржинальная торговля в крипте, при чём тут фандинг и почему большое плечо ведёт к ликвидации.',
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
            'Бессрочные фьючерсы и маржа в крипте: что это, фандинг и как не словить ликвидацию',
          description:
            'Что такое бессрочные фьючерсы, кредитное плечо и маржинальная торговля в крипте, при чём тут фандинг и почему большое плечо ведёт к ликвидации.',
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
            '@id':
              'https://arapov.trade/ru/freestudying/crypto-perpetuals-margin',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/crypto-perpetuals-margin.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюты',
          keywords:
            'бессрочные фьючерсы, перпетуал, фандинг, кредитное плечо, маржа, ликвидация, криптовалюты',
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
          name: 'Что такое бессрочный фьючерс простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это контракт на цену актива без даты экспирации, который можно держать сколько угодно. У обычного фьючерса есть срок, к которому его цена сходится со спотом, а у бессрочного срока нет, и рядом со спотом его держит фандинг. Торгуют такие контракты с плечом, поэтому главный риск тут не сам инструмент, а размер плеча.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое фандинг и кто кому платит?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фандинг это периодические выплаты между трейдерами, чаще всего каждые восемь часов. Когда перпетуал торгуется дороже спота, лонги платят шортам, когда дешевле, наоборот. Это не комиссия биржи, а расчёт между самими сторонами, который и удерживает цену контракта рядом с рынком.',
          },
        },
        {
          '@type': 'Question',
          name: 'При каком движении цены наступает ликвидация?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зависит от плеча. Грубо, при плече ×100 хватает движения около одного процента против вас, при ×50 около двух, при ×20 около пяти. Чем выше плечо, тем ближе уровень ликвидации к цене входа и тем легче выбить позицию обычной рыночной качкой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем изолированная маржа отличается от кросс-маржи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При изолированной марже под риском только залог конкретной позиции, и ликвидация заденет лишь её. При кросс-марже залогом служит весь баланс счёта, и одна неудачная сделка способна утянуть за собой всё. Новичку безопаснее изолированная: она ограничивает потерю одной сделкой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какое плечо безопасно для новичка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чем меньше, тем дальше уровень ликвидации и тем спокойнее переживаются обычные колебания. Высокое плечо не повышает шанс заработать, оно лишь придвигает ликвидацию вплотную к входу. Я держу плечо низким и риск на сделку небольшим, в районе одного-двух процентов от депозита, и всегда со стопом.',
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
      '@id':
        'https://arapov.trade/ru/freestudying/crypto-perpetuals-margin#howto',
      name: 'Как разобраться в бессрочных фьючерсах и марже',
      description:
        'Пошаговый разбор перпетуалов, фандинга, плеча и ликвидации и их применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое бессрочный фьючерс и почему у него нет срока',
          text: 'Бессрочный фьючерс это производный контракт на актив без даты экспирации, который можно удерживать неограниченное время.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь, как фандинг держит цену перпетуала рядом со спотом',
          text: 'Фандинг это периодические выплаты между лонгами и шортами, которые биржа рассчитывает несколько раз в день.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Поймите, как маржа и плечо умножают и прибыль, и убыток',
          text: 'Маржа это ваш залог, а плечо показывает, во сколько раз заёмные средства превышают этот залог.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Научитесь считать ликвидацию и держать её на расстоянии',
          text: 'Цена ликвидации зависит прежде всего от плеча: чем оно больше, тем ближе ликвидация к цене входа.',
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
          name: 'Бессрочный фьючерс',
          description:
            'Производный контракт на актив без даты экспирации, который трейдер может удерживать неограниченное время; цену к споту привязывает фандинг.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фандинг',
          description:
            'Периодические выплаты между держателями длинных и коротких позиций, которые удерживают цену бессрочного фьючерса рядом с ценой спота.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидация',
          description:
            'Принудительное закрытие позиции биржей, когда залога перестаёт хватать для поддержания сделки с плечом.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
