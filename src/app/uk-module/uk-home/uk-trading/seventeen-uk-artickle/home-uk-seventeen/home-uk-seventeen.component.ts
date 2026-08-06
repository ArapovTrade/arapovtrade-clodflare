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
  selector: 'app-home-uk-seventeen',
  templateUrl: './home-uk-seventeen.component.html',
  styleUrl: './home-uk-seventeen.component.scss',
})
export class HomeUkSeventeenComponent implements OnInit {
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
      'Що таке Біткоїн (Bitcoin) | Повний посібник з BTC',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке Біткоїн та як він працює. Повний посібник з першої криптовалюти: історія, майнінг, зберігання, переваги та перспективи розвитку BTC.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-31' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/bitcoin.webp',
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
            '@id': 'https://arapov.trade/uk/freestudying/bitcoin',
          },
          headline:
            'Що таке Біткоїн (Bitcoin): повний посібник з першої криптовалюти',
          description:
            'Що таке Біткоїн та як він працює. Повний посібник з першої криптовалюти: історія, майнінг, зберігання, переваги та перспективи розвитку BTC.',
          image: 'https://arapov.trade/assets/img/content/bitcoin1.webp',
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
          name: 'Що таке Біткоїн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Біткоїн — це перша децентралізована криптовалюта, створена у 2009 році Сатоші Накамото. BTC працює на технології блокчейн і дозволяє здійснювати транзакції без посередників на кшталт банків.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому у Біткоїна обмежена емісія?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Максимальна кількість біткоїнів обмежена 21 мільйоном монет. Це запрограмовано в коді мережі і робить BTC дефляційним активом, захищеним від знецінення на відміну від фіатних валют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке халвінг Біткоїна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Халвінг — це скорочення винагороди майнерам удвічі кожні 210 000 блоків (приблизно раз на 4 роки). Механізм зменшує темпи емісії нових монет і історично передував зростанню ціни BTC.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як безпечно зберігати Біткоїн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Для довгострокового зберігання рекомендуються апаратні гаманці Ledger або Trezor. Для активного використання підходять мобільні гаманці з обов'язковою двофакторною автентифікацією та резервним копіюванням seed-фрази.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому Біткоїн називають цифровим золотом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'BTC має властивості, схожі із золотом: обмежена пропозиція, складність видобутку, довговічність та незалежність від урядів. Це робить його привабливим інструментом збереження вартості.',
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
      name: 'Як почати працювати з Біткоїном',
      description:
        'Покрокова інструкція для початківців з купівлі та використання BTC',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи',
          text: 'Розберіться в принципах роботи блокчейну, механізмі консенсусу Proof-of-Work та особливостях зберігання криптовалюти.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Виберіть гаманець',
          text: 'Визначтеся з типом зберігання: гарячий гаманець для активного використання або апаратний для довгострокового зберігання.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Придбайте BTC',
          text: 'Зареєструйтесь на перевіреній біржі, пройдіть верифікацію та купіть біткоїн зручним способом.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Забезпечте безпеку',
          text: 'Увімкніть двофакторну автентифікацію, використовуйте унікальні паролі та переведіть значні суми на холодне зберігання.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Визначте стратегію',
          text: 'Вирішіть, чи будете довгостроково інвестувати (HODL), активно торгувати або використовувати BTC для платежів.',
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
      name: 'Термінологія Біткоїна',
      description: 'Ключові поняття для розуміння першої криптовалюти',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Блокчейн',
          description:
            "Розподілений реєстр, що зберігає всі транзакції мережі у вигляді пов'язаних блоків даних",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Майнінг',
          description:
            "Процес створення нових біткоїнів шляхом розв'язання криптографічних задач та підтвердження транзакцій",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Халвінг',
          description:
            'Скорочення винагороди майнерам удвічі кожні 210 000 блоків для контролю емісії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Proof-of-Work',
          description:
            'Алгоритм консенсусу, що вимагає обчислювальних витрат для підтвердження блоків',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сатоші',
          description:
            'Мінімальна одиниця біткоїна, що дорівнює одній стомільйонній BTC (0.00000001)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Lightning Network',
          description:
            'Протокол другого рівня для миттєвих та дешевих мікротранзакцій у мережі Bitcoin',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HODL',
          description:
            'Стратегія довгострокового утримання біткоїна незалежно від короткострокових коливань ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Приватний ключ',
          description:
            'Криптографічний код, що дає повний контроль над біткоїнами на відповідній адресі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Seed-фраза',
          description:
            'Набір з 12-24 слів для відновлення доступу до криптовалютного гаманця',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
