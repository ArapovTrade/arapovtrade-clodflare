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
  selector: 'app-home-uk-blog-seventy-five',
  templateUrl: './home-uk-blog-seventy-five.component.html',
  styleUrl: './home-uk-blog-seventy-five.component.scss',
})
export class HomeUkBlogSeventyFiveComponent {
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
      'Трейдинг: азартна гра чи серйозний бізнес? | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Трейдинг — це азартна гра чи бізнес? Розбираємось у психології торгівлі, відмінностях професійного підходу від ігрового мислення та способах досягнення стабільного прибутку.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
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
          headline: 'Трейдинг: азартна гра чи серйозний бізнес?',
          description:
            'Аналіз двох підходів до торгівлі на фінансових ринках. Як перетворити трейдинг на стабільне джерело доходу та уникнути пасток ігрового мислення.',
          image:
            'https://arapov.trade/assets/img/content/gamblingorbusiness.webp',
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
          name: 'Чим трейдинг відрізняється від азартних ігор?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У казино гравець не може вплинути на результат — він визначається випадковістю. У трейдингу можна керувати ризиками, використовувати аналітику та слідувати стратегії. Професійний трейдинг базується на ймовірностях та системному підході.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому більшість новачків торгують як гравці?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новачки приходять на ринок з надією швидко розбагатіти. Вони приймають рішення на емоціях, ігнорують ризик-менеджмент, намагаються відігратися після збитків і не мають чіткого торгового плану.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як перетворити трейдинг на бізнес?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Необхідно розробити торгову стратегію, суворо дотримуватися ризик-менеджменту, вести журнал угод і контролювати емоції. Професійний трейдер фокусується на довгостроковому зростанні капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які емоції заважають трейдеру найбільше?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх і жадібність — два головних вороги трейдера. Страх змушує закривати прибуткові угоди рано або уникати входів. Жадібність штовхає до надмірних ризиків та ігнорування стоп-лосів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке FOMO у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO (Fear Of Missing Out) — страх втратити можливість. Трейдер поспішає увійти в ринок, боячись пропустити прибутковий рух, і відкриває необґрунтовані угоди без аналізу.',
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
      name: 'Як перетворити трейдинг на прибутковий бізнес',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розробіть торгову стратегію',
          text: 'Створіть чіткий план з правилами входу і виходу, критеріями вибору активів та принципами управління капіталом.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Впровадьте ризик-менеджмент',
          text: 'Визначте максимальний ризик на угоду (1-2% від депозиту), завжди використовуйте стоп-лоси.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведіть торговий журнал',
          text: 'Записуйте кожну угоду з причинами входу, результатом та емоціями.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Контролюйте емоції',
          text: 'Торгуйте за планом, не піддавайтесь страху і жадібності.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Фокусуйтесь на довгостроковому результаті',
          text: 'Не женіться за швидким прибутком, прагніть стабільного зростання капіталу.',
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
      name: 'Глосарій: трейдинг як бізнес',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear Of Missing Out — страх втратити можливість, що штовхає трейдера до необґрунтованих входів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Документ з правилами входу і виходу з угод та принципами управління ризиками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління капіталом, що визначає максимальний ризик на угоду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тільт',
          description:
            'Емоційний стан після збитків, що призводить до імпульсивних рішень',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисципліна',
          description:
            'Здатність суворо слідувати торговому плану незалежно від емоцій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Азартна торгівля',
          description:
            'Підхід до трейдингу, заснований на емоціях та інтуїції замість аналізу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Системний підхід',
          description:
            'Методика торгівлі, заснована на статистиці та суворому дотриманні правил',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Емоційний контроль',
          description:
            'Навичка управління страхом, жадібністю та іншими емоціями під час торгівлі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий журнал',
          description:
            'Записи всіх угод з аналізом причин входу та результатів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Довгострокове мислення',
          description:
            'Орієнтація на стабільне зростання капіталу замість швидких спекулятивних заробітків',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
