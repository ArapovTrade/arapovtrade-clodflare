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
  selector: 'app-home-uk-blog-fifty-five',
  templateUrl: './home-uk-blog-fifty-five.component.html',
  styleUrl: './home-uk-blog-fifty-five.component.scss',
})
export class HomeUkBlogFiftyFiveComponent implements OnInit {
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
      'Свічкові патерни: як читати японські свічки | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Японські свічки та свічкові патерни: молот, доджі, поглинання, вечірня зірка. Як читати сигнали розвороту і чому важливий рівень.',
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
            'Свічкові патерни: японські свічки, пін-бар, поглинання, молот і доджі',
          description:
            'Японські свічки та свічкові патерни: молот, доджі, поглинання, вечірня зірка. Як читати сигнали розвороту і чому важливий рівень.',
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
            '@id': 'https://arapov.trade/uk/freestudying/candlestick-patterns',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/candlestick-patterns.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'свічкові патерни, японські свічки, пін-бар, поглинання, молот, доджі, вечірня зірка',
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
          name: 'Що таке японські свічки простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це графік, де кожна свічка несе чотири ціни за період: відкриття, закриття, максимум і мінімум. За тілом і тінями читають, як билися покупці й продавці на цьому відрізку. Найважливіша з чотирьох цін це закриття: за ним видно, хто лишився господарем становища.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які свічкові патерни реально працюють?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Вистачає базових: пін-бар, поглинання і молот. Поодинці їхній шанс близький до підкидання монетки. У робочий сигнал вони перетворюються лише на сильному рівні та з підтвердженням об'ємом. Зубрити десятки екзотичних формацій сенсу немає.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим пін-бар відрізняється від поглинання?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Пін-бар це одна свічка з довгою тінню і маленьким тілом, сигнал відкидання рівня. Поглинання це дві свічки, де друга тілом повністю перекриває першу й закривається у зворотний бік, момент зміни контролю. Обидва працюють лише на значущому рівні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що показує доджі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Доджі це свічка, у якої відкриття й закриття майже збіглися, а тіло перетворюється на тонку рисочку. Вона показує рівновагу й нерішучість: ні покупці, ні продавці не взяли гору. Сам по собі доджі не каже про напрям, це лише сигнал паузи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна торгувати лише за свічками?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "За моїм досвідом ні. Сама по собі свічка це картинка з розкладом приблизно порівну. Я ставлю її фінальним мазком на вже готову картину, тільки поруч із ключовим рівнем і з підтвердженням об'ємом. Команду на вхід дає рівень, а свічка лише уточнює момент.",
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
      '@id': 'https://arapov.trade/uk/freestudying/candlestick-patterns#howto',
      name: 'Як читати свічкові патерни',
      description:
        "Покроковий розбір японських свічок і свічкових патернів, що працюють, та того, як застосовувати їх на рівні та з об'ємом",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, як влаштована японська свічка',
          text: 'Японська свічка тримає чотири ціни за період: відкриття, закриття, максимум і мінімум.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Читайте напрям за закриттям відносно відкриття',
          text: 'Бичача свічка закривається вище відкриття, ведмежа нижче, а розмір тіла натякає на силу руху.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розпізнавайте пін-бар як відкидання рівня',
          text: 'Пін-бар це свічка з довгою тінню і маленьким тілом, сигнал відкидання цінового рівня.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Читайте поглинання як зміну контролю',
          text: 'Поглинання це дві свічки, де друга тілом повністю перекриває першу й закривається у зворотний бік.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: "Підтверджуйте патерн рівнем і об'ємом",
          text: "Сама по собі свічка близька до монетки, робочою її роблять лише сильний рівень і підтвердження об'ємом.",
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
      name: 'Глосарій термінів статті',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Японські свічки',
          description:
            'Вид біржового графіка, де кожна свічка тримає чотири ціни за період: відкриття, закриття, максимум і мінімум.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пін-бар',
          description:
            'Свічка з довгою тінню і маленьким тілом, що сигналізує про відкидання цінового рівня та можливий розворот.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Поглинання',
          description:
            'Свічковий патерн із двох барів, де тіло другого повністю перекриває тіло першого й закривається у протилежний бік.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Харамі',
          description:
            'Свічковий патерн із двох барів, де тіло меншої свічки повністю міститься всередині тіла попередньої більшої; ознака згасання руху та невизначеності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Молот',
          description:
            "Свічковий патерн розвороту з маленьким тілом угорі та довгою нижньою тінню, що з'являється після падіння.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Доджі',
          description:
            'Свічка, у якої ціни відкриття й закриття майже збігаються, а тіло перетворюється на тонку рисочку; знак нерішучості ринку.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
