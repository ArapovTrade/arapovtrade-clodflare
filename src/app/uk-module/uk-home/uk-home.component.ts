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
import { Subscription } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
declare var AOS: any;
import { LangService } from '../../servises/lang.service';
import { ThemeservService } from '../../servises/themeserv.service';

@Component({
  selector: 'app-uk-home',
  templateUrl: './uk-home.component.html',
  styleUrl: './uk-home.component.scss',
})
export class UkHomeComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;
  constructor(
    private meta: Meta,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,
    private titleService: Title,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private lang: LangService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
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
  currentLang = 'ua';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.addAuthorPageSchema('uk');
    this.titleService.setTitle(
      'Ігор Арапов — трейдер, автор книг і курсу з трейдингу',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-24' });

    this.meta.updateTag({
      name: 'citation_keywords',
      content:
        'когнітивні упередження, поведінкові фінанси, трейдинг, УДК 336.76:159.9',
    });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Ігор Арапов — незалежний дослідник у сфері психології інвестиційних рішень та поведінкових фінансів, практикуючий трейдер з 2013 року, автор 9 книг з ISBN, співавтор рецензованої статті, лектор НУХТ.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'навчання трейдингу, курси трейдингу, трейдинг онлайн, трейдинг з нуля, криптовалюти, валютні пари',
    });

    this.lang.setNumber(1);

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
    this.router.navigateByUrl('/uk/studying');
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

    const PERSON_ID = 'https://arapov.trade/#person';
    const COAUTHOR_ID = 'https://arapov.trade/#inna-sytnyk';
    const ORG_ID = 'https://arapov.trade/#organization';
    const WEBSITE_ID = 'https://arapov.trade/#website';
    const NUFT_ID = 'https://arapov.trade/#nuft';

    const PAGE_URL = `https://arapov.trade/${lang}`;

    const HOME_URL =
      lang === 'uk'
        ? 'https://arapov.trade'
        : `https://arapov.trade/${lang}/main`;

    // Локализация оставлена только там, где текст реально меняется по языку
    // страницы. Канонические поля Person (name, sameAs, alternateName)
    // языково-нейтральны и живут вне L — иначе @id-объединение узлов на
    // трёх языках даст случайный победитель по имени.
    const L = {
      uk: {
        inLanguage: 'uk-UA',
        pageName: 'Про автора — Ігор Арапов',
        jobTitle:
          'Незалежний дослідник, трейдер, автор і засновник arapov.trade',
        description:
          'Незалежний дослідник у сфері поведінкових фінансів та психології трейдингу, ' +
          'трейдер на фінансових ринках і автор публікацій з трейдингу та поведінкових фінансів.',
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
        jobTitle:
          'Независимый исследователь, трейдер, автор и основатель arapov.trade',
        description:
          'Независимый исследователь в области поведенческих финансов и психологии трейдинга, ' +
          'трейдер на финансовых рынках и автор публикаций по трейдингу и поведенческим финансам.',
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
        jobTitle:
          'Independent researcher, trader, author and founder of arapov.trade',
        description:
          'Independent researcher in behavioral finance and trading psychology, ' +
          'trader in financial markets, and author of trading and behavioral finance publications.',
        nuftName: 'National University of Food Technologies',
        coauthorName: 'Inna Sytnyk',
        eventName: 'Guest lecture on trading and exchange markets',
        eventDesc:
          'Guest lecture for students of the "Digital Business" programme at NUFT, on the structure ' +
          'of organized financial markets, CME Group, and analysis of the gold futures.',
      },
    }[lang];

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

        {
          '@type': 'WebSite',
          '@id': WEBSITE_ID,
          url: HOME_URL,
          name: 'arapov.trade',
          publisher: { '@id': ORG_ID },
          inLanguage: ['uk', 'ru', 'en'],
        },

        // Organization (#organization) объявлена глобально в
        // MetaservService.addOrganizationSchema(). Здесь только ссылки.

        {
          '@type': 'Person',
          '@id': PERSON_ID,
          // Канонический name — языково-нейтральная латиница. Иначе @id
          // объединяет три языковых узла (uk/ru/en) в один, и Google
          // выбирает name случайным образом среди трёх версий.
          name: 'Игорь Арапов',
          alternateName: [
            'Igor Arapov',
            'Ihor Arapov',
            'Ігор Арапов',
            'Игорь Витальевич Арапов',
          ],

          birthDate: '1990-09-30',
          jobTitle: L.jobTitle,
          description: L.description,
          url: PAGE_URL,
          mainEntityOfPage: PAGE_URL,
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',

          nationality: { '@type': 'Country', name: 'Ukraine' },
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Oles Honchar Dnipro National University',
            url: 'https://www.dnu.dp.ua/',
          },
          affiliation: { '@id': NUFT_ID },
          worksFor: { '@id': ORG_ID },

          knowsAbout: [
            'behavioral finance',
            'trading psychology',
            'Wyckoff Method',
            'Smart Money Concepts',
          ],

          // Один канонический URL без языкового параметра — sameAs должен
          // указывать на идентичный ресурс независимо от языка страницы.
          sameAs: [
            'https://www.wikidata.org/wiki/Q137454477',
            'https://orcid.org/0009-0003-0430-778X',
            'https://scholar.google.com/citations?user=N440tWQAAAAJ',
            'https://ru.tradingview.com/u/Igor_Arapov/',
            'https://www.linkedin.com/in/igor-arapov',
          ],
        },

        {
          '@type': 'Person',
          '@id': COAUTHOR_ID,
          name: L.coauthorName,
          alternateName: ['Inna Sytnyk', 'Інна Ситник', 'Инна Сытник'],
          jobTitle: 'Doctor of Science, Head of Department',
          affiliation: { '@id': NUFT_ID },
          sameAs: [
            'https://www.wikidata.org/wiki/Q138787550',
            'https://orcid.org/0000-0002-3906-770X',
          ],
        },

        {
          '@type': 'CollegeOrUniversity',
          '@id': NUFT_ID,
          name: L.nuftName,
          alternateName: 'НУХТ',
          url: 'https://nuft.edu.ua',
          sameAs: 'https://www.wikidata.org/wiki/Q4315127',
        },

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
          isPartOf: {
            '@type': 'Periodical',
            name: 'Інвестиції: практика та досвід',
            issn: '2306-6814',
          },
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
        },

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
          publisher: {
            '@type': 'Organization',
            name: 'Social Science Research Network (SSRN)',
          },
          image:
            'https://arapov.trade/assets/redesignArapovTrade/img/author-page_main-block_img-light.png',
        },

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

        ...books.map((b) => ({
          '@type': 'Book',
          name: b.name,
          isbn: b.isbn,
          inLanguage: b.inLanguage,
          author: { '@id': PERSON_ID },
          publisher: { '@id': ORG_ID },
          sameAs: b.sameAs,
        })),

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
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'UAH',
            availability: 'https://schema.org/InStock',
            url: 'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-%E2%80%93-zdobuvacham-osvitnoyi-programi',
            validFrom: '2026-03-19T00:00:00+02:00',
          },
          organizer: { '@id': NUFT_ID },
          performer: { '@id': PERSON_ID },
          // offers убран: разовое прошедшее бесплатное мероприятие не
          // нуждается в блоке актуальности/доступности билетов.
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
