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
  selector: 'app-home-ru-blog-thirty-three',
  templateUrl: './home-ru-blog-thirty-three.component.html',
  styleUrl: './home-ru-blog-thirty-three.component.scss',
})
export class HomeRuBlogThirtyThreeComponent implements OnInit {
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
      'Микроструктура рынка: стакан и лента | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как устроена микроструктура рынка: биржевой стакан, лента принтов, ликвидность и айсберг-ордера. Как читать поток заявок и сделок.',
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
            'Микроструктура рынка: как формируется цена, стакан, спред, ликвидность и маркетмейкер',
          description:
            'Как устроена микроструктура рынка: биржевой стакан, лента принтов, ликвидность и айсберг-ордера. Как читать поток заявок и сделок.',
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
            '@id': 'https://arapov.trade/ru/freestudying/market-microstructure',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stockorderbook.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Словарь трейдера',
          keywords:
            'микроструктура рынка, биржевой стакан, bid ask, спред, ликвидность, волатильность, маркетмейкер',
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
          name: 'Как формируется цена на бирже?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Через баланс спроса и предложения. Когда покупатели напористее, цена растёт, пока не наберётся достаточно продавцов, и наоборот. Цена это согласие участников в каждый момент, а настоящий отпечаток этой схватки проступает в объёме, по которому и видно, кто держит движение.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Bid, Ask и спред?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bid это лучшая цена, по которой готовы купить, Ask это лучшая цена, по которой готовы продать. Все заявки складываются в биржевой стакан, а промежуток между Bid и Ask называют спредом. Это плата за немедленный вход: открыв сделку, вы сразу в минусе на величину спреда.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ликвидность рынка и зачем она трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это способность рынка впитать ордер без заметного сдвига цены. На ликвидном рынке узкий спред и исполнение по ожидаемой цене, на тонком широкий спред, проскальзывание и резкие разрывы. А зоны скопления стопов это пулы ликвидности, к которым крупный капитал намеренно гонит цену.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать по биржевому стакану новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту это тяжело: стакан меняется каждую секунду, а скорость и алгоритмы на стороне крупных игроков, которые ещё и прячут заявки спуфингом и айсбергами. Новичку устойчивее опираться на уровни и объёмы, где уже видно, кто реально набирал позицию.',
          },
        },
        {
          '@type': 'Question',
          name: 'Правда ли, что маркетмейкер выбивает мой стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не лично ваш. Он собирает ликвидность там, где её много, а это очевидные места, куда толпа ставит стопы: круглые уровни и локальные экстремумы. Чаще трейдер теряет не из-за злодея, а потому что сам поставил стоп в самом предсказуемом месте.',
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
      '@id': 'https://arapov.trade/ru/freestudying/market-microstructure#howto',
      name: 'Как понимать микроструктуру рынка',
      description:
        'Пошаговый разбор того, как рождается цена, как устроены стакан, спред и ликвидность и какую роль играет маркетмейкер',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что цену лепит баланс спроса и предложения',
          text: 'Цена это всегда согласие между теми, кто хочет купить, и теми, кто хочет продать.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь в стакане, Bid и Ask',
          text: 'Биржевой стакан это список всех активных заявок на покупку и продажу, выстроенных по ценам.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Считайте спред как издержку каждой сделки',
          text: 'Спред это разница между ценой покупки и ценой продажи, скрытая издержка каждой сделки.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Научитесь видеть ликвидность и её пулы',
          text: 'Ликвидность это способность рынка впитать торговый ордер без заметного изменения цены.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Подстраивайте риск под волатильность через ATR',
          text: 'Волатильность это размах ценовых колебаний за период, а не направление движения.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Поймите логику маркетмейкера и идите за капиталом, а не против',
          text: 'Маркетмейкер это профессиональный участник, который держит двойную котировку и обеспечивает ликвидность.',
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
          name: 'Биржевой стакан',
          description:
            'Список всех активных заявок на покупку и продажу актива, выстроенных по ценам; его ещё называют книгой заявок или order book.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (Ask) и ценой продажи (Bid) одного актива в данный момент; скрытая издержка каждой сделки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка впитать торговый ордер без заметного изменения цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Мера размаха ценовых колебаний актива за определённый период; характеризует амплитуду движения, а не его направление.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркетмейкер',
          description:
            'Профессиональный участник рынка, который по договору с биржей держит двойную котировку и обеспечивает ликвидность.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'wash trading',
          description:
            'Имитация торговли, когда одни и те же участники заключают сделки сами с собой, чтобы нарисовать объём, которого на деле нет.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
