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
  selector: 'app-home-ru-blog-twenty-eight',
  templateUrl: './home-ru-blog-twenty-eight.component.html',
  styleUrl: './home-ru-blog-twenty-eight.component.scss',
})
export class HomeRuBlogTwentyEightComponent implements OnInit {
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
    this.titleService.setTitle('Фундаментальный анализ рынка | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Основы фундаментального анализа: экономические показатели, ставки центробанков, новости и как они влияют на рынок и валютные курсы.',
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
            'Фундаментальный анализ в трейдинге: полный гайд по макро, ставкам и новостям',
          description:
            'Основы фундаментального анализа: экономические показатели, ставки центробанков, новости и как они влияют на рынок и валютные курсы.',
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
            '@id': 'https://arapov.trade/ru/freestudying/fundamental-analysis',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/fundamentalanalysis.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Фундаментальный анализ',
          keywords:
            'фундаментальный анализ, экономические факторы, макроэкономические индикаторы, ВВП, PMI, инфляция, ключевая ставка, ФРС, экономический календарь, торговля на новостях, объёмный анализ',
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
          name: 'Что такое фундаментальный анализ простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это оценка актива через экономику, ставки и отчётность, чтобы понять его справедливую стоимость. Дешевле справедливой цены актив считают недооценённым, дороже переоценённым. Для долгосрочного инвестора это сильный инструмент, а трейдеру он отвечает на вопрос почему движется цена, но не на вопрос когда входить.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие экономические факторы двигают рынок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ставки центральных банков, инфляция, занятость, торговый баланс, деловая активность PMI, цены на сырьё и золото, а также геополитика. Сильнее всего на валюты влияет ставка, потому что она задаёт стоимость денег в экономике.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что показывает PMI и почему важна отметка 50?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PMI это индекс деловой активности из опросов менеджеров по закупкам. Отметка 50 это водораздел: выше неё экономика расширяется, ниже сжимается. Показатель опережающий, поэтому рынок реагирует на него живее, чем на запаздывающий ВВП.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как ставка ФРС влияет на доллар и рисковые активы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Повышение ставки удорожает деньги, обычно укрепляет доллар и давит на акции и крипту. Снижение удешевляет деньги, ослабляет доллар и поддерживает рисковые активы и золото. От решения до реальной реакции экономики тянется лаг, как правило больше полугода.',
          },
        },
        {
          '@type': 'Question',
          name: 'Стоит ли торговать на выходе экономических новостей?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В моём опыте в сам момент выхода лезть не стоит: спред расширяется, цену бросает в обе стороны, а двойной выброс собирает стопы даже при верно угаданном направлении. Разумнее знать о релизах заранее, переждать всплеск и войти уже по реакции цены на уровне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что использовать вместо фундаментального анализа для входа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объёмный анализ. Фундаментал держат как фон и направление ветра, а вход берут по объёму и реакции цены у сильных уровней, где виден след крупного капитала. Принцип простой: сначала увидеть действие на графике, потом войти, а не угадывать новость заранее.',
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
      '@id': 'https://arapov.trade/ru/freestudying/fundamental-analysis#howto',
      name: 'Как трейдеру работать с фундаментальным анализом',
      description:
        'Пошаговый разбор макроэкономики для трейдера: от понимания факторов и индикаторов до работы с календарём и входа по объёму вместо новости',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что фундаментал отвечает на почему, а не на когда',
          text: 'Фундаментальный анализ оценивает справедливую стоимость актива через экономику и ставки, отвечая на вопрос почему движется цена, но не когда входить.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайте, какие факторы двигают рынки',
          text: 'Рынки двигают ставки центральных банков, инфляция, занятость, торговый баланс, деловая активность, сырьё, золото и геополитика.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Читайте ключевые индикаторы: ВВП, PMI, инфляцию, занятость',
          text: 'Главные индикаторы это ВВП как общий рост, PMI как деловая активность, инфляция и данные по занятости.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Следите за ставкой и решениями центральных банков',
          text: 'Ключевая ставка центрального банка это самый сильный фундаментальный рычаг для доллара и рисковых активов.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Используйте экономический календарь защитно',
          text: 'Экономический календарь нужен в первую очередь чтобы не попасть врасплох и не открыть сделку прямо перед сильной новостью.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Входите по объёму у уровня, а не по самой новости',
          text: 'Вход выгоднее брать по объёму и реакции цены у сильного уровня, после того как стало видно действие крупного капитала.',
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
          name: 'Фундаментальный анализ',
          description:
            'Это метод оценки актива через изучение экономических и финансовых факторов: ставок центробанков, инфляции, отчётности компаний и состояния отрасли.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Это суммарная стоимость всех товаров и услуг, что страна произвела за период, и главная мерка размера и роста экономики.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ключевая ставка',
          description:
            'Это процент, под который центральный банк кредитует коммерческие банки, главный рычаг управления стоимостью денег в экономике.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ФРС',
          description:
            'Это Федеральная резервная система, центральный банк Соединённых Штатов, который управляет денежной политикой страны через процентную ставку и количество денег в экономике.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Экономический календарь',
          description:
            'Это таблица предстоящих экономических событий с датой, временем и степенью их важности, где по каждому событию показывают прогноз, прошлое значение и фактический результат.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговля на новостях',
          description:
            'Это стиль торговли, при котором трейдер пытается заработать на резком движении цены в момент выхода важной экономической новости.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
