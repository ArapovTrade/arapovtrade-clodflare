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
  selector: 'app-home-uk-blog-eighty-nine',
  templateUrl: './home-uk-blog-eighty-nine.component.html',
  styleUrl: './home-uk-blog-eighty-nine.component.scss',
})
export class HomeUkBlogEightyNineComponent implements OnInit {
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

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Домінація біткоїна (BTC.D): що це та як використовувати в торгівлі | Ігор Арапов',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Домінація біткоїна (BTC.D): що це таке, як розраховується, історія змін та вплив на альткоїни. Повний гід для трейдерів.',
    });
     this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          '@id':
            'https://arapov.trade/uk/freestudying/bitcoin-domination#article',
          headline:
            'Домінація біткоїна (BTC.D): що це та як використовувати в торгівлі',
          description:
            'Домінація біткоїна (BTC.D): що це таке, як розраховується, історія змін та вплив на альткоїни. Повний гід для трейдерів.',
          image:
            'https://arapov.trade/assets/img/content/bitcoin_dominance_1.png',
          datePublished: '2026-03-25T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/bitcoin-domination',
          },
          articleSection: 'Криптовалюти',
          keywords: [
            'домінація біткоїна',
            'BTC.D',
            'альтсезон',
            'капіталізація криптовалют',
            'перетік капіталу',
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
      '@id': 'https://arapov.trade/uk/freestudying/bitcoin-domination#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке домінація біткоїна простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Домінація біткоїна (BTC.D) — це відсоток, що показує яку частку від загальної капіталізації всього крипторинку займає біткоїн. Наприклад, при домінації 60% це означає, що з усіх грошей, вкладених у криптовалюти, 60% знаходиться в біткоїні, а 40% — у всіх інших монетах разом узятих.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає падіння домінації біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Падіння домінації біткоїна сигналізує про перетік капіталу з BTC в альткоїни. Це часто відбувається в періоди «альтсезону», коли інвестори фіксують прибуток у біткоїні та вкладають кошти в альтернативні криптовалюти в пошуках вищої дохідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'При якій домінації починається альтсезон?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Історично альтсезон часто починається при падінні BTC.D нижче 45-48%. Проте це не жорстке правило — важливо враховувати загальний тренд домінації, обсяги торгів та макроекономічні чинники. Швидке падіння BTC.D за короткий період — надійніший сигнал, ніж абсолютне значення.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де дивитися графік домінації біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Графік BTC.D доступний на TradingView (тікер BTC.D), CoinMarketCap та CoinGecko в розділі глобальних графіків, а також на аналітичних платформах Glassnode та CryptoQuant з розширеними метриками. TradingView дозволяє накладати індикатори та налаштовувати сповіщення.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому зростає домінація біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зростання домінації відбувається коли інвестори переводять кошти з альткоїнів у біткоїн. Причини: загальна невизначеність на ринку, великі падіння альтів, інституційні покупки BTC, запуск біткоїн-ETF або негативні новини в секторі альткоїнів. BTC сприймається як «тиха гавань» криптовалютного світу.',
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
      '@id': 'https://arapov.trade/uk/freestudying/bitcoin-domination#howto',
      name: 'Як використовувати домінацію біткоїна в торгівлі',
      description:
        'Практичний посібник з аналізу BTC.D для прийняття торгових рішень',
      totalTime: 'PT15M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Відкрийте графік BTC.D',
          text: 'Зайдіть на TradingView та введіть тікер BTC.D. Оберіть денний або тижневий таймфрейм для аналізу середньострокових трендів.',
          url: 'https://arapov.trade/uk/freestudying/bitcoin-domination#chart',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте ключові рівні',
          text: 'Позначте історичні рівні підтримки та опору: 40%, 45%, 50%, 55%, 60%. Ці зони часто слугують точками розвороту.',
          url: 'https://arapov.trade/uk/freestudying/bitcoin-domination#levels',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Додайте індикатори',
          text: 'Накладіть RSI та ковзні середні для підтвердження тренду. Дивергенції на RSI часто передують розвороту домінації.',
          url: 'https://arapov.trade/uk/freestudying/bitcoin-domination#indicators',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Зіставте з ціною BTC',
          text: 'Порівняйте графік BTC.D з графіком BTC/USD. Зростання ціни BTC при падаючій домінації — сильний сигнал для альтсезону.',
          url: 'https://arapov.trade/uk/freestudying/bitcoin-domination#correlation',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Прийміть торгове рішення',
          text: 'При падінні BTC.D нижче ключових рівнів розгляньте збільшення позицій в альткоїнах. При зростанні — скоротіть експозицію в альтах та збільште частку BTC.',
          url: 'https://arapov.trade/uk/freestudying/bitcoin-domination#decision',
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
      '@id': 'https://arapov.trade/uk/freestudying/bitcoin-domination#terms',
      name: 'Терміни криптовалютного ринку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Домінація біткоїна (BTC.D)',
          description:
            'Відсоткова частка ринкової капіталізації біткоїна від загальної капіталізації всього криптовалютного ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ринкова капіталізація',
          description:
            'Загальна вартість усіх монет криптовалюти в обігу, розрахована як ціна помножена на кількість монет',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альтсезон',
          description:
            'Період на крипторинку, коли альткоїни показують випереджаюче зростання порівняно з біткоїном',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Альткоїни',
          description:
            'Усі криптовалюти крім біткоїна, включаючи Ethereum, Solana, XRP та тисячі інших проєктів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перетік капіталу',
          description:
            'Рух інвестиційних коштів між різними активами або секторами ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TOTAL',
          description:
            'Загальна ринкова капіталізація всіх криптовалют, що відображається на TradingView',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TOTAL2',
          description:
            'Загальна капіталізація криптовалют за винятком біткоїна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Криптозима',
          description: 'Тривалий період падіння цін на криптовалютному ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ICO',
          description:
            'Initial Coin Offering — первинне розміщення токенів для залучення інвестицій у криптопроєкти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентралізовані фінанси — екосистема фінансових додатків на блокчейні без посередників',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
