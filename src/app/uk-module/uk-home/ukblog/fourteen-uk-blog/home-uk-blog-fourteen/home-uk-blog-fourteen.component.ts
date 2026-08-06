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
  selector: 'app-home-uk-blog-fourteen',
  templateUrl: './home-uk-blog-fourteen.component.html',
  styleUrl: './home-uk-blog-fourteen.component.scss',
})
export class HomeUkBlogFourteenComponent implements OnInit {
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
      'Ризики та скам у криптовалюті: як захиститися | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Головні ризики криптовалют і популярні схеми скаму: фейкові ICO, піраміди, фішинг і дрейн-гаманці. Як розпізнати обман і захистити кошти.',
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
            'Ризики й шахрайство в крипті: як новачкові не втратити депозит',
          description:
            'Головні ризики криптовалют і популярні схеми скаму: фейкові ICO, піраміди, фішинг і дрейн-гаманці. Як розпізнати обман і захистити кошти.',
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
            '@id': 'https://arapov.trade/uk/freestudying/crypto-risks-scams',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptoscam.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюта',
          keywords:
            'ризики криптовалют, шахрайство в крипті, скам, pump and dump, волатильність крипти',
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
          name: 'Які основні ризики у криптовалюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Величезна волатильність, коли навіть біткоїн падав на 80 відсотків, а дрібні монети здатні обнулитися. Плюс шахрайство і скам-монети, технічні ризики на кшталт зламу біржі й втрати ключів, регуляторні рішення держав і психологія. Остання, замішана на жадібності й поспіху, губить новачка найчастіше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке скам у крипті простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це будь-яке шахрайство заради крадіжки ваших грошей або доступу до гаманця: фейкові проєкти, піраміди, фішинг, підроблені біржі, накачка монети під скид. У всіх схем один гачок, обіцянка легкого й гарантованого прибутку, якого на ринку не буває.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює схема pump and dump?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Організатори по-тихому скуповують дешеву маловідому монету, потім розганяють її сигналами й рекламою, малюючи ажіотаж. Натовп заскакує на емоціях, і рівно в цей момент організатори скидають свій обсяг на тих, хто спізнився. Ціна обвалюється так само швидко, як злетіла, а на руках у натовпу лишається пустушка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому скам-монети зрештою обнулюються?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Таку монету можна друкувати безкінечно, тому пропозиція завжди перекриває попит і продавець контролює ціну. Після єдиного пострілу оборот по монеті падає, і коли він опускається нижче порога, який влаштовує біржу, монету просто делістять. Біржа живе на комісіях і не тримає інструмент, який перестав давати оборот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як знизити ризики під час роботи з криптою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'З мого досвіду заходити лише тими грошима, які готові втратити, тримати невеликий ризик на угоду, не зловживати плечем і перевіряти будь-який проєкт через незалежні джерела, а не через його ж сайт. Нікому не віддавати ключі та сід-фразу й не вірити обіцянкам гарантованого доходу. Захист капіталу тут рятує частіше, ніж вдалий вибір монети.',
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
      '@id': 'https://arapov.trade/uk/freestudying/crypto-risks-scams#howto',
      name: 'Як розібратися в ризиках крипти й не втратити депозит',
      description:
        'Покроковий розбір ризиків і схем шахрайства в криптовалюті та їх практичне застосування',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, які ризики в крипті взагалі існують',
          text: 'Небезпек тут помітно більше, ніж бачить людина на вході, і вони геть різні.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Зрозумійте волатильність: чому монета може впасти на 80 відсотків',
          text: 'Волатильність — це розмах цінових гойдалок за відрізок часу, і в крипті він жахливий.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Навчіться впізнавати схеми скаму',
          text: 'Скам — це шахрайство, заточене під крадіжку ваших грошей або доступу до гаманця.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Зрозумійте механіку pump and dump і делістингу',
          text: 'Pump and dump — це схема, у якій організатори спершу тихо набирають дешеву безвісну монету, потім різко її роздувають і зливають на натовп.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Знижуйте ризик заздалегідь за простими ознаками',
          text: 'Тішить те, що майже будь-яке шахрайство читається заздалегідь, якщо не поспішати.',
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
          name: 'Раг-пул',
          description:
            'Вид крипто-шахрайства, коли творці токена виводять ліквідність із пулу, обвалюючи ціну й позбавляючи власників змоги продати монету.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скам',
          description:
            'Будь-яке шахрайство, націлене на крадіжку коштів трейдера або доступу до його гаманця: фейкові проєкти, піраміди, фішинг, підроблені біржі, накачка монети під скид.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pump and dump',
          description:
            'Схема, за якої організатори тихо скуповують дешеву монету, штучно розганяють її ціну рекламою та сигналами, а потім скидають свій обсяг на залучений натовп.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
