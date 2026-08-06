import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../servises/themeserv.service';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { LangService } from '../../servises/lang.service';

@Component({
  selector: 'app-en-home',
  templateUrl: './en-home.component.html',
  styleUrl: './en-home.component.scss',
})
export class EnHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private lang: LangService,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,

    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  registForm: any;

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: false,
          offset: 100,
        });
      }
    }, 500); // Задержка 0.5s
  }
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'en';
  dropdownOpen = false;
  menuOpen: boolean = false;

  ngOnInit(): void {
    this.lang.setNumber(3);

    this.addAuthorPageSchema('en');

    this.registForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl(null, [Validators.email, Validators.required]),
      userMessage: new FormControl('', Validators.required),
    });
    this.titleService.setTitle(
      'Igor Arapov — Independent researcher in behavioral finance, trader and author',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-24' });
    this.meta.updateTag({
      name: 'citation_keywords',
      content:
        'cognitive biases, behavioral finance, trading, UDC 336.76:159.9',
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Igor Arapov — independent researcher in trading psychology and behavioral finance, practising trader since 2013 author of a trading book series.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'trading education, trading courses, online trading, trading from scratch, cryptocurrencies, currency pairs',
    });

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  scrollToRegistration() {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToStudy() {
    this.router.navigateByUrl('/en/studying');
  }

  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
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

    this.refreshAOS();
  }
  refreshAOS() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh(); // Обновление позиций AOS
        this.cdr.detectChanges(); // Принудительное обнаружение изменений
      }, 100); // Задержка для синхронизации
    } else {
      console.warn('AOS is not defined, refresh skipped');
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
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
            console.log(result.text);
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

  /**
   * Author page — trilingual JSON-LD (uk / ru / en).
   *
   * ONE method, called per language:
   *   this.addAuthorPageSchema('uk');   // on /uk
   *   this.addAuthorPageSchema('ru');   // on /ru
   *   this.addAuthorPageSchema('en');   // on /en
   *
   * Person uses a language-neutral @id (#person) AND a canonical, language-neutral
   * name ('Igor Arapov') identical on all three pages — otherwise Google merges the
   * three nodes by @id and picks one name at random. Localized display name lives
   * only in ProfilePage.name (which has its own per-language @id).
   */
  private addAuthorPageSchema(lang: 'uk' | 'ru' | 'en'): void {
    const SCRIPT_ID = 'author-page-schema';

    // SPA-safe: on language switch remove the previous graph (and any legacy
    // per-type scripts from the old deploy) so the head doesn't go stale.
    this.document.getElementById(SCRIPT_ID)?.remove();
    this.document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((s) => {
        try {
          const j = JSON.parse(s.textContent || '{}');
          const t = j['@type'];
          if (
            t === 'Person' ||
            t === 'ProfilePage' ||
            t === 'Event' ||
            t === 'Book' ||
            j['@graph']
          ) {
            s.remove();
          }
        } catch {
          /* ignore non-JSON */
        }
      });

    // ── Language-neutral entity ids (shared across uk/ru/en) ──
    const PERSON_ID = 'https://arapov.trade/#person';
    const COAUTHOR_ID = 'https://arapov.trade/#inna-sytnyk';
    const ORG_ID = 'https://arapov.trade/#organization';
    const WEBSITE_ID = 'https://arapov.trade/#website';
    const NUFT_ID = 'https://arapov.trade/#nuft';

    // Author page for this language: /uk, /ru, /en
    const PAGE_URL = `https://arapov.trade/${lang}`;

    // Homepage for this language: uk = site root, ru/en = /{lang}/main
    const HOME_URL =
      lang === 'uk'
        ? 'https://arapov.trade'
        : `https://arapov.trade/${lang}/main`;

    // ── Localized strings (the only things that differ per language) ──
    // NOTE: personName is intentionally NOT applied to Person.name anymore
    // (Person.name is canonical 'Igor Arapov'). Kept here only for reference.
    const L = {
      uk: {
        inLanguage: 'uk-UA',
        pageName: 'Про автора — Ігор Арапов',
        personName: 'Ігор Арапов',
        jobTitle:
          'Незалежний дослідник, трейдер, автор і засновник arapov.trade',
        description:
          'Незалежний дослідник у сфері поведінкових фінансів та психології трейдингу, ' +
          'трейдер на фінансових ринках і автор публікацій з трейдингу та поведінкових фінансів.',
        award: [
          'Кандидат у майстри спорту з шахів',
          'Вибір редакції TradingView',
        ],
        nuftName: 'Національний університет харчових технологій',
        coauthorName: 'Інна Ситник',
        eventName: 'Гостьова лекція з трейдингу та біржової діяльності',
        eventDesc:
          'Гостьова лекція для здобувачів освітньої програми «Цифровий бізнес» НУХТ, ' +
          'присвячена устрою організованих фінансових ринків, структурі CME Group та аналізу фʼючерсу на золото.',
      },
      ru: {
        inLanguage: 'ru-RU',
        pageName: 'Об авторе — Игорь Арапов',
        personName: 'Игорь Арапов',
        jobTitle:
          'Независимый исследователь, трейдер, автор и основатель arapov.trade',
        description:
          'Независимый исследователь в области поведенческих финансов и психологии трейдинга, ' +
          'трейдер на финансовых рынках и автор публикаций по трейдингу и поведенческим финансам.',
        award: [
          'Кандидат в мастера спорта по шахматам',
          'Выбор редакции TradingView',
        ],
        nuftName: 'Национальный университет пищевых технологий',
        coauthorName: 'Инна Сытник',
        eventName: 'Гостевая лекция по трейдингу и биржевой деятельности',
        eventDesc:
          'Гостевая лекция для студентов образовательной программы «Цифровой бизнес» НУХТ, ' +
          'посвящённая устройству организованных финансовых рынков, структуре CME Group и анализу фьючерса на золото.',
      },
      en: {
        inLanguage: 'en',
        pageName: 'About the author — Igor Arapov',
        personName: 'Igor Arapov',
        jobTitle:
          'Independent researcher, trader, author and founder of arapov.trade',
        description:
          'Independent researcher in behavioral finance and trading psychology, ' +
          'trader in financial markets, and author of trading and behavioral finance publications.',
        award: [
          'Candidate Master of Sports in chess',
          "TradingView Editors' Pick",
        ],
        nuftName: 'National University of Food Technologies',
        coauthorName: 'Inna Sytnyk',
        eventName: 'Guest lecture on trading and exchange markets',
        eventDesc:
          'Guest lecture for students of the "Digital Business" programme at NUFT, on the structure ' +
          'of organized financial markets, CME Group, and analysis of the gold futures.',
      },
    }[lang];

    // ── Books (identical on every page — titles stay in their own language) ──
    const books = [
      {
        name: "Теорія трейдингу. Основи ринку • Технічний аналіз • Об'ємний аналіз",
        isbn: '979-8-90243-730-7',
        inLanguage: 'uk',
        sameAs: [
          'https://www.wikidata.org/wiki/Q138151887',
          'https://doi.org/10.5281/zenodo.18396300',
        ],
      },
      {
        name: 'Trading fundamentals. Market Basics • Technical Analysis • Volume Analysis',
        isbn: '979-8-90243-734-5',
        inLanguage: 'en',
        sameAs: [
          'https://www.wikidata.org/wiki/Q138214986',
          'https://doi.org/10.5281/zenodo.18364022',
        ],
      },
      {
        name: 'Теория трейдинга. Основы рынка • Технический анализ • Объёмный анализ',
        isbn: '979-8-90243-075-9',
        inLanguage: 'ru',
        sameAs: ['https://doi.org/10.5281/zenodo.18057849'],
      },
      {
        name: "Методи аналізу. Технічний аналіз • Об'ємний аналіз • Практика",
        isbn: '979-8-90243-732-1',
        inLanguage: 'uk',
        sameAs: [
          'https://www.wikidata.org/wiki/Q138152545',
          'https://doi.org/10.5281/zenodo.18396338',
        ],
      },
      {
        name: 'Analysis methods. Technical Analysis • Volume Analysis • Practice',
        isbn: '979-8-90243-755-0',
        inLanguage: 'en',
        sameAs: [
          'https://www.wikidata.org/wiki/Q138215890',
          'https://doi.org/10.5281/zenodo.18364066',
        ],
      },
      {
        name: 'Методы анализа. Технический анализ • Объёмный анализ • Практика',
        isbn: '979-8-90243-078-0',
        inLanguage: 'ru',
        sameAs: ['https://doi.org/10.5281/zenodo.18057863'],
      },
      {
        name: 'Психологія трейдингу: Як керувати емоціями та мислити як професіонал',
        isbn: '979-8-90243-504-4',
        inLanguage: 'uk',
        sameAs: [
          'https://www.wikidata.org/wiki/Q137827249',
          'https://doi.org/10.5281/zenodo.18396377',
        ],
      },
      {
        name: 'Trading psychology. How to Master Your Emotions and Think Like a Professional',
        isbn: '979-8-90243-138-1',
        inLanguage: 'en',
        sameAs: [
          'https://www.wikidata.org/wiki/Q138216316',
          'https://doi.org/10.5281/zenodo.18057306',
        ],
      },
      {
        name: 'Психология трейдинга: Как управлять эмоциями и мыслить как профессионал',
        isbn: '979-8-90243-081-0',
        inLanguage: 'ru',
        sameAs: ['https://doi.org/10.5281/zenodo.18057875'],
      },
    ];

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        // ── ProfilePage (per language) ──
        {
          '@type': 'ProfilePage',
          '@id': `${PAGE_URL}#page`,
          url: PAGE_URL,
          name: L.pageName,
          inLanguage: L.inLanguage,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: { '@id': PERSON_ID },
          dateCreated: '2020-01-01T00:00:00+02:00',
          dateModified: '2026-06-20T00:00:00+02:00',
        },

        // ── WebSite ──
        {
          '@type': 'WebSite',
          '@id': WEBSITE_ID,
          url: HOME_URL,
          name: 'arapov.trade',
          publisher: { '@id': ORG_ID },
          inLanguage: ['uk', 'ru', 'en'],
        },

        // ── Organization ──
        // NOT defined here. The canonical Organization (#organization) is emitted
        // globally by MetaservService.addOrganizationSchema() with name, url,
        // legalName, taxID, logo, address, contactPoint and founder → #person.
        // References below ({ '@id': ORG_ID }) resolve to that global node, since
        // Google merges all JSON-LD scripts on the page into one graph by @id.

        // ── Person (canonical, language-neutral @id AND name) ──
        {
          '@type': 'Person',
          '@id': PERSON_ID,
          name: 'Igor Arapov',
          alternateName: [
            'Ігор Арапов',
            'Игорь Арапов',
            'I. V. Arapov',
            'І. В. Арапов',
          ],
          givenName: 'Igor',
          familyName: 'Arapov',
          birthDate: '1990-09-30',
          jobTitle: L.jobTitle,
          description: L.description,
          url: PAGE_URL,
          mainEntityOfPage: PAGE_URL,
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',

          nationality: {
            '@type': 'Country',
            name: 'Ukraine',
            alternateName: 'Україна',
          },
          knowsLanguage: [
            { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
            { '@type': 'Language', name: 'Ukrainian', alternateName: 'uk' },
            { '@type': 'Language', name: 'English', alternateName: 'en' },
          ],
          hasOccupation: [
            {
              '@type': 'Role',
              startDate: '2013',
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Trader',
              },
            },
            {
              '@type': 'Role',
              startDate: '2026',
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Independent Researcher',
              },
            },
          ],
          affiliation: { '@id': NUFT_ID },
          worksFor: { '@id': ORG_ID },
          publishingPrinciples: `https://arapov.trade/${lang}/freestudying`,

          knowsAbout: [
            'behavioral finance',
            'trading psychology',
            'cognitive biases',
            'psychology of investment decisions',
            'financial markets',
            'technical analysis',
            'volume analysis',
            'Wyckoff Method',
            'Smart Money Concepts',
            'market structure',
            'risk management',
          ],
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Oles Honchar Dnipro National University',
            url: 'https://www.dnu.dp.ua/',
          },
          hasCredential: [
            {
              '@type': 'EducationalOccupationalCredential',
              name: 'Professional Trader',
              credentialCategory: 'Experience',
              dateCreated: '2013',
            },
          ],
          award: L.award,

          identifier: [
            {
              '@type': 'PropertyValue',
              propertyID: 'ORCID',
              value: '0009-0003-0430-778X',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'ISNI',
              value: '0000 0005 2951 8564',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'Wikidata',
              value: 'Q137454477',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'Google Knowledge Graph',
              value: 'kg:/g/11ysn_rm8l',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'Google Scholar',
              value: 'N440tWQAAAAJ',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'OpenAlex',
              value: 'A5127355048',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'Semantic Scholar',
              value: '2421286270',
            },
            { '@type': 'PropertyValue', propertyID: 'SSRN', value: '10402456' },
            {
              '@type': 'PropertyValue',
              propertyID: 'ResearchGate',
              value: '2341564479',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'Goodreads',
              value: '66848566',
            },
            {
              '@type': 'PropertyValue',
              propertyID: 'Open Library',
              value: 'OL16073686A',
            },
          ],
          sameAs: [
            'https://www.wikidata.org/wiki/Q137454477',
            'https://orcid.org/0009-0003-0430-778X',
            'https://isni.org/isni/0000000529518564',
            `https://scholar.google.com/citations?user=N440tWQAAAAJ&hl=${lang}`,
            'https://openalex.org/A5127355048',
            'https://www.semanticscholar.org/author/2421286270',
            'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=10402456',
            'https://www.researchgate.net/scientific-contributions/2341564479',
            'https://www.google.com/search?kgmid=/g/11ysn_rm8l',
            'https://www.linkedin.com/in/igor-arapov',
            'https://medium.com/@arapov.trade',
            'https://www.youtube.com/channel/UCebXvNxbdin-dvXz4g8Jp4Q',
            'https://www.goodreads.com/author/show/66848566',
            'https://openlibrary.org/authors/OL16073686A',
            'https://bookwire.bowker.com/author/Igor-Arapov-40225801',
            'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?Z21ID=&I21DBN=VFEIR&P21DBN=VFEIR&S21STN=1&S21REF=10&S21FMT=fullw&C21COM=S&S21CNR=20&S21P01=3&S21P02=0&S21P03=A=&S21COLORTERMS=0&S21STR=%D0%90%D1%80%D0%B0%D0%BF%D0%BE%D0%B2%2C%20%D0%86%D0%B3%D0%BE%D1%80',
          ],

          subjectOf: [
            {
              '@type': 'NewsArticle',
              name: 'Про трейдинг і біржову діяльність – здобувачам освітньої програми «Цифровий бізнес»',
              headline:
                'Про трейдинг і біржову діяльність – здобувачам освітньої програми «Цифровий бізнес»',
              author: {
                '@type': 'Organization',
                name: 'National University of Food Technologies',
                url: 'https://nuft.edu.ua/',
              },
              url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-%E2%80%93-zdobuvacham-osvitnoyi-programi',
              datePublished: '2026-03-19T14:00:00+02:00',
              inLanguage: 'uk',
              image:
                'https://nuft.edu.ua/assets/images/News/2026/03/19/ekonomteoriya1-18-03-2026.jpg',
              publisher: { '@id': NUFT_ID },
            },
            {
              '@type': 'NewsArticle',
              headline:
                'Незважаючи на війну та кризи: Ігор Арапов пояснює, хто завжди заробляє на фондових ринках',
              name: 'Незважаючи на війну та кризи: Ігор Арапов пояснює, хто завжди заробляє на фондових ринках',
              author: {
                '@type': 'Organization',
                name: 'ua.news',
                url: 'https://ua.news/',
              },
              datePublished: '2026-04-15T19:00:00+02:00',
              image:
                'https://cdn-cabinet.ua.news/uploads/images/sulzhenko/kaver_arapov.webp',
              url: 'https://ua.news/ua/money/nezvazhaiuchi-na-viinu-ta-krizi-igor-arapov-poiasniuie-khto-zavzhdi-zarobliaie-na-fondovikh-rinkakh',
              inLanguage: 'uk',
              publisher: {
                '@type': 'Organization',
                name: 'ua.news',
                url: 'https://ua.news',
              },
            },
          ],
        },

        // ── Co-author ──
        {
          '@type': 'Person',
          '@id': COAUTHOR_ID,
          name: L.coauthorName,
          alternateName: [
            'Inna Sytnyk',
            'Інна Ситник',
            'Инна Сытник',
            'I. P. Sytnyk',
          ],
          jobTitle: 'Doctor of Science, Head of Department',
          affiliation: { '@id': NUFT_ID },
          sameAs: [
            'https://www.wikidata.org/wiki/Q138787550',
            'https://orcid.org/0000-0002-3906-770X',
          ],
        },

        // ── NUFT (shared) ──
        {
          '@type': 'CollegeOrUniversity',
          '@id': NUFT_ID,
          name: L.nuftName,
          alternateName: 'НУХТ',
          url: 'https://nuft.edu.ua',
          sameAs: 'https://www.wikidata.org/wiki/Q4315127',
        },

        // ── Journal article (Igor + Inna) ──
        {
          '@type': 'ScholarlyArticle',
          '@id': 'https://arapov.trade/#article-investplan',
          name: 'Психологія інвестиційних рішень: когнітивні упередження роздрібних трейдерів на фінансових ринках',
          headline:
            'Psychology of Investment Decisions: Cognitive Biases of Retail Traders in Financial Markets',
          inLanguage: 'uk',
          datePublished: '2026-02-17T14:00:00+02:00',
          author: [{ '@id': PERSON_ID }, { '@id': COAUTHOR_ID }],
          url: 'https://nayka.com.ua/index.php/investplan/article/view/9062/9212',
          sameAs: [
            'https://www.wikidata.org/wiki/Q138504696',
            'https://doi.org/10.32702/2306-6814.2026.4.96',
          ],
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'UDC',
            value: '336.76:159.9',
          },
          isPartOf: {
            '@type': 'Periodical',
            name: 'Інвестиції: практика та досвід',
            issn: '2306-6814',
          },
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
        },

        // ── SSRN preprint ──
        {
          '@type': 'ScholarlyArticle',
          '@id': 'https://arapov.trade/#article-ssrn',
          name: "From Tilt to System: A Practitioner's Framework for Managing Cognitive Biases in Retail Trading",
          headline:
            "From Tilt to System: A Practitioner's Framework for Managing Cognitive Biases in Retail Trading",
          creativeWorkStatus: 'Preprint',
          inLanguage: 'en',
          datePublished: '2026-02-17T14:00:00+02:00',
          author: { '@id': PERSON_ID },
          url: 'https://ssrn.com/abstract=6254718',
          sameAs: [
            'https://www.wikidata.org/wiki/Q138496096',
            'https://doi.org/10.5281/zenodo.18792055',
          ],
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'UDC',
            value: '336.76:159.9',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Social Science Research Network (SSRN)',
          },
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
        },

        // ── Wikibook ──
        {
          '@type': 'Book',
          '@id': 'https://arapov.trade/#wikibook',
          name: 'Основи трейдингу',
          alternateName: ['Основы трейдинга', 'Fundamentals of Trading'],
          bookFormat: 'https://schema.org/EBook',
          inLanguage: ['uk', 'ru', 'en'],
          author: { '@id': PERSON_ID },
          datePublished: '2025-12-25T14:00:00+02:00',
          sameAs: [
            'https://www.wikidata.org/wiki/Q137644825',
            'https://uk.wikibooks.org/wiki/Основи_трейдингу',
            'https://ru.wikibooks.org/wiki/Основы_трейдинга',
            'https://en.wikibooks.org/wiki/Fundamentals_of_Trading',
          ],
        },

        // ── Printed books ──
        ...books.map((b) => ({
          '@type': 'Book',
          name: b.name,
          isbn: b.isbn,
          inLanguage: b.inLanguage,
          author: { '@id': PERSON_ID },
          publisher: { '@id': ORG_ID },
          sameAs: b.sameAs,
        })),

        // ── Guest lecture ──
        {
          '@type': 'Event',
          '@id': 'https://arapov.trade/#lecture-nuft-2026',
          name: L.eventName,
          description: L.eventDesc,
          startDate: '2026-03-19T14:00:00+02:00',
          endDate: '2026-03-19T15:30:00+02:00',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          image:
            'https://nuft.edu.ua/assets/images/News/2026/03/19/ekonomteoriya1-18-03-2026.jpg',
          url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-%E2%80%93-zdobuvacham-osvitnoyi-programi',
          location: {
            '@type': 'Place',
            name: L.nuftName,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'вул. Володимирська, 68',
              addressLocality: 'Київ',
              postalCode: '01601',
              addressCountry: 'UA',
            },
          },
          organizer: { '@id': NUFT_ID },
          performer: { '@id': PERSON_ID },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'UAH',
            availability: 'https://schema.org/InStock',
            url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-%E2%80%93-zdobuvacham-osvitnoyi-programi',
            validFrom: '2026-03-19T00:00:00+02:00',
          },
        },
      ],
    };

    const script = this.document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
