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
  selector: 'app-home-ru-blog-fifty-three',
  templateUrl: './home-ru-blog-fifty-three.component.html',
  styleUrl: './home-ru-blog-fifty-three.component.scss',
})
export class HomeRuBlogFiftyThreeComponent implements OnInit {
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
      'Как читать график: основы технического анализа | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как читать ценовой график: типы графиков, таймфреймы, тренды, уровни поддержки и сопротивления. База технического анализа для новичка.',
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
            'Чтение графика: технический анализ, уровни, таймфреймы и каналы',
          description:
            'Как читать ценовой график: типы графиков, таймфреймы, тренды, уровни поддержки и сопротивления. База технического анализа для новичка.',
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
            '@id': 'https://arapov.trade/ru/freestudying/chart-reading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/chart-reading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'чтение графика, технический анализ, виды графиков, японские свечи, таймфреймы, уровни поддержки и сопротивления, торговые каналы',
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
          name: 'Что такое технический анализ простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это чтение графика цены и объёмов, чтобы понять, где актив дёшев, а где дорог, и найти точку входа. Он отвечает не на вопрос, почему цена движется, а на вопрос, где она дешёвая и где дорогая, исходя из того, что вся доступная информация уже отражена в цене.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой вид графика лучше для начинающего?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Как правило, свечной. Он отдаёт всю цену за период и схватывается быстрее прочих за счёт цветного тела: с одного взгляда ясно, вверх ушла цена или вниз. Линейный удобен для общей картины, барный требует навыка, поэтому свеча это комфортная золотая середина.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой таймфрейм выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Старшие, час и день. На них тише шум и реже ложные сигналы, просторнее для анализа, а спред с комиссиями откусывают меньшую долю. И ещё плюс: такой график не приковывает к экрану, его спокойно тянут параллельно с работой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как правильно строить уровни поддержки и сопротивления?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рисуйте уровень зоной, а не идеальной чертой по самому пику. Опирайтесь на несколько касаний: чем чаще цена откликалась на участок, тем он крепче. И сверяйтесь с объёмом, ведь весомая зона это та, через которую проходили крупные обороты.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить настоящий пробой уровня от ложного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По объёму. Настоящий пробой идёт на возросшем объёме и закрепляется за уровнем, а ложный накол обычно вялый: цена выскакивает за уровень, собирает стопы и тут же возвращается. Поэтому разумнее дождаться закрепления и ретеста, а не влетать в прокол сразу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Работают ли фигуры технического анализа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Как готовые сигналы, по моему опыту, они работают примерно вполовину: их разглядывают все, и крупные деньги снимают на них ликвидность. Перевес появляется, когда играешь от зон и заверяешь вход объёмом, а не гадаешь по рисунку на графике.',
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
      '@id': 'https://arapov.trade/ru/freestudying/chart-reading#howto',
      name: 'Как научиться читать график цены',
      description:
        'Пошаговый путь: от вида графика и таймфрейма к уровням, каналам и проверке входа объёмом',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что читает технический анализ',
          text: 'Технический анализ читает поведение цены и объёмов и отвечает, где актив дёшев, а где дорог, а самое объективное на графике это уровни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите вид графика',
          text: 'Линейный показывает только закрытие, а бар и свеча несут полные данные о цене, поэтому всерьёз работают со свечами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Подберите таймфрейм под стиль',
          text: 'Чем младше таймфрейм, тем больше шума, поэтому новичку спокойнее начинать со старших периодов.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Работайте сверху вниз по таймфреймам',
          text: 'Старший таймфрейм задаёт направление, а младший нужен лишь для точного входа в его сторону.',
        },
        {
          '@type': 'HowToStep',
          name: 'Определяйте фазу рынка: тренд или флет',
          text: 'Сначала поймите, в какой фазе рынок: восходящий или нисходящий тренд это дисбаланс, флет это баланс и ценовая коробка накопления или распределения; во флете работайте от границ, в тренде только по тренду.',
          position: 5,
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Стройте уровни как зону, а не линию',
          text: 'Уровень это диапазон по нескольким касаниям, подтверждённый объёмом, а не точная черта по пику.',
        },
        {
          '@type': 'HowToStep',
          name: 'Читайте структуру движения: импульс и откат',
          text: 'Тренд состоит из импульсов на повышенном объёме и откатов на пониженном; пока обновляются максимумы и минимумы, структура цела, а пробой с ретестом уровня смены приоритета показывает, что контроль над рынком сменился.',
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Входите по реакции и объёму, а не по фигуре',
          text: 'Фигуры дают примерно 50 на 50, поэтому вход берут от уровня с подтверждением объёмом, а не по рисунку.',
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
          name: 'Технический анализ',
          description:
            'Метод изучения рынка по графику цены и объёмам торгов, без оглядки на новости и отчётность, исходя из того, что всё известное рынку уже впитано котировкой.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый график',
          description:
            'Визуальное представление изменения цены актива во времени; бывает линейным, барным и свечным.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Временной интервал, который вмещает одна свеча или бар, к примеру на часовике одна свеча укладывает в себя ровно час торгов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Уровень поддержки и сопротивления',
          description:
            'Ценовая зона, у которой движение цены раньше уже останавливалось или разворачивалось: поддержка снизу, сопротивление сверху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый канал',
          description:
            'Ценовая зона между двумя параллельными трендовыми линиями, внутри которой колеблется цена: верхняя линия динамическое сопротивление, нижняя динамическая поддержка.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза рынка',
          description:
            'Текущий режим движения цены: восходящий тренд, нисходящий тренд или флет; флет это баланс и ценовая коробка накопления или распределения, а тренд это дисбаланс и выход цены из коробки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'уровень смены приоритета',
          description:
            'Цена, пробой и удержание которой показывают, что контроль над рынком перешёл от продавцов к покупателям или наоборот; смена надёжнее всего читается по связке пробой плюс ретест.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
