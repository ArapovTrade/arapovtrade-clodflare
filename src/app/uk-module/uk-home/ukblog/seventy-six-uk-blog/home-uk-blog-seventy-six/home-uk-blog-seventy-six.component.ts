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
  selector: 'app-home-uk-blog-seventy-six',
  templateUrl: './home-uk-blog-seventy-six.component.html',
  styleUrl: './home-uk-blog-seventy-six.component.scss',
})
export class HomeUkBlogSeventySixComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
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
      'Метод Ганна в трейдингу: інструменти та принципи торгівлі | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повне керівництво з методів Вільяма Ганна: лінії, віяло, сітка, квадрат 9. Принципи аналізу ринку, часові цикли та правила успішної торгівлі.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/williamgannpsychology.webp',
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
          headline: 'Метод Ганна в трейдингу: інструменти та принципи торгівлі',
          description:
            'Повне керівництво з методів Вільяма Ганна: лінії, віяло, сітка, квадрат 9. Принципи аналізу ринку, часові цикли та правила успішної торгівлі.',
          image: 'https://arapov.trade/assets/img/content/uljamgann1.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/williamgannpsychology',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1520,
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
          name: 'Хто такий Вільям Ганн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вільям Делберт Ганн (1878-1955) — легендарний американський трейдер та аналітик, який розробив унікальну систему прогнозування ринків на основі математики, геометрії та часових циклів. Його методи досі використовуються трейдерами по всьому світу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке лінія Ганна 1x1?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лінія Ганна 1x1 — це трендова лінія під кутом 45°, яка символізує рівновагу між ціною та часом. Якщо ціна вище лінії — тренд висхідний, нижче — низхідний. Це базовий інструмент в методології Ганна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює віяло Ганна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Віяло Ганна — набір ліній під різними кутами (1x1, 2x1, 1x2 тощо), проведених з однієї точки. Лінії слугують динамічними рівнями підтримки та опору. При пробої однієї лінії ціна зазвичай рухається до наступної.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке квадрат 9 Ганна?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Квадрат 9 — числова матриця, де числа розташовані по спіралі. Використовується для визначення ключових цінових рівнів та точок розвороту. Вважається одним із найскладніших, але точних інструментів Ганна.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи актуальні методи Ганна сьогодні?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, методи Ганна залишаються актуальними. Вони засновані на фундаментальних принципах співвідношення ціни та часу, які не змінюються. Багато професійних трейдерів використовують інструменти Ганна в поєднанні з сучасними методами аналізу.',
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
      name: 'Як застосовувати методи Ганна в трейдингу',
      description:
        'Покрокове керівництво з використання інструментів Вільяма Ганна для аналізу ринку',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте значущі екстремуми',
          text: 'Знайдіть на графіку важливі максимуми та мінімуми, які стануть відправними точками для побудови інструментів Ганна.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Побудуйте лінії та віяло Ганна',
          text: 'Проведіть лінію 1x1 під кутом 45° від обраної точки. Додайте додаткові лінії віяла для визначення рівнів підтримки та опору.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Застосуйте сітку Ганна',
          text: 'Накладіть сітку на графік для виявлення часових та цінових пропорцій. Визначте зони потенційних розворотів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналізуйте часові цикли',
          text: 'Вивчіть повторювані патерни та цикли ринку. Використовуйте історичні дані для прогнозування майбутніх рухів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Комбінуйте з іншими методами',
          text: "Поєднуйте інструменти Ганна з класичним технічним аналізом, рівнями Фібоначчі та об'ємним аналізом для підвищення точності.",
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
      name: 'Терміни методології Ганна',
      description: 'Ключові поняття та інструменти теорії Вільяма Ганна',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Лінія Ганна',
          description:
            'Трендова лінія під кутом 45°, що символізує рівновагу між ціною та часом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Віяло Ганна',
          description:
            'Набір ліній під різними кутами, що слугують динамічними рівнями підтримки та опору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сітка Ганна',
          description:
            'Інструмент, що розділяє графік на рівні інтервали за часом та ціною',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Коробка Ганна',
          description:
            'Геометрична фігура для визначення зон консолідації та часових циклів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Квадрат 9',
          description:
            'Числова матриця зі спіральним розташуванням чисел для визначення ключових рівнів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кут 1x1',
          description:
            'Базовий кут 45°, що показує рівномірний рух ціни відносно часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Часові цикли',
          description:
            'Повторювані періоди ринкової активності, що використовуються для прогнозування',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пропорції ціни та часу',
          description:
            'Співвідношення між ціновими рухами та часовими інтервалами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Геометрія ринку',
          description:
            'Застосування геометричних форм для аналізу цінових рухів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кути Ганна',
          description:
            'Система кутів для визначення сили тренду та ключових рівнів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
