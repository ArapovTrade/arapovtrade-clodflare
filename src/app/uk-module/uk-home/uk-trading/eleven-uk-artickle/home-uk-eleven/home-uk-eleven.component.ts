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
  selector: 'app-home-uk-eleven',
  templateUrl: './home-uk-eleven.component.html',
  styleUrl: './home-uk-eleven.component.scss',
})
export class HomeUkElevenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Як почати торгувати криптовалютами: повний посібник | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як почати торгувати криптовалютами з нуля. Вибір біржі, реєстрація, стратегії торгівлі, управління ризиками та аналіз ринку.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-29' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptostart.webp',
    });

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
          headline:
            'Як почати торгувати криптовалютами: повний посібник для початківців',
          description:
            'Детальний посібник з початку торгівлі криптовалютами. Вибір біржі, реєстрація, стратегії, управління ризиками та аналіз ринку.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/cryptostart',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostart1.png',
          },
          articleSection: 'Криптовалюти',
          inLanguage: 'uk',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Яку криптобіржу обрати для початку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для початківців рекомендуються великі біржі з хорошою репутацією: Binance, Kraken, Coinbase, Bybit. Обирайте за критеріями: безпека, ліквідність, комісії, зручність інтерфейсу та підтримка потрібних криптовалют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки грошей потрібно для початку торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Почати можна з мінімальних сум — від $10-50. Головне правило: не інвестуйте більше, ніж готові втратити. Для навчання використовуйте демо-рахунки або невеликі депозити.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка стратегія краща для новачків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Новачкам рекомендується починати зі спотової торгівлі без кредитного плеча. Стратегії: HODL (довгострокове утримання) або свінг-трейдинг. Уникайте скальпінгу та ф'ючерсів на початковому етапі.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як захистити свій акаунт на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Увімкніть двофакторну автентифікацію (2FA) через Google Authenticator. Налаштуйте антифішинговий код, білий список адрес для виведення та сповіщення про вхід. Використовуйте складні унікальні паролі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який відсоток капіталу ризикувати в одній угоді?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Золоте правило — не більше 1-2% від депозиту на одну угоду. При агресивному стилі допускається 3-5%, але це значно збільшує ризики втрати капіталу.',
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
      '@id': 'https://arapov.trade/ua/freestudying/cryptostart#howto',
      name: 'Як почати торгувати криптовалютами',
      description:
        'Покрокове керівництво для початківців трейдерів щодо початку торгівлі криптовалютами на біржах',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вибір криптовалютної біржі',
          text: 'Оберіть надійну біржу з хорошою репутацією, високою ліквідністю та низькими комісіями. Рекомендуються: Binance (0.1%), Kraken (0.16-0.26%), Bybit (0.1%), Coinbase.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Реєстрація та верифікація',
          text: 'Створіть акаунт, введіть email, придумайте складний пароль. Налаштуйте 2FA через Google Authenticator. Пройдіть KYC: завантажте паспорт, підтвердіть адресу, зробіть селфі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Налаштування безпеки',
          text: 'Увімкніть антифішинговий код, білий список адрес для виведення, сповіщення про вхід. Використовуйте складні унікальні паролі.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Поповнення рахунку',
          text: 'Оберіть спосіб: банківський переказ, картка (3-5% комісія), P2P-торгівля або переказ з криптогаманця. Почніть з $10-50 для навчання.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вивчення інтерфейсу біржі',
          text: 'Ознайомтеся зі спотовою торгівлею, графіками, типами ордерів (ринковий, лімітний, стоп-лосс). Практикуйтеся з мінімальними сумами.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Вибір торгової стратегії',
          text: "Для новачків: спотова торгівля без плеча, HODL (Bitcoin, Ethereum) або свінг-трейдинг. Уникайте скальпінгу та ф'ючерсів.",
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Аналіз ринку перед угодою',
          text: 'Визначте тренд за допомогою ковзних середніх, MACD, ADX. Знайдіть рівні підтримки та опору. Перевірте обсяги торгів.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Відкриття першої угоди',
          text: 'Оберіть пару (BTC/USDT). Встановіть стоп-лосс (5-10%) та тейк-профіт (співвідношення 1:2 або 1:3). Ризикуйте не більше 1-2% депозиту.',
        },
        {
          '@type': 'HowToStep',
          position: 9,
          name: 'Управління ризиками',
          text: 'Не ризикуйте більше 1-2% в угоді. Використовуйте стоп-лосс. Диверсифікуйте: 50% BTC/ETH, 30% альткоїни, 20% стейблкоїни.',
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Ведення торгового журналу',
          text: 'Записуйте всі угоди: дату, причину входу, результат, помилки. Регулярно аналізуйте статистику та коригуйте стратегію.',
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
      name: 'Глосарій криптотрейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'CEX',
          description:
            'Централізована біржа, керована компанією з високою ліквідністю.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DEX',
          description:
            'Децентралізована біржа на смарт-контрактах без посередників.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'KYC',
          description: 'Процедура верифікації особи користувача на біржі.',
        },
        {
          '@type': 'DefinedTerm',
          name: '2FA',
          description: 'Двофакторна автентифікація для захисту акаунта.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description: 'Ордер для автоматичної фіксації прибутку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description: 'Стратегія довгострокового утримання криптовалюти.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description: 'Стратегія множини швидких угод з малим прибутком.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description: 'Утримання позицій від кількох днів до тижнів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Обсяг торгів, що впливає на швидкість виконання ордерів.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
