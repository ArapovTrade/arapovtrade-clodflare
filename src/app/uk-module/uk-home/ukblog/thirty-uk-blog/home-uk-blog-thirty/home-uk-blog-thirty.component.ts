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
  selector: 'app-home-uk-blog-thirty',
  templateUrl: './home-uk-blog-thirty.component.html',
  styleUrl: './home-uk-blog-thirty.component.scss',
})
export class HomeUkBlogThirtyComponent implements OnInit {
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
    this.titleService.setTitle('Деривативи, ф’ючерси та спот | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке деривативи, чим ф’ючерси та опціони відрізняються від споту, як працює плече і який інструмент обрати новачку.',
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

    if (index == 1) {
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
          headline:
            "Деривативи, ф'ючерси та спот: чим відрізняються і що обрати новачку",
          description:
            'Що таке деривативи, чим ф’ючерси та опціони відрізняються від споту, як працює плече і який інструмент обрати новачку.',
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
              'https://arapov.trade/uk/freestudying/derivatives-futures-spot',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/derivatives-futures-spot.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Словник трейдера',
          keywords:
            "деривативи, ф'ючерс, спот, ф'ючерси проти споту, кредитне плече, розрахунковий ф'ючерс",
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
          name: 'Що таке деривативи простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Це похідні контракти, ціна яких залежить від базового активу: акції, валюти, нафти, золота чи індексу. Сам актив ви не купуєте, ви торгуєте договором на нього, який дорожчає або дешевшає разом із цим активом. До деривативів належать біржові ф'ючерси та опціони, а також позабіржові форварди й свопи.",
          },
        },
        {
          '@type': 'Question',
          name: "Чи володієте ви активом, коли торгуєте ф'ючерсами?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ні. Ф'ючерс це позиція на ціну, а не володіння активом. Ви вносите маржу, малу частку контракту, а між покупцем і продавцем стоїть клірингова палата. Більшість ф'ючерсів розрахункові, тож жодного вагона нафти ніхто не везе: у дату експірації сторони просто розраховуються грошима, а спекулянт зазвичай закриває позицію раніше.",
          },
        },
        {
          '@type': 'Question',
          name: "Чим спот відрізняється від ф'ючерса?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "На споті ви купуєте сам актив тут і зараз та володієте ним без плеча, тож втратити можете максимум вкладене, а ліквідації там немає. Ф'ючерс це контракт на ціну з плечем: активом ви не володієте, за утримання платите, а коли рух іде проти вас, застави може не вистачити і позицію закриють примусово. Купили біткоїн на споті за сто тисяч, упав до вісімдесяти, ви спокійно чекаєте; на ф'ючерсі з плечем та сама просадка вже ліквідувала б вас.",
          },
        },
        {
          '@type': 'Question',
          name: "Чому ф'ючерси небезпечні для новачка?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Через вбудоване плече. Ви вносите лише маржу, малу частку контракту, але прибуток і збиток рахуються від повного розміру контракту. Рух ціни на пару відсотків проти вас здатен з'їсти куди більше тих самих відсотків від депозиту, плюс щоденна переоцінка, маржин-кол і примусове закриття. На крипто-ф'ючерсах волатильність ще вища через приплив спекулятивних грошей.",
          },
        },
        {
          '@type': 'Question',
          name: "Спот чи ф'ючерси: що обрати новачку?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "На мою думку, починати варто зі споту: там немає плеча, немає ліквідації й не можна втратити більше за вкладене, тож ви спокійно вчитеся читати ринок. До ф'ючерсів розумно переходити пізніше, уже розуміючи плече, маржу та ліквідацію й тримаючи ризик під контролем. Правило просте: купити й тримати актив місяцями це спот, потрібен шорт, гнучкість і чесний біржовий обсяг це ф'ючерс.",
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
        'https://arapov.trade/uk/freestudying/derivatives-futures-spot#howto',
      name: "Як розібратися в деривативах, ф'ючерсах і споті",
      description:
        "Покроковий розбір похідних інструментів, ф'ючерса та споту і їхнє практичне застосування в торгівлі",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що таке дериватив',
          text: 'Дериватив це похідний контракт, ціна якого залежить від базового активу, тож ви торгуєте не сам актив, а договір на нього.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Розберіться, як влаштований ф'ючерс",
          text: "Ф'ючерс це стандартизований зобов'язуючий біржовий контракт через клірингову палату, і більшість ф'ючерсів розрахункові, без фізичної поставки.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: "Порівняйте спот і ф'ючерс",
          text: "На споті ви володієте активом без плеча та ліквідації, на ф'ючерсі торгуєте контрактом на ціну з плечем і ризиком примусового закриття.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Усвідомте, чому ф'ючерси небезпечні для новачка",
          text: 'Маржа мала, але прибуток і збиток рахуються від повного контракту, а щоденна переоцінка та маржин-кол здатні закрити позицію примусово.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оберіть інструмент під своє завдання',
          text: "Новачку безпечніше почати зі споту без плеча, а до ф'ючерсів переходити свідомо, зрозумівши плече, маржу та ліквідацію.",
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
          name: 'Дериватив',
          description:
            "Похідний фінансовий інструмент, вартість якого прив'язана до ціни іншого, базового активу: акції, валюти, товару, індексу чи ставки.",
        },
        {
          '@type': 'DefinedTerm',
          name: "Ф'ючерс",
          description:
            "Стандартизований біржовий контракт, що зобов'язує одну сторону купити, а іншу продати актив за заздалегідь обумовленою ціною до визначеної дати в майбутньому.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спот',
          description:
            'Ринок, на якому угода проходить тут і зараз, а покупець одразу отримує сам актив у власність без плеча.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
