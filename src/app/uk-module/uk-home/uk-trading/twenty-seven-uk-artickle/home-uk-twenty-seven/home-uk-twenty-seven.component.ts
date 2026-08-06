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
  selector: 'app-home-uk-twenty-seven',
  templateUrl: './home-uk-twenty-seven.component.html',
  styleUrl: './home-uk-twenty-seven.component.scss',
})
export class HomeUkTwentySevenComponent implements OnInit {
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
      'Технічний аналіз: види графіків та тренди | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з технічного аналізу: види графіків (бари, японські свічки, лінійний), типи трендів та рівні підтримки/опору для трейдингу.',
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
          headline: 'Технічний аналіз: види графіків та тренди',
          description:
            'Повний посібник з технічного аналізу: види графіків, типи трендів та рівні підтримки/опору для професійного трейдингу',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/technicalmarketcharts',
          },
          image:
            'https://arapov.trade/assets/img/content/technicalmarketcharts.webp',
          articleSection: 'Навчання трейдингу',
          keywords:
            'технічний аналіз, види графіків, японські свічки, бари, лінійний графік, тренди, підтримка та опір',
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
          name: 'Який вид графіка найкраще підходить для початківців?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для початківців найкращим вибором є японські свічки. Вони наочно демонструють співвідношення сил між покупцями та продавцями, легко читаються завдяки кольоровій індикації та дозволяють швидко оцінити ринкові настрої за будь-який період.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити зміну тренду на ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зміна тренду визначається за кількома ознаками: пробій ключового рівня підтримки або опору, формування розворотних свічкових патернів, дивергенція з індикаторами обсягу та зміна структури максимумів/мінімумів. Важливо дочекатися підтвердження.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняються рівні підтримки від рівнів опору?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рівень підтримки — це цінова зона, де попит перевищує пропозицію і ціна схильна відскакувати вгору. Рівень опору — зона, де пропозиція перевищує попит і ціна схильна відкочуватися вниз. При пробої рівні змінюють свою роль.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна торгувати під час бокового тренду (флету)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгівля у флеті можлива, але вимагає особливого підходу. Трейдери купують біля нижньої межі діапазону та продають біля верхньої, використовуючи короткі стоп-лоси. Проте основний прибуток робиться на пробої діапазону.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який таймфрейм обрати для аналізу графіків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вибір таймфрейму залежить від стилю торгівлі. Скальпери працюють на M1-M15, внутрішньоденні трейдери — на M15-H1, свінг-трейдери — на H4-D1, позиційні трейдери — на D1-W1. Рекомендується аналізувати кілька таймфреймів одночасно.',
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
      name: 'Як проводити технічний аналіз ринку',
      description:
        'Покрокове керівництво з аналізу ринкових графіків для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть відповідний тип графіка',
          text: 'Визначте, який вид графіка відповідає вашому стилю торгівлі. Японські свічки підходять для більшості стратегій, бари — для детального аналізу, лінійний графік — для загальної оцінки тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте поточний тренд',
          text: 'Проаналізуйте структуру максимумів та мінімумів. Висхідний тренд — послідовно зростаючі мінімуми, низхідний — послідовно знижуючі максимуми, боковий — ціна рухається в горизонтальному діапазоні.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Побудуйте рівні підтримки та опору',
          text: "Позначте на графіку ключові рівні, від яких ціна раніше розверталася. З'єднайте мінімуми для визначення підтримки та максимуми для визначення опору. Чим більше дотиків, тим сильніший рівень.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проаналізуйте свічкові патерни',
          text: 'Вивчіть свічкові моделі, що формуються поблизу ключових рівнів. Розворотні патерни сигналізують про можливу зміну напрямку, патерни продовження — про збереження поточного тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Прийміть торгове рішення',
          text: "На основі сукупності факторів — напрямку тренду, положення ціни відносно рівнів та свічкових сигналів — прийміть рішення про вхід у угоду з обов'язковим визначенням точки стоп-лосу та тейк-профіту.",
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
      name: 'Глосарій технічного аналізу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Японські свічки',
          description:
            'Вид графіка, що відображає відкриття, закриття, максимум та мінімум ціни за період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бар',
          description:
            'Графічний елемент, що показує ціновий діапазон періоду з позначками відкриття та закриття',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Висхідний тренд',
          description:
            'Ринковий стан з послідовно зростаючими мінімумами та максимумами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Низхідний тренд',
          description:
            'Ринковий стан з послідовно знижуючими максимумами та мінімумами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флет',
          description:
            'Боковий рух ціни в горизонтальному діапазоні без вираженого напрямку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description:
            'Цінова зона, де попит перевищує пропозицію, викликаючи відскок ціни вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень опору',
          description:
            'Цінова зона, де пропозиція перевищує попит, обмежуючи зростання ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Часовий інтервал, представлений однією свічкою або баром на графіку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій рівня',
          description: 'Закріплення ціни вище опору або нижче підтримки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ціновий канал',
          description:
            'Дві паралельні лінії тренду, між якими рухається ціна активу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
