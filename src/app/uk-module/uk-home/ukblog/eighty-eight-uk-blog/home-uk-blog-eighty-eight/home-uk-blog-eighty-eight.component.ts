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
  selector: 'app-home-uk-blog-eighty-eight',
  templateUrl: './home-uk-blog-eighty-eight.component.html',
  styleUrl: './home-uk-blog-eighty-eight.component.scss',
})
export class HomeUkBlogEightyEightComponent implements OnInit {
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
      'TradingView: повний посібник з платформи | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      name: 'description',
      content:
        'TradingView: повний посібник з платформи для трейдерів. Дізнайтеся, як використовувати графіки, індикатори, Pine Script та соціальні функції для аналізу ринків.',
    });

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
            'https://arapov.trade/uk/freestudying/tradingview-platform#article',
          headline: 'TradingView: повний посібник з платформи для трейдерів',
          description:
            'Детальний посібник з використання TradingView: графіки, індикатори, Pine Script, соціальні функції та інтеграція з брокерами.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingview_1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/tradingview-platform',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'TradingView',
            "ТрейдінгВ'ю",
            'технічний аналіз',
            'індикатори',
            'Pine Script',
          ],
          wordCount: 1400,
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingview-platform#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке TradingView?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TradingView — це хмарна платформа для побудови графіків, технічного аналізу та обміну торговельними ідеями. Платформа надає доступ до даних бірж у реальному часі, сотень індикаторів та соціальної спільноти трейдерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна користуватися TradingView безкоштовно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, базова версія TradingView безкоштовна та включає доступ до графіків, основних індикаторів, вотчлісту та публікації ідей. Платні тарифи знімають обмеження на кількість індикаторів, алертів та графіків.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Pine Script?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pine Script — це мова програмування TradingView для створення користувацьких індикаторів та торговельних стратегій. Вона дозволяє автоматизувати аналіз та проводити бектестинг стратегій на історичних даних.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна торгувати через TradingView?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, TradingView інтегрований з понад 50 брокерами. Ви можете розміщувати ордери прямо з графіка, не залишаючи платформу. Також доступний режим паперової торгівлі для практики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ринки доступні на TradingView?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "TradingView надає дані по акціях, форексу, криптовалютах, ф'ючерсах, індексах, облігаціях та товарних ринках. Доступно понад 100 000 торговельних інструментів з різних бірж світу.",
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingview-platform#howto',
      name: 'Як почати роботу з TradingView',
      description:
        'Покрокове керівництво з початку роботи на платформі TradingView',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зареєструйтеся на платформі',
          text: 'Перейдіть на сайт TradingView та створіть акаунт через email або соціальні мережі.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Вивчіть інтерфейс',
          text: 'Ознайомтеся з основними зонами: панель інструментів, бічна панель малювання, вотчліст.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оберіть інструмент та таймфрейм',
          text: 'Використовуйте пошук для вибору активу та налаштуйте часовий інтервал.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Додайте індикатори',
          text: 'Натисніть кнопку індикаторів та оберіть потрібні з бібліотеки.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Налаштуйте алерти',
          text: 'Створіть сповіщення про досягнення ціною певних рівнів.',
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
      '@id': 'https://arapov.trade/uk/freestudying/tradingview-platform#terms',
      name: 'Терміни TradingView',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'TradingView',
          description:
            'Хмарна платформа для технічного аналізу, побудови графіків та обміну торговельними ідеями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pine Script',
          description:
            'Мова програмування TradingView для створення користувацьких індикаторів та стратегій.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скринер',
          description: 'Інструмент фільтрації активів за заданими критеріями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Алерт',
          description:
            'Сповіщення про настання заданої умови: досягнення ціни, перетин індикаторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вотчліст',
          description:
            'Список активів, що відстежуються, з швидким доступом до графіків.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бектестинг',
          description: 'Перевірка торговельної стратегії на історичних даних.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Paper Trading',
          description:
            'Режим віртуальної торгівлі без реальних грошей для практики.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description: "Індикатор розподілу об'єму торгів за ціновими рівнями.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Heikin Ashi',
          description:
            'Тип свічок з усередненими значеннями для згладжування ринкового шуму.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Webhook',
          description:
            'HTTP-запит для автоматичного надсилання даних алерту у зовнішні сервіси.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
