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
  selector: 'app-home-uk-blog-thirty-one',
  templateUrl: './home-uk-blog-thirty-one.component.html',
  styleUrl: './home-uk-blog-thirty-one.component.scss',
})
export class HomeUkBlogThirtyOneComponent implements OnInit {
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
      'Ринок Forex: як працює та як торгувати | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке ринок Forex, хто його учасники, як влаштовані валютні пари та торгові сесії і з чого почати торгівлю валютою.',
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
          headline: 'Форекс для новачка: ринок, позиції, плече і сесії',
          description:
            'Що таке ринок Forex, хто його учасники, як влаштовані валютні пари та торгові сесії і з чого почати торгівлю валютою.',
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
            '@id': 'https://arapov.trade/uk/freestudying/forex-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ForexMarket.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Форекс',
          keywords:
            'форекс, валютний ринок, лонг, шорт, своп, кредитне плече, валютний ризик, кері-трейд, торгові сесії, індекс долара, DXY',
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
          name: 'Що таке Форекс простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це міжнародний ринок обміну валют, де торгують парами на кшталт євро до долара. Найбільший і найліквідніший ринок світу з оборотом понад сім трильйонів доларів на день, але децентралізований: єдиної біржі немає, тому й чесного централізованого обсягу по валюті теж немає.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як почати торгувати на Форексі новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Почніть із демо-рахунку, оберіть одну-дві головні пари на кшталт євродолара й одну сесію, щоб навчитися її читати. Перш ніж заходити реальними грошима, засвойте ризик-менеджмент: стоп у кожній угоді, ризик близько одного-двох відсотків депозиту і скромне плече. Спочатку дисципліна, а вже потім розмір рахунку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки грошей потрібно, щоб почати торгувати на Форексі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рахунок можна відкрити з невеликою сумою, але фіксуватися на розмірі рахунку не варто. Важливіший ризик на угоду: тримати його близько одного-двох відсотків депозиту і вже під нього підбирати обсяг. Маленький рахунок на максимальному плечі небезпечніший за скромний рахунок із дисципліною.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке кредитне плече безпечне для новачка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Питання не в розмірі плеча, а в ризику на угоду. Розумно тримати ризик близько одного-двох відсотків депозиту і вже під нього рахувати обсяг. Під наглядом ЄС і Британії роздробу дають приблизно 1:30 по основних парах, у США до 1:50, а офшорні брокери ваблять плечем 1:100 і вище, яке спалює рахунок найшвидше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли найкраще торгувати на Форексі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У вікні перетину лондонської та нью-йоркської сесій, коли Європа ще торгує, а Америка вже відкрилася. У цей момент учасників і ліквідності найбільше, звідси й найсильніші рухи по головних парах із доларом, євро і фунтом. Тонкий азійський ринок, ніч і передсвяткові дні частіше дають шум.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке індекс долара DXY і навіщо він трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це одне число, що показує силу долара проти кошика з шести валют, найважче в ньому євро. Оскільки долар є в більшості пар, індекс підказує ймовірний напрям: спершу дивляться силу долара по DXY, а конкретний вхід шукають уже на графіку самої пари за рівнем і реакцією ціни.',
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
      '@id': 'https://arapov.trade/uk/freestudying/forex-guide#howto',
      name: 'Як розібратися в ринку Forex з нуля',
      description:
        'Покроковий шлях новачка: устрій ринку, позиції, плече і ризик, сесії та індекс долара',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте устрій ринку Forex',
          text: 'Forex це децентралізований ринок обміну валют без єдиної біржі, тому чесного централізованого обсягу по валюті немає, і читати її зручніше за рівнями та індексом долара.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розберіться з лонгом, шортом і свопом',
          text: 'Лонг це ставка на зростання, шорт на падіння через продаж взятого в борг, а за перенесення позиції через ніч нараховується своп від різниці ставок.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Візьміть під контроль плече і ризик',
          text: 'Плече однаково множить прибуток і збиток, тому спершу рахують ризик в один-два відсотки на угоду, ставлять стоп і лише потім підбирають обсяг.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Враховуйте кері-трейд і його пастку',
          text: 'Кері-трейд приносить дохід від різниці ставок через своп, але це не пасивна рента, а ставка з плечем на стабільність курсу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Торгуйте в потрібному вікні сесій',
          text: 'Обсяг і рух максимальні на перетині Лондона і Нью-Йорка, а тонкий азійський ринок і свята краще перечекати.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте ринок через індекс долара',
          text: 'Індекс долара задає ймовірний напрям по більшості пар, а конкретний вхід шукають на графіку самої пари за рівнем і реакцією ціни.',
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
          name: 'Пункт',
          description:
            'Мінімальний крок котирування на форексі, зазвичай четвертий знак після коми; у пунктах вимірюють рух ціни та величину ризику.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Форекс',
          description:
            'Міжнародний ринок обміну валют, де одні валюти купують за інші; торгують не окремими валютами, а парами, наприклад євро до долара.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Довга позиція',
          description:
            'Купівля активу в розрахунку на зростання ціни: купити дешевше, щоб згодом продати дорожче.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коротка позиція',
          description:
            'Продаж активу в розрахунку на падіння: продати дорожче взятий у борг інструмент, а відкупити назад дешевше, забравши різницю.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Надані брокером позикові кошти, що дають змогу керувати позицією у багато разів більшою за власний депозит, внісши лише невелику заставу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютний ризик',
          description:
            'Імовірність зазнати збитку через несприятливий зсув валютного курсу проти відкритої позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кері-трейд',
          description:
            'Стратегія, за якої трейдер позичає у валюті з низькою процентною ставкою і вкладає у валюту з високою, заробляючи на різниці ставок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгова сесія форекс',
          description:
            'Період активної роботи фінансового центру певного регіону, через який проходить основний потік валютних операцій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Індекс долара',
          description:
            'Показник сили долара США відносно кошика з шести основних світових валют, за яким судять, зміцнюється долар чи слабшає.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
