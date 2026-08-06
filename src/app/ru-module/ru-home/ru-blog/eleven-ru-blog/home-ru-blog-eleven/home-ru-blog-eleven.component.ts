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
  selector: 'app-home-ru-blog-eleven',
  templateUrl: './home-ru-blog-eleven.component.html',
  styleUrl: './home-ru-blog-eleven.component.scss',
})
export class HomeRuBlogElevenComponent implements OnInit {
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
      'Основы криптовалют для начинающих | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Основы криптовалют для начинающих: что такое блокчейн, биткоин и альткоины, как работает рынок и с чего начать трейдинг крипты безопасно.',
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
            'Криптовалюта с нуля: основы, риски и с чего начать новичку',
          description:
            'Основы криптовалют для начинающих: что такое блокчейн, биткоин и альткоины, как работает рынок и с чего начать трейдинг крипты безопасно.',
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
            '@id': 'https://arapov.trade/ru/freestudying/crypto-basics',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptocurrencybasics44.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюта',
          keywords:
            'криптовалюта, блокчейн, децентрализация, криптобиржа, как начать торговать криптой, риски крипты, демосчёт',
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
          name: 'Что такое криптовалюта простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это цифровой актив, который выпускает не банк, а компьютерная сеть на основе блокчейна. Им можно обмениваться напрямую между людьми, но за ним не стоит государство, поэтому ценность большинства монет держится только на спросе.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое блокчейн и децентрализация?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Блокчейн это общий реестр записей о переводах, копия которого хранится у множества участников сети. Децентрализация означает, что нет единого центра контроля, поэтому запись почти невозможно подделать, но и привычной защиты тоже нет.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем криптовалюта отличается от обычных денег?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За обычными деньгами стоит государство как гарант, за криптой только сеть и спрос. Крипта не регулируется единым органом и гораздо волатильнее, а ошибочный перевод никто не отменит.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие риски важно знать новичку в крипте?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Высокая волатильность, отсутствие регулятора и обилие мем-коинов и скам-проектов, которые разгоняют и затем удаляют с бирж. Поэтому стоит держаться крупных активов и входить только теми средствами, которые не страшно потерять.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как выбрать криптобиржу новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Смотрите на надёжность и репутацию, наличие регуляции, ликвидность и размер комиссий. Реклама и бонусы это последнее, на что стоит ориентироваться. И не держите все средства на бирже, крупные суммы выводите в кошелёк.',
          },
        },
        {
          '@type': 'Question',
          name: 'С демосчёта или сразу с реального счёта лучше начать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту только с демосчёта. На нём вы обкатаете метод без риска для денег. Переходить на реальный счёт стоит после стабильного плюса на демо, и начинать с минимальных сумм.',
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
      '@id': 'https://arapov.trade/ru/freestudying/crypto-basics#howto',
      name: 'Как разобраться в криптовалюте и начать с нуля',
      description:
        'Пошаговый разбор: что такое крипта, чем она рискованна и как сделать первый шаг без слива депозита',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое криптовалюта',
          text: 'Криптовалюта это цифровой актив без госгаранта; ценность большинства монет держится на спросе, исключение биткоин с лимитом 21 миллион.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь в блокчейне',
          text: 'Блокчейн это общий реестр у множества узлов: запись не подделать, но и привычной защиты нет, ошибочный перевод никто не отменит.',
        },
        {
          '@type': 'HowToStep',
          name: 'Разберитесь в видах криптовалют',
          text: 'Монеты делятся на биткоин как цифровое золото, эфир как платформу, альткоины разного качества и стейблкоины; стейблкоин привязан к доллару один к одному и служит тихой гаванью и торговой парой.',
          position: 3,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Оцените риски крипты',
          text: 'Нет единого регулятора, высокая волатильность и обилие скам-проектов; основы крипты на девяносто процентов про риск, а не про технологию.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Выберите биржу и кошелёк',
          text: 'Биржу выбирают по надёжности, регуляции, ликвидности и комиссиям, а крупные суммы держат не на бирже, а в отдельном кошельке.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Откройте первую сделку по плану',
          text: 'Вход по уровню с заранее определённым стопом и лимитным ордером вместо спешки по рынку, на крупном понятном активе.',
        },
        {
          '@type': 'HowToStep',
          name: 'Научитесь читать крипторынок',
          text: 'Крипторынок читается по уровням и объёму плюс своя сторона предложения: эмиссия, халвинги и потоки китов; доминация биткоина это фон, а не сигнал, а манипуляции и арбитраж это ловушки новичка.',
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Начните с демосчёта',
          text: 'Сначала метод, потом демо до стабильного плюса, и только затем небольшой реальный счёт со стопом.',
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
          name: 'Криптовалюта',
          description:
            'Цифровой актив, который выпускается и хранится не банком, а компьютерной сетью на основе блокчейна, и которым можно обмениваться напрямую между участниками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптобиржа',
          description:
            'Площадка, где покупают и продают криптовалюты; выбирают её в первую очередь по надёжности и регуляции, а не по рекламе и бонусам.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
