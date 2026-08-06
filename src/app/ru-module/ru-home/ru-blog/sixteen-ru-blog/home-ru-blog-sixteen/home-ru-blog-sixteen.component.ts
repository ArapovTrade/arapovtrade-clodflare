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
  selector: 'app-home-ru-blog-sixteen',
  templateUrl: './home-ru-blog-sixteen.component.html',
  styleUrl: './home-ru-blog-sixteen.component.scss',
})
export class HomeRuBlogSixteenComponent implements OnInit {
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
      'Ethereum (ETH): как анализировать и торговать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое Ethereum, как работают смарт-контракты и dApps, чем ETH отличается от биткоина и какие перспективы у сети.',
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
          headline: 'Ethereum в трейдинге: особенности анализа ETH',
          description:
            'Что такое Ethereum, как работают смарт-контракты и dApps, чем ETH отличается от биткоина и какие перспективы у сети.',
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
            '@id': 'https://arapov.trade/ru/freestudying/ethereum-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ethereum.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюта',
          keywords: 'ethereum',
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
          name: 'Чем Ethereum отличается от Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Биткоин это прежде всего цифровые деньги с пределом эмиссии в 21 миллион монет. Ethereum это платформа для смарт-контрактов и приложений, а его монета ETH ещё и оплачивает операции в сети. <strong>Коротко:  </strong> биткоин про хранение ценности, эфир про программируемость.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как анализировать график ETH?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так же, как любой рынок: через уровни поддержки и сопротивления и через объём. Я ищу следы крупного капитала и ложные наколы. Единственная оговорка в том, что объёмам на нерегулируемых биржах нельзя верить слепо.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему важно соотношение ETH к BTC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что эфир сильно зависит от биткоина и часто ходит за ним. Соотношение ETH к BTC показывает относительную силу: растёт, значит эфир сильнее рынка, падает, значит слабее. Это полезный контекст перед сделкой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие главные риски у торговли Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Высокая волатильность, зависимость от биткоина и более тонкая ликвидность, чем у BTC, плюс регуляторные и технические риски. Поэтому особенно важны контроль риска, стоп-лосс и вход только теми средствами, которые не страшно потерять.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое газ (gas) в Ethereum и почему комиссии скачут?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Газ это плата за каждую операцию в сети, её считают в гвеях (долях ETH). Размер комиссии зависит от загрузки сети: чем больше желающих провести транзакции, тем дороже газ. Поэтому в пиковые часы переводы и сделки обходятся заметно дороже, а резкие скачки комиссий обычно совпадают со всплесками активности в сети.',
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
      '@id': 'https://arapov.trade/ru/freestudying/ethereum-guide#howto',
      name: 'Как разобраться и применять: Ethereum в трейдинге: особенности анализа ETH',
      description:
        'Пошаговый разбор темы и её практическое применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Что такое Ethereum и чем он отличается от Bitcoin',
          text: 'Ethereum — это децентрализованная блокчейн-платформа для смарт-контрактов и приложений, у которой есть собственная монета ETH, работающая и как актив, и как плата за операции в сети.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Что определяет ETH: смарт-контракты, газ, стейкинг и The Merge',
          text: 'Четыре столпа ETH: смарт-контракты, газ (плата за операции), стейкинг и The Merge (переход на Proof of Stake).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'ETH в 2026: цена, ETF и стейкинг-доходность',
          text: 'Чтобы видеть эфир не абстрактно, полезна свежая картина рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Технический анализ Ethereum: уровни и объёмы',
          text: 'Хорошая новость для трейдера: ETH это такой же график, как и любой другой, и торгуется он по тем же законам спроса и предложения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'ETH/BTC корреляция: как соотношение влияет на торговлю',
          text: 'Главное, что нужно держать в голове при торговле ETH: он сильно зависит от биткоина.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Риски торговли Ethereum: ликвидность и волатильность',
          text: 'Риски у ETH те же, что у всей крипты, только их полезно знать в лицо.',
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
          name: 'Ethereum',
          description:
            'Ethereum это децентрализованная блокчейн-платформа для смарт-контрактов и приложений, у которой есть собственная монета ETH, работающая и как актив, и как плата за операции в сети.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'газ (gas fee)',
          description:
            'Газ (gas fee) это плата за каждую операцию в сети Ethereum, измеряемая в гвеях; при высокой нагрузке на сеть комиссия растёт.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'The Merge',
          description:
            'The Merge это переход Ethereum в сентябре 2022 года с майнинга (Proof of Work) на стейкинг (Proof of Stake), который резко снизил энергопотребление сети.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
