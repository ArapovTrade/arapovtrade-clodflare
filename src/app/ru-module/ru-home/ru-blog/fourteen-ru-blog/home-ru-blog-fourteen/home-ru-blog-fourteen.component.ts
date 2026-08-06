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
  selector: 'app-home-ru-blog-fourteen',
  templateUrl: './home-ru-blog-fourteen.component.html',
  styleUrl: './home-ru-blog-fourteen.component.scss',
})
export class HomeRuBlogFourteenComponent implements OnInit {
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
      'Риски и скам в криптовалюте: как защититься | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Главные риски криптовалют и популярные схемы скама: фейковые ICO, пирамиды, фишинг и дрейн-кошельки. Как распознать обман и защитить средства.',
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
            'Риски и мошенничество в крипте: как новичку не потерять депозит',
          description:
            'Главные риски криптовалют и популярные схемы скама: фейковые ICO, пирамиды, фишинг и дрейн-кошельки. Как распознать обман и защитить средства.',
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
            '@id': 'https://arapov.trade/ru/freestudying/crypto-risks-scams',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptoscam.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюты',
          keywords:
            'риски криптовалют, мошенничество в крипте, скам, pump and dump, волатильность крипты',
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
          name: 'Какие основные риски у криптовалюты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Огромная волатильность, когда даже биткоин падал на 80 процентов, а мелкие монеты способны обнулиться. Плюс мошенничество и скам-монеты, технические риски вроде взлома биржи и потери ключей, регуляторные решения государств и психология. Последняя, замешанная на жадности и спешке, губит новичка чаще всего.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое скам в крипте простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это любое мошенничество ради кражи ваших денег или доступа к кошельку: фейковые проекты, пирамиды, фишинг, поддельные биржи, накачка монеты под сброс. У всех схем один крючок, обещание лёгкой и гарантированной прибыли, которой на рынке не бывает.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как работает схема pump and dump?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Организаторы по-тихому скупают дешёвую малоизвестную монету, потом разгоняют её сигналами и рекламой, рисуя ажиотаж. Толпа запрыгивает на эмоциях, и ровно в этот момент организаторы сбрасывают свой объём на опоздавших. Цена обваливается так же быстро, как взлетела, а на руках у толпы остаётся пустышка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему скам-монеты в итоге обнуляются?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Такую монету можно печатать бесконечно, поэтому предложение всегда перекрывает спрос и продавец контролирует цену. После единственного выстрела оборот по монете падает, и когда он опускается ниже порога, который устраивает биржу, монету просто делистят. Биржа живёт на комиссиях и не держит инструмент, который перестал приносить оборот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как снизить риски при работе с криптой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту входить только теми деньгами, которые готовы потерять, держать небольшой риск на сделку, не злоупотреблять плечом и проверять любой проект через независимые источники, а не через его же сайт. Никому не отдавать ключи и сид-фразу и не верить обещаниям гарантированного дохода. Защита капитала тут спасает чаще, чем удачный выбор монеты.',
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
      '@id': 'https://arapov.trade/ru/freestudying/crypto-risks-scams#howto',
      name: 'Как разобраться в рисках крипты и не потерять депозит',
      description:
        'Пошаговый разбор рисков и схем мошенничества в криптовалюте и их практическое применение',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь, какие риски в крипте вообще существуют',
          text: 'Рисков в крипте несколько видов: волатильность, мошенничество и скам, технические взломы с потерей ключей, регуляторные решения и психология, и последняя губит новичка чаще всего.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поймите волатильность: почему монета может упасть на 80 процентов',
          text: 'У крипты нет прибыли, дивидендов и фундаментального дна, цена держится на спросе и настроениях, поэтому даже биткоин падал на 80 процентов и больше, а мелкие монеты способны обнулиться.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Научитесь узнавать схемы скама',
          text: 'Скам это фейковые проекты, пирамиды, фишинг, поддельные биржи и накачка монет под сброс, у всех один крючок, обещание лёгкой и гарантированной прибыли.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Поймите механику pump and dump и делистинга',
          text: 'Сомнительную монету тихо накапливают дёшево, разгоняют рекламой и сбрасывают на толпу, после чего оборот падает и биржа делистит мёртвый инструмент.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Снижайте риск заранее по простым признакам',
          text: 'Гарантия дохода, срочность, анонимная команда и просьба про ключи это признаки скама, а лучшая защита это маленький риск на сделку, стоп и независимая проверка проекта.',
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
          name: 'Раг-пулл',
          description:
            'Вид крипто-мошенничества, при котором создатели токена выводят ликвидность из пула, обрушивая цену и лишая держателей возможности продать монету.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скам',
          description:
            'Любое мошенничество, нацеленное на кражу средств трейдера или доступа к его кошельку: фейковые проекты, пирамиды, фишинг, поддельные биржи, накачка монеты под сброс.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pump and dump',
          description:
            'Схема, при которой организаторы тихо скупают дешёвую монету, искусственно разгоняют её цену рекламой и сигналами, а затем сбрасывают свой объём на привлечённую толпу.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
