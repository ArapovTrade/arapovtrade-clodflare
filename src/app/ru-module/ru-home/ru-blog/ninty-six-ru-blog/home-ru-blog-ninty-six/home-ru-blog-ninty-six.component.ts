import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-ru-blog-ninty-six',
  templateUrl: './home-ru-blog-ninty-six.component.html',
  styleUrl: './home-ru-blog-ninty-six.component.scss',
})
export class HomeRuBlogNintySixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
    this.titleService.setTitle('Торговля нефтью | Полное руководство трейдера');
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговля нефтью: полное руководство. WTI, Brent, фьючерсы, фундаментальный и технический анализ, стратегии трейдинга нефтяными инструментами.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/oiltrading',
          },
          headline: 'Торговля нефтью: полное руководство трейдера',
          description:
            'Комплексное руководство по торговле нефтью: эталонные сорта WTI и Brent, фундаментальный и технический анализ, инструменты и стратегии для трейдеров.',
          image: 'https://arapov.trade/assets/img/content/oiltrading1.jpg',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-07T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
          name: 'Чем WTI отличается от Brent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WTI (West Texas Intermediate) — американский эталонный сорт, торгуется на NYMEX, отражает североамериканский рынок. Brent — международный бенчмарк, торгуется на ICE, служит ориентиром для двух третей мировых контрактов. Отличаются составом, логистикой поставок и региональными факторами ценообразования.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда выходят данные EIA по запасам нефти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Официальные данные EIA (Energy Information Administration) публикуются каждую среду в 17:30 МСК (10:30 ET). Это ключевое событие недели для нефтяного рынка, включающее информацию о запасах сырой нефти, бензина, дистиллятов и загрузке НПЗ.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое contango и backwardation на нефтяном рынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Contango — ситуация, когда дальние фьючерсы дороже ближних, отражает стоимость хранения нефти. Backwardation — обратная ситуация, когда дальние контракты дешевле ближних, указывает на текущий дефицит предложения и является бычьим сигналом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как OPEC+ влияет на цену нефти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OPEC+ контролирует около 40% мировой добычи нефти. Решения о квотах добычи напрямую влияют на баланс спроса и предложения. Сокращение квот снижает предложение и поддерживает цены, увеличение квот давит на котировки. Встречи OPEC+ — ключевые события для трейдеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой инструмент лучше для торговли нефтью?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Выбор зависит от капитала и опыта. Фьючерсы CL (WTI) и BZ (Brent) предлагают максимальную ликвидность, но требуют существенного капитала. CFD подходят розничным трейдерам с небольшим депозитом. ETF (USO, BNO) удобны для инвесторов, но подвержены потерям при роллировании в contango.',
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
      name: 'Как начать торговать нефтью',
      description:
        'Пошаговое руководство для начинающих трейдеров по освоению нефтяного рынка.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите фундаментальные факторы',
          text: 'Разберитесь в основных драйверах цены нефти: баланс спроса и предложения, решения OPEC+, геополитические риски, данные по запасам EIA/API, корреляция с долларом США.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите торговый инструмент',
          text: 'Определите подходящий инструмент исходя из капитала: фьючерсы CL/BZ для профессионалов, CFD для розничных трейдеров, ETF для инвесторов. Учитывайте комиссии и особенности роллирования.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Освойте технический анализ нефти',
          text: 'Изучите работу уровней поддержки/сопротивления, скользящих средних, уровней Фибоначчи на нефтяных графиках. Нефть отлично реагирует на технические сигналы благодаря высокой ликвидности.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Адаптируйте риск-менеджмент',
          text: 'Учтите повышенную волатильность нефти: дневные движения 2-5% — норма. Снизьте риск на сделку до 0.5-1% депозита, используйте более широкие стоп-лоссы по сравнению с форексом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Отработайте стратегии на демо-счёте минимум 2-3 месяца. Изучите поведение рынка во время публикации EIA, встреч OPEC+, геополитических событий перед переходом к реальной торговле.',
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
      name: 'Глоссарий терминов нефтяного трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'WTI',
          description:
            'West Texas Intermediate — американский эталонный сорт нефти, торгуется на бирже NYMEX, служит бенчмарком для североамериканского рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Brent',
          description:
            'Эталонный сорт нефти Северного моря, торгуется на ICE, служит международным бенчмарком для ценообразования двух третей мировых контрактов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Contango',
          description:
            'Состояние рынка, когда дальние фьючерсные контракты торгуются дороже ближних, отражая стоимость хранения сырья.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Backwardation',
          description:
            'Обратная ситуация contango — дальние фьючерсы дешевле ближних, указывает на текущий дефицит предложения и высокий спрос.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OPEC+',
          description:
            'Расширенный альянс стран-экспортёров нефти, координирующий квоты добычи для стабилизации цен на мировом рынке.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EIA',
          description:
            'Energy Information Administration — государственное агентство США, публикующее официальную статистику по запасам и потреблению энергоносителей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Crack spread',
          description:
            'Разница между ценой сырой нефти и ценами нефтепродуктов (бензин, дистилляты), отражает маржу нефтепереработчиков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OVX',
          description:
            'Oil Volatility Index — индекс ожидаемой волатильности цен на нефть, аналог VIX для нефтяного рынка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Роллирование',
          description:
            'Процесс переноса позиции с истекающего фьючерсного контракта на следующий для сохранения экспозиции на базовый актив.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кушинг',
          description:
            'Cushing, Oklahoma — ключевой нефтяной хаб США, точка поставки для фьючерсов WTI, индикатор состояния запасов.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
