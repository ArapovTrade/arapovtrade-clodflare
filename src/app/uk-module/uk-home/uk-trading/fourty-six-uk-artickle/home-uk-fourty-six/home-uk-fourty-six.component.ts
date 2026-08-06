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
  selector: 'app-home-uk-fourty-six',
  templateUrl: './home-uk-fourty-six.component.html',
  styleUrl: './home-uk-fourty-six.component.scss',
})
export class HomeUkFourtySixComponent implements OnInit {
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
      'Що таке Tether (USDT) | Повний посібник зі стейблкоїна',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке Tether (USDT) та як працює найбільший стейблкоїн. Дізнайтеся про механізм прив`язки до долара, способи використання, ризики та перспективи USDT.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-28' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/cryptotether.webp',
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
            '@id': 'https://arapov.trade/uk/freestudying/cryptotether',
          },
          headline:
            'Що таке Tether (USDT): повний посібник з найбільшого стейблкоїна',
          description:
            "Що таке Tether (USDT) та як працює найбільший стейблкоїн. Дізнайтеся про механізм прив'язки до долара, способи використання, ризики та перспективи USDT.",
          image: 'https://arapov.trade/assets/img/content/cryptotether1.webp',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          articleBody:
            "Tether посідає особливе місце в криптовалютній екосистемі як інструмент, що пов'язує волатильний світ цифрових активів зі стабільністю традиційних валют...",
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
          name: 'Що таке Tether (USDT)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Tether — це стейблкоїн, ціна якого прив'язана до долара США у співвідношенні 1:1. USDT використовується для торгівлі, зберігання капіталу та переказів, забезпечуючи стабільність у волатильному криптовалютному світі.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим забезпечений Tether?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Згідно із заявами компанії Tether Limited, кожен токен USDT забезпечений резервами: доларами США, державними облігаціями, комерційними паперами та іншими фінансовими активами.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких блокчейнах працює USDT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'USDT випускається на багатьох блокчейнах, включаючи Ethereum, Tron, Solana, Avalanche, Polygon та інші. Вибір мережі впливає на швидкість транзакцій та розмір комісій.',
          },
        },
        {
          '@type': 'Question',
          name: "Які ризики пов'язані з використанням USDT?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні ризики включають питання прозорості резервів, регуляторний тиск, централізоване управління та конкуренцію з боку інших стейблкоїнів з прозорішою структурою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як безпечно зберігати Tether?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Для довгострокового зберігання рекомендуються апаратні гаманці Ledger або Trezor. Для активної торгівлі підходять гарячі гаманці Trust Wallet або MetaMask з обов'язковою двофакторною автентифікацією.",
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
      name: 'Як почати використовувати Tether (USDT)',
      description:
        'Покрокова інструкція з купівлі та використання стейблкоїна USDT',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Виберіть біржу',
          text: 'Зареєструйтесь на надійній криптовалютній біржі: Binance, Bybit, OKX або Kraken. Пройдіть верифікацію особистості для доступу до всіх функцій.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поповніть рахунок',
          text: 'Внесіть фіатні кошти через банківський переказ, картку або P2P-платформу. Альтернативно переведіть іншу криптовалюту для обміну на USDT.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Купіть USDT',
          text: 'Здійсніть купівлю через спотовий ринок або миттєвий обмін. Виберіть потрібну мережу блокчейну залежно від цілей використання.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Налаштуйте зберігання',
          text: 'Для активної торгівлі зберігайте USDT на біржі. Для довгострокового зберігання переведіть на апаратний гаманець, записавши seed-фразу в безпечному місці.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Використовуйте USDT',
          text: 'Застосовуйте токени для торгівлі, переказів, участі в DeFi-протоколах або як захист від волатильності в періоди ринкової невизначеності.',
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
      name: 'Термінологія Tether та стейблкоїнів',
      description: 'Ключові поняття для розуміння механізмів роботи USDT',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стейблкоїн',
          description:
            "Криптовалюта з механізмом підтримки стабільного курсу, зазвичай прив'язаного до фіатної валюти або товару",
        },
        {
          '@type': 'DefinedTerm',
          name: "Прив'язка (Peg)",
          description:
            'Механізм підтримки фіксованого співвідношення між вартістю токена та базового активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Резерви',
          description:
            'Активи, що забезпечують вартість випущених токенів: валюта, облігації, комерційні папери',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мультичейн',
          description:
            'Присутність токена на кількох блокчейнах одночасно для гнучкості використання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ERC-20',
          description:
            'Технічний стандарт токенів на блокчейні Ethereum, якому відповідає USDT у мережі ETH',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TRC-20',
          description:
            'Стандарт токенів на блокчейні Tron з низькими комісіями та високою швидкістю транзакцій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Депег',
          description:
            "Втрата прив'язки до базового активу, коли ціна стейблкоїна відхиляється від цільового значення",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tether Limited',
          description:
            'Компанія-емітент, що керує випуском, забезпеченням та погашенням токенів USDT',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Атестація резервів',
          description:
            'Незалежна перевірка відповідності випущених токенів заявленим резервним активам',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
