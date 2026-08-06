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
  selector: 'app-home-uk-blog-thirty-seven',
  templateUrl: './home-uk-blog-thirty-seven.component.html',
  styleUrl: './home-uk-blog-thirty-seven.component.scss',
})
export class HomeUkBlogThirtySevenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Торгові платформи та брокер: як обрати | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Як обрати брокера і торгову платформу: регуляція, комісії, виконання ордерів і на що дивитися новачку, щоб не натрапити на кухню.',
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
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (index == 0) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          headline: 'Платформи, інструменти та брокер: з чого починає трейдер',
          description:
            'Як обрати брокера і торгову платформу: регуляція, комісії, виконання ордерів і на що дивитися новачку, щоб не натрапити на кухню.',
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
            '@id': 'https://arapov.trade/uk/freestudying/platforms-broker',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/platforms-broker.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для початківців',
          keywords:
            'торгова платформа, торговий термінал, TradingView, демо-рахунок, брокер, як вибрати брокера',
          inLanguage: 'uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: 'Яку торгову платформу обрати новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Логічний старт це TradingView. Безкоштовного тарифу достатньо, усе відкривається в браузері, графіки наочні, а тренувальний демо-рахунок вбудований одразу. Програма, забита функціями, новачка лише збиває: на старті досить чистого графіка з обсягом і кнопки ордера.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке TradingView і чим він корисний трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це браузерна платформа для графіків і аналізу ринків: котирування акцій, валют, крипти та фʼючерсів, інструменти малювання й індикатори. Зручна тим, що все зібрано в одному вікні, почати можна безкоштовно без встановлення, а свою розмітку й рівні легко зберегти й повернутися до них пізніше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна торгувати в TradingView безкоштовно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, через демо-рахунок, його ще називають paper trading. Це тренувальний рахунок із реальними котируваннями та віртуальними грошима, доступний на будь-якому тарифі, включно з безкоштовним, і не потребує картки. На рахунку лежить 100 000 віртуальних доларів, а баланс за бажання скидається.',
          },
        },
        {
          '@type': 'Question',
          name: 'Хто такий брокер і чим він відрізняється від біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Брокер це ліцензована фірма-посередник: вона передає ваші заявки на біржу й утримує за це комісію. Біржа ж це сама торгова площадка, місце зустрічі покупців і продавців. Рахунок відкривається саме в брокера, адже поодинці приватний трейдер на біржу не потрапляє.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке кухня в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кухня це імітація брокера: угоди клієнта назовні не виводяться, а лишаються всередині компанії, якій вигідний його програш. Видають її захмарне плече, бонуси за поповнення, настирливі дзвінки й обіцянки швидких грошей. Просте правило: чим гучніші гарантії доходу, тим уважніше перевіряйте ліцензію та порядок виведення.',
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
      '@id': 'https://arapov.trade/uk/freestudying/platforms-broker#howto',
      name: 'Як зібрати звʼязку для торгівлі: платформа, демо-рахунок, брокер',
      description:
        'Покроковий розбір того, що потрібно новачкові для старту: термінал для аналізу, демо-рахунок для тренування й регульований брокер для виведення угод на ринок',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, що таке торговий термінал і навіщо він потрібен',
          text: 'Торговий термінал це застосунок, що дає доступ до біржових торгів: у ньому графік, набір аналітичних інструментів і кнопка для угоди.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Освойте TradingView як основну платформу',
          text: 'TradingView це безкоштовна браузерна платформа, на якій зручно читати графік, наносити рівні й тренуватися на вбудованому демо-рахунку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Налаштуйте графік під обсяг і обкатайте систему на демо-рахунку',
          text: 'Приберіть зайві індикатори, лишіть бари, рівні й обсяг унизу, а метод перевірте на демо-рахунку з віртуальними грошима.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Виберіть брокера за регуляцією, а не за комісіями',
          text: 'У надійного брокера є ліцензія визнаного регулятора й роздільне зберігання коштів, і лише потім мають значення комісії та виведення.',
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
      name: 'Глосарій термінів статті',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торговий термінал',
          description:
            'Застосунок, що дає доступ до біржових торгів: у ньому графік, набір аналітичних інструментів і кнопка для купівлі або продажу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TradingView',
          description:
            'Онлайн-платформа в браузері для графіків і аналізу ринків, яка збирає в одному вікні котирування акцій, валют, криптовалют і фʼючерсів разом з інструментами малювання та індикаторами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Брокер',
          description:
            'Ліцензований посередник, через якого трейдер отримує доступ до біржових торгів і здійснює угоди, а брокер за це бере комісію.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
