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
  selector: 'app-home-uk-thirty-five',
  templateUrl: './home-uk-thirty-five.component.html',
  styleUrl: './home-uk-thirty-five.component.scss',
})
export class HomeUkThirtyFiveComponent implements OnInit {
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
      'Торгова система у трейдингу: типи, оптимізація та тестування | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгова система у трейдингу: типи стратегій, методи оптимізації та тестування. Повний посібник зі створення прибуткової системи торгівлі на фінансових ринках.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/tradingsystem.webp',
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
          headline:
            'Торгова система у трейдингу: типи, оптимізація та тестування',
          description:
            'Торгова система у трейдингу: типи стратегій, методи оптимізації та тестування. Повний посібник зі створення прибуткової системи торгівлі на фінансових ринках.',
          image: 'https://arapov.trade/assets/img/content/tradingsystem1.jpg',
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
            '@id': 'https://arapov.trade/uk/freestudying/tradingsystem',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'торгова система',
            'трейдинг',
            'стратегії торгівлі',
            'оптимізація',
            'тестування',
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
          name: 'Що таке торгова система у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торгова система — це впорядкований комплекс правил та алгоритмів, що визначають умови відкриття та закриття угод, обсяг позиції та контроль ризиків. Система усуває емоційний фактор і забезпечує послідовність торгових рішень.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які основні типи торгових систем існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні типи торгових систем: трендові (слідування за трендом), контртрендові (торгівля проти тренду), скальпінгові (безліч швидких угод), свінг-трейдинг (утримання позицій кілька днів) та арбітражні (використання цінових розбіжностей).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як протестувати торгову систему перед реальною торгівлею?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тестування включає бектестинг на історичних даних, форвард-тест на демо-рахунку та поступовий перехід до реальної торгівлі з мінімальними обсягами. Важливо аналізувати дохідність, просідання, коефіцієнт Шарпа та вінрейт.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які ключові елементи має містити торгова система?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові елементи: правила аналізу ринку, критерії входу та виходу з угод, система управління капіталом та ризиками, правила визначення обсягу позиції, а також критерії оцінки ефективності системи.',
          },
        },
        {
          '@type': 'Question',
          name: 'У чому переваги автоматизованих торгових систем?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Автоматизовані системи усувають емоційний фактор, забезпечують миттєве виконання сигналів, працюють цілодобово без втоми, дозволяють тестувати стратегії на великих обсягах даних та одночасно відстежувати безліч інструментів.',
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
      name: 'Як створити прибуткову торгову систему',
      description:
        'Покроковий посібник з розробки та тестування ефективної торгової системи для фінансових ринків.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте торговий стиль',
          text: 'Оберіть відповідний часовий горизонт та тактику торгівлі: скальпінг, дейтрейдинг, свінг-трейдинг або позиційна торгівля залежно від вашого графіка та темпераменту.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розробіть правила входу та виходу',
          text: 'Сформулюйте чіткі критерії для відкриття та закриття позицій на основі технічного або фундаментального аналізу. Правила мають бути однозначними та вимірюваними.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Встановіть систему управління ризиками',
          text: 'Визначте максимальний ризик на угоду (зазвичай 1-2% капіталу), правила встановлення стоп-лосів та методи розрахунку обсягу позиції для кожної угоди.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проведіть тестування системи',
          text: 'Виконайте бектестинг на історичних даних мінімум за 2-3 роки, потім проведіть форвард-тест на демо-рахунку протягом 2-3 місяців для перевірки працездатності в реальних умовах.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оптимізуйте та документуйте',
          text: 'На основі результатів тестування скоригуйте параметри системи, ведіть торговий журнал та регулярно аналізуйте статистику для постійного покращення результатів.',
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
      name: 'Глосарій термінів торгових систем',
      description:
        'Ключові терміни та визначення у галузі торгових систем та трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торгова система',
          description:
            'Впорядкований набір правил та алгоритмів для прийняття торгових рішень на фінансових ринках',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бектестинг',
          description:
            'Тестування торгової стратегії на історичних ринкових даних для оцінки її потенційної ефективності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просідання',
          description:
            'Максимальне зниження торгового капіталу від пікового значення до мінімуму за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коефіцієнт Шарпа',
          description:
            'Показник ефективності інвестицій, що вимірює дохідність на одиницю прийнятого ризику',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трендова система',
          description:
            'Торгова стратегія, спрямована на слідування за стійким спрямованим рухом ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стиль торгівлі з безліччю короткострокових угод для отримання прибутку з невеликих цінових коливань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Торговий підхід з утриманням позицій від кількох днів до кількох тижнів для захоплення середньострокових рухів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття позиції при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Вінрейт',
          description:
            'Відсоткове співвідношення прибуткових угод до загальної кількості здійснених угод',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мані-менеджмент',
          description:
            'Система управління торговим капіталом для контролю ризиків та оптимізації дохідності',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
