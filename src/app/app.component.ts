import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectorRef,
  AfterViewChecked,
  Renderer2,
  RendererFactory2,
  AfterContentChecked,
  OnChanges,
  Inject,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './servises/articles.service';
import { LangService } from './servises/lang.service';
import { SearchServiceService } from './servises/search-service.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ServLangueageService } from './servises/serv-langueage.service';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { MetaservService } from './servises/metaserv.service';
import { DOCUMENT } from '@angular/common';
import { FaqservService } from './servises/faqserv.service';
import { ThemeservService } from './servises/themeserv.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;

  dropdownOpen = false;
  checkLang!: number;
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;
  breadcrumbs: any[] = []; // Массив для хлебных крошек

  jsonLd: any; // Объект для JSON-LD
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = true;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artickle: ArticlesService,
    private lan: LangService,
    private cdr: ChangeDetectorRef,
    private searchSer: SearchServiceService,
    private languageService: ServLangueageService,
    private rendererFactory: RendererFactory2,
    private meta: Meta,
    private titleService: Title,
    private metaTegServ: MetaservService,
    @Inject(DOCUMENT) private document: Document,
    private faqservise: FaqservService,
    private themeServ: ThemeservService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  langFAQ = '';
  changeLanguage(lang: string) {
    // Получение текущего пути и параметров маршрута
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/');

    // Замена языка в пути
    if (
      // тут тоже нужна логика для мейн пейдж
      pathSegments[1] === 'uk' ||
      pathSegments[1] === 'en' ||
      pathSegments[1] === 'ru'
    ) {
      pathSegments[1] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    // Построение нового пути
    const newPath = pathSegments.join('/');
    this.artickle.selectedGroups = [];
    // Перенаправление на новый путь
    this.router.navigateByUrl(newPath).then(() => {
      // После перехода выполнить прокрутку страницы в самый верх
      window.scrollTo(0, 0);
    });
  }

  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setUkraine() {
    this.lan.setNumber(1);
  }
  setRussian() {
    this.lan.setNumber(2);
  }
  setEnglish() {
    this.lan.setNumber(3);
  }
  registForm: any;

  ngOnInit(): void {
    this.themeSubscription = this.themeServ.getTheme().subscribe((data) => {
      this.isDark = data;
    });
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
    this.metaTegServ.addOrganizationSchema();
    this.languageService.languageCode$.subscribe((code) => {
      this.checkLang = code;
      this.searchSer.setLange(this.checkLang);
    });
    // this.getLang();
    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });

    // this.setDefaultMetaTags();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.removeMetaDescriptionIfExists();

        const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, ''); // Отримуємо чистий шлях
        const segments = urlPath.split('/'); // Розбиваємо на сегменти
        const link = segments[segments.length - 1] || '';
        const article = this.artickle.getArticleByLink(link) || null;
        const langCode = urlPath.startsWith('uk')
          ? 'uk'
          : urlPath == ''
            ? 'uk'
            : urlPath.startsWith('en')
              ? 'en'
              : 'ru';

        // FAQ

        // this.addingFaqScript(langCode, urlPath);
        // Визначаємо мову та витягуємо відповідний заголовок
        const lang = urlPath.startsWith('uk')
          ? 'Ukr'
          : urlPath.startsWith('en')
            ? 'En'
            : 'Rus';
        const titleKey = `realTitle${lang}` as
          | 'realTitleUkr'
          | 'realTitleRus'
          | 'realTitleEn'; // Обмежуємо ключі
        const titleDescr = `descr${lang}` as
          | 'descrUkr'
          | 'descrRus'
          | 'descrEn';
        let personAlterName = [''];
        let personName = '';
        let title = '';
        if (article) {
          title = article[titleKey];
          if (segments[0] == '' || segments[0] == 'uk') {
            personName = 'Ігор Арапов';
            personAlterName = [
              'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Игорь Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
            ];
          } else if (segments[0] == 'en') {
            personName = 'Igor Arapov';
            personAlterName = [
              'Ігор Арапов',
              'Арапов Игорь',
              'I. Arapov',
              'Игорь Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
            ];
          } else if (segments[0] == 'ru') {
            personName = 'Игорь Арапов';
            personAlterName = [
              'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Ігор Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
            ];
          }
        } else if (segments[0] == '') {
          title =
            'Безкоштовне навчання трейдингу від Ігоря Арапова';
        } else if (segments[1] === 'main' && segments[0] === 'ru') {
          title =
            'Бесплатное обучение трейдингу от Игоря Арапова';
        } else if (segments[1] === 'main' && segments[0] === 'en') {
          title =
            'Free trading education from Igor Arapov';
        } else if (segments[1] === 'studying' && segments[0] === 'ru') {
          title = 'Курсы по трейдингу онлайн | Обучение трейдингу с нуля';
        } else if (segments[1] === 'studying' && segments[0] === 'uk') {
          title = 'Курси трейдингу онлайн | Навчання трейдингу з нуля';
        } else if (segments[1] === 'studying' && segments[0] === 'en') {
          title = 'Online Trading Courses | Learn Trading from Scratch';
        } else if (segments[1] === 'books' && segments[0] === 'ru') {
          title = 'Мои книги | Обучение трейдингу с нуля';
        } else if (segments[1] === 'books' && segments[0] === 'uk') {
          title = 'Мої книги | Навчання трейдингу з нуля';
        } else if (segments[1] === 'books' && segments[0] === 'en') {
          title = 'My Books | Trading Training from Scratch';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga'
        ) {
          title = 'Книга - Основы трейдинга | Обучение трейдингу с нуля';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga'
        ) {
          title = 'Книга - Основи трейдингу | Навчання трейдингу з нуля';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga'
        ) {
          title = 'Book - Trading Basics | Trading Training from Scratch';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga-tom-two'
        ) {
          title =
            'Книга - Основы трейдинга. Практика | Обучение трейдингу с нуля';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga-tom-two'
        ) {
          title =
            'Книга - Основи трейдингу. Практика | Навчання трейдингу з нуля';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga-tom-two'
        ) {
          title =
            'Book - Trading Basics. Practice | Trading Training from Scratch';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'psihologiya-treydinga'
        ) {
          title = 'Книга - Психология трейдинга | Обучение трейдингу с нуля';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'psihologiya-treydinga'
        ) {
          title = 'Книга - Психологія трейдингу | Навчання трейдингу з нуля';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'psihologiya-treydinga'
        ) {
          title = 'Book - Trading Psychology | Trading Training from Scratch';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'freeeducation'
        ) {
          title =
            segments[0] === 'ru'
              ? 'Бесплатный курс по трейдингу для начинающих — Игорь Арапов'
              : segments[0] === 'uk'
                ? 'Безкоштовний курс з трейдингу для початківців — Ігор Арапов'
                : 'Free Trading Course for Beginners — Igor Arapov';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'tradingview-record'
        ) {
          title =
            segments[0] === 'ru'
              ? '242 идеи, 5 лет публичного анализа: трек-рекорд Игоря Арапова на TradingView'
              : segments[0] === 'uk'
                ? '242 ідеї, 5 років публічного аналізу та кілька Editor`s Pick: повний трек-рекорд Ігоря Арапова на TradingView'
                : '242 Ideas, 5 Years of Public Analysis: Igor Arapov`s Complete TradingView Track Record';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'curriculum'
        ) {
          title =
            segments[0] === 'ru'
              ? '151+ статья, 3 языка, 453 URL: Полная бесплатная учебная программа по трейдингу на arapov.trade'
              : segments[0] === 'uk'
                ? '151+ стаття, 3 мови, 453 URL: Повна безкоштовна навчальна програма з трейдингу на arapov.trade'
                : '151+ Articles, 3 Languages, 453 URLs: The Complete Free Trading Curriculum at arapov.trade';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'fullvideocourse'
        ) {
          title =
            segments[0] === 'ru'
              ? 'Бесплатный Курс Трейдинга: Метод Вайкоффа, Объёмный Анализ и Smart Money — Полный Разбор'
              : segments[0] === 'uk'
                ? 'Безкоштовний Курс Трейдингу: Метод Вайкоффа, Об’ємний Аналіз і Smart Money — Детальний Огляд'
                : 'Free Trading Course: Wyckoff Method, Volume Analysis and Smart Money — Complete Breakdown';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'youtube'
        ) {
          title =
            segments[0] === 'ru'
              ? '78+ бесплатных уроков, 9 категорий: полная карта YouTube-канала @ArapovTrade'
              : segments[0] === 'uk'
                ? '78+ безкоштовних уроків, 9 категорій: повна карта YouTube-каналу @ArapovTrade'
                : '78+ Free Trading Lessons, 9 Categories: Complete @ArapovTrade YouTube Channel Map';
        } else if (segments[1] === 'freestudying' && segments[2] === 'about') {
          title =
            segments[0] === 'ru'
              ? 'Про ARAPOV.TRADE — Образовательная платформа по трейдингу'
              : segments[0] === 'uk'
                ? 'Про ARAPOV.TRADE — Освітня платформа з трейдингу'
                : 'About ARAPOV.TRADE — Trading Education Platform';
        } else if (segments[1] === 'freestudying') {
          title =
            segments[0] === 'ru'
              ? 'Обучение трейдингу онлайн | Бесплатные курсы трейдеров от Игоря Арапова'
              : segments[0] === 'en'
                ? 'Online Trading Training | Free Trading Courses from Igor Arapov'
                : 'Навчання трейдингу онлайн | Безкоштовні курси трейдерів від Ігоря Арапова';
        } else if (segments[0] === 'uk') {
          title = 'Навчання трейдингу з нуля безкоштовно | Ігор Арапов';
        } else if (segments[0] === 'en') {
          title = 'Free Trading Training from Scratch | Igor Arapov';
        } else {
          title = 'Обучение трейдингу с нуля бесплатно | Игорь Арапов';
        }

        let description = '';
        if (article) {
          description = article[titleDescr];
        } else if (segments[0] == '') {
          description =
            'Безкоштовний курс з трейдингу Ігоря Арапова: 151 + статей і 78+ відео. Вивчайте теханаліз, ризик-менеджмент і торгові стратегії онлайн';
        } else if (segments[1] === 'studying' && segments[0] === 'ru') {
          description =
            'Онлайн-курсы по трейдингу от Игоря Арапова — обучение трейдингу и инвестициям с нуля, дистанционно и бесплатно. Изучайте технический и фундаментальный анализ, торговые стратегии и управление рисками шаг за шагом.';
        } else if (segments[1] === 'studying' && segments[0] === 'uk') {
          description =
            'Онлайн-курси з трейдингу від Ігоря Арапова — навчання трейдингу та інвестиціям з нуля, дистанційно та безкоштовно. Вивчайте технічний та фундаментальний аналіз, торгові стратегії та управління ризиками крок за кроком.';
        } else if (segments[1] === 'studying' && segments[0] === 'en') {
          description =
            'Online trading courses by Igor Arapov — trading and investment education from scratch, remotely and free. Learn technical and fundamental analysis, trading strategies, and risk management step by step.';
        } else if (segments[1] === 'books' && segments[0] === 'ru') {
          description =
            'Мои книги по трейдингу | Практические руководства для начинающих и профессионалов от трейдера с 12-летним опытом';
        } else if (segments[1] === 'books' && segments[0] === 'uk') {
          description =
            'Мої книги з трейдингу | Практичні посібники для початківців та професіоналів від трейдера з 12-річним досвідом';
        } else if (segments[1] === 'books' && segments[0] === 'en') {
          description =
            'My trading books | Practical guides for beginners and professionals from a trader with 12 years of experience';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga'
        ) {
          description =
            'Основы трейдинга - методическое пособие для начинающих | Биржевая торговля, FOREX, анализ рынка, управление капиталом';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga'
        ) {
          description =
            'Основи трейдингу - методичний посібник для початківців | Біржова торгівля, FOREX, аналіз ринку, управління капіталом';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga'
        ) {
          description =
            'Trading Basics - A Methodological Guide for Beginners | Stock Trading, FOREX, Market Analysis, Capital Management';

          // Основы трейдинга. Практика (том 2)
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga-tom-two' &&
          segments[0] === 'ru'
        ) {
          description =
            'Основы трейдинга. Практика - продвинутый курс | Метод Вайкоффа, фазы рынка, управление рисками, торговые системы';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga-tom-two' &&
          segments[0] === 'uk'
        ) {
          description =
            'Основи трейдингу. Практика - просунутий курс | Метод Вайкоффа, фази ринку, управління ризиками, торгові системи';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'osnovy-treydinga-tom-two' &&
          segments[0] === 'en'
        ) {
          description =
            'Trading Basics. Practice - Advanced Course | Wyckoff Method, Market Phases, Risk Management, Trading Systems';

          // Психология трейдинга
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'psihologiya-treydinga' &&
          segments[0] === 'ru'
        ) {
          description =
            'Психология трейдинга - управление эмоциями | Страх, жадность, дисциплина, психология успешного трейдера';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'psihologiya-treydinga' &&
          segments[0] === 'uk'
        ) {
          description =
            'Психологія трейдингу - управління емоціями | Страх, жадібність, дисципліна, психологія успішного трейдера';
        } else if (
          segments[1] === 'books' &&
          segments[2] === 'psihologiya-treydinga' &&
          segments[0] === 'en'
        ) {
          description =
            'Trading Psychology - Emotion Management | Fear, Greed, Discipline, Successful Trader Psychology';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'freeeducation'
        ) {
          description =
            segments[0] === 'ru'
              ? 'Бесплатный курс по трейдингу с нуля: технический анализ, метод Вайкоффа, объёмный анализ, торговая система с положительным математическим ожиданием. 18 разделов, живые разборы сделок.'
              : segments[0] === 'uk'
                ? 'Безкоштовний курс з трейдингу з нуля: технічний аналіз, метод Вайкоффа, об`ємний аналіз, торгова система з позитивним математичним очікуванням. 18 розділів, живі розбори угод.'
                : 'Free trading course from scratch: technical analysis, Wyckoff method, volume analysis, complete trading system with positive mathematical expectancy. 18 sections, live trade breakdowns.';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'tradingview-record'
        ) {
          description =
            segments[0] === 'ru'
              ? 'Полный разбор всего опубликованного на TradingView с 2021 по 2026 год. Bitcoin, золото, форекс, индексы, нефть, образовательный курс по методу Вайкоффа.'
              : segments[0] === 'uk'
                ? 'Повний розбір усього опублікованого на TradingView з 2021 по 2026 рік. Bitcoin, золото, форекс, індекси, нафта, освітній курс з методу Вайкоффа.'
                : 'A full breakdown of everything published on TradingView from 2021 to 2026. Bitcoin, gold, forex, indices, crude oil, and a complete Wyckoff Method educational curriculum.';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'fullvideocourse'
        ) {
          description =
            segments[0] === 'ru'
              ? '1,5 часа, более 40 тем, полностью бесплатно. Полный разбор курса трейдинга: метод Вайкоффа, объёмный анализ, Smart Money, управление рисками, психология.'
              : segments[0] === 'uk'
                ? '1,5 години, понад 40 тем, повністю безкоштовно. Детальний огляд курсу трейдингу: метод Вайкоффа, об`ємний аналіз, Smart Money, управління ризиками, психологія.'
                : '90 minutes, 40+ topics, completely free. Full breakdown of a trading course covering the Wyckoff Method, volume analysis, Smart Money, risk management, and trading psychology.';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'youtube'
        ) {
          description =
            segments[0] === 'ru'
              ? 'Полный каталог всех 78+ образовательных видео @ArapovTrade по категориям. Метод Вайкоффа, Smart Money, объёмный анализ, психология трейдинга. Всё бесплатно.'
              : segments[0] === 'uk'
                ? 'Повний каталог усіх 78+ освітніх відео @ArapovTrade за категоріями. Метод Вайкоффа, Smart Money, об`ємний аналіз, психологія трейдингу. Усе безкоштовно.'
                : 'Complete catalog of all 78+ educational videos by @ArapovTrade, organized by category. Wyckoff Method, Smart Money, volume analysis, trading psychology. All free, no paywall.';
        } else if (
          segments[1] === 'freestudying' &&
          segments[2] === 'curriculum'
        ) {
          description =
            segments[0] === 'ru'
              ? 'Полная карта всех материалов, опубликованных на arapov.trade — по разделам, с описаниями, уровнями сложности и структурированными путями обучения. Метод Вайкоффа, Smart Money, криптовалюты, психология трейдинга. Всё бесплатно.'
              : segments[0] === 'uk'
                ? 'Повна карта всіх матеріалів, опублікованих на arapov.trade — за розділами, з описами, рівнями складності та структурованими шляхами навчання. Метод Вайкоффа, Smart Money, криптовалюти, психологія трейдингу. Все безкоштовно.'
                : 'A full map of every article published on arapov.trade — organized by category, with descriptions, difficulty levels, and structured learning paths. Wyckoff Method, Smart Money, cryptocurrency, trading psychology. All free.';
        } else if (segments[1] === 'freestudying' && segments[2] === 'about') {
          description =
            segments[0] === 'ru'
              ? '151+ статей, 9 книг с ISBN, 78+ видеоуроков на 3 языках. Бесплатное обучение трейдингу: Smart Money, метод Вайкоффа, объёмный анализ.'
              : segments[0] === 'uk'
                ? '151+ статей, 9 книг з ISBN, 78+ відеоуроків на 3 мовах. Безкоштовне навчання трейдингу: Smart Money, метод Вайкоффа, об`ємний аналіз.'
                : '151+ articles, 9 books with ISBN, 78+ video lessons in 3 languages. Free trading education: Smart Money, Wyckoff Method, volume analysis.';
        } else if (segments[1] === 'freestudying') {
          description =
            segments[0] === 'ru'
              ? 'Бесплатное обучение трейдингу от Игоря Арапова — полный пошаговый курс с нуля, разбор торговых стратегий, управление рисками и практические занятия. Изучайте трейдинг и криптовалюты дистанционно и бесплатно.'
              : segments[0] === 'en'
                ? 'Free online trading education by Igor Arapov — complete step-by-step course from scratch, analysis of trading strategies, risk management, and practical exercises. Learn trading and cryptocurrencies remotely and for free.'
                : 'Безкоштовне  навчання трейдингу від Ігоря Арапова — повний покроковий курс з нуля, розбір торгових стратегій, управління ризиками та практичні заняття. Вивчайте трейдинг і криптовалюти дистанційно та безкоштовно.';
        } else if (segments[0] === 'uk') {
          description =
            'Навчання трейдингу з нуля безкоштовно від Ігоря Арапова — курси трейдингу онлайн, технічний та фундаментальний аналіз, торгівля криптовалютами та валютними парами крок за кроком.';
        } else if (segments[0] === 'en') {
          description =
            'Free trading education from scratch by Igor Arapov — online trading courses, technical and fundamental analysis, trading cryptocurrencies and currency pairs step by step.';
        } else {
          description =
            'Обучение трейдингу с нуля бесплатно от Игоря Арапова — онлайн-курсы трейдинга, технический и фундаментальный анализ, торговля криптовалютами и валютными парами шаг за шагом.';
        }

        const image =
          article?.imgUkr ||
          '/assets/redesignArapovTrade/img/author-page_main-block_img-light.png';
        const url = `https://arapov.trade${this.router.url}`;

        this.titleService.setTitle(title);
        this.removeMetaDescriptionIfExists();
        this.meta.updateTag({ name: 'description', content: description });

        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({
          property: 'og:description',
          content: description,
        });
        this.meta.updateTag({ property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '600' });
        this.meta.updateTag({
          property: 'og:image',
          content: `https://arapov.trade${image}`,
        });
        this.meta.updateTag({ property: 'og:url', content: url });
        //Обновляет Persona schema

        // Оновлюємо Twitter Card теги
        this.meta.updateTag({
          name: 'twitter:card',
          content: `summary_large_image`,
        }); // Тип картки
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({
          name: 'twitter:description',
          content: description,
        });
        this.meta.updateTag({
          name: 'twitter:image',
          content: `https://arapov.trade${image}`,
        });
        this.meta.updateTag({ name: 'twitter:url', content: url });
        this.meta.updateTag({ name: 'language', content: langCode });
        this.meta.updateTag({ property: 'og:type', content: 'website' }); // или 'article'

        this.meta.updateTag({
          property: 'og:locale',
          content:
            langCode == 'ru' ? 'ru_RU' : langCode == 'uk' ? 'uk_UA' : 'en_US',
        }); // ru_RU, uk_UA, en_US
        this.meta.updateTag({
          property: 'og:site_name',
          content: 'Arapov Trade',
        });

        this.document.documentElement.lang = langCode;
        this.generateBreadcrumbs();
        this.updateHreflangTags(); //hreflang
        this.updateCanonicalTag();
        this.updateMetaKeywords();
      });
  }

  private updateMetaKeywords() {}

  //delete description
  private removeMetaDescriptionIfExists() {
    const head = this.document.head;
    const metaDescription = head.querySelector('meta[name="description"]');
    if (metaDescription) {
      head.removeChild(metaDescription);
    }
  }
  //каноникал

  private updateCanonicalTag() {
    // Удаляем старые канонические теги
    const existingCanonical = this.document.querySelector(
      'link[rel="canonical"]',
    );
    if (existingCanonical) existingCanonical.remove();

    // Создаем новый canonical-тег
    const canonicalLink = this.renderer.createElement('link');
    this.renderer.setAttribute(canonicalLink, 'rel', 'canonical');

    // Получаем путь без параметров и якорей
    let path = this.router.url.split('?')[0].split('#')[0];

    // === Особый случай: главная страница ===
    // '/' → 'https://arapov.trade'
    // '/ru' → 'https://arapov.trade/ru'  (без слэша в конце)
    if (path === '/' || path === '') {
      this.renderer.setAttribute(canonicalLink, 'href', 'https://arapov.trade');
    } else {
      // Убираем лишний слэш в конце, если есть
      if (path.endsWith('/')) path = path.slice(0, -1);
      const url = `https://arapov.trade${path}`;
      this.renderer.setAttribute(canonicalLink, 'href', url);
    }

    // Добавляем тег в head
    this.renderer.appendChild(this.document.head, canonicalLink);
  }

  //FAQ
  // private addingFaqScript(langcode: string, path: string) {
  //   const faqSchema = this.faqservise.returnSchema(langcode, path);

  //   const scriptss = this.document.querySelectorAll(
  //     'script[type="application/ld+json"]',
  //   );
  //   let faqScript: HTMLScriptElement | any = null;
  //   scriptss.forEach((script) => {
  //     try {
  //       const jsonContent = JSON.parse(script.textContent || '{}');
  //       if (jsonContent['@type'] === 'FAQPage') {
  //         faqScript = script;
  //       }
  //     } catch (e) {
  //       // Игнорируем некорректный JSON
  //     }
  //   });

  //   // Если скрипт FAQPage найден, заменяем его
  //   if (faqScript) {
  //     faqScript.text = JSON.stringify(faqSchema);
  //   } else {
  //     // Если скрипт не найден, создаём новый

  //     const scriptr = this.document.createElement('script');
  //     scriptr.type = 'application/ld+json';
  //     scriptr.text = JSON.stringify(faqSchema);
  //     this.document.head.appendChild(scriptr);
  //   }
  // }

  private generateBreadcrumbs() {
    const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');

    this.breadcrumbs = []; // Определяем хлебные крошки в зависимости от маршрута
    if (urlPath === '' || urlPath === '/') {
      this.breadcrumbs.push({ name: 'Головна', url: 'https://arapov.trade' });
    } else if (urlPath === 'ru/main') {
      this.breadcrumbs.push({
        name: 'Главная',
        url: 'https://arapov.trade/ru/main',
      });
    } else if (urlPath === 'en/main') {
      this.breadcrumbs.push({
        name: 'Main Page',
        url: 'https://arapov.trade/en/main',
      });
    } else if (urlPath === 'ru' || urlPath === 'uk' || urlPath === 'en') {
      if (urlPath === 'ru') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
        );
      } else if (urlPath === 'uk') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
        );
      } else if (urlPath === 'en') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
        );
      }
    } else if (
      urlPath === 'ru/studying' ||
      urlPath === 'uk/studying' ||
      urlPath === 'en/studying'
    ) {
      if (urlPath === 'ru/studying') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Обучение трейдингу',
            url: 'https://arapov.trade/ru/studying',
          },
        );
      } else if (urlPath === 'uk/studying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Навчання трейдингу',
            url: 'https://arapov.trade/uk/studying',
          },
        );
      } else if (urlPath === 'en/studying') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'Trading training',
            url: 'https://arapov.trade/en/studying',
          },
        );
      }
    } else if (
      urlPath === 'ru/books' ||
      urlPath === 'uk/books' ||
      urlPath === 'en/books'
    ) {
      if (urlPath === 'ru/books') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Все книги',
            url: 'https://arapov.trade/ru/books',
          },
        );
      } else if (urlPath === 'uk/books') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Всі книги',
            url: 'https://arapov.trade/uk/books',
          },
        );
      } else if (urlPath === 'en/books') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'All books',
            url: 'https://arapov.trade/en/books',
          },
        );
      }
    } else if (
      urlPath === 'ru/books/osnovy-treydinga' ||
      urlPath === 'uk/books/osnovy-treydinga' ||
      urlPath === 'en/books/osnovy-treydinga'
    ) {
      if (urlPath === 'ru/books/osnovy-treydinga') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Все книги',
            url: 'https://arapov.trade/ru/books',
          },
          {
            name: 'Основы трейдинга',
            url: 'https://arapov.trade/ru/books/osnovy-treydinga',
          },
        );
      } else if (urlPath === 'uk/books/osnovy-treydinga') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Всі книги',
            url: 'https://arapov.trade/uk/books',
          },
          {
            name: 'Основи трейдингу',
            url: 'https://arapov.trade/uk/books/osnovy-treydinga',
          },
        );
      } else if (urlPath === 'en/books/osnovy-treydinga') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'All books',
            url: 'https://arapov.trade/en/books',
          },
          {
            name: 'Trading Basics',
            url: 'https://arapov.trade/en/books/osnovy-treydinga',
          },
        );
      }
    } else if (
      urlPath === 'ru/books/psihologiya-treydinga' ||
      urlPath === 'uk/books/psihologiya-treydinga' ||
      urlPath === 'en/books/psihologiya-treydinga'
    ) {
      if (urlPath === 'ru/books/psihologiya-treydinga') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Все книги',
            url: 'https://arapov.trade/ru/books',
          },
          {
            name: 'Психология трейдинга',
            url: 'https://arapov.trade/ru/books/psihologiya-treydinga',
          },
        );
      } else if (urlPath === 'uk/books/psihologiya-treydinga') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Всі книги',
            url: 'https://arapov.trade/uk/books',
          },
          {
            name: 'Психологія трейдингу',
            url: 'https://arapov.trade/uk/books/psihologiya-treydinga',
          },
        );
      } else if (urlPath === 'en/books/psihologiya-treydinga') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'All books',
            url: 'https://arapov.trade/en/books',
          },
          {
            name: 'Trading Psychology',
            url: 'https://arapov.trade/en/books/psihologiya-treydinga',
          },
        );
      }
    } else if (
      urlPath === 'ru/books/osnovy-treydinga-tom-two' ||
      urlPath === 'uk/books/osnovy-treydinga-tom-two' ||
      urlPath === 'en/books/osnovy-treydinga-tom-two'
    ) {
      if (urlPath === 'ru/books/osnovy-treydinga-tom-two') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Все книги',
            url: 'https://arapov.trade/ru/books',
          },
          {
            name: 'Основы трейдинга. Практика',
            url: 'https://arapov.trade/ru/books/osnovy-treydinga-tom-two',
          },
        );
      } else if (urlPath === 'uk/books/osnovy-treydinga-tom-two') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Всі книги',
            url: 'https://arapov.trade/uk/books',
          },
          {
            name: 'Основи трейдингу. Практика',
            url: 'https://arapov.trade/uk/books/osnovy-treydinga-tom-two',
          },
        );
      } else if (urlPath === 'en/books/osnovy-treydinga-tom-two') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'All books',
            url: 'https://arapov.trade/en/books',
          },
          {
            name: 'Trading Basics. Practice',
            url: 'https://arapov.trade/en/books/osnovy-treydinga-tom-two',
          },
        );
      }
    } else if (
      urlPath === 'ru/freestudying' ||
      urlPath === 'uk/freestudying' ||
      urlPath === 'en/freestudying'
    ) {
      if (urlPath === 'ru/freestudying') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
        );
      } else if (urlPath === 'uk/freestudying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
        );
      } else if (urlPath === 'en/freestudying') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
        );
      }
    } else if (
      urlPath === 'ru/freestudying/freeeducation' ||
      urlPath === 'uk/freestudying/freeeducation' ||
      urlPath === 'en/freestudying/freeeducation'
    ) {
      if (urlPath === 'ru/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Бесплатные курсы по трейдингу',
            url: 'https://arapov.trade/ru/freestudying/freeeducation',
          },
        );
      } else if (urlPath === 'uk/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Безкоштовні курси з трейдингу',
            url: 'https://arapov.trade/uk/freestudying/freeeducation',
          },
        );
      } else if (urlPath === 'en/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Free Trading Courses',
            url: 'https://arapov.trade/en/freestudying/freeeducation',
          },
        );
      }
    } else if (
      urlPath === 'ru/freestudying/practic' ||
      urlPath === 'uk/freestudying/practic' ||
      urlPath === 'en/freestudying/practic'
    ) {
      if (urlPath === 'ru/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Торговая система трейдера',
            url: 'https://arapov.trade/ru/freestudying/practic',
          },
        );
      } else if (urlPath === 'uk/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Торгова система трейдера',
            url: 'https://arapov.trade/uk/freestudying/practic',
          },
        );
      } else if (urlPath === 'en/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Trader`s trading system',
            url: 'https://arapov.trade/en/freestudying/practic',
          },
        );
      }
    } else if (
      urlPath === 'ru/disclaimer' ||
      urlPath === 'uk/disclaimer' ||
      urlPath === 'en/disclaimer'
    ) {
      if (urlPath === 'ru/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Отказ от ответственности',
            url: 'https://arapov.trade/ru/disclaimer',
          },
        );
      } else if (urlPath === 'uk/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Відмова від відповідальності',
            url: 'https://arapov.trade/uk/disclaimer',
          },
        );
      } else if (urlPath === 'en/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'Disclaimer',
            url: 'https://arapov.trade/en/disclaimer',
          },
        );
      }
    } else {
      const urlArr = urlPath.split('/');

      if (urlArr[0] === 'ru') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Теория по трейдингу',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          },
        );
      } else if (urlArr[0] === 'uk') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Теорія з трейдингу',
            url: `https://arapov.trade/uk/freestudying/${urlArr[2]}`,
          },
        );
      } else if (urlArr[0] === 'en') {
        this.breadcrumbs.push(
          { name: 'Main Page', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Trading Theory',
            url: `https://arapov.trade/en/freestudying/${urlArr[2]}`,
          },
        );
      }
    }
    // Генерируем JSON-LD
    this.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
    // Динамически обновляем <script> в DOM
    this.updateJsonLdScript();
  }
  // Метод для динамического обновления JSON-LD в DOM
  private updateJsonLdScript() {
    // Удаляем старый скрипт, если он есть
    const existingScript = this.document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }
    // Создаем новый скрипт
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setProperty(
      script,
      'textContent',
      JSON.stringify(this.jsonLd),
    );
    // this.renderer.appendChild(this.document.head, script);
    this.renderer.insertBefore(
      this.document.head,
      script,
      this.document.head.firstChild,
    );
  }

  getLang() {
    this.lan
      .getNumber()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.checkLang = value;
        this.searchSer.setLange(this.checkLang);
      });
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  //popup
  flag: boolean = false;
  flagTrue: boolean = true;
  popuptoggle() {
    this.flag = !this.flag;
    this.flagTrue = !this.flagTrue;
    // this.registForm.reset();
  }
  onSubmit(registForm: FormGroup) {
    if (
      registForm.value.userName &&
      registForm.value.userEmail &&
      registForm.value.userMessage
    ) {
      const templateParams = {
        userName: registForm.value.userName,
        userEmail: registForm.value.userEmail,
        userMessage: registForm.value.userMessage,
      };

      emailjs
        .send(
          'service_qomgf4f',
          'template_jif62uq',
          templateParams,
          'zvCuOnVqiMJMycGQ0',
        )
        .then(
          (result: EmailJSResponseStatus) => {
            this.registForm.reset(); // Сброс формы после успешной отправки
          },
          (error) => {
            console.error(error.text);
          },
        );
    }
  }
  close() {
    this.registForm.reset();

    this.flag = true;
    this.flagTrue = false;
  }

  private updateHreflangTags() {
    // Удаляем старые теги hreflang
    this.document
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((tag) => tag.remove());

    const fullPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');
    const segments = fullPath ? fullPath.split('/') : [];
    const LANGS = ['uk', 'ru', 'en'];

    let currentLang: string;
    let basePath: string;

    if (
      !fullPath ||
      fullPath === 'main' ||
      fullPath === 'ru/main' ||
      fullPath === 'en/main'
    ) {
      basePath = 'main';
      if (!fullPath) currentLang = 'uk';
      else currentLang = segments[0] || 'uk';
    } else {
      const first = segments[0];
      if (LANGS.includes(first)) {
        currentLang = first;
        basePath = segments.slice(1).join('/');
      } else {
        currentLang = 'uk';
        basePath = segments.join('/');
      }
    }

    const normalize = (u: string) =>
      u.replace(/([^:]\/)\/+/g, '$1').replace(/\/$/, '');

    LANGS.forEach((lang) => {
      let href = '';

      if (basePath === 'main') {
        if (lang === 'uk') href = 'https://arapov.trade';
        else if (lang === 'ru') href = 'https://arapov.trade/ru/main';
        else href = 'https://arapov.trade/en/main';
      } else {
        href = `https://arapov.trade/${lang}/${basePath}`;
      }

      href = normalize(href);

      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', lang);
      this.renderer.setAttribute(link, 'href', href);
      this.renderer.appendChild(this.document.head, link);
    });

    // --- Исправленный блок x-default ---
    // let xDefaultHref = '';

    // if (
    //   this.router.url === '/ru' ||
    //   this.router.url === '/ru/' ||
    //   this.router.url === '/uk/' ||
    //   this.router.url === '/uk' ||
    //   this.router.url === '/en/' ||
    //   this.router.url === '/en'
    // ) {
       
    //   xDefaultHref = 'https://arapov.trade/ru';
    // } else {
    //   // Обычное поведение
    //   xDefaultHref =
    //     basePath === 'main'
    //       ? 'https://arapov.trade/ru/main'
    //       : `https://arapov.trade/ru/${basePath}`;
    // }
    

    // xDefaultHref = normalize(xDefaultHref);
    // const defaultLink = this.renderer.createElement('link');
    // this.renderer.setAttribute(defaultLink, 'rel', 'alternate');
    // this.renderer.setAttribute(defaultLink, 'hreflang', 'x-default');
    // this.renderer.setAttribute(defaultLink, 'href', xDefaultHref);
    // this.renderer.appendChild(this.document.head, defaultLink);

    let xDefaultHref = '';

if (basePath === 'main') {
  xDefaultHref = 'https://arapov.trade';
} else {
  xDefaultHref = `https://arapov.trade/uk/${basePath}`;
}

xDefaultHref = normalize(xDefaultHref);

const defaultLink = this.renderer.createElement('link');
this.renderer.setAttribute(defaultLink, 'rel', 'alternate');
this.renderer.setAttribute(defaultLink, 'hreflang', 'x-default');
this.renderer.setAttribute(defaultLink, 'href', xDefaultHref);
this.renderer.appendChild(this.document.head, defaultLink);
  }

  //

  scrollPosition: number = 0;
  circleRadius: number = 25;
  circumference: number = 2 * Math.PI * this.circleRadius;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(
      100,
      (this.scrollPosition / maxScroll) * 100,
    );
    this.updateProgressRing(scrollPercentage);
    this.toggleButtonVisibility();
  }

  toggleButtonVisibility() {
    const button = document.querySelector('.scroll-to-top') as HTMLElement;
    if (this.scrollPosition > 100) {
      // Показываем кнопку после 100px скролла
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  updateProgressRing(percentage: number) {
    const path = document.querySelector('.progress-ring__path') as SVGElement;
    const dashOffset =
      this.circumference - (percentage / 100) * this.circumference;
    path.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    path.style.strokeDashoffset = dashOffset.toString();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  hovered: string | null = null;
}
