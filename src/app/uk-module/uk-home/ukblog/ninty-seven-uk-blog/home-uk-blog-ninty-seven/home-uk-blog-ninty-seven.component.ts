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
  selector: 'app-home-uk-blog-ninty-seven',
  templateUrl: './home-uk-blog-ninty-seven.component.html',
  styleUrl: './home-uk-blog-ninty-seven.component.scss',
})
export class HomeUkBlogNintySevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Індикатор RSI | Повний посібник з індексу відносної сили'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Індикатор RSI (Relative Strength Index): повний посібник з використання у трейдингу. Налаштування, стратегії, сигнали перекупленості та перепроданості.',
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Індикатор RSI: повний посібник з індексу відносної сили',
          description:
            'Індикатор RSI (Relative Strength Index): повний посібник з використання у трейдингу. Налаштування, стратегії, сигнали перекупленості та перепроданості.',
          image: 'https://arapov.trade/assets/img/content/rsiindex1.png',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-10T00:00:00+02:00',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/rsiindicator',
          },
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
          name: 'Що таке індикатор RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RSI (Relative Strength Index) — це технічний осцилятор, що вимірює швидкість та величину цінових змін за шкалою від 0 до 100. Розроблений Уеллсом Уайлдером у 1978 році для визначення перекупленості та перепроданості активу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які значення RSI вказують на перекупленість та перепроданість?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Класичні рівні: RSI вище 70 сигналізує про перекупленість (потенціал зниження), RSI нижче 30 — про перепроданість (потенціал зростання). У сильних трендах використовують рівні 80/20.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке дивергенція RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дивергенція — розходження між напрямком ціни та індикатора RSI. Бичача дивергенція (ціна падає, RSI зростає) передвіщає розворот угору. Ведмежа дивергенція (ціна зростає, RSI падає) сигналізує про можливе зниження.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який період RSI краще використовувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартний період — 14. Для короткострокової торгівлі використовують 7-9, для довгострокової — 21-25. Менший період дає більше сигналів, але збільшує кількість хибних.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна торгувати лише за RSI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Не рекомендується. RSI ефективніший у поєднанні з іншими інструментами: рівнями підтримки/опору, об'ємним аналізом, патернами Price Action. Комплексний підхід підвищує точність входів.",
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
      name: 'Як використовувати індикатор RSI у трейдингу',
      description:
        'Покрокова інструкція із застосування RSI для пошуку торгових сигналів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Додайте RSI на графік',
          text: 'Відкрийте торгову платформу, виберіть індикатор RSI зі списку осциляторів та застосуйте до графіка. Стандартні налаштування: період 14, рівні 70/30.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте поточний тренд',
          text: 'Проаналізуйте старший таймфрейм для розуміння напрямку ринку. RSI працює ефективніше, коли сигнали збігаються з основним трендом.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Шукайте зони екстремумів',
          text: 'Відзначайте моменти, коли RSI входить у зони перекупленості (вище 70) або перепроданості (нижче 30). Це потенційні області розвороту.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевірте наявність дивергенції',
          text: 'Порівняйте напрямок цінових екстремумів з екстремумами RSI. Розходження вказує на послаблення імпульсу та можливий розворот.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Дочекайтеся підтвердження',
          text: "Не входьте за першим сигналом RSI. Підтвердіть вхід через пробій рівня, свічковий патерн або об'ємний сплеск. Встановіть стоп-лос та тейк-профіт.",
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
      name: 'Термінологія індикатора RSI',
      description: 'Ключові поняття для розуміння індексу відносної сили',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'RSI',
          description:
            'Relative Strength Index — осцилятор, що вимірює відносну силу бичачих та ведмежих рухів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перекупленість',
          description:
            'Стан ринку, коли ціна зросла надто швидко і можлива корекція вниз (RSI вище 70)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перепроданість',
          description:
            'Стан ринку, коли ціна впала надто швидко і можливий відскок угору (RSI нижче 30)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розходження між напрямком руху ціни та індикатора, що сигналізує про послаблення тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осцилятор',
          description:
            'Клас індикаторів, що коливаються у визначеному діапазоні та показують імпульс руху',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Період RSI',
          description:
            'Кількість свічок, що використовуються для розрахунку індикатора (стандартне значення — 14)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Failure Swing',
          description:
            'Патерн розвороту RSI без досягнення екстремальних зон, що підтверджує зміну тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Центральна лінія',
          description:
            'Рівень 50 на шкалі RSI, що розділяє бичачу та ведмежу територію',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
