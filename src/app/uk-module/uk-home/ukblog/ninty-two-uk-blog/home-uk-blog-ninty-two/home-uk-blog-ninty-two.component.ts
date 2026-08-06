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
  selector: 'app-home-uk-blog-ninty-two',
  templateUrl: './home-uk-blog-ninty-two.component.html',
  styleUrl: './home-uk-blog-ninty-two.component.scss',
})
export class HomeUkBlogNintyTwoComponent implements OnInit {
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
      'Бінарні опціони: що це, як працюють та чи варто торгувати | Ігор Арапов',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Бінарні опціони: детальний розбір інструменту для початківців. Принцип роботи, види опціонів, ризики та реальні можливості заробітку.',
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
          '@id': 'https://arapov.trade/uk/freestudying/binarnyeopciony#article',
          headline: 'Бінарні опціони: що це, як працюють та чи варто торгувати',
          description:
            'Бінарні опціони: детальний розбір інструменту для початківців. Принцип роботи, види опціонів, ризики та реальні можливості заробітку.',
          image: 'https://arapov.trade/assets/img/content/binarnieoptions1.png',
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
            '@id': 'https://arapov.trade/uk/freestudying/binarnyeopciony',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'бінарні опціони',
            'торгівля опціонами',
            'Call Put опціони',
            'ризики трейдингу',
            'експірація',
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
      '@id': 'https://arapov.trade/uk/freestudying/binarnyeopciony#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке бінарні опціони простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бінарні опціони — це фінансовий контракт, де трейдер прогнозує напрямок руху ціни активу за визначений час. Результат завжди один із двох: або прибуток (зазвичай 60-90% від ставки), або повна втрата вкладеної суми. Назва «бінарні» походить від двоїчності результату.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна заробити на бінарних опціонах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Теоретично так, але на практиці більшість трейдерів втрачають гроші. Причини: негативне математичне очікування (при програші втрачається 100%, при виграші отримуєте 60-90%), короткостроковість угод, емоційна торгівля. Для стабільного заробітку потрібна серйозна стратегія та сувора дисципліна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим бінарні опціони відрізняються від Форексу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На Форексі прибуток залежить від величини руху ціни, можна використовувати стоп-лоси та керувати позицією. У бінарних опціонах результат фіксований: неважливо, зрушилася ціна на 1 пункт чи 100 — ви або отримуєте фіксований відсоток, або втрачаєте всю ставку. Також на Форексі немає обмеження за часом утримання позиції.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи легальні бінарні опціони?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Статус залежить від країни. У ЄС та Великій Британії бінарні опціони заборонені для роздрібних клієнтів. У США вони легальні лише на регульованих біржах (NADEX, CBOE). В Україні вони перебувають у сірій зоні — не заборонені, але й не регулюються, що створює ризики з недобросовісними брокерами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який мінімальний депозит для торгівлі бінарними опціонами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Більшість брокерів пропонують мінімальний депозит від $10-50, а мінімальна угода починається від $1. Проте низький поріг входу — це водночас і пастка: маленький депозит швидко втрачається при серії невдалих угод. Рекомендується мати запас капіталу для дотримання ризик-менеджменту.',
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
      '@id': 'https://arapov.trade/uk/freestudying/binarnyeopciony#howto',
      name: 'Як почати торгувати бінарними опціонами',
      description:
        'Покрокова інструкція для початківців трейдерів бінарних опціонів',
      totalTime: 'PT30M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '10-100',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть основи та ризики',
          text: 'Перш ніж вкладати гроші, розберіться в механіці бінарних опціонів, їхніх ризиках та особливостях. Зрозумійте, що це високоризикований інструмент з негативним математичним очікуванням.',
          url: 'https://arapov.trade/uk/freestudying/binarnyeopciony#basics',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть надійного брокера',
          text: 'Перевірте наявність ліцензії, репутацію брокера, відгуки реальних трейдерів. Уникайте компаній з агресивною рекламою та обіцянками гарантованого заробітку.',
          url: 'https://arapov.trade/uk/freestudying/binarnyeopciony#broker',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Потренуйтесь на демо-рахунку',
          text: 'Більшість брокерів пропонують демо-рахунок з віртуальними грошима. Використовуйте його для відпрацювання стратегії та розуміння інтерфейсу платформи.',
          url: 'https://arapov.trade/uk/freestudying/binarnyeopciony#demo',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розробіть торгову стратегію',
          text: 'Визначте правила входу в угоду, вибір часу експірації, розмір ставки. Ніколи не торгуйте навмання — це перетворює трейдинг на азартну гру.',
          url: 'https://arapov.trade/uk/freestudying/binarnyeopciony#strategy',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з мінімальних сум',
          text: 'При переході на реальний рахунок починайте з мінімальних ставок. Не ризикуйте більше 1-2% депозиту на одну угоду. Контролюйте емоції та суворо дотримуйтесь плану.',
          url: 'https://arapov.trade/uk/freestudying/binarnyeopciony#start',
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
      '@id': 'https://arapov.trade/uk/freestudying/binarnyeopciony#terms',
      name: 'Терміни бінарних опціонів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Бінарний опціон',
          description:
            'Фінансовий контракт з двома можливими результатами: фіксований прибуток при вірному прогнозі або втрата ставки при невірному',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Експірація',
          description:
            'Момент часу, коли бінарний опціон закривається та визначається результат угоди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Call опціон',
          description: 'Ставка на підвищення ціни активу до моменту експірації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Put опціон',
          description: 'Ставка на зниження ціни активу до моменту експірації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'One Touch',
          description:
            'Тип опціону, де потрібно передбачити торкання ціною певного рівня до експірації',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дохідність опціону',
          description:
            'Відсоток прибутку від суми ставки при успішному прогнозі, зазвичай 60-90%',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Страйк-ціна',
          description:
            'Ціна активу в момент відкриття опціону, відносно якої визначається результат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'У грошах (ITM)',
          description:
            'Стан опціону, коли прогноз виявився вірним і трейдер отримує прибуток',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Поза грошима (OTM)',
          description:
            'Стан опціону, коли прогноз не справдився і трейдер втрачає ставку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Турбо-опціон',
          description:
            'Надкороткостроковий опціон з часом експірації від 30 секунд до 5 хвилин',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
