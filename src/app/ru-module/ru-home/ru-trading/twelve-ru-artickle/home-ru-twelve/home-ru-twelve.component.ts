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
  selector: 'app-home-ru-twelve',
  templateUrl: './home-ru-twelve.component.html',
  styleUrl: './home-ru-twelve.component.scss',
})
export class HomeRuTwelveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Халвинг биткоина — что это и как влияет на цену BTC'
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Халвинг биткоина — что это такое, как работает и когда следующий. Полный разбор механизма сокращения эмиссии BTC, влияние на цену и майнинг.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-10-30' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/halving.webp',
    });

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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          '@id': 'https://arapov.trade/ru/freestudying/halving#article',
          headline:
            'Халвинг биткоина — механизм сокращения эмиссии и влияние на рынок',
          description:
            'Халвинг биткоина — что это такое, как работает и когда следующий. Полный разбор механизма сокращения эмиссии BTC, влияние на цену и майнинг.',
          datePublished: '2025-04-15T00:00:00Z',
        dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/halving',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/halving1.webp',
          },
          articleSection: 'Криптовалюты',
          keywords: [
            'халвинг',
            'биткоин',
            'BTC',
            'майнинг',
            'криптовалюты',
            'эмиссия',
          ],
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
        'https://t.me/ArapovTrade'
      ],
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
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
      '@id': 'https://arapov.trade/ru/freestudying/halving#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое халвинг биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвинг — это запрограммированное сокращение вознаграждения майнерам за добычу новых блоков вдвое. Происходит каждые 210 000 блоков, примерно раз в четыре года.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда произойдёт следующий халвинг?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвинг 2024 года уже состоялся в апреле, сократив награду до 3,125 BTC. Следующий ожидается в 2028 году с наградой 1,5625 BTC за блок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как халвинг влияет на цену биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Исторически халвинг сопровождался ростом цены BTC из-за сокращения предложения при сохранении или росте спроса. После халвинга 2020 года биткоин достиг $69 000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что будет после добычи всех биткоинов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'После добычи последнего из 21 миллиона биткоинов (примерно в 2140 году) майнеры будут зарабатывать исключительно на комиссиях за транзакции.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему халвинг важен для инвесторов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвинг создаёт дефицит биткоинов, ограничивая эмиссию. Это делает BTC аналогом цифрового золота с предсказуемой монетарной политикой.',
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
      '@id': 'https://arapov.trade/ru/freestudying/halving#howto',
      name: 'Как подготовиться к халвингу биткоина',
      description:
        'Пошаговое руководство по подготовке инвестиционной стратегии к событию халвинга.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите историю предыдущих халвингов',
          text: 'Проанализируйте ценовую динамику после халвингов 2012, 2016, 2020 и 2024 годов, чтобы понять типичные рыночные паттерны.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Определите фазу рыночного цикла',
          text: 'Установите текущую позицию в четырёхлетнем цикле: накопление, рост, пик или коррекция.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцените макроэкономические факторы',
          text: 'Учитывайте процентные ставки, инфляцию и регуляторную среду, влияющие на криптовалютный рынок.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разработайте стратегию управления рисками',
          text: 'Определите размер позиции, уровни фиксации прибыли и стоп-лоссы для защиты капитала.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Диверсифицируйте портфель',
          text: 'Распределите инвестиции между биткоином, альткоинами и традиционными активами для снижения риска.',
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
      '@id': 'https://arapov.trade/ru/freestudying/halving#terms',
      name: 'Глоссарий терминов халвинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Халвинг',
          description:
            'Запрограммированное сокращение награды за майнинг блока вдвое, происходящее каждые 210 000 блоков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнинг',
          description:
            'Процесс подтверждения транзакций и создания новых блоков в блокчейне с использованием вычислительных мощностей.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хешрейт',
          description:
            'Общая вычислительная мощность сети биткоин, измеряемая в хешах в секунду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Work',
          description:
            'Консенсусный механизм, требующий решения криптографических задач для подтверждения транзакций.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Блок',
          description:
            'Единица данных в блокчейне, содержащая информацию о транзакциях и связанная с предыдущими блоками.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Эмиссия',
          description:
            'Процесс выпуска новых биткоинов через награды майнерам за добычу блоков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сложность майнинга',
          description:
            'Параметр, определяющий трудность нахождения нового блока, корректируемый каждые 2016 блоков.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнинг-пул',
          description:
            'Объединение майнеров для совместной добычи блоков и распределения вознаграждения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бычий рынок',
          description:
            'Период устойчивого роста цен на рынке, характеризующийся оптимизмом инвесторов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Медвежий рынок',
          description:
            'Период устойчивого падения цен на рынке, сопровождающийся пессимизмом участников.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
