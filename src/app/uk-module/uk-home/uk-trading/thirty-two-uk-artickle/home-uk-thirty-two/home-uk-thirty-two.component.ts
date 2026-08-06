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
  selector: 'app-home-uk-thirty-two',
  templateUrl: './home-uk-thirty-two.component.html',
  styleUrl: './home-uk-thirty-two.component.scss',
})
export class HomeUkThirtyTwoComponent implements OnInit {
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
      'Стоп-ордер у трейдингу: як захистити депозит від збитків | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стоп-ордер у трейдингу — як правильно використовувати захисні ордери для контролю ризиків на криптовалютному ринку, Форекс та фондовій біржі',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoporder.webp',
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
          headline: 'Стоп-ордер у трейдингу: як захистити депозит від збитків',
          description:
            'Практичний посібник із використання стоп-ордерів: типи захисних ордерів, методи розрахунку рівнів, помилки новачків та професійні підходи',
          image: 'https://arapov.trade/assets/img/content/stoporder.png',
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
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/stoporder',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: '1650',
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
          name: 'Яка різниця між стоп-лосом і стоп-лімітом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лос гарантує виконання, але не гарантує ціну — після активації він стає ринковим ордером. Стоп-ліміт гарантує ціну виконання, але не гарантує саме виконання — якщо ринок швидко пройде вказаний рівень, ордер може залишитися невиконаним.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати правильну відстань до стопу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Використовуйте індикатор ATR для оцінки волатильності. Стандартна формула: стоп розміщується на відстані 1.5-2 ATR від точки входу. Для криптовалют збільшуйте до 2-3 ATR. Обов'язково враховуйте технічні рівні підтримки та опору.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чому великі гравці полюють на стопи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скупчення стоп-ордерів створює ліквідність, яку великі учасники можуть використати для входу у великі позиції. Ціна спеціально підводиться до рівнів зі стопами, активує їх, забезпечуючи ліквідність для великих угод, після чого розвертається.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли варто використовувати трейлінг-стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейлінг-стоп найефективніший у чітких трендових рухах. Уникайте його використання в консолідації або перед важливими новинами. Оптимальний крок: 3-5% для акцій великих компаній, 5-8% для криптовалют та волатильних активів.',
          },
        },
        {
          '@type': 'Question',
          name: "Чи обов'язково використовувати стоп-ордери?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для активної торгівлі — так, це базовий елемент ризик-менеджменту. Виняток — довгострокові інвестори з горизонтом у роки, які можуть використовувати ментальні стопи. Але навіть вони повинні мати план виходу з позиції при певних умовах.',
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
      name: 'Як встановити ефективний стоп-ордер',
      description:
        'Покрокова інструкція з налаштування захисного ордера для мінімізації торгових ризиків',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте допустимий ризик',
          text: 'Встановіть максимальний збиток на угоду. Стандарт — 1-2% від депозиту. Від цього залежатиме або відстань до стопу, або розмір позиції.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть волатильність активу',
          text: 'Додайте індикатор ATR на графік. Занотуйте його значення — стоп повинен бути достатньо далеко, щоб не зачепити звичайні коливання ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Знайдіть технічний рівень',
          text: 'Визначте найближчий рівень підтримки для довгої позиції або опору для короткої. Цей рівень буде орієнтиром для стопу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Додайте захисний буфер',
          text: 'Розмістіть стоп на 0.3-0.8% далі за технічний рівень. Це захистить від хибних пробоїв та маніпуляцій.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Виберіть тип і розмістіть ордер',
          text: 'Для ліквідних ринків використовуйте стоп-лос, для менш ліквідних — стоп-ліміт. Введіть параметри в терміналі та підтвердіть.',
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
      name: 'Словник термінів стоп-ордерів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ордер',
          description:
            'Умовний ордер, який активується при досягненні заданої ціни та автоматично виконує торгову операцію',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття збиткової позиції при досягненні визначеного цінового рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ліміт',
          description:
            'Гібридний ордер, що активується як стоп, але виконується як лімітний за вказаною або кращою ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-ордер, який автоматично рухається за ціною на заданій відстані при русі в прибутковому напрямку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера через волатильність або низьку ліквідність',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — індикатор середнього істинного діапазону, що вимірює волатильність активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Buy-Stop',
          description:
            'Ордер на купівлю, що активується при пробої ціни вгору вище встановленого рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Sell-Stop',
          description:
            'Ордер на продаж, що активується при падінні ціни нижче встановленого рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'OCO-ордер',
          description:
            "One-Cancels-Other — пов'язка двох ордерів, де виконання одного автоматично скасовує інший",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Збір ліквідності',
          description:
            'Маніпулятивний рух ціни до скупчення стоп-ордерів для їх активації перед розворотом ринку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
