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
  selector: 'app-home-uk-nineteen',
  templateUrl: './home-uk-nineteen.component.html',
  styleUrl: './home-uk-nineteen.component.scss',
})
export class HomeUkNineteenComponent implements OnInit {
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
      'Торгівля на Форекс: як почати — посібник для початківців | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як почати торгувати на Форекс: вибір брокера, відкриття рахунку, стратегії торгівлі та управління ризиками. Повний посібник для початківців трейдерів.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/howtotradeonforex.webp',
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
          headline: 'Торгівля на Форекс: як почати — посібник для початківців',
          description:
            'Як почати торгувати на Форекс: вибір брокера, відкриття рахунку, стратегії торгівлі та управління ризиками. Повний посібник для початківців трейдерів.',
          image:
            'https://arapov.trade/assets/img/content/howtotradeonforex1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/howtotradeonforex',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'торгівля на форекс',
            'валютний ринок',
            'брокер',
            'стратегії',
            'управління ризиками',
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
          name: 'Що таке ринок Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Форекс (Foreign Exchange) — міжнародний децентралізований валютний ринок з щоденним оборотом понад 6 трильйонів доларів. Працює цілодобово з понеділка по п'ятницю, об'єднуючи банки, фонди та приватних трейдерів.",
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки грошей потрібно для початку торгівлі на Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімальний депозит залежить від брокера — від 10 до 100 доларів. Для комфортної торгівлі з дотриманням ризик-менеджменту рекомендується починати з 500-1000 доларів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які валютні пари краще обрати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Початківцям рекомендуються основні пари з долларом США: EUR/USD, GBP/USD, USD/JPY. Вони відрізняються високою ліквідністю, вузькими спредами та передбачуваною поведінкою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке кредитне плече і як його використовувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кредитне плече дозволяє торгувати сумами, що перевищують депозит. Плече 1:100 означає управління 10 000 доларами при депозиті 100 доларів. Збільшує як прибуток, так і збитки — вимагає обережності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обрати надійного брокера Форекс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перевіряйте наявність ліцензії регуляторів (FCA, CySEC, ASIC), вивчайте відгуки трейдерів, умови торгівлі (спреди, комісії), швидкість виведення коштів та якість підтримки.',
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
      name: 'Як почати торгувати на Форекс',
      description:
        'Покроковий посібник з початку торгівлі на валютному ринку для початківців трейдерів.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть брокера',
          text: 'Вивчіть рейтинги, перевірте ліцензії регуляторів та умови торгівлі. Обирайте брокера з демо-рахунком та освітніми матеріалами.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Відкрийте торговий рахунок',
          text: 'Зареєструйтесь на сайті брокера, пройдіть верифікацію особи та оберіть тип рахунку (стандартний, ECN, центовий).',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Встановіть торгову платформу',
          text: 'Завантажте MetaTrader 4/5 або іншу платформу брокера. Вивчіть інтерфейс, налаштуйте графіки та індикатори.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Потренуйтесь на демо-рахунку',
          text: 'Освойте платформу та протестуйте стратегії на віртуальних грошах без ризику втрати капіталу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Поповніть рахунок і почніть торгівлю',
          text: 'Внесіть мінімальний депозит, почніть з малих обсягів та суворо дотримуйтесь правил управління ризиками.',
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
      name: 'Глосарій термінів Форекс',
      description: 'Ключові терміни валютного ринку для початківців трейдерів',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Форекс',
          description: 'Міжнародний децентралізований ринок обміну валют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютна пара',
          description:
            'Інструмент торгівлі, що показує співвідношення курсів двох валют',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу валютної пари',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитне плече',
          description:
            'Механізм збільшення торгового обсягу за рахунок позикових коштів брокера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лот',
          description: 'Стандартна одиниця виміру обсягу угоди на Форекс',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пункт',
          description: 'Мінімальна зміна ціни валютної пари',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Ордер автоматичного закриття позиції при досягненні заданого збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер автоматичної фіксації прибутку при досягненні цільової ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Застава, що блокується на рахунку для забезпечення відкритої позиції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Своп',
          description:
            'Плата за перенесення позиції через ніч, що залежить від різниці процентних ставок',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
