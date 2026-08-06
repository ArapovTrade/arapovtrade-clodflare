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
  selector: 'app-home-uk-sixteen',
  templateUrl: './home-uk-sixteen.component.html',
  styleUrl: './home-uk-sixteen.component.scss',
})
export class HomeUkSixteenComponent implements OnInit {
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
      'Ethereum: як працює і навіщо він потрібен | Повний посібник',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник по Ethereum: як працює друга за капіталізацією криптовалюта, смарт-контракти, DeFi-екосистема, NFT та перехід на Proof-of-Stake. Все про технологію та перспективи ETH.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/ethereum.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/ethereum',
          },
          headline:
            'Ethereum: як працює і навіщо він потрібен — повний посібник по технології ETH',
          description:
            'Повний посібник по Ethereum: як працює друга за капіталізацією криптовалюта, смарт-контракти, DeFi-екосистема, NFT та перехід на Proof-of-Stake.',
          image: 'https://arapov.trade/assets/img/content/ethereum1.png',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/content/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Чим Ethereum принципово відрізняється від Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Bitcoin створювався як цифрове золото та засіб заощадження з обмеженою емісією. Ethereum — це програмована платформа зі смарт-контрактами, що дозволяє створювати децентралізовані додатки, токени, DeFi-протоколи та NFT. По суті, Bitcoin — це гроші, а Ethereum — децентралізований комп'ютер.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке смарт-контракти і як вони працюють?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Смарт-контракти — це програми на блокчейні, що автоматично виконуються при досягненні заданих умов. Вони написані мовою Solidity та працюють в Ethereum Virtual Machine (EVM). Після розгортання код стає незмінним і виконується без посередників.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що змінилося після переходу Ethereum на Proof-of-Stake?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оновлення The Merge у 2022 році замінило енергозатратний майнінг (Proof-of-Work) на стейкінг (Proof-of-Stake). Енергоспоживання мережі знизилося на 99,9%, майнери поступилися місцем валідаторам, а для участі в забезпеченні мережі тепер потрібно заморозити мінімум 32 ETH.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому комісії в мережі Ethereum бувають такими високими?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Комісії (gas fees) визначаються попитом на простір у блоках. При високій активності користувачі конкурують за включення транзакцій, піднімаючи ціни. Рішення другого рівня (Optimism, Arbitrum) та майбутній шардінг покликані знизити навантаження на основну мережу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які токени працюють на базі Ethereum?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На Ethereum працюють тисячі токенів стандарту ERC-20: стейблкоіни (USDT, USDC, DAI), токени DeFi-протоколів (UNI, AAVE, COMP), оракульні мережі (LINK), ігрові токени. Більшість криптопроєктів запускаються на Ethereum завдяки розвиненій інфраструктурі.',
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
      name: 'Як почати роботу з Ethereum',
      description:
        'Покрокова інструкція для початківців по використанню Ethereum та його екосистеми.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Створення криптовалютного гаманця',
          text: 'Встановіть некастодіальний гаманець (MetaMask, Trust Wallet) для зберігання ETH та взаємодії з децентралізованими додатками. Запишіть сід-фразу та зберігайте її в безпечному місці офлайн.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Придбання ETH',
          text: 'Купіть Ethereum на централізованій біржі (Binance, Coinbase, Kraken) або через P2P-обмінники. Переведіть ETH на свій некастодіальний гаманець для повного контролю над активами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Вивчення DeFi-екосистеми',
          text: 'Почніть з простих операцій: обмін токенів на Uniswap, надання ліквідності. Завжди перевіряйте смарт-контракти через аудити та використовуйте невеликі суми для перших експериментів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Освоєння рішень другого рівня',
          text: 'Для зниження комісій вивчіть L2-мережі (Arbitrum, Optimism, Base). Переведіть частину активів через офіційні мости та користуйтеся DeFi-додатками з мінімальними витратами на gas.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Участь у стейкінгу (опціонально)',
          text: 'При наявності 32 ETH можна стати валідатором напряму. Для менших сум доступний ліквідний стейкінг через Lido або Rocket Pool, що дозволяє отримувати дохід без блокування повної суми.',
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
      name: 'Глосарій термінів Ethereum',
      description: 'Основні терміни екосистеми Ethereum та блокчейн-технологій',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Смарт-контракт',
          description:
            'Програма на блокчейні, що автоматично виконується при досягненні заданих умов без участі посередників.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DeFi',
          description:
            'Децентралізовані фінанси — екосистема фінансових сервісів на блокчейні, що працюють без традиційних посередників.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFT',
          description:
            "Невзаємозамінний токен — унікальний цифровий актив, що підтверджує право власності на об'єкт.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gas',
          description:
            'Одиниця вимірювання обчислювальних ресурсів, необхідних для виконання операцій у мережі Ethereum.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'EVM',
          description:
            'Ethereum Virtual Machine — віртуальна машина, що виконує код смарт-контрактів у мережі Ethereum.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Stake',
          description:
            'Механізм консенсусу, де валідатори підтверджують транзакції, заморожуючи криптовалюту як заставу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стейкінг',
          description:
            'Процес блокування криптовалюти для участі в забезпеченні безпеки мережі та отримання винагород.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Шардінг',
          description:
            'Технологія розділення блокчейну на паралельні сегменти для збільшення пропускної здатності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Layer 2',
          description:
            'Рішення другого рівня — протоколи, що обробляють транзакції поза основною мережею для зниження навантаження та комісій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ERC-20',
          description:
            'Технічний стандарт для створення взаємозамінних токенів на блокчейні Ethereum.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
